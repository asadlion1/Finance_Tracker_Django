import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';
import { Edit } from 'lucide-react';
import { Budget } from '../../lib/types';
import { formatCurrency } from '../../lib/utils';
interface BudgetCardProps {
  budget: Budget;
}
export function BudgetCard({
  budget
}: BudgetCardProps) {
  const remaining = budget.limit - budget.spent;
  return <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{budget.category}</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Spent: {formatCurrency(budget.spent)}
            </span>
            <span className="font-medium">
              Limit: {formatCurrency(budget.limit)}
            </span>
          </div>
          <ProgressBar value={budget.spent} max={budget.limit} showLabel />
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {formatCurrency(remaining)}
            </span>{' '}
            remaining
          </div>
        </div>
      </CardContent>
    </Card>;
}