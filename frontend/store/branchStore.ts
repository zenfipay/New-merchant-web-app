import { create } from "zustand";
import { persist } from 'zustand/middleware'

type BranchStore = {
    selectedBranch: "ALL" | string
    setSelectedBranch: ( branch: "ALL" | string ) => void
}

export const useBranchStore = create<BranchStore>()(
    persist(
        (set) => ({
            selectedBranch: 'ALL',
            setSelectedBranch: (branch) => set({ selectedBranch: branch })
        }),
        {
            name: 'branch-storage'
        }
    )
)