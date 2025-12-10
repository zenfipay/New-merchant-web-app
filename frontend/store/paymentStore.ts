"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PaymentSession } from "@/types";

type PaymentStore = {
  sessions: Record<string, PaymentSession>;
  activeSessionId: string | null;
  
  createSession: (sessionData: Omit<PaymentSession, 'id' | 'status' | 'createdAt' | 'expiresAt'>) => PaymentSession;
  updateSession: (id: string, patch: Partial<PaymentSession>) => void;
  getSession: (id: string) => PaymentSession | undefined;
  setActiveSession: (id: string | null) => void;
  clearExpiredSessions: () => void;
  broadcastSessionUpdate: (session: PaymentSession) => void;
};

const CHANNEL_NAME = "zenfipay_channel";

export const usePaymentStore = create<PaymentStore>()(
  persist(
    (set, get) => ({
      sessions: {},
      activeSessionId: null,

      createSession: (sessionData) => {
        const id = crypto.randomUUID();
        const createdAt = Date.now();
        const expiresAt = createdAt + (15 * 60 * 1000);
        
        const newSession: PaymentSession = {
          ...sessionData,
          id,
          status: "awaiting_chain",
          createdAt,
          expiresAt,
        };
        
        set((state) => ({
          sessions: { ...state.sessions, [id]: newSession },
          activeSessionId: id,
        }));
        
        get().broadcastSessionUpdate(newSession);
        
        return newSession;
      },

      updateSession: (id, patch) => {
        set((state) => {
          const existing = state.sessions[id];
          if (!existing) return state;
          
          const updated = { ...existing, ...patch };
          
          if (typeof window !== 'undefined') {
            try {
              const channel = new BroadcastChannel(CHANNEL_NAME);
              channel.postMessage({
                type: "SESSION_UPDATE",
                payload: updated,
              });
              channel.close();
            } catch (e) {
              console.error("Broadcast failed:", e);
            }
          }
          
          return { 
            sessions: { 
              ...state.sessions, 
              [id]: updated 
            } 
          };
        });
      },

      getSession: (id) => get().sessions[id],

      setActiveSession: (id) => set({ activeSessionId: id }),

      clearExpiredSessions: () => {
        const now = Date.now();
        set((state) => {
          const sessions = { ...state.sessions };
          Object.keys(sessions).forEach((id) => {
            const session = sessions[id];
            if (session.expiresAt < now && session.status !== "paid") {
              sessions[id] = { ...session, status: "expired" };
            }
          });
          return { sessions };
        });
      },

      broadcastSessionUpdate: (session: PaymentSession) => {
        if (typeof window !== 'undefined') {
          try {
            const channel = new BroadcastChannel(CHANNEL_NAME);
            channel.postMessage({
              type: "SESSION_UPDATE",
              payload: session,
            });
            channel.close();
          } catch (e) {
            console.error("Broadcast failed:", e);
          }
        }
      },
    }),
    {
      name: "zenfipay-payment-store",
    }
  )
);