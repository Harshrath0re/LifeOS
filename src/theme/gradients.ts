import { COLORS } from './colors';

export const GRADIENTS = {
  primary: [COLORS.primary, COLORS.secondary] as const,
  card: [COLORS.card, COLORS.surface] as const,
  surface: [COLORS.surface, COLORS.background] as const,
  accent: [COLORS.secondary, COLORS.success] as const,
  warning: [COLORS.warning, COLORS.error] as const,
  dark: [COLORS.background, '#05070A'] as const,
} as const;
