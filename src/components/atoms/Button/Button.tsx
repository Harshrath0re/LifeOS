import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Touchable, TouchableProps } from '../Touchable';
import { Text } from '../Text';
import { COLORS } from '../../../theme/colors';
import { RADIUS } from '../../../theme/radius';
import { rh, rw } from '../../../theme/responsive';

export interface ButtonProps extends TouchableProps {
  readonly title: string;
  readonly variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  readonly isLoading?: boolean;
  readonly disabled?: boolean;
  readonly style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  style,
  ...props
}) => {
  const getContainerStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryContainer;
      case 'outline':
        return styles.outlineContainer;
      case 'danger':
        return styles.dangerContainer;
      case 'primary':
      default:
        return styles.primaryContainer;
    }
  };

  const getTextColor = () => {
    if (disabled) return COLORS.disabled;
    switch (variant) {
      case 'secondary':
        return COLORS.primary;
      case 'outline':
        return COLORS.primary;
      case 'danger':
        return COLORS.white;
      case 'primary':
      default:
        return COLORS.white;
    }
  };

  return (
    <Touchable
      style={[styles.baseContainer, getContainerStyle(), disabled && styles.disabledContainer, style]}
      disabled={disabled || isLoading}
      {...props}
    >
      <Text variant="button" color={getTextColor()}>
        {isLoading ? 'Loading...' : title}
      </Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    height: rh(48),
    paddingHorizontal: rw(24),
    borderRadius: RADIUS.button,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primaryContainer: {
    backgroundColor: COLORS.primary,
  },
  secondaryContainer: {
    backgroundColor: COLORS.surface,
  },
  outlineContainer: {
    backgroundColor: COLORS.transparent,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  dangerContainer: {
    backgroundColor: COLORS.error,
  },
  disabledContainer: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
  },
});
