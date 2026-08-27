'use client';

import { Plus } from 'lucide-react';

import { DndContext, DragEndEvent } from '@dnd-kit/core';

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

import { useFormContext } from 'react-hook-form';

import QuestionItem from './QuestionItem';
import QuestionTypeSelector from './QuestionTypeSelector';

import { AssignmentRequestBody } from '@/Features/Dashboard/Types';
import Question from '@assets/icons/question.svg';

type QuestionValue = AssignmentRequestBody['p_questions'][number];

type QuestionField = {
  id: string;
  question_type: 'text' | 'single_choice' | 'multiple_choice';
  question: string;
  grade: number;
  sort_order: number;
  options?: {
    text: string;
    is_correct: boolean;
    sort_order: number;
  }[];
};

type QuestionsSectionProps = {
  fields: QuestionField[];
  remove: (index: number) => void;
  duplicate: (index: number) => void;
  handleAddQuestion: (
    type: AssignmentRequestBody['p_questions'][number]['question_type']
  ) => void;
  isQuestionTypeMenuOpen: boolean;
  openQuestionTypeMenu: () => void;
  closeQuestionTypeMenu: () => void;
  replace: (questions: QuestionValue[]) => void;
};

export default function QuestionsSection({
  fields,
  remove,
  duplicate,
  handleAddQuestion,
  isQuestionTypeMenuOpen,
  openQuestionTypeMenu,
  closeQuestionTypeMenu,
  replace,
}: QuestionsSectionProps) {
  const { getValues } = useFormContext<AssignmentRequestBody>();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = fields.findIndex((field) => field.id === active.id);

    const newIndex = fields.findIndex((field) => field.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const reorderedQuestions = arrayMove(
      getValues('p_questions'),
      oldIndex,
      newIndex
    );

    replace(
      reorderedQuestions.map((question, index) => ({
        ...question,
        sort_order: index + 1,
      }))
    );
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Question size={18} className="text-slate-700" />
          <h2 className="font-semibold text-slate-900">Questions</h2>
        </div>

        <span className="text-xs text-slate-500">
          Total: {fields.length} Questions
        </span>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext
          items={fields.map((field) => field.id)}
          strategy={verticalListSortingStrategy}
        >
          {fields.map((field, index) => (
            <QuestionItem
              key={field.id}
              id={field.id}
              index={index}
              remove={remove}
              duplicate={duplicate}
            />
          ))}
        </SortableContext>
      </DndContext>

      <div className="relative">
        <button
          type="button"
          onClick={openQuestionTypeMenu}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white py-4 text-sm font-medium text-teal-700 transition hover:border-teal-700 hover:bg-teal-50"
        >
          <Plus size={18} />
          Add Question
        </button>

        {isQuestionTypeMenuOpen && (
          <QuestionTypeSelector
            index={0}
            autoOpen
            isAddQuestionMenu
            onQuestionTypeSelected={handleAddQuestion}
            onMenuClose={closeQuestionTypeMenu}
            className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl"
          />
        )}
      </div>
    </section>
  );
}
