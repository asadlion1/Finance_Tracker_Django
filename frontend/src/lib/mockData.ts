import { Transaction, Budget, KPI, Category, ChartDataPoint, RecurringTransaction } from './types';
export const mockTransactions: Transaction[] = [{
  id: '1',
  date: '2023-10-25',
  description: 'Grocery Store',
  amount: 124.5,
  type: 'expense',
  category: 'Food',
  account: 'Chase Sapphire',
  status: 'completed'
}, {
  id: '2',
  date: '2023-10-24',
  description: 'Uber Ride',
  amount: 24.0,
  type: 'expense',
  category: 'Transport',
  account: 'Chase Sapphire',
  status: 'completed'
}, {
  id: '3',
  date: '2023-10-23',
  description: 'Freelance Payment',
  amount: 1500.0,
  type: 'income',
  category: 'Income',
  account: 'Checking',
  status: 'completed'
}, {
  id: '4',
  date: '2023-10-22',
  description: 'Netflix Subscription',
  amount: 15.99,
  type: 'expense',
  category: 'Entertainment',
  account: 'Chase Sapphire',
  status: 'completed'
}, {
  id: '5',
  date: '2023-10-21',
  description: 'Electric Bill',
  amount: 85.2,
  type: 'expense',
  category: 'Utilities',
  account: 'Checking',
  status: 'completed'
}, {
  id: '6',
  date: '2023-10-20',
  description: 'Coffee Shop',
  amount: 5.4,
  type: 'expense',
  category: 'Food',
  account: 'Cash',
  status: 'completed'
}, {
  id: '7',
  date: '2023-10-19',
  description: 'Salary Deposit',
  amount: 4200.0,
  type: 'income',
  category: 'Income',
  account: 'Checking',
  status: 'completed'
}, {
  id: '8',
  date: '2023-10-18',
  description: 'Gym Membership',
  amount: 45.0,
  type: 'expense',
  category: 'Health',
  account: 'Chase Sapphire',
  status: 'completed'
}];
export const mockRecurringTransactions: RecurringTransaction[] = [{
  id: 'r1',
  description: 'Netflix Subscription',
  amount: 15.99,
  type: 'expense',
  category: 'Entertainment',
  account: 'Chase Sapphire',
  frequency: 'monthly',
  nextDate: '2023-11-01',
  isActive: true
}, {
  id: 'r2',
  description: 'Spotify Premium',
  amount: 9.99,
  type: 'expense',
  category: 'Entertainment',
  account: 'Chase Sapphire',
  frequency: 'monthly',
  nextDate: '2023-11-05',
  isActive: true
}, {
  id: 'r3',
  description: 'Rent Payment',
  amount: 1200.0,
  type: 'expense',
  category: 'Housing',
  account: 'Checking',
  frequency: 'monthly',
  nextDate: '2023-11-01',
  isActive: true
}, {
  id: 'r4',
  description: 'Gym Membership',
  amount: 45.0,
  type: 'expense',
  category: 'Health',
  account: 'Chase Sapphire',
  frequency: 'monthly',
  nextDate: '2023-11-15',
  isActive: true
}, {
  id: 'r5',
  description: 'Salary Deposit',
  amount: 4200.0,
  type: 'income',
  category: 'Income',
  account: 'Checking',
  frequency: 'monthly',
  nextDate: '2023-11-01',
  isActive: true
}, {
  id: 'r6',
  description: 'Electric Bill',
  amount: 85.0,
  type: 'expense',
  category: 'Utilities',
  account: 'Checking',
  frequency: 'monthly',
  nextDate: '2023-11-10',
  isActive: true
}, {
  id: 'r7',
  description: 'Internet Service',
  amount: 60.0,
  type: 'expense',
  category: 'Utilities',
  account: 'Checking',
  frequency: 'monthly',
  nextDate: '2023-11-08',
  isActive: true
}];
export const mockBudgets: Budget[] = [{
  id: '1',
  category: 'Food',
  limit: 600,
  spent: 450,
  color: '#3b82f6'
}, {
  id: '2',
  category: 'Transport',
  limit: 300,
  spent: 280,
  color: '#f59e0b'
}, {
  id: '3',
  category: 'Entertainment',
  limit: 200,
  spent: 120,
  color: '#8b5cf6'
}, {
  id: '4',
  category: 'Utilities',
  limit: 300,
  spent: 180,
  color: '#10b981'
}];
export const mockKPIs: KPI[] = [{
  label: 'Total Income',
  value: 5700.0,
  change: 12.5,
  trend: 'up',
  period: 'vs last month'
}, {
  label: 'Total Expenses',
  value: 2345.5,
  change: -2.4,
  trend: 'down',
  period: 'vs last month'
}, {
  label: 'Net Savings',
  value: 3354.5,
  change: 8.2,
  trend: 'up',
  period: 'vs last month'
}, {
  label: 'Budget Remaining',
  value: 850.0,
  change: 0,
  trend: 'neutral',
  period: 'on track'
}];
export const cashflowData: ChartDataPoint[] = [{
  name: 'Jan',
  income: 4000,
  expense: 2400
}, {
  name: 'Feb',
  income: 3000,
  expense: 1398
}, {
  name: 'Mar',
  income: 2000,
  expense: 9800
}, {
  name: 'Apr',
  income: 2780,
  expense: 3908
}, {
  name: 'May',
  income: 1890,
  expense: 4800
}, {
  name: 'Jun',
  income: 2390,
  expense: 3800
}, {
  name: 'Jul',
  income: 3490,
  expense: 4300
}];
export const spendingByCategoryData: ChartDataPoint[] = [{
  name: 'Food',
  value: 400,
  color: '#3b82f6'
}, {
  name: 'Transport',
  value: 300,
  color: '#f59e0b'
}, {
  name: 'Entertainment',
  value: 300,
  color: '#8b5cf6'
}, {
  name: 'Utilities',
  value: 200,
  color: '#10b981'
}];
export const monthlyBreakdownData: ChartDataPoint[] = [{
  name: 'Week 1',
  income: 1200,
  expense: 800
}, {
  name: 'Week 2',
  income: 900,
  expense: 1100
}, {
  name: 'Week 3',
  income: 1600,
  expense: 600
}, {
  name: 'Week 4',
  income: 2000,
  expense: 900
}];