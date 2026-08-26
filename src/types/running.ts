export interface RunningLog {
  readonly id: string;
  readonly distanceKm: number;
  readonly durationSeconds: number;
  readonly caloriesBurned?: number;
  readonly date: string;
  readonly notes?: string;
}
