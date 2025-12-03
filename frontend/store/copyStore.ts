import { create } from "zustand";

type copyStore = {

    copied: boolean;
    setCopied: ( value:boolean ) => void
}

export const useCopyStore = create<copyStore>((set) => ({
    copied: false,
    setCopied: (value) => set({ copied: value })
}))