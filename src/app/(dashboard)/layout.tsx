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
      <div className="h-16">
        <Navbar />
      </div>

      {/* Body */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar ثابت */}
        <aside className="hidden lg:block h-full shrink-0">
          <SidebarSwitcher />
        </aside>

        {/* Content فقط هو اللي يعمل scroll */}
        <main
          className="
            flex-1
            overflow-y-auto
            min-h-0
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
