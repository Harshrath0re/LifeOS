export interface SleepLog {
  readonly id: string;
  readonly bedtime: string;
  readonly wakeTime: string;
  readonly durationHours: number;
  readonly quality: 'POOR' | 'AVERAGE' | 'GOOD' | 'EXCELLENT';
  readonly date: string;
}
