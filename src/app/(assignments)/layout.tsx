export default function AssignmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F7F9FC]">
      {children}
    </main>
  );
}