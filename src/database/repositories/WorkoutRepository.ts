import { WorkoutLog } from '../../types/workout';

export class WorkoutRepository {
  public async getAll(): Promise<readonly WorkoutLog[]> {
    return [];
  }

  public async create(_log: Omit<WorkoutLog, 'id'>): Promise<WorkoutLog | null> {
    return null;
  }
}
