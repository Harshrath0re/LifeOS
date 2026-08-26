import { create } from 'zustand';

export interface DashboardState {
  readonly selectedDate: string;
  readonly isLoading: boolean;
  readonly isRefreshing: boolean;
  setSelectedDate: (date: string) => void;
  setLoading: (isLoading: boolean) => void;
  setRefreshing: (isRefreshing: boolean) => void;
  reset: () => void;
}

const initialState = {
  selectedDate: new Date().toISOString().split('T')[0],
  isLoading: false,
  isRefreshing: false,
};

export const useDashboardStore = create<DashboardState>((set) => ({
  ...initialState,
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  setLoading: (isLoading) => set({ isLoading }),
  setRefreshing: (isRefreshing) => set({ isRefreshing }),
  reset: () => set(initialState),
}));
