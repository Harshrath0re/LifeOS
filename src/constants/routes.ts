export enum AuthRoutes {
  SPLASH = 'Splash',
  CREATE_PASSWORD = 'CreatePassword',
  ENABLE_BIOMETRIC = 'EnableBiometric',
  UNLOCK = 'Unlock',
  LOGIN = 'Unlock',
  BIOMETRIC = 'EnableBiometric',
}

export enum MainTabRoutes {
  DASHBOARD = 'DashboardTab',
  HABITS = 'HabitsTab',
  TODOS = 'TodosTab',
  ANALYTICS = 'AnalyticsTab',
  SETTINGS = 'SettingsTab',
}

export enum DashboardRoutes {
  DASHBOARD_MAIN = 'DashboardMain',
}

export enum HabitRoutes {
  DAILY_TRACKER = 'DailyTracker',
  ADD_HABIT = 'AddHabit',
  EDIT_HABIT = 'EditHabit',
}

export enum TodoRoutes {
  TODAY = 'Today',
  UPCOMING = 'Upcoming',
  CALENDAR = 'Calendar',
  ADD_TODO = 'AddTodo',
}

export enum ExpenseRoutes {
  EXPENSE_HISTORY = 'ExpenseHistory',
  ADD_EXPENSE = 'AddExpense',
  CATEGORIES = 'Categories',
}

export enum AnalyticsRoutes {
  ANALYTICS_MAIN = 'AnalyticsMain',
  HABIT_ANALYTICS = 'HabitAnalytics',
  EXPENSE_ANALYTICS = 'ExpenseAnalytics',
  HEALTH_ANALYTICS = 'HealthAnalytics',
}

export enum SettingsRoutes {
  SETTINGS_MAIN = 'SettingsMain',
  SECURITY = 'Security',
  BACKUP = 'Backup',
  ABOUT = 'About',
}
