import { create } from 'zustand';
import { AppSettings } from '../types/settings';

export interface SettingsState {
  readonly settings: AppSettings;
  readonly isLoading: boolean;
  setSettings: (settings: AppSettings) => void;
  updateSettings: (partialSettings: Partial<AppSettings>) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

const defaultSettings: AppSettings = {
  themeMode: 'dark',
  isBiometricEnabled: false,
  isNotificationEnabled: true,
  dailyWaterGoalMl: 2500,
  dailyStepGoal: 10000,
  currencySymbol: '$',
};

const initialState = {
  settings: defaultSettings,
  isLoading: false,
};

export const useSettingsStore = create<SettingsState>((set) => ({
  ...initialState,
  setSettings: (settings) => set({ settings }),
  updateSettings: (partialSettings) =>
    set((state) => ({ settings: { ...state.settings, ...partialSettings } })),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set(initialState),
}));
