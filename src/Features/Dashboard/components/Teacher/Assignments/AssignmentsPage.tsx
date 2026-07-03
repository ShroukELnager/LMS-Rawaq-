
"use client";
import AssignmentInformationCard from './AssignmentInformationCard';
import QuestionsSection from './QuestionsSection';
import AssignmentSummary from './AssignmentSummary';
import { FormProvider, useForm } from 'react-hook-form';
import { AssignmentRequestBody } from '@/Features/Dashboard/Types';
import useCreateAssignment from '@/Features/Dashboard/Hooks/useCreateAssignment';


export default function CreateAssignment() {

const methods = useForm<AssignmentRequestBody>({
  defaultValues: {
    p_group_id: '94ad87f0-6562-4284-8661-ab15ccacce4c',
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
   const { mutate, isPending } = useCreateAssignment();

    const onSubmit = (data: AssignmentRequestBody) => {
  console.log(JSON.stringify(data, null, 2));
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

       <FormProvider {...methods}>
         <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
           <div className="order-2 lg:order-1">
             <form
               id="create-assignment-form"
               onSubmit={methods.handleSubmit(onSubmit)}
               className="space-y-6"
             >
               <AssignmentInformationCard />

               <QuestionsSection />
             </form>
           </div>

           <div className="order-1 lg:order-2">
             <AssignmentSummary
               isPending={isPending}
             />
           </div>
         </div>
       </FormProvider>
     </div>
   </div>
 );
}
