import { create } from 'zustand';
import { Todo } from '../types/todo';

export interface TodoState {
  readonly todos: readonly Todo[];
  readonly selectedCategory: string | null;
  readonly isLoading: boolean;
  setTodos: (todos: readonly Todo[]) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

const initialState = {
  todos: [],
  selectedCategory: null,
  isLoading: false,
};

export const useTodoStore = create<TodoState>((set) => ({
  ...initialState,
  setTodos: (todos) => set({ todos }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set(initialState),
}));
