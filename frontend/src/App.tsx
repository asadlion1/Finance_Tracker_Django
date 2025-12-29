import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Budgets } from './pages/Budgets';
import { Categories } from './pages/Categories';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
function App() {
  return <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AppLayout>
    </Router>;
}
export { App };