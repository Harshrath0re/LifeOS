import { MMKV } from '../storage/MMKV';
import { STORAGE_KEYS } from '../storage/Keys';

import { hashPin } from '../utils/hash';

class AuthService {
    /**
     * Returns true if user has already created a PIN.
     */
    hasPin(): boolean {
        return MMKV.contains(STORAGE_KEYS.MASTER_PIN);
    }

    /**
     * Save 4 digit PIN.
     */
    async createPin(pin: string): Promise<void> {
        const hashedPin = await hashPin(pin);

        MMKV.set(
            STORAGE_KEYS.MASTER_PIN,
            hashedPin,
        );

        MMKV.set(
            STORAGE_KEYS.FIRST_TIME_USER,
            false,
        );
    }

    /**
     * Verify entered PIN.
     */
    async verifyPin(
        pin: string,
    ): Promise<boolean> {
        const storedHash = MMKV.getString(
            STORAGE_KEYS.MASTER_PIN,
        );

        if (!storedHash) {
            return false;
        }

        const enteredHash = await hashPin(pin);

        return storedHash === enteredHash;
    }

    enableBiometric() {
        MMKV.set(
            STORAGE_KEYS.BIOMETRIC_ENABLED,
            true,
        );
    }

    disableBiometric() {
        MMKV.set(
            STORAGE_KEYS.BIOMETRIC_ENABLED,
            false,
        );
    }

    biometricEnabled(): boolean {
        return MMKV.getBoolean(
            STORAGE_KEYS.BIOMETRIC_ENABLED,
        ) ?? false;
    }

    logout() {
        MMKV.clearAll();
    }
}

export default new AuthService();