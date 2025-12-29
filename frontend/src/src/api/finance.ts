import { mockTransactions, mockBudgets, mockKPIs, cashflowData, spendingByCategoryData, monthlyBreakdownData, mockRecurringTransactions } from '../../lib/mockData';
import { Transaction, Budget, RecurringTransaction } from '../../lib/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const financeApi = {
  getDashboardSummary: async () => {
    await delay(800);
    return {
      kpis: mockKPIs,
      cashflow: cashflowData,
      spending: spendingByCategoryData,
      monthly: monthlyBreakdownData,
      recentTransactions: mockTransactions.slice(0, 5)
    };
  },
  listTransactions: async (filters?: any) => {
    await delay(600);
    // In a real app, apply filters here
    return mockTransactions;
  },
  createTransaction: async (payload: Omit<Transaction, 'id'>) => {
    await delay(1000);
    const newTransaction = {
      ...payload,
      id: Math.random().toString(36).substr(2, 9)
    };
    return newTransaction;
  },
  updateTransaction: async (id: string, payload: Partial<Transaction>) => {
    await delay(800);
    return {
      id,
      ...payload
    };
  },
  deleteTransaction: async (id: string) => {
    await delay(500);
    return true;
  },
  listBudgets: async () => {
    await delay(600);
    return mockBudgets;
  },
  createBudget: async (payload: Omit<Budget, 'id' | 'spent'>) => {
    await delay(800);
    return {
      ...payload,
      id: Math.random().toString(36).substr(2, 9),
      spent: 0
    };
  },
  listRecurringTransactions: async () => {
    await delay(600);
    return mockRecurringTransactions;
  },
  createRecurringTransaction: async (payload: Omit<RecurringTransaction, 'id'>) => {
    await delay(800);
    return {
      ...payload,
      id: Math.random().toString(36).substr(2, 9)
    };
  },
  updateRecurringTransaction: async (id: string, payload: Partial<RecurringTransaction>) => {
    await delay(800);
    return {
      id,
      ...payload
    };
  },
  deleteRecurringTransaction: async (id: string) => {
    await delay(500);
    return true;
  },
  toggleRecurringTransaction: async (id: string, isActive: boolean) => {
    await delay(500);
    return {
      id,
      isActive
    };
  }
};