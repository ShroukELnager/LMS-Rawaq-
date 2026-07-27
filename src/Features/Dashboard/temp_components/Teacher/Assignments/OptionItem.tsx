import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X, Trash2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import Menu from '@assets/icons/menu.svg';

type Props = {
  questionIndex: number;
  optionIndex: number;
  id: string;
  type: 'radio' | 'checkbox';
  remove: (index: number) => void;
};

export default function OptionItem({
  questionIndex,
  optionIndex,
  id,
  type,
  remove,
}: Props) {
  const { register } = useFormContext();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="flex items-center gap-3"
    >
      <input
        type={type}
        {...register(
          `p_questions.${questionIndex}.options.${optionIndex}.is_correct`
        )}
        className="h-5 w-5 shrink-0 cursor-pointer accent-teal-700"
      />

      <div className="relative flex-1">
        <input
          {...register(
            `p_questions.${questionIndex}.options.${optionIndex}.text`,
            {
              required: 'Option is required',
            }
          )}
          placeholder={`Option ${optionIndex + 1}`}
          className="
    w-full
    rounded-lg
    border
    border-[#D9E2F2]
    bg-[#EEF4FF]
    px-4
    py-3
    pr-10
    text-sm
  "
        />

        {/* Mobile Remove */}
        <button
          type="button"
          onClick={() => remove(optionIndex)}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-slate-400
            transition
            hover:text-red-500
            md:hidden
          "
        >
          <X size={18} />
        </button>
      </div>

      {/* Desktop Delete */}
      <button
        type="button"
        onClick={() => remove(optionIndex)}
        className="hidden cursor-pointer text-red-500 transition hover:text-red-600 md:block"
      >
        <Trash2 size={16} />
      </button>

      {/* Desktop Drag */}
      <button
        type="button"
        className="hidden cursor-grab active:cursor-grabbing md:block"
        {...attributes}
        {...listeners}
      >
        <Menu
          size={12}
          className="text-slate-400 transition hover:text-slate-600"
        />
      </button>
    </div>
  );
}