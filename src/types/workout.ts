export interface WorkoutLog {
  readonly id: string;
  readonly type: string;
  readonly durationMinutes: number;
  readonly intensity: 'LOW' | 'MEDIUM' | 'HIGH';
  readonly caloriesBurned?: number;
  readonly date: string;
  readonly notes?: string;
}
