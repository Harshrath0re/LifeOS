import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { rh } from '../../../theme/responsive';

export interface DividerProps {
  readonly color?: string;
  readonly thickness?: number;
  readonly orientation?: 'horizontal' | 'vertical';
  readonly style?: ViewStyle;
}

export const Divider: React.FC<DividerProps> = ({
  color = COLORS.divider,
  thickness = rh(1),
  orientation = 'horizontal',
  style,
}) => {
  const dynamicStyle: ViewStyle =
    orientation === 'horizontal'
      ? { height: thickness, backgroundColor: color }
      : { width: thickness, backgroundColor: color };

  return (
    <View
      style={[
        orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        dynamicStyle,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
  },
  vertical: {
    height: '100%',
  },
});
