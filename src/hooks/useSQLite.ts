import { useEffect, useState } from 'react';
import { SQLiteDatabase } from '../database/SQLite';

export const useSQLite = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const initDb = async () => {
      try {
        const db = SQLiteDatabase.getInstance();
        await db.initialize();
        if (isMounted) {
          setIsReady(true);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to initialize database'));
        }
      }
    };

    initDb();

    return () => {
      isMounted = false;
    };
  }, []);

  return { isReady, error };
};
