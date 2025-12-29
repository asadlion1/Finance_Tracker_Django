import React from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
export function ForecastCard() {
  return <Card className="col-span-4 lg:col-span-1 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Spending Forecast</CardTitle>
          <Badge variant="outline" className="bg-background/50">
            Beta
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Predicted next month
            </p>
            <p className="text-3xl font-bold text-primary">$2,450.00</p>
          </div>

          <div className="flex items-start gap-3 rounded-md bg-background/50 p-3 border border-primary/10">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Risk of overspending</p>
              <p className="text-xs text-muted-foreground">
                Based on your recurring bills, you might exceed your budget by
                15%.
              </p>
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground pt-2">
            AI-powered insights coming soon
          </p>
        </div>
      </CardContent>
    </Card>;
}