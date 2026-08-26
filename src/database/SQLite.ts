import { DATABASE_CONFIG } from '../constants/database';

export interface DatabaseConnection {
  readonly isConnected: boolean;
  executeAsync(sql: string, params?: unknown[]): Promise<unknown>;
}

export class SQLiteDatabase {
  private static instance: SQLiteDatabase;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): SQLiteDatabase {
    if (!SQLiteDatabase.instance) {
      SQLiteDatabase.instance = new SQLiteDatabase();
    }
    return SQLiteDatabase.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }
    await this.runMigrations();
    this.isInitialized = true;
  }

  public async runMigrations(): Promise<void> {
    const currentVersion = DATABASE_CONFIG.version;
    if (__DEV__) {
      console.log(`[SQLiteDatabase] Initializing database v${currentVersion}`);
    }
  }

  public isReady(): boolean {
    return this.isInitialized;
  }
}

export const dbInstance = SQLiteDatabase.getInstance();
