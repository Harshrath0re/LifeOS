import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { RADIUS } from '../../../theme/radius';
import { rw, rh } from '../../../theme/responsive';
import { Text } from '../Text';

export interface BadgeProps {
  readonly label: string;
  readonly variant?: 'primary' | 'success' | 'warning' | 'error' | 'secondary';
  readonly style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  style,
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return COLORS.success;
      case 'warning':
        return COLORS.warning;
      case 'error':
        return COLORS.error;
      case 'secondary':
        return COLORS.surface;
      case 'primary':
      default:
        return COLORS.primary;
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getBackgroundColor() }, style]}>
      <Text variant="caption" color={COLORS.white}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: rw(8),
    paddingVertical: rh(2),
    borderRadius: RADIUS.badge,
    alignSelf: 'flex-start',
  },
});
