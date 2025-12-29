import React from 'react';
import { cn } from '../../lib/utils';
interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}
export function Switch({
  checked,
  onCheckedChange,
  className,
  ...props
}: SwitchProps) {
  return <label className={cn('relative inline-flex cursor-pointer items-center', className)}>
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={e => onCheckedChange(e.target.checked)} {...props} />
      <div className="peer h-6 w-11 rounded-full bg-input after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2"></div>
    </label>;
}