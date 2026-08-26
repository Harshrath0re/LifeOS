import { Todo } from '../../types/todo';

export class TodoRepository {
  public async getAll(): Promise<readonly Todo[]> {
    return [];
  }

  public async getById(_id: string): Promise<Todo | null> {
    return null;
  }

  public async create(_todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo | null> {
    return null;
  }

  public async update(_id: string, _todo: Partial<Todo>): Promise<boolean> {
    return false;
  }

  public async delete(_id: string): Promise<boolean> {
    return false;
  }
}
