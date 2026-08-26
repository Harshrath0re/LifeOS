import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Card } from '../../atoms/Card';
import { Text } from '../../atoms/Text';
import { Checkbox } from '../../atoms/Checkbox';
import { COLORS } from '../../../theme/colors';
import { rh } from '../../../theme/responsive';

export interface HabitCardProps {
  readonly title: string;
  readonly isCompleted: boolean;
  readonly streak?: number;
  readonly onToggle?: (completed: boolean) => void;
  readonly style?: ViewStyle;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  title,
  isCompleted,
  streak,
  onToggle,
  style,
}) => {
  return (
    <Card style={[styles.card, style]}>
      <View style={styles.row}>
        <Checkbox checked={isCompleted} onChange={onToggle} label={title} />
        {streak !== undefined ? (
          <Text variant="caption" color={COLORS.warning}>
            🔥 {streak}
          </Text>
        ) : null}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: rh(4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
