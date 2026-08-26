import { SPACING as RESPONSIVE_SPACING, rh, rw } from './responsive';

export const SPACING = {
  ...RESPONSIVE_SPACING,
  xxs: rh(2),
  huge: rh(64),
  gutter: rw(16),
  screenPadding: rw(16),
  cardPadding: rw(16),
} as const;
