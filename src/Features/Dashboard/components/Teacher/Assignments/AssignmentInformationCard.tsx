'use client';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Info from '@assets/icons/info.svg';
import { Controller, useFormContext } from 'react-hook-form';
import { AssignmentRequestBody } from '@/Features/Dashboard/Types';

export default function AssignmentInformationCard() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<AssignmentRequestBody>();

  return (
    <div className="rounded-2xl border border-[#D9E2F2] bg-[#EEF4FF] p-5 lg:p-6">
      <div className="mb-5 flex items-center gap-2">
        <Info size={18} className="text-slate-700" />
        <h2 className="font-semibold text-slate-900">Assignment Information</h2>
      </div>

      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="mb-2 block text-xs font-medium">
            Assignment Title
          </label>

          <input
            placeholder="e.g. Introduction to Islamic Philosophy"
            {...register('p_title', {
              required: 'Assignment title is required',
            })}
            className={`
              h-11 w-full rounded-lg border bg-white px-4 outline-none transition
              ${
                errors.p_title
                  ? 'border-red-500'
                  : 'border-[#D9E2F2] focus:border-primary focus:ring-2 focus:ring-primary/20'
              }
            `}
          />

          {errors.p_title && (
            <p className="mt-1 text-xs text-red-500">
              {errors.p_title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-xs font-medium">Description</label>

          <textarea
            rows={4}
            placeholder="Briefly describe the learning objectives and instructions..."
            {...register('p_description', {
              required: 'Assignment description is required',
            })}
            className={`
              w-full rounded-lg border bg-white p-4 outline-none transition
              ${
                errors.p_description
                  ? 'border-red-500'
                  : 'border-[#D9E2F2] focus:border-primary focus:ring-2 focus:ring-primary/20'
              }
            `}
          />

          {errors.p_description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.p_description.message}
            </p>
          )}
        </div>

        {/* Deadline */}
        <div>
          <label className="mb-2 block text-xs font-medium">Deadline</label>

          <Controller
            name="p_deadline"
            control={control}
            rules={{
              required: 'Deadline is required',
            }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date: Date | null) => field.onChange(date)}
                placeholderText="mm/dd/yyyy, --:-- --"
                dateFormat="MMM dd, yyyy"
                minDate={new Date()}
                showPopperArrow={false}
                calendarClassName="assignment-calendar"
                className={`
                  h-11
                  w-full
                  rounded-lg
                  border
                  bg-white
                  px-4
                  text-sm
                  outline-none
                  transition
                  ${
                    errors.p_deadline
                      ? 'border-red-500'
                      : 'border-[#D9E2F2] focus:border-primary focus:ring-2 focus:ring-primary/20'
                  }
                `}
              />
            )}
          />

          {errors.p_deadline && (
            <p className="mt-1 text-xs text-red-500">
              {errors.p_deadline.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
