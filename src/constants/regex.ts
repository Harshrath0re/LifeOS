export const REGEX_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  pin: /^\d{4,6}$/,
  amount: /^\d+(\.\d{1,2})?$/,
  timeFormat: /^([01]\d|2[0-3]):?([0-5]\d)$/,
} as const;
