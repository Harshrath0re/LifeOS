import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Card } from '../../atoms/Card';
import { Text } from '../../atoms/Text';
import { COLORS } from '../../../theme/colors';
import { formatCurrency } from '../../../utils/format';
import { rh } from '../../../theme/responsive';

export interface ExpenseCardProps {
  readonly title: string;
  readonly amount: number;
  readonly category: string;
  readonly date: string;
  readonly style?: ViewStyle;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  title,
  amount,
  category,
  date,
  style,
}) => {
  return (
    <Card style={[styles.card, style]}>
      <View style={styles.headerRow}>
        <Text variant="bodyLarge">{title}</Text>
        <Text variant="bodyLarge" color={COLORS.error}>
          -{formatCurrency(amount)}
        </Text>
      </View>
      <View style={styles.footerRow}>
        <Text variant="caption" color={COLORS.textSecondary}>
          {category}
        </Text>
        <Text variant="caption" color={COLORS.textSecondary}>
          {date}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: rh(4),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rh(4),
  },
});
