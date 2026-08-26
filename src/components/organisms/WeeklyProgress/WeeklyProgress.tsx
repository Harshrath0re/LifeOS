import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ProgressCard } from '../../molecules/ProgressCard';

export interface WeeklyProgressProps {
  readonly progress: number;
  readonly style?: ViewStyle;
}

export const WeeklyProgress: React.FC<WeeklyProgressProps> = ({
  progress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ProgressCard
        title="Weekly Goal Progress"
        progress={progress}
        subtitle={`${Math.round(progress)}% completed this week`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
