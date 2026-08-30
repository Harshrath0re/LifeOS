import * as Keychain from 'react-native-keychain';
import { MMKV } from '../storage/MMKV';
import { STORAGE_KEYS } from '../storage/Keys';
import { derivePasswordKey, generateSalt } from '../utils/hash';

const KEYCHAIN_SERVICE = 'lifeos_master_auth';
const MASTER_USERNAME = 'lifeos_user';
const FALLBACK_AUTH_KEY = 'fallback_auth_payload';

interface StoredAuthData {
  salt: string;
  hash: string;
}

class AuthService {
  private fallbackPayload: StoredAuthData | null = null;

  /**
   * Returns true if user has already created a master PIN / password.
   */
  async hasPassword(): Promise<boolean> {
    const existsFlag = MMKV.getBoolean(STORAGE_KEYS.MASTER_PASSWORD_EXISTS);
    if (existsFlag !== null) {
      return existsFlag;
    }

    try {
      const credentials = await Keychain.getGenericPassword({
        service: KEYCHAIN_SERVICE,
      });
      const exists = Boolean(credentials);
      MMKV.set(STORAGE_KEYS.MASTER_PASSWORD_EXISTS, exists);
      return exists;
    } catch {
      const fallback = MMKV.getString(FALLBACK_AUTH_KEY);
      const exists = Boolean(fallback || this.fallbackPayload);
      MMKV.set(STORAGE_KEYS.MASTER_PASSWORD_EXISTS, exists);
      return exists;
    }
  }

  /**
   * Synchronous check of master PIN existence based on MMKV non-sensitive flag.
   */
  hasPasswordSync(): boolean {
    return MMKV.getBoolean(STORAGE_KEYS.MASTER_PASSWORD_EXISTS) ?? false;
  }

  /**
   * Create master PIN / password.
   * Derives a key using PBKDF2 with salt, stores salt + derived key in Keychain/Keystore (with safe fallback).
   * Plain-text PIN is never stored or logged.
   */
  async createPassword(password: string): Promise<void> {
    const salt = generateSalt();
    const hash = await derivePasswordKey(password, salt);

    const payload: StoredAuthData = { salt, hash };
    const serialized = JSON.stringify(payload);

    try {
      await Keychain.setGenericPassword(MASTER_USERNAME, serialized, {
        service: KEYCHAIN_SERVICE,
      });
    } catch {
      // Fallback if native keychain module is not loaded in current bundle
      this.fallbackPayload = payload;
      MMKV.set(FALLBACK_AUTH_KEY, serialized);
    }

    MMKV.set(STORAGE_KEYS.MASTER_PASSWORD_EXISTS, true);
    MMKV.set(STORAGE_KEYS.AUTH_SETUP_COMPLETE, true);
    MMKV.set(STORAGE_KEYS.FIRST_TIME_USER, false);
    this.updateLastAuthenticated();
  }

  /**
   * Verify entered master PIN / password against stored salt + derived key.
   */
  async verifyPassword(password: string): Promise<boolean> {
    let payload: StoredAuthData | null = null;

    try {
      const credentials = await Keychain.getGenericPassword({
        service: KEYCHAIN_SERVICE,
      });

      if (credentials && credentials.password) {
        payload = JSON.parse(credentials.password);
      }
    } catch {
      // Fallback
    }

    if (!payload) {
      const fallbackStr = MMKV.getString(FALLBACK_AUTH_KEY);
      if (fallbackStr) {
        try {
          payload = JSON.parse(fallbackStr);
        } catch {
          payload = null;
        }
      } else {
        payload = this.fallbackPayload;
      }
    }

    if (!payload || !payload.salt || !payload.hash) {
      return false;
    }

    const enteredHash = await derivePasswordKey(password, payload.salt);
    const isMatch = enteredHash === payload.hash;

    if (isMatch) {
      this.updateLastAuthenticated();
    }

    return isMatch;
  }

  /**
   * Enable biometric authentication (flag in MMKV).
   */
  enableBiometric(): void {
    MMKV.set(STORAGE_KEYS.BIOMETRIC_ENABLED, true);
  }

  /**
   * Disable biometric authentication (flag in MMKV).
   */
  disableBiometric(): void {
    MMKV.set(STORAGE_KEYS.BIOMETRIC_ENABLED, false);
  }

  /**
   * Returns whether biometric authentication is enabled.
   */
  biometricEnabled(): boolean {
    return MMKV.getBoolean(STORAGE_KEYS.BIOMETRIC_ENABLED) ?? false;
  }

  /**
   * Returns whether initial authentication setup is complete.
   */
  isSetupComplete(): boolean {
    return MMKV.getBoolean(STORAGE_KEYS.AUTH_SETUP_COMPLETE) ?? false;
  }

  /**
   * Update the last authenticated timestamp in MMKV.
   */
  updateLastAuthenticated(): void {
    MMKV.set(STORAGE_KEYS.LAST_AUTHENTICATED, new Date().toISOString());
  }

  /**
   * Reset authentication state and clear secret.
   */
  async clearAuth(): Promise<void> {
    try {
      await Keychain.resetGenericPassword({ service: KEYCHAIN_SERVICE });
    } catch {
      // Ignore cleanup error
    }
    this.fallbackPayload = null;
    MMKV.remove(FALLBACK_AUTH_KEY);
    MMKV.set(STORAGE_KEYS.MASTER_PASSWORD_EXISTS, false);
    MMKV.set(STORAGE_KEYS.BIOMETRIC_ENABLED, false);
    MMKV.set(STORAGE_KEYS.AUTH_SETUP_COMPLETE, false);
    MMKV.remove(STORAGE_KEYS.LAST_AUTHENTICATED);
  }

  // Backwards compatibility aliases
  async hasPin(): Promise<boolean> {
    return this.hasPassword();
  }

  async createPin(pin: string): Promise<void> {
    return this.createPassword(pin);
  }

  async verifyPin(pin: string): Promise<boolean> {
    return this.verifyPassword(pin);
  }

  logout(): void {
    MMKV.set(STORAGE_KEYS.LAST_AUTHENTICATED, '');
  }
}

export default new AuthService();