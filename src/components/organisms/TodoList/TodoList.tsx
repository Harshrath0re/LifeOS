import React from 'react';
import { FlatList, StyleSheet, ViewStyle } from 'react-native';
import { Todo } from '../../../types/todo';
import { TodoCard } from '../../molecules/TodoCard';
import { EmptyState } from '../../molecules/EmptyState';
import { rh } from '../../../theme/responsive';

export interface TodoListProps {
  readonly todos: readonly Todo[];
  readonly onToggleTodo?: (id: string, completed: boolean) => void;
  readonly style?: ViewStyle;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleTodo,
  style,
}) => {
  if (todos.length === 0) {
    return <EmptyState title="No todos" description="Create your first task to get started." />;
  }

  return (
    <FlatList
      data={todos as Todo[]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TodoCard
          title={item.title}
          isCompleted={item.isCompleted}
          priority={item.priority}
          dueDate={item.dueDate}
          onToggle={(val) => onToggleTodo?.(item.id, val)}
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
