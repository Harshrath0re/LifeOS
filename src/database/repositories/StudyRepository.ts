import { StudySession } from '../../types/study';

export class StudyRepository {
  public async getAll(): Promise<readonly StudySession[]> {
    return [];
  }

  public async create(_session: Omit<StudySession, 'id'>): Promise<StudySession | null> {
    return null;
  }
}
