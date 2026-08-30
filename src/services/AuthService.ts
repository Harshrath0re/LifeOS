import * as Keychain from 'react-native-keychain';
import { MMKV } from '../storage/MMKV';
import { STORAGE_KEYS } from '../storage/Keys';
import { derivePasswordKey, generateSalt } from '../utils/hash';

const KEYCHAIN_SERVICE = 'lifeos_master_auth';
const BIOMETRIC_KEYCHAIN_SERVICE = 'lifeos_biometric_flag';
const MASTER_USERNAME = 'lifeos_user';
const FALLBACK_AUTH_KEY = 'fallback_auth_payload';

interface StoredAuthData {
  salt: string;
  hash: string;
}

class AuthService {
  private fallbackPayload: StoredAuthData | null = null;
  private fallbackBioEnabled: boolean = false;

  /**
   * Returns true if user has already created a master PIN / password.
   */
  async hasPassword(): Promise<boolean> {
    const existsFlag = MMKV.getBoolean(STORAGE_KEYS.MASTER_PASSWORD_EXISTS);
    if (existsFlag !== null && existsFlag === true) {
      return true;
    }

    try {
      const credentials = await Keychain.getGenericPassword({
        service: KEYCHAIN_SERVICE,
      });
      const exists = Boolean(credentials);
      if (exists) {
        MMKV.set(STORAGE_KEYS.MASTER_PASSWORD_EXISTS, true);
      }
      return exists;
    } catch {
      const fallback = MMKV.getString(FALLBACK_AUTH_KEY);
      const exists = Boolean(fallback || this.fallbackPayload);
      if (exists) {
        MMKV.set(STORAGE_KEYS.MASTER_PASSWORD_EXISTS, true);
      }
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
   * Derives a key using PBKDF2 with salt, stores salt + derived key in Keychain/Keystore.
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
   * Enable biometric authentication (persisted in Keychain & MMKV).
   */
  async enableBiometric(): Promise<void> {
    MMKV.set(STORAGE_KEYS.BIOMETRIC_ENABLED, true);
    this.fallbackBioEnabled = true;
    try {
      await Keychain.setGenericPassword('bio_user', 'true', {
        service: BIOMETRIC_KEYCHAIN_SERVICE,
      });
    } catch {
      // Fallback in memory / MMKV
    }
  }

  /**
   * Disable biometric authentication (persisted in Keychain & MMKV).
   */
  async disableBiometric(): Promise<void> {
    MMKV.set(STORAGE_KEYS.BIOMETRIC_ENABLED, false);
    this.fallbackBioEnabled = false;
    try {
      await Keychain.resetGenericPassword({
        service: BIOMETRIC_KEYCHAIN_SERVICE,
      });
    } catch {
      // Fallback in memory / MMKV
    }
  }

  /**
   * Returns whether biometric authentication is enabled (persisted across app restarts).
   */
  async isBiometricEnabled(): Promise<boolean> {
    const cached = MMKV.getBoolean(STORAGE_KEYS.BIOMETRIC_ENABLED);
    if (cached !== null) {
      return cached;
    }

    try {
      const creds = await Keychain.getGenericPassword({
        service: BIOMETRIC_KEYCHAIN_SERVICE,
      });
      const isEnabled = Boolean(creds && creds.password === 'true');
      MMKV.set(STORAGE_KEYS.BIOMETRIC_ENABLED, isEnabled);
      return isEnabled;
    } catch {
      return this.fallbackBioEnabled;
    }
  }

  /**
   * Synchronous check for biometric preference.
   */
  biometricEnabled(): boolean {
    return MMKV.getBoolean(STORAGE_KEYS.BIOMETRIC_ENABLED) ?? this.fallbackBioEnabled;
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
      await Keychain.resetGenericPassword({ service: BIOMETRIC_KEYCHAIN_SERVICE });
    } catch {
      // Ignore cleanup error
    }
    this.fallbackPayload = null;
    this.fallbackBioEnabled = false;
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