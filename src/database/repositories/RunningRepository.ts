import { RunningLog } from '../../types/running';

export class RunningRepository {
  public async getAll(): Promise<readonly RunningLog[]> {
    return [];
  }

  public async create(_log: Omit<RunningLog, 'id'>): Promise<RunningLog | null> {
    return null;
  }
}
