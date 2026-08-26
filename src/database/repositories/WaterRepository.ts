import { WaterLog } from '../../types/water';

export class WaterRepository {
  public async getByDate(_date: string): Promise<readonly WaterLog[]> {
    return [];
  }

  public async addLog(_log: Omit<WaterLog, 'id'>): Promise<WaterLog | null> {
    return null;
  }
}
