
import { assignmentMock } from '@/Features/Dashboard/MockAssignmentsData';
import AssignmentInformationCard from './AssignmentInformationCard';
import AssignmentSummary from './AssignmentSummary';
import QuestionsSection from './QuestionsSection';

export default function CreateAssignment() {
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
          <div className="space-y-6">
            <AssignmentInformationCard assignment={assignmentMock} />

            <QuestionsSection questions={assignmentMock.questions} />
          </div>

          <AssignmentSummary assignment={assignmentMock} />
        </div>
      </div>
    </div>
  );
}
