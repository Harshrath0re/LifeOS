import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Card } from '../../atoms/Card';
import { Text } from '../../atoms/Text';
import { ChartDataPoint } from '../../../types/analytics';
import { COLORS } from '../../../theme/colors';
import { rh, rw } from '../../../theme/responsive';

export interface ChartCardProps {
  readonly title: string;
  readonly data: readonly ChartDataPoint[];
  readonly style?: ViewStyle;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, data, style }) => {
  return (
    <Card style={[styles.card, style]}>
      <Text variant="h3" style={styles.title}>
        {title}
      </Text>
      <View style={styles.chartContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.barWrapper}>
            <View style={[styles.bar, { height: rh(item.value * 2 || 10) }]} />
            <Text variant="caption" color={COLORS.textSecondary}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: rh(6),
  },
  title: {
    marginBottom: rh(12),
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: rh(120),
  },
  barWrapper: {
    alignItems: 'center',
  },
  bar: {
    width: rw(16),
    backgroundColor: COLORS.primary,
    borderRadius: rw(4),
    marginBottom: rh(4),
  },
});
