import { APP_CONFIG } from '../constants/app';

export const AppConfig = {
  ...APP_CONFIG,
  defaultLanguage: 'en',
  enableAnalytics: false,
} as const;
