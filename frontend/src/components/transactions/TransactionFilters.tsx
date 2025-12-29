import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Card, CardContent } from '../ui/Card';
export function TransactionFilters() {
  const [isOpen, setIsOpen] = useState(false);
  return <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by description..." className="pl-9" />
        </div>
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <div className="w-full sm:w-48">
          <Select options={[{
          value: 'newest',
          label: 'Newest First'
        }, {
          value: 'oldest',
          label: 'Oldest First'
        }, {
          value: 'highest',
          label: 'Highest Amount'
        }, {
          value: 'lowest',
          label: 'Lowest Amount'
        }]} />
        </div>
      </div>

      {isOpen && <Card>
          <CardContent className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Select label="Category" options={[{
          value: 'all',
          label: 'All Categories'
        }, {
          value: 'food',
          label: 'Food'
        }, {
          value: 'transport',
          label: 'Transport'
        }, {
          value: 'utilities',
          label: 'Utilities'
        }]} />
            <Select label="Type" options={[{
          value: 'all',
          label: 'All Types'
        }, {
          value: 'income',
          label: 'Income'
        }, {
          value: 'expense',
          label: 'Expense'
        }]} />
            <Select label="Account" options={[{
          value: 'all',
          label: 'All Accounts'
        }, {
          value: 'checking',
          label: 'Checking'
        }, {
          value: 'credit',
          label: 'Credit Card'
        }]} />
            <div className="flex items-end">
              <Button variant="ghost" className="text-destructive w-full" onClick={() => setIsOpen(false)}>
                <X className="mr-2 h-4 w-4" /> Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>}
    </div>;
}