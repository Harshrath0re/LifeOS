/**
 * LifeOS PIN hashing.
 *
 * NOTE:
 * The final authentication implementation will move the
 * authentication secret into platform secure storage.
 *
 * This utility is intentionally kept dependency-free for now.
 */

export const hashPin = async (pin: string): Promise<string> => {
  // Temporary deterministic hash implementation.
  // This is NOT the final production security layer.
  let hash = 0;

  for (let index = 0; index < pin.length; index += 1) {
    hash = (hash << 5) - hash + pin.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash).toString(16);
};