export const DURATION = {
  fast: 150,
  normal: 250,
  slow: 350,
  verySlow: 500,
} as const;

export const EASING = {
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  linear: 'linear',
} as const;

export const SPRING_CONFIG = {
  stiff: { tension: 200, friction: 20 },
  gentle: { tension: 120, friction: 14 },
  bouncy: { tension: 180, friction: 12 },
} as const;
