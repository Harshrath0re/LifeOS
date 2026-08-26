import { StorageKeys } from '../constants/storage';

class MMKVStorageService {
  private static instance: MMKVStorageService;
  private cache: Map<string, string> = new Map();

  private constructor() {}

  public static getInstance(): MMKVStorageService {
    if (!MMKVStorageService.instance) {
      MMKVStorageService.instance = new MMKVStorageService();
    }
    return MMKVStorageService.instance;
  }

  public get<T>(key: StorageKeys | string): T | null {
    const value = this.cache.get(key);
    if (!value) {
      return null;
    }
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  }

  public set<T>(key: StorageKeys | string, value: T): void {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    this.cache.set(key, serialized);
  }

  public remove(key: StorageKeys | string): void {
    this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }
}

export const mmkvStorage = MMKVStorageService.getInstance();

export const storage = {
  get: <T>(key: StorageKeys | string): T | null => mmkvStorage.get<T>(key),
  set: <T>(key: StorageKeys | string, value: T): void => mmkvStorage.set<T>(key, value),
  remove: (key: StorageKeys | string): void => mmkvStorage.remove(key),
  clear: (): void => mmkvStorage.clear(),
};
