type SectionCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  borderColor: string;
  iconBg: string;
};

export default function SectionCard({
  title,
  description,
  icon,
  borderColor,
  iconBg,
}: SectionCardProps) {
  return (
    <div
      className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm"
      style={{
        borderLeft: `4px solid ${borderColor}`,
      }}
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{
          backgroundColor: iconBg,
        }}
      >
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-[#101828]">
          {title}
        </h3>

        <p className="text-sm text-[#667085]">
          {description}
        </p>
      </div>
    </div>
  );
}