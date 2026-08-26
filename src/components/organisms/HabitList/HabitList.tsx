import React from 'react';
import { FlatList, StyleSheet, ViewStyle } from 'react-native';
import { Habit } from '../../../types/habit';
import { HabitCard } from '../../molecules/HabitCard';
import { EmptyState } from '../../molecules/EmptyState';
import { rh } from '../../../theme/responsive';

export interface HabitListProps {
  readonly habits: readonly Habit[];
  readonly onToggleHabit?: (id: string, completed: boolean) => void;
  readonly style?: ViewStyle;
}

export const HabitList: React.FC<HabitListProps> = ({
  habits,
  onToggleHabit,
  style,
}) => {
  if (habits.length === 0) {
    return <EmptyState title="No habits added" description="Start tracking a new habit daily." />;
  }

  return (
    <FlatList
      data={habits as Habit[]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <HabitCard
          title={item.title}
          isCompleted={false}
          onToggle={(val) => onToggleHabit?.(item.id, val)}
        />
      )}
      contentContainerStyle={[styles.container, style]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: rh(8),
  },
});
