import { useCallback, useState } from 'react';
import { storage } from '../storage/MMKV';
import { StorageKeys } from '../constants/storage';

export const useStorage = <T>(key: StorageKeys | string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = storage.get<T>(key);
    return item !== null ? item : initialValue;
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value;
        storage.set(key, nextValue);
        return nextValue;
      });
    },
    [key],
  );

  const removeValue = useCallback(() => {
    storage.remove(key);
    setStoredValue(initialValue);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
};
