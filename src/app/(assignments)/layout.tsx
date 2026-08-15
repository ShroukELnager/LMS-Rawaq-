import Navbar from "@/Shared/Components/Navbar/Navbar";
import AppProviders from '@/Shared/Components/AppProviders';

export default function AssignmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProviders>
    <main className="min-h-screen bg-[#F7F9FC]">
        <div className="h-16">
              <Navbar />
            </div>
      {children}
    </main>
    </AppProviders>
  );
}
