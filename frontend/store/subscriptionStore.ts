import { create } from "zustand";

type subscriptionStore = {
    isSubscribed: boolean;
    setIsSubscribed: ( value: boolean ) => void;
}

export const useSubscriptionStore = create<subscriptionStore>((set) => ({
    isSubscribed: false,
    setIsSubscribed: (value) => set({ isSubscribed:value })
}))