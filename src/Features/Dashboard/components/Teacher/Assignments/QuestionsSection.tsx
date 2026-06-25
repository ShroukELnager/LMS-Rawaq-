import { Plus } from 'lucide-react';


import QuestionItem from './QuestionItem';
import { AssignmentQuestion } from '@/Features/Dashboard/MockAssignmentsData';

interface Props {
  questions: AssignmentQuestion[];
}

export default function QuestionsSection({ questions }: Props) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-slate-900">Questions</h2>

        <span className="text-xs text-slate-500">
          Total: {questions.length} Questions
        </span>
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </div>

      <button
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
