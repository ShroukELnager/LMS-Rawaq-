import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2 } from 'lucide-react';
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
          `p_questions.${questionIndex}.options.${optionIndex}.is_correct`,
        )}
        className="h-5 w-5 cursor-pointer accent-teal-700"
      />

      <input
        {...register(
          `p_questions.${questionIndex}.options.${optionIndex}.text`,
          {
            required: 'Option is required',
          }
        )}
        placeholder={`Option ${optionIndex + 1}`}
        className="
          flex-1
          rounded-lg
          border
          border-[#D9E2F2]
          bg-[#EEF4FF]
          px-4
          py-3
          text-sm
        "
      />

      <button
        type="button"
        onClick={() => remove(optionIndex)}
        className="text-red-500 cursor-pointer hover:text-red-600"
      >
        <Trash2 size={16} />
      </button>

      <button
        type="button"
        className="cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <Menu
          size={12}
          className="text-slate-400 hover:text-slate-600 transition"
        />
      </button>
    </div>
  );
}
