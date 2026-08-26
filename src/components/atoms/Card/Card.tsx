import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS } from '../../../theme/radius';
import { SHADOWS } from '../../../theme/shadows';
import { SPACING } from '../../../theme/spacing';

export interface CardProps extends ViewProps {
  readonly children?: React.ReactNode;
  readonly variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  style,
  ...props
}) => {
  return (
    <View
      style={[
        styles.card,
        variant === 'elevated' && SHADOWS.md,
        variant === 'outlined' && styles.outlined,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.card,
    padding: SPACING.cardPadding,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  outlined: {
    backgroundColor: COLORS.transparent,
    borderColor: COLORS.border,
  },
});
