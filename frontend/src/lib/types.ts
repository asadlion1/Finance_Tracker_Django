export type TransactionType = 'income' | 'expense';
export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  account: string;
  status: 'completed' | 'pending';
}
export interface RecurringTransaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  account: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  nextDate: string;
  isActive: boolean;
}
export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  color: string;
}
export interface KPI {
  label: string;
  value: number;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
  period: string;
}
export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  color: string;
  icon?: string;
}
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}