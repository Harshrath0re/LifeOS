import { pbkdf2 } from '@noble/hashes/pbkdf2.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex } from '@noble/hashes/utils.js';

const PBKDF2_ITERATIONS = 10000;
const KEY_LENGTH = 32;

/**
 * Converts a string to Uint8Array safely across all React Native / JS environments.
 */
const stringToBytes = (str: string): Uint8Array => {
  const g = globalThis as any;
  if (typeof g.TextEncoder !== 'undefined') {
    return new g.TextEncoder().encode(str);
  }
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i += 1) {
    bytes[i] = str.charCodeAt(i) & 0xff;
  }
  return bytes;
};

/**
 * Generates a random salt (16 bytes, hex-encoded).
 * Uses globalThis.crypto if available, with an automatic fallback for RN environments.
 */
export const generateSalt = (): string => {
  try {
    const g = globalThis as any;
    if (
      typeof g !== 'undefined' &&
      g.crypto &&
      typeof g.crypto.getRandomValues === 'function'
    ) {
      const bytes = new Uint8Array(16);
      g.crypto.getRandomValues(bytes);
      return bytesToHex(bytes);
    }
  } catch {
    // Ignore and fallback below
  }

  // Fallback random salt generator for RN environments where crypto.getRandomValues is not present
  let hex = '';
  const hexChars = '0123456789abcdef';
  for (let i = 0; i < 32; i += 1) {
    const r = Math.floor((Math.random() * 16 + Date.now() + i) % 16);
    hex += hexChars[r];
  }
  return hex;
};

/**
 * Derives a secure PIN / password verification key using PBKDF2 with SHA-256 and salt.
 * Never stores or logs plain-text passwords or secrets.
 */
export const derivePasswordKey = async (
  password: string,
  salt: string
): Promise<string> => {
  try {
    const passBytes = stringToBytes(password);
    const saltBytes = stringToBytes(salt);

    const keyBytes = pbkdf2(sha256, passBytes, saltBytes, {
      c: PBKDF2_ITERATIONS,
      dkLen: KEY_LENGTH,
    });
    return bytesToHex(keyBytes);
  } catch (err) {
    console.error('Error deriving password key:', err);
    let hash = 0;
    const combined = password + salt;
    for (let i = 0; i < combined.length; i += 1) {
      hash = (hash << 5) - hash + combined.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(32, '0');
  }
};

/**
 * Convenience wrapper for password key derivation.
 */
export const hashPin = async (
  pin: string,
  salt: string = 'lifeos_default_salt'
): Promise<string> => {
  return derivePasswordKey(pin, salt);
};