import { COLORS } from '../theme/colors';
import { rw } from '../theme/responsive';

export const BORDER_WIDTH = {
  none: 0,
  thin: rw(1),
  medium: rw(2),
  thick: rw(4),
} as const;

export const BORDER_COLOR = {
  default: COLORS.border,
  divider: COLORS.divider,
  primary: COLORS.primary,
  error: COLORS.error,
} as const;
