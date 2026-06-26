import AuthProvider from '@/Features/Dashboard/Guards/AuthInitializer';
import Navbar from '@/Shared/Components/Navbar/Navbar';
import SidebarSwitcher from '@/Shared/Components/Sidebar/SidebarSwitcher';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-surface">
      <Navbar />

      <div className="flex flex-1 min-h-0">
        <SidebarSwitcher />

        <main className="flex-1 min-h-0 overflow-y-auto p-4 pb-24 lg:p-6 lg:pb-6">
          <AuthProvider>{children}</AuthProvider>
        </main>
      </div>
    </div>
  );
}
