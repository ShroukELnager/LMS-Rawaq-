import { CirclePlus, Trash2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { DndContext } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import OptionItem from './OptionItem';
import { AssignmentOption } from '@/Features/Dashboard/Types';
type Props = {
  index: number;
  type: 'radio' | 'checkbox';
};

export default function SingleChoice({ index, type }: Props) {
const { control, getValues } = useFormContext();

const { fields, replace ,append,remove} = useFieldArray({
  control,
  name: `p_questions.${index}.options`,
});

const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  const oldIndex = fields.findIndex((f) => f.id === active.id);
  const newIndex = fields.findIndex((f) => f.id === over.id);

   const options =
      (getValues(`p_questions.${index}.options`) as AssignmentOption[]) || [];

    const reordered = arrayMove(options, oldIndex, newIndex);
    const normalized: AssignmentOption[] = reordered.map((option, i) => ({
      text: option.text,
      is_correct: option.is_correct,
      sort_order: i + 1,
    }));

    replace(normalized);
  };


 
  return (
    <div className="space-y-3">
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          {fields.map((field, i) => (
            <OptionItem
              key={field.id}
              id={field.id}
              questionIndex={index}
              optionIndex={i}
              type={type}
              remove={remove}
            />
          ))}
        </SortableContext>
      </DndContext>

      <button
        type="button"
        onClick={() =>
          append({
            text: '',
            is_correct: false,
            sort_order: fields.length + 1,
          })
        }
        className="
          flex
          items-center
          gap-2
          text-sm
          font-medium
          text-teal-700
          transition
          hover:text-teal-800
        "
      >
        <CirclePlus size={18} />
        Add Option
      </button>
    </div>
  );
}
