import { rr } from './responsive';

export const RADIUS = {
  none: 0,
  xs: rr(4),
  sm: rr(8),
  md: rr(12),
  lg: rr(16),
  xl: rr(24),
  xxl: rr(32),
  full: 9999,
  round: 9999,
  card: rr(16),
  button: rr(12),
  input: rr(10),
  badge: rr(20),
} as const;
