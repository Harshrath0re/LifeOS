import React from 'react';
import { View, ViewStyle } from 'react-native';
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
  return (
    <View
      style={[
        orientation === 'horizontal'
          ? { height: thickness, width: '100%', backgroundColor: color }
          : { width: thickness, height: '100%', backgroundColor: color },
        style,
      ]}
    />
  );
};
