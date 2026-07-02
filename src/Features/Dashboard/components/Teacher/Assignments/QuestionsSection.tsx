import { Plus } from 'lucide-react';


import QuestionItem from './QuestionItem';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Question from '@assets/icons/question.svg';

export default function QuestionsSection() {
const { control, register } = useFormContext();

const { fields, append, remove } = useFieldArray({
  control,
  name: 'p_questions',
});
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

      <div className="space-y-4">
        {fields.map((field, index) => (
          <QuestionItem key={field.id} index={index} remove={remove} />
        ))}
      </div>

      <button
        onClick={() =>
          append({
            type: 'text',
            question: '',
            points: 0,
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
