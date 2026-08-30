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
    if (value === undefined || value === null) {
      return null;
    }
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  }

  public getString(key: StorageKeys | string): string | null {
    const value = this.cache.get(key);
    return value !== undefined ? value : null;
  }

  public getBoolean(key: StorageKeys | string): boolean | null {
    const val = this.get<boolean | string>(key);
    if (typeof val === 'boolean') {
      return val;
    }
    if (val === 'true') {
      return true;
    }
    if (val === 'false') {
      return false;
    }
    return null;
  }

  public set<T>(key: StorageKeys | string, value: T): void {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    this.cache.set(key, serialized);
  }

  public contains(key: StorageKeys | string): boolean {
    return this.cache.has(key);
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

export const MMKV = {
  getString: (key: StorageKeys | string): string | null => mmkvStorage.getString(key),
  getBoolean: (key: StorageKeys | string): boolean | null => mmkvStorage.getBoolean(key),
  get: <T>(key: StorageKeys | string): T | null => mmkvStorage.get<T>(key),
  set: <T>(key: StorageKeys | string, value: T): void => mmkvStorage.set<T>(key, value),
  contains: (key: StorageKeys | string): boolean => mmkvStorage.contains(key),
  remove: (key: StorageKeys | string): void => mmkvStorage.remove(key),
  clearAll: (): void => mmkvStorage.clear(),
};
