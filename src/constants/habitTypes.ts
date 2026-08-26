export enum HabitType {
  BOOLEAN = 'BOOLEAN',
  NUMBER = 'NUMBER',
  TIME = 'TIME',
  MONEY = 'MONEY',
  TEXT = 'TEXT',
}

export const HABIT_TYPE_LABELS = {
  [HabitType.BOOLEAN]: 'Yes/No',
  [HabitType.NUMBER]: 'Numeric Count',
  [HabitType.TIME]: 'Duration (Minutes)',
  [HabitType.MONEY]: 'Financial Amount',
  [HabitType.TEXT]: 'Text Log',
} as const;
