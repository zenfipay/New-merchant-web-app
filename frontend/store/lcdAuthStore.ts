"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type StaffRole = "owner" | "cashier" | "admin" | "branch-manager";

export type StaffSession = {
  staffId: string;
  staffName: string;
  role: StaffRole;
  pin: string;
  loginTime: number;
  expiresAt: number;
};

type LCDAuthStore = {
  isAuthenticated: boolean;
  currentSession: StaffSession | null;
  
  loginLCD: (pin: string) => Promise<boolean>;
  logoutLCD: () => void;
  validateSession: () => boolean;
  
  pendingStaffInfo: StaffSession | null;
  setPendingStaffInfo: (info: StaffSession) => void;
};

// Demo staff data
const DEMO_STAFF = [
  {
    staffId: "staff_001",
    staffName: "John Doe",
    role: "cashier" as StaffRole,
    pin: "123456",
  },
  {
    staffId: "staff_002",
    staffName: "Jane Smith",
    role: "owner" as StaffRole,
    pin: "567890",
  },
];

export const useLCDAuthStore = create<LCDAuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      currentSession: null,
      pendingStaffInfo: null,

      loginLCD: async (pin: string) => {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const pending = get().pendingStaffInfo;
        
        if (pending && pending.pin === pin) {
          const session: StaffSession = {
            ...pending,
            loginTime: Date.now(),
            expiresAt: Date.now() + (8 * 60 * 60 * 1000),
          };

          set({
            isAuthenticated: true,
            currentSession: session,
            pendingStaffInfo: null,
          });

          const channel = new BroadcastChannel('zenfipay_channel');
          channel.postMessage({
            type: 'LCD_AUTHENTICATED',
            payload: { staffId: session.staffId, staffName: session.staffName },
          });
          channel.close();

          return true;
        }

        const staff = DEMO_STAFF.find(s => s.pin === pin);
        
        if (staff) {
          const session: StaffSession = {
            ...staff,
            loginTime: Date.now(),
            expiresAt: Date.now() + (8 * 60 * 60 * 1000),
          };

          set({
            isAuthenticated: true,
            currentSession: session,
          });

          return true;
        }

        return false;
      },

      logoutLCD: () => {
        const session = get().currentSession;
        
        set({
          isAuthenticated: false,
          currentSession: null,
          pendingStaffInfo: null,
        });

        if (session) {
          const channel = new BroadcastChannel('zenfipay_channel');
          channel.postMessage({
            type: 'LCD_LOGGED_OUT',
            payload: { staffId: session.staffId },
          });
          channel.close();
        }
      },

      validateSession: () => {
        const session = get().currentSession;
        
        if (!session) return false;
        
        if (Date.now() > session.expiresAt) {
          get().logoutLCD();
          return false;
        }

        return true;
      },

      setPendingStaffInfo: (info: StaffSession) => {
        set({ pendingStaffInfo: info });
      },
    }),
    {
      name: "lcd-auth-store",
    }
  )
);