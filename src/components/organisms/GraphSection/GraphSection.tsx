import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ChartCard } from '../../molecules/ChartCard';
import { ChartDataPoint } from '../../../types/analytics';

export interface GraphSectionProps {
  readonly title: string;
  readonly data: readonly ChartDataPoint[];
  readonly style?: ViewStyle;
}

export const GraphSection: React.FC<GraphSectionProps> = ({ title, data, style }) => {
  return (
    <View style={[styles.container, style]}>
      <ChartCard title={title} data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
