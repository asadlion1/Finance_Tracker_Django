import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Download, FileText } from 'lucide-react';
import { Select } from '../components/ui/Select';
export function Reports() {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate and export financial reports.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Select label="Report Type" options={[{
            value: 'monthly',
            label: 'Monthly Summary'
          }, {
            value: 'annual',
            label: 'Annual Overview'
          }, {
            value: 'tax',
            label: 'Tax Report'
          }]} />
            <Select label="Time Range" options={[{
            value: 'last-month',
            label: 'Last Month'
          }, {
            value: 'last-quarter',
            label: 'Last Quarter'
          }, {
            value: 'ytd',
            label: 'Year to Date'
          }]} />
            <Select label="Format" options={[{
            value: 'pdf',
            label: 'PDF Document'
          }, {
            value: 'csv',
            label: 'CSV Spreadsheet'
          }]} />
          </div>
          <div className="flex justify-end">
            <Button>
              <Download className="mr-2 h-4 w-4" /> Generate & Download
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <FileText className="h-12 w-12 mb-4 opacity-50" />
            <p>Report preview will appear here</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <FileText className="h-12 w-12 mb-4 opacity-50" />
            <p>Report details will appear here</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>;
}