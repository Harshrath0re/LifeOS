import { PomodoroMode } from '../constants/study';

export interface StudySession {
  readonly id: string;
  readonly subject: string;
  readonly durationMinutes: number;
  readonly mode: PomodoroMode;
  readonly completedAt: string;
}
