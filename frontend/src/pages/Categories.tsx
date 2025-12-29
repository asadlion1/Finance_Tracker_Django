import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Plus, ShoppingBag, Coffee, Zap, Car, Home } from 'lucide-react';
const categories = [{
  id: 1,
  name: 'Food & Dining',
  icon: Coffee,
  count: 24,
  spent: 450
}, {
  id: 2,
  name: 'Shopping',
  icon: ShoppingBag,
  count: 12,
  spent: 890
}, {
  id: 3,
  name: 'Utilities',
  icon: Zap,
  count: 5,
  spent: 180
}, {
  id: 4,
  name: 'Transport',
  icon: Car,
  count: 18,
  spent: 280
}, {
  id: 5,
  name: 'Housing',
  icon: Home,
  count: 1,
  spent: 1200
}];
export function Categories() {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Organize your transactions.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map(cat => <Card key={cat.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <cat.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {cat.count} transactions
                </p>
              </div>
            </CardContent>
          </Card>)}
      </div>
    </motion.div>;
}