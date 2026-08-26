import { rh, rw } from './responsive';

export const EXTRA_SPACING = {
  xxs: rh(2),
  huge: rh(64),
  gutter: rw(16),
  screenPadding: rw(16),
  cardPadding: rw(16),
} as const;

export { SPACING } from './responsive';
