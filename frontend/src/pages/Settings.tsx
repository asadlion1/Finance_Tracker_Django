import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Switch } from '../components/ui/Switch';
import { User, Bell, Shield, Database } from 'lucide-react';
export function Settings() {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Profile Information</CardTitle>
            </div>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue="john@example.com" type="email" />
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Budget Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when you exceed 80% of budget.
                </p>
              </div>
              <Switch checked={true} onCheckedChange={() => {}} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Report</p>
                <p className="text-sm text-muted-foreground">
                  Receive a weekly summary via email.
                </p>
              </div>
              <Switch checked={false} onCheckedChange={() => {}} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <CardTitle>Data & API</CardTitle>
            </div>
            <CardDescription>Manage your data connections.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <p className="text-sm font-mono">
                API Endpoint: https://api.financeflow.com/v1
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline">Generate API Key</Button>
              <Button variant="outline">Export All Data</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>;
}