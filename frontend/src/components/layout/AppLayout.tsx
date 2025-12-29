import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
interface AppLayoutProps {
  children: React.ReactNode;
}
export function AppLayout({
  children
}: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-8">{children}</div>
        </main>
      </div>
    </div>;
}