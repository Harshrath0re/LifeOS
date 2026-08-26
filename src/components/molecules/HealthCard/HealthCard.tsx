import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Card } from '../../atoms/Card';
import { Text } from '../../atoms/Text';
import { Progress } from '../../atoms/Progress';
import { COLORS } from '../../../theme/colors';

export interface HealthCardProps {
  readonly title: string;
  readonly value: string;
  readonly progress: number;
  readonly style?: ViewStyle;
}

export const HealthCard: React.FC<HealthCardProps> = ({
  title,
  value,
  progress,
  style,
}) => {
  return (
    <Card style={[styles.card, style]}>
      <Text variant="caption" color={COLORS.textSecondary}>
        {title}
      </Text>
      <Text variant="h2">{value}</Text>
      <Progress progress={progress} color={COLORS.success} />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
});
