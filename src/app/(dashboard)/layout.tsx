import AuthProvider from '@/Features/Dashboard/Guards/AuthInitializer';
import Navbar from '@/Shared/Components/Navbar/Navbar';
import SidebarSwitcher from '@/Shared/Components/Sidebar/SidebarSwitcher';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-surface">
      <header className="h-16">
        <Navbar />
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        <SidebarSwitcher />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <AuthProvider>{children}</AuthProvider>
        </main>
      </div>
    </div>
  );
}