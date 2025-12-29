import React from 'react';
import { cn } from '../../lib/utils';
interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showLabel?: boolean;
}
export function ProgressBar({
  value,
  max,
  className,
  showLabel = false
}: ProgressBarProps) {
  const percentage = Math.min(Math.max(value / max * 100, 0), 100);
  let colorClass = 'bg-primary';
  if (percentage > 90) colorClass = 'bg-destructive';else if (percentage > 75) colorClass = 'bg-yellow-500';else colorClass = 'bg-green-500';
  return <div className={cn('w-full', className)}>
      {showLabel && <div className="flex justify-between text-xs mb-1">
          <span>{percentage.toFixed(0)}%</span>
          <span className="text-muted-foreground">
            {value} / {max}
          </span>
        </div>}
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div className={cn('h-full transition-all duration-500 ease-in-out', colorClass)} style={{
        width: `${percentage}%`
      }} />
      </div>
    </div>;
}