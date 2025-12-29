import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BudgetCard } from '../components/budgets/BudgetCard';
import { financeApi } from '../src/api/finance';
import { Budget } from '../lib/types';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { formatCurrency } from '../lib/utils';
import { ProgressBar } from '../components/ui/ProgressBar';
export function Budgets() {
  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const data = await financeApi.listBudgets();
        setBudgets(data);
      } catch (error) {
        console.error('Failed to fetch budgets', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBudgets();
  }, []);
  const totalBudget = budgets.reduce((acc, b) => acc + b.limit, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
          <p className="text-muted-foreground">
            Plan your spending and track progress.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Budget
        </Button>
      </div>

      {/* Summary Card */}
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-lg opacity-90">
            Total Monthly Budget
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm opacity-80">Total Budgeted</p>
              <p className="text-3xl font-bold">
                {formatCurrency(totalBudget)}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-80">Total Spent</p>
              <p className="text-3xl font-bold">{formatCurrency(totalSpent)}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">Remaining</p>
              <p className="text-3xl font-bold">
                {formatCurrency(totalBudget - totalSpent)}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2 opacity-90">
              <span>Overall Progress</span>
              <span>{Math.round(totalSpent / totalBudget * 100)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-primary-foreground/20">
              <div className="h-full bg-white transition-all duration-500 ease-in-out" style={{
              width: `${Math.min(totalSpent / totalBudget * 100, 100)}%`
            }} />
            </div>
          </div>
        </CardContent>
      </Card>

      {loading ? <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div> : <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {budgets.map(budget => <BudgetCard key={budget.id} budget={budget} />)}
        </div>}
    </motion.div>;
}