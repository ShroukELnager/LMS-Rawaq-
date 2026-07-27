import { ChevronUp, Copy } from 'lucide-react';
import Trash from '@assets/icons/delete.svg';
type Props = {
  remove: () => void;
  duplicate?: () => void;
  setCollapsed: (value: boolean) => void;
  collapsed: boolean;
};

export default function QuestionFooter({
  remove,
  duplicate,
  setCollapsed,
  collapsed,
}: Props) {
  return (
    <div className="flex items-center justify-end bg-[#F0F3FF] pt-4">
      <div className="flex items-center gap-6 text-sm font-medium">
        <button
          type="button"
          onClick={duplicate}
          className="flex items-center gap-2 cursor-pointer text-slate-600 transition hover:text-teal-700"
        >
          <Copy size={18} />
          <span>Duplicate</span>
        </button>

        <button
          type="button"
          onClick={remove}
          className="flex items-center gap-2 cursor-pointer text-red-500 transition hover:text-red-600"
        >
          <Trash size={18} />
          <span>Delete</span>
        </button>

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="
    flex items-center gap-2
    text-slate-600
    transition-all duration-300 ease-in-out
    hover:text-teal-700
    hover:scale-[1.02]
  "
        >
          <span
            className="
      transition-all duration-300 ease-in-out
    "
          >
            {collapsed ? 'Expand' : 'Collapse'}
          </span>

          <ChevronUp
            size={18}
            className={`
      transition-all duration-300 ease-in-out
      ${collapsed ? 'rotate-180' : 'rotate-0'}
    `}
          />
        </button>
      </div>
    </div>
  );
}
