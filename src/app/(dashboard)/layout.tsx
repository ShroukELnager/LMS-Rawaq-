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
      {/* Navbar */}
      <header className="h-16 shrink-0">
        <Navbar />
      </header>

      {/* Content Area */}
      <div className="flex h-[calc(100vh-4rem)] min-h-0">
        {/* Desktop Sidebar */}
        <SidebarSwitcher />

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
          <AuthProvider>{children}</AuthProvider>
        </main>
      </div>
    </div>
  );
}
