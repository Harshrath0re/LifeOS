import { create } from 'zustand';
import { WaterLog } from '../types/water';
import { RunningLog } from '../types/running';
import { SleepLog } from '../types/sleep';

export interface HealthState {
  readonly waterLogs: readonly WaterLog[];
  readonly runningLogs: readonly RunningLog[];
  readonly sleepLogs: readonly SleepLog[];
  readonly isLoading: boolean;
  setWaterLogs: (logs: readonly WaterLog[]) => void;
  setRunningLogs: (logs: readonly RunningLog[]) => void;
  setSleepLogs: (logs: readonly SleepLog[]) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

const initialState = {
  waterLogs: [],
  runningLogs: [],
  sleepLogs: [],
  isLoading: false,
};

export const useHealthStore = create<HealthState>((set) => ({
  ...initialState,
  setWaterLogs: (waterLogs) => set({ waterLogs }),
  setRunningLogs: (runningLogs) => set({ runningLogs }),
  setSleepLogs: (sleepLogs) => set({ sleepLogs }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set(initialState),
}));
