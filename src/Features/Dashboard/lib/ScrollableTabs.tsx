'use client';

interface TabItem {
  value: string;
  label: string;
}

interface Props {
  items: TabItem[];
  activeValue?: string;
  onChange: (value: string) => void;
}

export default function ScrollableTabs({
  items,
  activeValue,
  onChange,
}: Props) {
  return (
    <div
      className="
        w-full
        overflow-x-auto
        touch-pan-x
        select-none
        scrollbar-none
      "
    >
      <div
        className="
          flex
          w-max
          gap-2
          px-1
        "
      >
        {items.map((item) => (
          <button
            key={item.value}
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
