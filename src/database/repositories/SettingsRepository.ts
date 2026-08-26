import { AppSettings } from '../../types/settings';

export class SettingsRepository {
  public async getSettings(): Promise<AppSettings | null> {
    return null;
  }

  public async updateSettings(_settings: Partial<AppSettings>): Promise<boolean> {
    return false;
  }
}
