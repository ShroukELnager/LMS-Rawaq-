import Navbar from "@/Shared/Components/Navbar/Navbar";

export default function AssignmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F7F9FC]">
        <div className="h-16">
              <Navbar />
            </div>
      {children}
    </main>
  );
}