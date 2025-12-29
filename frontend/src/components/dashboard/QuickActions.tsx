import React from 'react';
import { Plus, Download, Wallet, PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
export function QuickActions() {
  return <Card className="col-span-4 lg:col-span-1">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button className="w-full justify-start" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add Income
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <MinusIcon className="mr-2 h-4 w-4" /> Add Expense
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <PieChart className="mr-2 h-4 w-4" /> Create Budget
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </CardContent>
    </Card>;
}
function MinusIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
    </svg>;
}