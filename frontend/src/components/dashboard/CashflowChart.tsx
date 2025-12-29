import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { ChartDataPoint } from '../../lib/types';
interface CashflowChartProps {
  data: ChartDataPoint[];
}
export function CashflowChart({
  data
}: CashflowChartProps) {
  return <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle>Cashflow Over Time</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={value => `$${value}`} />
              <Tooltip contentStyle={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
              borderRadius: 'var(--radius)'
            }} />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{
              r: 4
            }} />
              <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{
              r: 4
            }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>;
}