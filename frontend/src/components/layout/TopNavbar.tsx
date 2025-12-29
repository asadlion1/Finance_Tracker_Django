import React, { useEffect, useState } from 'react';
import { Search, Bell, User, Menu, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Switch } from '../ui/Switch';
interface TopNavbarProps {
  onMenuClick: () => void;
}
export function TopNavbar({
  onMenuClick
}: TopNavbarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  return <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Button variant="ghost" size="icon" className="mr-4 md:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex flex-1 items-center gap-4">
        <div className="hidden w-full max-w-sm md:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search transactions..." className="pl-9" />
          </div>
        </div>

        <div className="hidden md:block w-40">
          <Select options={[{
          value: 'this-month',
          label: 'This Month'
        }, {
          value: 'last-30',
          label: 'Last 30 Days'
        }, {
          value: 'custom',
          label: 'Custom Range'
        }]} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4 text-muted-foreground" />
          <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
          <Moon className="h-4 w-4 text-muted-foreground" />
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        <div className="h-8 w-8 overflow-hidden rounded-full bg-accent">
          <Button variant="ghost" size="icon" className="h-full w-full rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>;
}