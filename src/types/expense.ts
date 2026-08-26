export interface Expense {
  readonly id: string;
  readonly amount: number;
  readonly category: string;
  readonly note?: string;
  readonly date: string;
  readonly paymentMethod?: string;
  readonly createdAt: string;
}

export interface ExpenseCategory {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  readonly color: string;
}
