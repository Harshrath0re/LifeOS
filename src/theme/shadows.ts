import { ViewStyle } from 'react-native';
import { COLORS } from './colors';
import { rh, rw } from './responsive';

export const SHADOWS: Record<string, ViewStyle> = {
  none: {
    shadowColor: COLORS.transparent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: rh(2) },
    shadowOpacity: 0.15,
    shadowRadius: rw(4),
    elevation: 2,
  },
  md: {
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: rh(4) },
    shadowOpacity: 0.25,
    shadowRadius: rw(8),
    elevation: 4,
  },
  lg: {
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: rh(8) },
    shadowOpacity: 0.35,
    shadowRadius: rw(16),
    elevation: 8,
  },
  xl: {
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: rh(12) },
    shadowOpacity: 0.45,
    shadowRadius: rw(24),
    elevation: 12,
  },
} as const;
