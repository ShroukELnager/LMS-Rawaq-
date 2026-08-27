'use client';

interface TabItem {
  value: string | null;
  label: string;
}

interface Props {
  items: TabItem[];
  activeValue?: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
}

export default function ScrollableTabs({
  items,
  activeValue,
  onChange,
  disabled = false,
}: Props) {
  return (
    <div className="w-full overflow-x-auto scrollbar-none">
      <div className="flex w-max gap-2 px-1">
        {items.map((item, index) => (
          <button
            key={`${item.value ?? 'all'}-${index}`}
            type="button"
            disabled={disabled}
            onClick={() => onChange(item.value)}
            className={`
              shrink-0
              whitespace-nowrap
              rounded-lg
              px-4
              py-2
              text-sm
              font-medium
              transition
              disabled:cursor-not-allowed
              disabled:opacity-60
              ${
                activeValue === item.value
                  ? 'bg-primary text-white'
                  : 'bg-[#E6E3D0] text-[#666556]'
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
