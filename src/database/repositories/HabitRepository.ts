import { Habit } from '../../types/habit';

export class HabitRepository {
  public async getAll(): Promise<readonly Habit[]> {
    return [];
  }

  public async getById(_id: string): Promise<Habit | null> {
    return null;
  }

  public async create(_habit: Omit<Habit, 'id' | 'createdAt' | 'updatedAt'>): Promise<Habit | null> {
    return null;
  }

  public async update(_id: string, _habit: Partial<Habit>): Promise<boolean> {
    return false;
  }

  public async delete(_id: string): Promise<boolean> {
    return false;
  }
}
