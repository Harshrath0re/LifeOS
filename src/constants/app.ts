export const APP_CONFIG = {
  name: 'LifeOS',
  version: '1.0.0',
  buildNumber: '1',
  bundleId: 'com.lifeos.app',
  offlineModeOnly: true,
  supportEmail: 'support@lifeos.local',
} as const;

export enum AppStateEnum {
  ACTIVE = 'active',
  BACKGROUND = 'background',
  INACTIVE = 'inactive',
}
