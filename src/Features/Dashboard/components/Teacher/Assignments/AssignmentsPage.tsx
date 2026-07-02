
"use client";
import { assignmentMock } from '@/Features/Dashboard/MockAssignmentsData';
import AssignmentInformationCard from './AssignmentInformationCard';
import QuestionsSection from './QuestionsSection';
import AssignmentSummary from './AssignmentSummary';
import { FormProvider, useForm } from 'react-hook-form';
import { AssignmentRequestBody } from '@/Features/Dashboard/Types';
import useCreateAssignment from '@/Features/Dashboard/Hooks/useCreateAssignment';


export default function CreateAssignment() {

const methods = useForm<AssignmentRequestBody>({
  defaultValues: {
    p_group_id: 'c35dbeb2-855d-4851-9176-84a2bbcf8831',
    p_title: '',
    p_description: '',
    p_deadline: '',

    p_questions: [
      {
        type: 'text',
        question: '',
        points: 0,
        sort_order: 1,
      },
    ],
  },
}); 
   const { mutate, isPending } = useCreateAssignment();

    const onSubmit = (data: AssignmentRequestBody) => {

        mutate(data);
    };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-slate-900">
            Create Assignment
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create an assignment and define the questions students must answer.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="order-2 lg:order-1">
            <FormProvider {...methods}>
              <form
                id="create-assignment-form"
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <AssignmentInformationCard />

                <QuestionsSection />
              </form>
            </FormProvider>
          </div>

          <div className="order-1 lg:order-2">
            <AssignmentSummary
              assignment={assignmentMock}
              isPending={isPending}
            />{' '}
          </div>
        </div>
      </div>
    </div>
  );
}
