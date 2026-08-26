import { TextStyle } from 'react-native';
import { rf, rh } from './responsive';

export const FONT_FAMILY = {
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',
} as const;

export const FONT_WEIGHT = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const FONT_SIZE = {
  xs: rf(10),
  sm: rf(12),
  md: rf(14),
  lg: rf(16),
  xl: rf(18),
  xxl: rf(22),
  h3: rf(24),
  h2: rf(28),
  h1: rf(32),
} as const;

export const LINE_HEIGHT = {
  xs: rh(14),
  sm: rh(16),
  md: rh(20),
  lg: rh(24),
  xl: rh(26),
  xxl: rh(30),
  h3: rh(32),
  h2: rh(36),
  h1: rh(40),
} as const;

export const TYPOGRAPHY: Record<string, TextStyle> = {
  h1: {
    fontSize: FONT_SIZE.h1,
    lineHeight: LINE_HEIGHT.h1,
    fontWeight: FONT_WEIGHT.bold,
  },
  h2: {
    fontSize: FONT_SIZE.h2,
    lineHeight: LINE_HEIGHT.h2,
    fontWeight: FONT_WEIGHT.bold,
  },
  h3: {
    fontSize: FONT_SIZE.h3,
    lineHeight: LINE_HEIGHT.h3,
    fontWeight: FONT_WEIGHT.semibold,
  },
  bodyLarge: {
    fontSize: FONT_SIZE.lg,
    lineHeight: LINE_HEIGHT.lg,
    fontWeight: FONT_WEIGHT.regular,
  },
  bodyMedium: {
    fontSize: FONT_SIZE.md,
    lineHeight: LINE_HEIGHT.md,
    fontWeight: FONT_WEIGHT.regular,
  },
  bodySmall: {
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
    fontWeight: FONT_WEIGHT.regular,
  },
  button: {
    fontSize: FONT_SIZE.md,
    lineHeight: LINE_HEIGHT.md,
    fontWeight: FONT_WEIGHT.semibold,
  },
  caption: {
    fontSize: FONT_SIZE.xs,
    lineHeight: LINE_HEIGHT.xs,
    fontWeight: FONT_WEIGHT.regular,
  },
} as const;
