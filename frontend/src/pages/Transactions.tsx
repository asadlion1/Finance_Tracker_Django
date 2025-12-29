import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TransactionFilters } from '../components/transactions/TransactionFilters';
import { RecentTransactionsTable } from '../components/dashboard/RecentTransactionsTable';
import { financeApi } from '../src/api/finance';
import { Transaction } from '../lib/types';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';
export function Transactions() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await financeApi.listTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Failed to fetch transactions', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            Manage and track your financial activity.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Transaction
        </Button>
      </div>

      <TransactionFilters />

      {loading ? <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div> : <RecentTransactionsTable transactions={transactions} />}
    </motion.div>;
}