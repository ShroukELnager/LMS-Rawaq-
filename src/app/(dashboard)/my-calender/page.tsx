'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import {
  addMonths,
  endOfMonth,
  format,
  startOfMonth,
  subMonths,
} from 'date-fns';

import ChevronLeft from '@/assets/icons/ChevronLeft.svg';
import ChevronRight from '@/assets/icons/ChevronRight.svg';
import CalendarDays from '@/assets/icons/Margin.svg';

import { Controller, useForm } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';

import { CalendarAssignments } from '@/Features/Dashboard/Types';
import useCalenderAssignments from '@/Features/Dashboard/Hooks/useCalenderAssignments';

type FormValues = {
  dateRange: [Date | null, Date | null];
};

export default function CalendarPage() {
  const today = new Date();
  const calendarRef = useRef<FullCalendar>(null);

  /*
   * Current month displayed in the calendar
   */
  const [month, setMonth] = useState(today);

  /*
   * Range currently selected inside the popup
   */
  const [open, setOpen] = useState(false);

  /*
   * Range that has actually been applied
   * and will be sent to the API
   */
  const [appliedRange, setAppliedRange] = useState<[Date, Date]>([
    startOfMonth(today),
    endOfMonth(today),
  ]);
const [selectedAssignment, setSelectedAssignment] =
  useState<CalendarAssignments | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { control, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      dateRange: [startOfMonth(today), endOfMonth(today)],
    },
  });

  /*
   * Draft range inside the popup
   */
  const range = watch('dateRange');

  /*
   * Fetch calendar assignments
   *
   * React Query will automatically refetch
   * whenever appliedRange changes.
   */
 const {
   data: assignments = [],
   isLoading,
   isError,
   refetch,
 } = useCalenderAssignments({
   startDate: appliedRange[0],
   endDate: appliedRange[1],
 });
  /*
   * Convert API response to FullCalendar events
   */
  const calendarEvents = assignments.map(
    (assignment: CalendarAssignments) => ({
      // A calendar event needs an id that is unique for every assignment row.
      // The same assignment can be returned for more than one group.
      id: `${assignment.assignment_id}-${assignment.group_id}`,
      title: assignment.assignment_title,
      start: assignment.deadline,
      classNames: [`event-${assignment.submission_status}`],
      extendedProps: { assignment },
    })
  );
  /*
   * Previous month
   */
  const handlePreviousMonth = () => {
    const previousMonth = subMonths(month, 1);

    setMonth(previousMonth);
    calendarRef.current?.getApi().gotoDate(previousMonth);

    /*
     * Send the whole previous month to API
     */
    setAppliedRange([startOfMonth(previousMonth), endOfMonth(previousMonth)]);

    /*
     * Keep popup range in sync
     */
    setValue('dateRange', [
      startOfMonth(previousMonth),
      endOfMonth(previousMonth),
    ]);
  };

 
  const handleNextMonth = () => {
    const nextMonth = addMonths(month, 1);

    setMonth(nextMonth);
    calendarRef.current?.getApi().gotoDate(nextMonth);

    /*
     * Send the whole next month to API
     */
    setAppliedRange([startOfMonth(nextMonth), endOfMonth(nextMonth)]);

    /*
     * Keep popup range in sync
     */
    setValue('dateRange', [startOfMonth(nextMonth), endOfMonth(nextMonth)]);
  };

  /*
   * Apply selected range from popup
   */
  const handleApplyRange = () => {
    if (!range[0] || !range[1]) {
      return;
    }

    /*
     * This changes the query parameters.
     * React Query will automatically call the API again.
     */
    setAppliedRange([range[0], range[1]]);

    /*
     * Make the main calendar header
     * show the month containing the selected start date.
     */
    setMonth(range[0]);
    calendarRef.current?.getApi().gotoDate(range[0]);

    setOpen(false);
  };

  /*
   * Cancel popup changes
   */
  const handleCancel = () => {
    /*
     * Restore the last applied range
     */
    setValue('dateRange', [appliedRange[0], appliedRange[1]]);

    setOpen(false);
  };

  return (
    <>
      <div className="flex flex-col gap-[8px] pb-[24px]">
        <h1 className="font-inter font-bold text-5xl leading-[56px] tracking-[-0.96px] text-[#111C2C]">
          My Calendar
        </h1>

        <p className="font-inter hidden md:block font-normal text-base leading-6 tracking-normal text-[#3E494A]">
          Track assignment deadlines and your submission progress.
        </p>
      </div>

      {/* Desktop */}
      <div className="relative hidden items-center w-full mb-[24px] justify-between rounded-xl border border-[#BEC8CA4D] py-6 px-4 bg-[#FFFFFF01] shadow-[0px_16px_32px_-12px_rgba(0,0,0,0.12)] md:flex">
        {/* Left */}
        <div className="font-inter flex items-center gap-3 font-semibold text-[20px] leading-6 tracking-normal text-center text-[#111C2C]">
          <button
            type="button"
            onClick={handlePreviousMonth}
            className="rounded p-1 hover:bg-gray-100"
          >
            <ChevronLeft size={20} color="#111C2C" className="cursor-pointer" />
          </button>

          <h2 className="text-2xl font-semibold">
            {format(month, 'MMMM yyyy')}
          </h2>

          <button
            type="button"
            onClick={handleNextMonth}
            className="rounded p-1 hover:bg-gray-100"
          >
            <ChevronRight
              size={20}
              color="#111C2C"
              className="cursor-pointer"
            />
          </button>
        </div>

        {/* Right */}
        <div className="relative">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer rounded-lg border border-[#BEC8CA] bg-[#F0F3FF] px-3 py-2 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            <CalendarDays size={16} />

            {range[0] && range[1]
              ? `${format(range[0], 'MMM d, yyyy')} - ${format(
                  range[1],
                  'MMM d, yyyy'
                )}`
              : 'Select Range'}
          </button>

          {open && (
            <div className="absolute top-[calc(100%+2px)] -right-4 z-50">
              <div className="rounded-[8px] bg-[#FFFFFF01] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
                <Controller
                  control={control}
                  name="dateRange"
                  render={({ field }) => (
                    <DatePicker
                      inline
                      selectsRange
                      startDate={field.value?.[0]}
                      endDate={field.value?.[1]}
                      onChange={(dates) => {
                        field.onChange(dates);

                        if (dates[0]) {
                          setMonth(dates[0]);
                        }
                      }}
                      renderCustomHeader={({
                        date,
                        decreaseMonth,
                        increaseMonth,
                      }) => (
                        <div className="px-[20px] pt-[20px] pb-[16px] flex justify-between bg-white">
                          <h2 className="font-inter font-bold text-base leading-6 tracking-normal text-[#041B3C]">
                            {format(date, 'MMMM yyyy')}
                          </h2>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={decreaseMonth}
                              className="rounded p-2 hover:bg-gray-100"
                            >
                              <ChevronLeft
                                color="#4F5F7B"
                                className="cursor-pointer"
                              />
                            </button>

                            <button
                              type="button"
                              onClick={increaseMonth}
                              className="rounded p-2 hover:bg-gray-100"
                            >
                              <ChevronRight
                                color="#4F5F7B"
                                className="cursor-pointer"
                              />
                            </button>
                          </div>
                        </div>
                      )}
                    />
                  )}
                />

                {/* Popup Actions */}
                <div className="px-[20px] pb-[20px] md:flex-row md:gap-[8px] pt-4 border-t border-[#E2E8F080]">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="w-[135px] h-[32px] rounded-[2px] px-[47.58px] bg-[#FDFDFF]"
                  >
                    <span className="py-[8px] cursor-pointer font-inter font-medium text-[12px] leading-4 text-center text-[#4F5F7B]">
                      Cancel
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleApplyRange}
                    disabled={!range[0] || !range[1]}
                    className="rounded-[2px] px-[30.68px] cursor-pointer py-[8px] bg-[#00535B] font-inter font-semibold text-[12px] leading-4 tracking-normal text-center text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Apply Range
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="mb-[24px] flex h-[56px] w-full items-center justify-between rounded-[8px] bg-[#F0F3FF] px-[8px] md:hidden  rounded-xl border border-[#BEC8CA4D] py-6 px-4 bg-[#FFFFFF01] shadow-[0px_16px_32px_-12px_rgba(0,0,0,0.12)] md:flex">
        {/* Previous Month */}
        <button
          type="button"
          onClick={handlePreviousMonth}
          className="flex h-[30px] w-[25.4px] shrink-0 items-center justify-center rounded-[8px] border border-[#BEC8CA4D] bg-[#F0F3FF] p-[8px]"
        >
          <ChevronLeft size={16} color="#111C2C" className="cursor-pointer" />
        </button>

        {/* Month */}
        <h2 className="font-inter text-[18px] font-semibold leading-6 text-[#111C2C]">
          {format(month, 'MMMM yyyy')}
        </h2>

        {/* Next Month */}
        <button
          type="button"
          onClick={handleNextMonth}
          className="flex h-[30px] w-[25.4px] shrink-0 items-center justify-center rounded-[8px] border border-[#BEC8CA4D] bg-[#F0F3FF] p-[8px]"
        >
          <ChevronRight size={16} color="#111C2C" className="cursor-pointer" />
        </button>
      </div>

      {/* Loading */}
      {/* Loading State */}
      {isLoading ? (
        <div className="calendar-container">
          {/* Toolbar Skeleton */}
          <div className="mb-[16px] flex items-center gap-[16px] px-0 pt-[13px] pb-[13px] pl-[13px]">
            {' '}
            <div className="flex items-center gap-[6px]">
              <div className="h-[8px] w-[8px] animate-pulse rounded-full bg-[#E2E8F0]" />
              <div className="h-[10px] w-[60px] animate-pulse rounded-[4px] bg-[#E2E8F0]" />
            </div>
            <div className="flex items-center gap-[6px]">
              <div className="h-[8px] w-[8px] animate-pulse rounded-full bg-[#E2E8F0]" />
              <div className="h-[10px] w-[55px] animate-pulse rounded-[4px] bg-[#E2E8F0]" />
            </div>
            <div className="flex items-center gap-[6px]">
              <div className="h-[8px] w-[8px] animate-pulse rounded-full bg-[#E2E8F0]" />
              <div className="h-[10px] w-[75px] animate-pulse rounded-[4px] bg-[#E2E8F0]" />
            </div>
            <div className="flex items-center gap-[6px]">
              <div className="h-[8px] w-[8px] animate-pulse rounded-full bg-[#E2E8F0]" />
              <div className="h-[10px] w-[50px] animate-pulse rounded-[4px] bg-[#E2E8F0]" />
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {Array.from({ length: 35 }).map((_, index) => (
              <div
                key={index}
                className="relative min-h-[100px] border-b border-r border-[#E2E8F0] p-[8px] last:border-r-0"
              >
                {/* Day number - top right */}
                <div className="absolute right-[8px] top-[8px] h-[14px] w-[20px] animate-pulse rounded-[4px] bg-[#E2E8F0]" />

                {/* Assignment - centered inside cell */}
                <div className="flex h-full min-h-[84px] items-center justify-center">
                  <div className="h-[20px] w-[70%] animate-pulse rounded-[4px] bg-[#EDF2F8]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : isError ? (
        /* Error State */
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[12px] border border-[#E2E8F0] bg-white px-[24px] text-center">
          <div className="mb-[12px] flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#FEF2F2]">
            <span className="font-inter text-[20px] font-semibold text-[#EF4444]">
              !
            </span>
          </div>

          <p className="font-inter text-[14px] font-medium leading-5 text-[#111C2C]">
            Failed to load calendar assignments.
          </p>

          <p className="mt-[4px] font-inter text-[12px] leading-4 text-[#4F5F7B]">
            Something went wrong while loading your assignments.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-[16px] rounded-[6px] bg-[#00535B] px-[16px] py-[8px] font-inter text-[12px] font-semibold leading-4 text-white transition hover:bg-[#00464D]"
          >
            Retry
          </button>
        </div>
      ) : assignments.length === 0 ? (
        /* Empty State */
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[12px] border border-[#E2E8F0] bg-white px-[24px] text-center">
          <div className="mb-[12px] flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#F0F3FF]">
            <CalendarDays size={20} color="#00535B" />
          </div>

          <p className="font-inter text-[14px] font-medium leading-5 text-[#111C2C]">
            No assignments during this period.
          </p>
        </div>
      ) : (
        /* Calendar */
        <div className="calendar-container">
          <div className="calendar-legend">
            <div className="legend-item">
              <span className="legend-dot legend-submitted" />
              <span>Submitted</span>
            </div>

            <div className="legend-item">
              <span className="legend-dot legend-reviewed" />
              <span>Reviewed</span>
            </div>

            <div className="legend-item">
              <span className="legend-dot legend-not-submitted" />
              <span>Not Submitted</span>
            </div>

            <div className="legend-item">
              <span className="legend-dot legend-delayed" />
              <span>Delayed</span>
            </div>
          </div>

          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={false}
            height="auto"
            initialDate={month}
            datesSet={(info) => {
              if (
                info.view.currentStart.getTime() !==
                startOfMonth(month).getTime()
              ) {
                setMonth(info.view.currentStart);
              }
            }}
            events={calendarEvents}
            dayMaxEvents={2}
            eventDisplay="block"
            displayEventTime={false}
            eventClick={(info) => {
              const assignment = info.event.extendedProps.assignment as
                | CalendarAssignments
                | undefined;

              if (assignment) {
                setSelectedAssignment(assignment);
              }
            }}
            moreLinkContent={(args) => {
              return <span className="custom-more-link">+{args.num} more</span>;
            }}
          />
        </div>
      )}
      {selectedAssignment && (
        <>
          {/* Mobile Overlay */}
          <div
            className="fixed inset-0 z-[999] bg-black/40 md:hidden"
            onClick={() => setSelectedAssignment(null)}
          />

          {/* Assignment Popup */}
          <div className="fixed z-[1000] top-1/2 left-1/2 w-[390px] max-h-[663px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] bg-[#F9F9FF] p-[16px] shadow-[0px_-8px_24px_0px_#00000026] md:top-auto md:left-auto md:right-[24px] md:bottom-[24px] md:translate-x-0 md:translate-y-0">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`inline-flex rounded-[4px] px-[8px] py-[4px] font-inter text-[10px] font-semibold leading-3 ${
                    selectedAssignment.submission_status === 'submitted'
                      ? 'bg-[#3B82F6] text-white'
                      : selectedAssignment.submission_status === 'reviewed'
                        ? 'bg-[#DCFCE7] text-[#3B82F6]'
                        : selectedAssignment.submission_status === 'delayed'
                          ? 'bg-[#EF4444] text-white'
                          : 'bg-[#FFEDD5] text-[#9A3412]'
                  }`}
                >
                  ASSIGNMENT
                </span>

                <h2 className="mt-[8px] font-inter text-[24px] font-semibold leading-[32px] text-[#111C2C]">
                  {selectedAssignment.assignment_title}
                </h2>

                <p className="mt-[2px] font-inter text-[14px] leading-5 text-[#3E494A]">
                  {selectedAssignment.group_name}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAssignment(null)}
                className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full bg-[#E7EEFF]"
              >
                <span className="text-[24px] leading-none text-[#3E494A]">
                  ×
                </span>
              </button>
            </div>

            {/* Details */}
            <div className="mt-[20px] rounded-[10px] border border-[#BEC8CA] bg-white p-[16px]">
              {/* Deadline */}
              <div className="border-b border-[#E2E8F0] pb-[16px]">
                <p className="font-inter text-[12px] font-medium leading-4 text-[#3E494A]">
                  Deadline
                </p>

                <p className="mt-[2px] font-inter text-[14px] font-medium leading-5 text-[#EF4444]">
                  {selectedAssignment.deadline
                    ? format(
                        new Date(selectedAssignment.deadline),
                        'MMM dd, yyyy - hh:mm a'
                      )
                    : '-'}
                </p>
              </div>

              {/* Status */}
              <div className="grid grid-cols-2 gap-y-[20px] pt-[16px]">
                <div>
                  <p className="font-inter text-[11px] leading-4 text-[#3E494A]">
                    Status
                  </p>

                  <p className="font-inter text-[13px] font-semibold leading-5 text-[#111C2C]">
                    {selectedAssignment.submission_status
                      ? selectedAssignment.submission_status
                          .split('_')
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(' ')
                      : '-'}
                  </p>
                </div>

                <div>
                  <p className="font-inter text-[11px] leading-4 text-[#3E494A]">
                    Submitted
                  </p>

                  <p className="font-inter text-[13px] font-semibold leading-5 text-[#111C2C]">
                    {selectedAssignment.submitted ? 'Yes' : 'No'}
                  </p>
                </div>

                <div>
                  <p className="font-inter text-[11px] leading-4 text-[#3E494A]">
                    Reviewed
                  </p>

                  <p className="font-inter text-[13px] font-semibold leading-5 text-[#111C2C]">
                    {selectedAssignment.reviewed ? 'Yes' : 'No'}
                  </p>
                </div>

                <div>
                  <p className="font-inter text-[11px] leading-4 text-[#3E494A]">
                    Grade
                  </p>

                  <p className="font-inter text-[24px] font-bold leading-7 text-[#006D77]">
                    {selectedAssignment.total_grade_awarded ?? '-'}
                    <span className="ml-[4px] text-[14px] font-normal text-[#3E494A]">
                      / {selectedAssignment.total_grade ?? '-'}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* View Assignment */}
            <button
              type="button"
              className="mt-[20px] flex h-[43px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[8px] bg-[#00535B] font-inter text-[14px] font-medium leading-5 text-white"
            >
              View Assignment
              <span className="text-[20px]">→</span>
            </button>
          </div>
        </>
      )}
    </>
  );
}
