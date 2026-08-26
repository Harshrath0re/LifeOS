export enum TodoPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export interface Todo {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly isCompleted: boolean;
  readonly priority: TodoPriority;
  readonly dueDate?: string;
  readonly categoryId?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
