'use client';

import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import AssignmentInformationCard from './AssignmentInformationCard';
import QuestionsSection from './QuestionsSection';
import AssignmentSummary from './AssignmentSummary';

import { AssignmentRequestBody } from '@/Features/Dashboard/Types';
import useCreateAssignment from '@/Features/Dashboard/Hooks/useCreateAssignment';

type QuestionTypeMenuTarget = 'questions' | 'summary' | null;

type CreatedAssignment = {
  id?: string;
  assignment_id?: string;
  p_assignment_id?: string;
  assignment?: { id?: string };
};

const getCreatedAssignmentId = (response: unknown): string | undefined => {
  const assignment = Array.isArray(response) ? response[0] : response;

  if (!assignment || typeof assignment !== 'object') return undefined;

  const { id, assignment_id, p_assignment_id, assignment: nestedAssignment } =
    assignment as CreatedAssignment;

  return id || assignment_id || p_assignment_id || nestedAssignment?.id;
};

export default function CreateAssignment({
  groupId,
  assignmentId,
}: {
  groupId: string;
  assignmentId?: string;
}) {
  const router = useRouter();
  const methods = useForm<AssignmentRequestBody>({
    defaultValues: {
      p_group_id: groupId,
      p_title: '',
      p_description: '',
      p_deadline: null,
      p_total_grade: 0,

      p_questions: [
        {
          question_type: 'text',
          question: '',
          grade: 0,
          sort_order: 1,
          options: [],
        },
      ],
    },
  });

  const { control, getValues, handleSubmit } = methods;
  const [questionTypeMenuTarget, setQuestionTypeMenuTarget] =
    useState<QuestionTypeMenuTarget>(null);

  // This is the only useFieldArray for p_questions
  const { fields, append, remove, insert, replace } = useFieldArray({
    control,
    name: 'p_questions',
  });

  const { mutate, isPending } = useCreateAssignment();

  const onSubmit = (data: AssignmentRequestBody) => {
    mutate(data, {
      onSuccess: (response) => {
        const assignmentId = getCreatedAssignmentId(response);

        if (assignmentId) {
          router.push(`/group/${groupId}/assignments/${assignmentId}`);
        }
      },
    });
  };

  const handleAddQuestion = (
    questionType: AssignmentRequestBody['p_questions'][number]['question_type'] =
      'text'
  ) => {
    const newQuestionIndex = fields.length;

    append({
      question_type: questionType,
      question: '',
      grade: 0,
      sort_order: newQuestionIndex + 1,
      options: [],
    });
    setQuestionTypeMenuTarget(null);
  };

  const handleRemoveQuestion = (index: number) => {
    remove(index);
  };

  const handleDuplicateQuestion = (index: number) => {
    const question = getValues(`p_questions.${index}`);

    if (!question) return;

    insert(index + 1, {
      question_type: question.question_type,
      question: question.question,
      grade: question.grade,
      sort_order: index + 2,
      options: question.options
        ? question.options.map((option) => ({
            text: option.text,
            is_correct: option.is_correct,
            sort_order: option.sort_order,
          }))
        : [],
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto max-w-7xl px-4 py-6 lg:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-slate-900">
            Create Assignment
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create an assignment and define the questions students must answer.
          </p>
        </div>

        <FormProvider {...methods}>
          <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
            {/* Main Content */}
            <div className="order-2 lg:order-1">
              <form
                id="create-assignment-form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <AssignmentInformationCard />

                <QuestionsSection
                  fields={fields}
                  remove={handleRemoveQuestion}
                  duplicate={handleDuplicateQuestion}
                  isQuestionTypeMenuOpen={questionTypeMenuTarget === 'questions'}
                  openQuestionTypeMenu={() => setQuestionTypeMenuTarget('questions')}
                  closeQuestionTypeMenu={() => setQuestionTypeMenuTarget(null)}
                  handleAddQuestion={handleAddQuestion}
                  replace={replace}
                />

                {/* Mobile Submit */}
                <div className="block lg:hidden">
                  <button
                    type="submit"
                    form="create-assignment-form"
                    disabled={isPending}
                    className="
                      mt-8
                      flex
                      h-12
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#005F63]
                      font-medium
                      text-white
                      transition
                      hover:bg-[#00494C]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    <Send size={18} />

                    <span>
                      {isPending ? 'Publishing...' : 'Publish Assignment'}
                    </span>
                  </button>
                </div>
              </form>
            </div>

            {/* Summary */}
            <div className="order-1 lg:order-2">
              <AssignmentSummary
                isPending={isPending}
                isQuestionTypeMenuOpen={questionTypeMenuTarget === 'summary'}
                openQuestionTypeMenu={() => setQuestionTypeMenuTarget('summary')}
                closeQuestionTypeMenu={() => setQuestionTypeMenuTarget(null)}
                handleAddQuestion={handleAddQuestion}
                groupId={groupId}
                assignmentId={assignmentId}
              />
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
