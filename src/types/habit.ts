import { HabitType } from '../constants/habitTypes';

export interface Habit {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly type: HabitType;
  readonly targetValue?: number;
  readonly unit?: string;
  readonly frequency: readonly number[];
  readonly reminderTime?: string;
  readonly color?: string;
  readonly icon?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface HabitLog {
  readonly id: string;
  readonly habitId: string;
  readonly date: string;
  readonly value: number | string | boolean;
  readonly notes?: string;
  readonly createdAt: string;
}
