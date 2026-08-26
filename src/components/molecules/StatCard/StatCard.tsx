import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Card } from '../../atoms/Card';
import { Text } from '../../atoms/Text';
import { COLORS } from '../../../theme/colors';
import { rh } from '../../../theme/responsive';

export interface StatCardProps {
  readonly title: string;
  readonly value: string | number;
  readonly subtitle?: string;
  readonly style?: ViewStyle;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  style,
}) => {
  return (
    <Card style={[styles.card, style]}>
      <Text variant="caption" color={COLORS.textSecondary}>
        {title}
      </Text>
      <Text variant="h1" style={styles.value}>
        {value}
      </Text>
      {subtitle ? (
        <Text variant="caption" color={COLORS.secondary}>
          {subtitle}
        </Text>
      ) : null}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  value: {
    marginVertical: rh(4),
  },
});
