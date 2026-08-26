import { Expense } from '../../types/expense';

export class ExpenseRepository {
  public async getAll(): Promise<readonly Expense[]> {
    return [];
  }

  public async getById(_id: string): Promise<Expense | null> {
    return null;
  }

  public async create(_expense: Omit<Expense, 'id' | 'createdAt'>): Promise<Expense | null> {
    return null;
  }

  public async delete(_id: string): Promise<boolean> {
    return false;
  }
}
