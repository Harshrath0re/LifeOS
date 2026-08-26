import { storage } from '../storage/MMKV';
import { StorageKeys } from '../constants/storage';

export class StorageService {
  public static getItem<T>(key: StorageKeys | string): T | null {
    return storage.get<T>(key);
  }

  public static setItem<T>(key: StorageKeys | string, value: T): void {
    storage.set<T>(key, value);
  }

  public static removeItem(key: StorageKeys | string): void {
    storage.remove(key);
  }

  public static clearAll(): void {
    storage.clear();
  }
}
