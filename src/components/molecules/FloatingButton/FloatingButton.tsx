import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Touchable } from '../../atoms/Touchable';
import { Text } from '../../atoms/Text';
import { COLORS } from '../../../theme/colors';
import { SHADOWS } from '../../../theme/shadows';
import { rw, rh } from '../../../theme/responsive';

export interface FloatingActionButtonProps {
  readonly onPress: () => void;
  readonly iconLabel?: string;
  readonly style?: ViewStyle;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  iconLabel = '+',
  style,
}) => {
  return (
    <Touchable style={[styles.fab, SHADOWS.lg, style]} onPress={onPress}>
      <Text variant="h2" color={COLORS.white}>
        {iconLabel}
      </Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: rh(24),
    right: rw(24),
    width: rw(56),
    height: rw(56),
    borderRadius: rw(28),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
