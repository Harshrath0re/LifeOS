export const DATABASE_CONFIG = {
  name: 'LifeOS.db',
  version: 1,
  location: 'default',
} as const;

export enum TableName {
  HABITS = 'habits',
  HABIT_LOGS = 'habit_logs',
  TODOS = 'todos',
  EXPENSES = 'expenses',
  WATER_LOGS = 'water_logs',
  RUNNING_LOGS = 'running_logs',
  WORKOUT_LOGS = 'workout_logs',
  STUDY_LOGS = 'study_logs',
  SLEEP_LOGS = 'sleep_logs',
  SETTINGS = 'settings',
}
