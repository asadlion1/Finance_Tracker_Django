import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CreditCard, PieChart, Tags, FileText, Settings, X, Wallet } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
const navItems = [{
  icon: LayoutDashboard,
  label: 'Dashboard',
  href: '/'
}, {
  icon: CreditCard,
  label: 'Transactions',
  href: '/transactions'
}, {
  icon: PieChart,
  label: 'Budgets',
  href: '/budgets'
}, {
  icon: Tags,
  label: 'Categories',
  href: '/categories'
}, {
  icon: FileText,
  label: 'Reports',
  href: '/reports'
}, {
  icon: Settings,
  label: 'Settings',
  href: '/settings'
}];
export function Sidebar({
  isOpen,
  onClose
}: SidebarProps) {
  return <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden" onClick={onClose} />}

      {/* Sidebar Container */}
      <aside className={cn('fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-card transition-transform duration-200 ease-in-out md:static md:translate-x-0', isOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className="flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <Wallet className="h-6 w-6" />
            <span>FinanceFlow</span>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map(item => <NavLink key={item.href} to={item.href} onClick={() => window.innerWidth < 768 && onClose()} className={({
          isActive
        }) => cn('flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors', isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground')}>
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>)}
        </nav>

        <div className="border-t p-4">
          <div className="rounded-lg bg-accent/50 p-4">
            <h4 className="mb-1 text-sm font-semibold">Pro Plan</h4>
            <p className="mb-3 text-xs text-muted-foreground">
              Get advanced insights and export features.
            </p>
            <Button size="sm" className="w-full">
              Upgrade
            </Button>
          </div>
        </div>
      </aside>
    </>;
}