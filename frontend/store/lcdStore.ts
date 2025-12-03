'use client'

import { create } from "zustand";

type LCDStore = {
    // isLoggedIn: boolean;
    // activeSessionId: string | null;
    // login: () => void;
    // logout: () => void;
    // setActiveSession: ( id: string ) => void;
    activeSession: string | null;
    setActiveSession: ( session: string ) => void;
};

export const useLCDStore = create<LCDStore>((set) => ({
    activeSession: null,
    setActiveSession: ( session ) => set({ activeSession: session })
}))