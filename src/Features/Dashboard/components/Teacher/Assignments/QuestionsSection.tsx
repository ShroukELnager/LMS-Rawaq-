import { Plus } from 'lucide-react';

import { DndContext, DragEndEvent } from '@dnd-kit/core';
import QuestionItem from './QuestionItem';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Question from '@assets/icons/question.svg';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { AssignmentRequestBody } from '@/Features/Dashboard/Types';
export default function QuestionsSection() {
const { control, getValues } = useFormContext<AssignmentRequestBody>();
const { fields, append, remove, replace } = useFieldArray({
  control,
  name: 'p_questions',
});


const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  const oldIndex = fields.findIndex((field) => field.id === active.id);

  const newIndex = fields.findIndex((field) => field.id === over.id);

  const reorderedQuestions = arrayMove(
    getValues('p_questions'),
    oldIndex,
    newIndex
  ).map((question, index) => ({
    ...question,
    sort_order: index + 1,
  }));

  replace(reorderedQuestions);
};
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Question size={18} className="text-slate-700" />

          <h2 className="font-semibold text-slate-900">Questions</h2>
        </div>
        <span className="text-xs text-slate-500">
          Total: {fields.length} Questions
        </span>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        {' '}
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <QuestionItem
                key={field.id}
                index={index}
                remove={remove}
                id={field.id}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <button
        onClick={() =>
          append({
            question_type: 'text',
            question: '',
            grade: 0,
            sort_order: fields.length + 1,
          })
        }
        className="
        mt-4
        flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-dashed
        border-slate-300
        bg-white
        py-4
        text-sm
        font-medium
        text-teal-700
      "
      >
        <Plus size={18} />
        Add Question
      </button>
    </section>
  );
}
