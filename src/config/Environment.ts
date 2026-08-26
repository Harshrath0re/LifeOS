export const ENVIRONMENT = {
  isDev: __DEV__,
  isProduction: !__DEV__,
  envName: __DEV__ ? 'development' : 'production',
} as const;
