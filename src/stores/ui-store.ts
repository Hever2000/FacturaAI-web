import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  showRateLimitModal: boolean;

  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setShowRateLimitModal: (show: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  showRateLimitModal: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setShowRateLimitModal: (show) => set({ showRateLimitModal: show }),
}));
