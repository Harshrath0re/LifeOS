import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Card } from '../../atoms/Card';
import { Text } from '../../atoms/Text';
import { Checkbox } from '../../atoms/Checkbox';
import { Badge } from '../../atoms/Badge';
import { TodoPriority } from '../../../types/todo';
import { rh } from '../../../theme/responsive';

export interface TodoCardProps {
  readonly title: string;
  readonly isCompleted: boolean;
  readonly priority?: TodoPriority;
  readonly dueDate?: string;
  readonly onToggle?: (completed: boolean) => void;
  readonly style?: ViewStyle;
}

export const TodoCard: React.FC<TodoCardProps> = ({
  title,
  isCompleted,
  priority = TodoPriority.MEDIUM,
  dueDate,
  onToggle,
  style,
}) => {
  const getBadgeVariant = () => {
    switch (priority) {
      case TodoPriority.URGENT:
      case TodoPriority.HIGH:
        return 'error';
      case TodoPriority.LOW:
        return 'secondary';
      case TodoPriority.MEDIUM:
      default:
        return 'warning';
    }
  };

  return (
    <Card style={[styles.card, style]}>
      <View style={styles.row}>
        <Checkbox checked={isCompleted} onChange={onToggle} label={title} />
        <Badge label={priority} variant={getBadgeVariant()} />
      </View>
      {dueDate ? (
        <Text variant="caption" style={styles.dueDate}>
          Due: {dueDate}
        </Text>
      ) : null}
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
  dueDate: {
    marginTop: rh(4),
  },
});
