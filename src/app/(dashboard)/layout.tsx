import AuthProvider from '@/Features/Dashboard/Guards/AuthInitializer';
import Navbar from '@/Shared/Components/Navbar/Navbar';
import SidebarSwitcher from '@/Shared/Components/Sidebar/SidebarSwitcher';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      <div className="h-16">
        <Navbar />
      </div>

      <div className="flex">
        <aside className="hidden lg:block shrink-0">
          <SidebarSwitcher />
        </aside>

        <main className="flex-1 p-4 pb-24 lg:p-6 lg:pb-6">
          <AuthProvider>{children}</AuthProvider>
        </main>
      </div>
    </div>
  );
}
