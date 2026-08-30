import { create } from 'zustand';
import { User } from '../types/user';

export interface AuthState {
  readonly isAuthenticated: boolean;
  readonly isBiometricUnlocked: boolean;
  readonly isPasswordSetupComplete: boolean;
  readonly isBiometricEnabled: boolean;
  readonly user: User | null;
  readonly isLoading: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setBiometricUnlocked: (unlocked: boolean) => void;
  setPasswordSetupComplete: (isComplete: boolean) => void;
  setBiometricEnabled: (enabled: boolean) => void;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

const initialState = {
  isAuthenticated: false,
  isBiometricUnlocked: false,
  isPasswordSetupComplete: false,
  isBiometricEnabled: false,
  user: null,
  isLoading: false,
};

export const useAuthStore = create<AuthState>((set) => ({
  ...initialState,
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setBiometricUnlocked: (isBiometricUnlocked) => set({ isBiometricUnlocked }),
  setPasswordSetupComplete: (isPasswordSetupComplete) => set({ isPasswordSetupComplete }),
  setBiometricEnabled: (isBiometricEnabled) => set({ isBiometricEnabled }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set(initialState),
}));
