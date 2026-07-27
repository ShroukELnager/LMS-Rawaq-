export function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-lg bg-slate-100 py-3 text-center">
      <p className="text-lg font-bold text-teal-800">{value}</p>
      <p className="text-xs uppercase text-gray-500">{label}</p>
    </div>
  );
}