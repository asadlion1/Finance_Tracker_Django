import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: {
    value: string;
    label: string;
  }[];
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  className,
  label,
  error,
  options,
  ...props
}, ref) => {
  return <div className="w-full">
        {label && <label className="mb-2 block text-sm font-medium text-foreground">
            {label}
          </label>}
        <div className="relative">
          <select className={cn('flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', error && 'border-destructive', className)} ref={ref} {...props}>
            {options.map(option => <option key={option.value} value={option.value}>
                {option.label}
              </option>)}
          </select>
          <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
        </div>
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>;
});
Select.displayName = 'Select';