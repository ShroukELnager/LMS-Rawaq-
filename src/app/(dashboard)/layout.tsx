import AuthProvider from '@/Features/Dashboard/Guards/AuthInitializer';
import Navbar from '@/Shared/Components/Navbar/Navbar';
import SidebarSwitcher from '@/Shared/Components/Sidebar/SidebarSwitcher';
import AppProviders from '@/Shared/Components/AppProviders';
import { Suspense } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProviders>
    <div className="h-screen overflow-hidden bg-surface">
      {/* Navbar */}
      <header className="h-16 shrink-0">
        <Suspense fallback={<div className="h-full" />}>
          <Navbar />
        </Suspense>
      </header>

      {/* Content Area */}
      <div className="flex h-[calc(100vh-4rem)] min-h-0">
        {/* Desktop Sidebar */}
        <Suspense
          fallback={<aside className="hidden h-full w-72 shrink-0 lg:block" />}
        >
          <SidebarSwitcher />
        </Suspense>

        {/* Main Content */}
        <main
          className="
            min-w-0
            flex-1
            overflow-y-auto
            p-4
            pb-24
            lg:p-6
            lg:pb-6
          "
        >
          <Suspense fallback={null}>
            <AuthProvider>{children}</AuthProvider>
          </Suspense>
        </main>
      </div>
    </div>
    </AppProviders>
  );
}
