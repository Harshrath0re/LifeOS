import { DATABASE_CONFIG } from '../constants/database';

export const DatabaseConfig = {
  ...DATABASE_CONFIG,
  enableLogging: __DEV__,
} as const;
