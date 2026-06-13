import AuthProvider from "@/Features/Dashboard/Guards/AuthInitializer";
import Navbar from "@/Shared/Components/Navbar/Navbar";
import SidebarSwitcher from "@/Shared/Components/Sidebar/SidebarSwitcher";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex h-screen flex-col overflow-hidden bg-surface">
        <Navbar />

        <div className="flex min-h-0 flex-1">
          <SidebarSwitcher />

          <main className="min-h-0 flex-1 overflow-y-auto p-4 pb-24 lg:p-6 lg:pb-6">
            <AuthProvider >
            {children}
             </AuthProvider >

          </main>
        </div>
      </div>
  )
}