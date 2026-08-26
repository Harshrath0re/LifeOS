import React from 'react';
import { FlatList, StyleSheet, ViewStyle } from 'react-native';
import { Expense } from '../../../types/expense';
import { ExpenseCard } from '../../molecules/ExpenseCard';
import { EmptyState } from '../../molecules/EmptyState';
import { rh } from '../../../theme/responsive';

export interface ExpenseListProps {
  readonly expenses: readonly Expense[];
  readonly style?: ViewStyle;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, style }) => {
  if (expenses.length === 0) {
    return <EmptyState title="No expenses recorded" description="Add your first expense to track spending." />;
  }

  return (
    <FlatList
      data={expenses as Expense[]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ExpenseCard
          title={item.category}
          amount={item.amount}
          category={item.category}
          date={item.date}
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
