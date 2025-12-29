import React, { useEffect, useState, Children } from 'react';
import { motion } from 'framer-motion';
import { KPICard } from '../components/dashboard/KPICard';
import { CashflowChart } from '../components/dashboard/CashflowChart';
import { SpendingChart } from '../components/dashboard/SpendingChart';
import { RecentTransactionsTable } from '../components/dashboard/RecentTransactionsTable';
import { QuickActions } from '../components/dashboard/QuickActions';
import { ForecastCard } from '../components/dashboard/ForecastCard';
import { RecurringTransactionsCard } from '../components/dashboard/RecurringTransactionsCard';
import { financeApi } from '../src/api/finance';
import { KPI, ChartDataPoint, Transaction, RecurringTransaction } from '../lib/types';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';
export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [cashflow, setCashflow] = useState<ChartDataPoint[]>([]);
  const [spending, setSpending] = useState<ChartDataPoint[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [recurringTransactions, setRecurringTransactions] = useState<RecurringTransaction[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardData, recurringData] = await Promise.all([financeApi.getDashboardSummary(), financeApi.listRecurringTransactions()]);
        setKpis(dashboardData.kpis);
        setCashflow(dashboardData.cashflow);
        setSpending(dashboardData.spending);
        setTransactions(dashboardData.recentTransactions);
        setRecurringTransactions(recurringData);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>;
  }
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const item = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0
    }
  };
  return <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your financial health.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Transaction
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => <motion.div key={index} variants={item}>
            <KPICard kpi={kpi} />
          </motion.div>)}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <CashflowChart data={cashflow} />
        <SpendingChart data={spending} />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="col-span-4 lg:col-span-2">
          <RecentTransactionsTable transactions={transactions} />
        </div>
        <RecurringTransactionsCard transactions={recurringTransactions} />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="col-span-4 lg:col-span-3">
          <QuickActions />
        </div>
        <ForecastCard />
      </div>
    </motion.div>;
}