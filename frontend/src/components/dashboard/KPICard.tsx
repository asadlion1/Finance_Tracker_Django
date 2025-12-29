import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';
import { KPI } from '../../lib/types';
interface KPICardProps {
  kpi: KPI;
}
export function KPICard({
  kpi
}: KPICardProps) {
  const {
    label,
    value,
    change,
    trend,
    period
  } = kpi;
  const trendColor = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500'
  }[trend];
  const TrendIcon = {
    up: ArrowUpRight,
    down: ArrowDownRight,
    neutral: Minus
  }[trend];
  return <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <div className={cn('flex items-center text-sm font-medium', trendColor)}>
            <TrendIcon className="mr-1 h-4 w-4" />
            {Math.abs(change)}%
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <h2 className="text-3xl font-bold">{formatCurrency(value)}</h2>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{period}</p>
      </CardContent>
    </Card>;
}