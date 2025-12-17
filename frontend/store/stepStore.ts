import { create } from "zustand";

type stepStore = {
    step: number
    setStep: ( value: number ) => void;
}

export const useStepStore = create<stepStore>((set) => ({
    step: 1,
    setStep: (value) => set({ step: value })
}))