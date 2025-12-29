import React from 'react';
import { MoreHorizontal, Eye, Edit, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Transaction } from '../../lib/types';
import { formatDate, formatCurrency } from '../../lib/utils';
interface RecentTransactionsTableProps {
  transactions: Transaction[];
}
export function RecentTransactionsTable({
  transactions
}: RecentTransactionsTableProps) {
  return <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            You made {transactions.length} transactions this month.
          </CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Date</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Account</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 rounded-tr-lg text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => <tr key={transaction.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-4 py-3">{transaction.description}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className="font-normal">
                      {transaction.category}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {transaction.account}
                  </td>
                  <td className={`px-4 py-3 text-right font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>;
}