import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { ChartDataPoint } from '../../lib/types';
interface SpendingChartProps {
  data: ChartDataPoint[];
}
export function SpendingChart({
  data
}: SpendingChartProps) {
  return <Card className="col-span-4 lg:col-span-1">
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value}`} contentStyle={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
              borderRadius: 'var(--radius)'
            }} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>;
}