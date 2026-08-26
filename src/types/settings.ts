export type ThemeMode = 'dark' | 'light' | 'system';

export interface AppSettings {
  readonly themeMode: ThemeMode;
  readonly isBiometricEnabled: boolean;
  readonly isNotificationEnabled: boolean;
  readonly dailyWaterGoalMl: number;
  readonly dailyStepGoal: number;
  readonly currencySymbol: string;
}
