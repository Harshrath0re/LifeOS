import { COLORS } from '../theme/colors';
import { TYPOGRAPHY } from '../theme/typography';
import { SPACING } from '../theme/spacing';
import { RADIUS } from '../theme/radius';
import { SHADOWS } from '../theme/shadows';

export const useTheme = () => {
  return {
    colors: COLORS,
    typography: TYPOGRAPHY,
    spacing: SPACING,
    radius: RADIUS,
    shadows: SHADOWS,
  };
};
