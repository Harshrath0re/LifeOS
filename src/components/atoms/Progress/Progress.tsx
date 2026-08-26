import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../../theme/colors';
import { rh } from '../../../theme/responsive';
import { clamp } from '../../../utils/helpers';

export interface ProgressProps {
  readonly progress: number;
  readonly color?: string;
  readonly height?: number;
  readonly style?: ViewStyle;
}

export const Progress: React.FC<ProgressProps> = ({
  progress,
  color = COLORS.primary,
  height = rh(8),
  style,
}) => {
  const normalizedProgress = progress > 1 ? progress / 100 : progress;
  const percentage = Math.round(clamp(normalizedProgress, 0, 1) * 100);

  return (
    <View style={[styles.track, { height, borderRadius: height / 2 }, style]}>
      <View
        style={[
          styles.fill,
          { width: `${percentage}%`, backgroundColor: color, borderRadius: height / 2 },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: COLORS.surface,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
