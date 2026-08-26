import { create } from 'zustand';
import { Expense, ExpenseCategory } from '../types/expense';

export interface ExpenseState {
  readonly expenses: readonly Expense[];
  readonly categories: readonly ExpenseCategory[];
  readonly selectedCategory: string | null;
  readonly isLoading: boolean;
  setExpenses: (expenses: readonly Expense[]) => void;
  setCategories: (categories: readonly ExpenseCategory[]) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

const initialState = {
  expenses: [],
  categories: [],
  selectedCategory: null,
  isLoading: false,
};

export const useExpenseStore = create<ExpenseState>((set) => ({
  ...initialState,
  setExpenses: (expenses) => set({ expenses }),
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set(initialState),
}));
