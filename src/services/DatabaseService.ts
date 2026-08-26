import { SQLiteDatabase } from '../database/SQLite';

export class DatabaseService {
  public static async initialize(): Promise<void> {
    const db = SQLiteDatabase.getInstance();
    await db.initialize();
  }

  public static isConnected(): boolean {
    return SQLiteDatabase.getInstance().isReady();
  }
}
