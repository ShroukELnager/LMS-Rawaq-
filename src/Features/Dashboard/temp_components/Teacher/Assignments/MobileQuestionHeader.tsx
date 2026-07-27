import Menu from '@assets/icons/menu.svg';
import Trash from '@assets/icons/delete.svg';
import { Copy } from 'lucide-react';

type Props = {
  index: number;
  remove: () => void;
  duplicate?: () => void;
  attributes: any;
  listeners: any;
};

export default function MobileQuestionHeader({
  index,
  remove,
  duplicate,
  attributes,
  listeners,
}: Props) {
  return (
    <div className="flex items-center justify-between border-b border-[#E5EAF3] bg-[#F0F3FF] px-4 py-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <Menu
            size={14}
            className="text-slate-500 hover:text-slate-700 transition"
          />
        </button>

        <span className="text-xs font-semibold uppercase tracking-wide text-slate-700">
          Question {index + 1}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={duplicate}
          className="text-slate-500 transition hover:text-teal-700"
        >
          <Copy size={18} />
        </button>

        <button
          type="button"
          onClick={remove}
          className="text-red-500 transition hover:text-red-600"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
}
