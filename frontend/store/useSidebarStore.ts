import { create } from 'zustand';

type SidebarState = {
    activeItem: string;
    setActiveItem: (title:string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
    activeItem: "Dashboard",
    setActiveItem: (title) => set({ activeItem: title}),

}))