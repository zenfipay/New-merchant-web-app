import { create } from "zustand";
import { persist } from 'zustand/middleware'

type BranchStore = {
    selectedBranch: string
    setSelectedBranch: ( branch: string ) => void
}

export const useBranchStore = create<BranchStore>()(
    persist(
        (set) => ({
            selectedBranch: 'All branches',
            setSelectedBranch: (branch) => set({ selectedBranch: branch })
        }),
        {
            name: 'branch-storage'
        }
    )
)