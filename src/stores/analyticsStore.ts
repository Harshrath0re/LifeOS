import { create } from 'zustand';
import { MetricSummary } from '../types/analytics';

export interface AnalyticsState {
  readonly selectedPeriod: 'daily' | 'weekly' | 'monthly' | 'yearly';
  readonly summaries: readonly MetricSummary[];
  readonly isLoading: boolean;
  setSelectedPeriod: (period: 'daily' | 'weekly' | 'monthly' | 'yearly') => void;
  setSummaries: (summaries: readonly MetricSummary[]) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

const initialState = {
  selectedPeriod: 'weekly' as const,
  summaries: [],
  isLoading: false,
};

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  ...initialState,
  setSelectedPeriod: (selectedPeriod) => set({ selectedPeriod }),
  setSummaries: (summaries) => set({ summaries }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set(initialState),
}));
