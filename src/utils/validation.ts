import { REGEX_PATTERNS } from '../constants/regex';

export const isValidEmail = (email: string): boolean => {
  return REGEX_PATTERNS.email.test(email);
};

export const isValidPin = (pin: string): boolean => {
  return REGEX_PATTERNS.pin.test(pin);
};

export const isValidAmount = (amountStr: string): boolean => {
  return REGEX_PATTERNS.amount.test(amountStr);
};
