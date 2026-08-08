import { useQuery } from '@tanstack/react-query';
import { CalendarAssignmentsResponse } from '../Types';
import { CalenderAssignmentsService } from '../lib/Services/student/getCalenderAssignments.service';

export default function useCalenderAssignments({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  return useQuery<CalendarAssignmentsResponse>({
    queryKey: ['CalenderSssignment',startDate,endDate,],
    queryFn: () =>
      CalenderAssignmentsService({
        p_start_date: startDate,
        p_end_date: endDate,
      }),
  });
}
