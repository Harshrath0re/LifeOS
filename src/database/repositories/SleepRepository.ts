import { SleepLog } from '../../types/sleep';

export class SleepRepository {
  public async getAll(): Promise<readonly SleepLog[]> {
    return [];
  }

  public async create(_log: Omit<SleepLog, 'id'>): Promise<SleepLog | null> {
    return null;
  }
}
