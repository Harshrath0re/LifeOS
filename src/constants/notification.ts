export enum NotificationChannel {
  HABIT_REMINDERS = 'habit_reminders',
  TODO_REMINDERS = 'todo_reminders',
  HEALTH_ALERTS = 'health_alerts',
  SYSTEM = 'system',
}

export const NOTIFICATION_CONFIG = {
  defaultSound: 'default',
  vibratePattern: [0, 250, 250, 250],
} as const;
