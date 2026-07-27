import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: ReactNode;
}

export default function StatCard({ icon, title, value }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-[#F5F8FC] p-5">
      <div className="rounded-lg bg-[#DDEFF3] p-3 text-[#006D77]">{icon}</div>

      <div>
        <p className="text-xs font-semibold uppercase text-gray-500">{title}</p>

        <p className="text-xl font-bold text-[#045D6C]">{value}</p>
      </div>
    </div>
  );
}
