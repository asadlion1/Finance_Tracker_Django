import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Switch } from '../ui/Switch';
import { Calendar, Plus, Edit, Trash2, RefreshCw } from 'lucide-react';
import { RecurringTransaction } from '../../lib/types';
import { formatCurrency, formatDate } from '../../lib/utils';
interface RecurringTransactionsCardProps {
  transactions: RecurringTransaction[];
}
const frequencyLabels = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly'
};
const frequencyColors = {
  daily: 'bg-blue-500',
  weekly: 'bg-purple-500',
  monthly: 'bg-green-500',
  yearly: 'bg-orange-500'
};
export function RecurringTransactionsCard({
  transactions
}: RecurringTransactionsCardProps) {
  const [localTransactions, setLocalTransactions] = useState(transactions);
  const handleToggle = (id: string) => {
    setLocalTransactions(prev => prev.map(t => t.id === id ? {
      ...t,
      isActive: !t.isActive
    } : t));
  };
  const activeCount = localTransactions.filter(t => t.isActive).length;
  const totalMonthly = localTransactions.filter(t => t.isActive && t.frequency === 'monthly').reduce((sum, t) => sum + (t.type === 'expense' ? t.amount : 0), 0);
  return <Card className="col-span-4 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary" />
            Recurring Transactions
          </CardTitle>
          <CardDescription className="mt-1">
            {activeCount} active • ${totalMonthly.toFixed(0)}/mo in expenses
          </CardDescription>
        </div>
        <Button size="sm" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {localTransactions.slice(0, 5).map((transaction, index) => <motion.div key={transaction.id} initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: index * 0.05
        }} className="flex items-center justify-between rounded-lg border bg-card p-3 transition-colors hover:bg-accent/50">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`h-2 w-2 rounded-full ${frequencyColors[transaction.frequency]} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium truncate">
                      {transaction.description}
                    </p>
                    <Badge variant="outline" className="text-xs flex-shrink-0">
                      {frequencyLabels[transaction.frequency]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Next: {formatDate(transaction.nextDate)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <p className={`text-sm font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-foreground'}`}>
                  {transaction.type === 'income' ? '+' : ''}
                  {formatCurrency(transaction.amount)}
                </p>
                <Switch checked={transaction.isActive} onCheckedChange={() => handleToggle(transaction.id)} />
              </div>
            </motion.div>)}
        </div>

        {localTransactions.length > 5 && <Button variant="ghost" className="w-full mt-4" size="sm">
            View All {localTransactions.length} Recurring Transactions
          </Button>}

        {localTransactions.length === 0 && <div className="flex flex-col items-center justify-center py-8 text-center">
            <RefreshCw className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground mb-1">
              No recurring transactions yet
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Set up automatic tracking for subscriptions and bills
            </p>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add Recurring Transaction
            </Button>
          </div>}
      </CardContent>
    </Card>;
}