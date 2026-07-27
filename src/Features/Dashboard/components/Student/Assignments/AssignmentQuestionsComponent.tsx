'use client';

import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import QuestionTracker from './QuestionTracker';
import QuestionRenderer from './QuestionRenderer';
import NavigationButtons from './NavigationButtons';

import {
  AssignmentQuestionsProps,
  AssignmentSubmissionRequestBody,
} from '@/Features/Dashboard/Types';
import useSubmitAssignments from '@/Features/Dashboard/Hooks/useSubmitAssignments';

export default function AssignmentQuestions({
  questions,
  assignmentId,
}: AssignmentQuestionsProps) {
  const sortedQuestions = useMemo(
    () => [...questions].sort((a, b) => a.sort_order - b.sort_order),
    [questions]
  );

  const methods = useForm<AssignmentSubmissionRequestBody>({
    defaultValues: {
      p_assignment_id: assignmentId,
      p_answers: sortedQuestions.map((question) => ({
        question_id: question.id,
        selected_option_ids: question.question_type !== 'text' ? [] : undefined,
        text_answer: question.question_type === 'text' ? '' : undefined,
      })),
    },
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (!sortedQuestions.length) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
        <h3 className="text-xl font-semibold">
          No questions have been added yet.
        </h3>
      </div>
    );
  }

  const currentQuestion = sortedQuestions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < sortedQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleGoToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };
const { mutateAsync } = useSubmitAssignments();

const onSubmit = async (data: AssignmentSubmissionRequestBody) => {
  const response = await mutateAsync(data);

  console.log('res', response);
};

  const questionTypeMap = {
    single_choice: 'Single Choice',
    multiple_choice: 'Multiple Choice',
    text: 'Text',
  };

 return (
   <FormProvider {...methods}>
     <div className="mx-auto w-full max-w-[1280px] px-4 py-6 lg:px-6 xl:px-0">
       <div className="grid grid-cols-1 gap-8 xl:grid-cols-[288px_minmax(0,880px)] xl:justify-between">
         {/* Question Tracker */}
         <div className="xl:min-h-[964px]">
           <QuestionTracker
             questions={sortedQuestions}
             currentQuestion={currentQuestionIndex}
             onSelectQuestion={handleGoToQuestion}
             onSubmit={onSubmit}
           />
         </div>

         {/* Question Card */}
         <div className="min-h-[964px] rounded-[28px] bg-white p-6 shadow-sm sm:p-8 lg:p-10">
           <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
             <div className="flex-1">
               <div className="flex flex-wrap items-center gap-3">
                 <span className="rounded-full bg-[#EAF7FA] px-4 py-2 text-sm font-semibold text-[#006D77]">
                   Question {currentQuestionIndex + 1} of{' '}
                   {sortedQuestions.length}
                 </span>

                 <span className="rounded-full bg-[#FFF7E8] px-4 py-2 text-sm font-semibold text-[#A16207]">
                   {currentQuestion.grade} Points
                 </span>
               </div>

               <h2 className="mt-6 text-2xl font-bold leading-relaxed text-[#045D6C] lg:text-3xl">
                 {currentQuestion.question}
               </h2>
             </div>

             <div className="rounded-xl bg-[#F9FAFB] px-5 py-4 text-center">
               <p className="text-xs font-semibold uppercase tracking-wider text-[#98A2B3]">
                 Type
               </p>

               <p className="mt-1 font-semibold text-[#344054]">
                 {questionTypeMap[currentQuestion.question_type]}
               </p>
             </div>
           </div>

           <div className="mt-12">
             <QuestionRenderer
               question={currentQuestion}
               questionIndex={currentQuestionIndex}
             />
           </div>

           <NavigationButtons
             currentQuestion={currentQuestionIndex}
             totalQuestions={sortedQuestions.length}
             onPrevious={handlePrevious}
             onNext={handleNext}
           />
         </div>
       </div>
     </div>
   </FormProvider>
 );
}
