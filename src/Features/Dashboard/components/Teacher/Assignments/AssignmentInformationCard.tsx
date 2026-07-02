'use client';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Info from '@assets/icons/info.svg';
import { Controller, useFormContext } from 'react-hook-form';
import { AssignmentRequestBody } from '@/Features/Dashboard/Types';




export default function AssignmentInformationCard() {

       const { control,register } = useFormContext<AssignmentRequestBody>();

  return (
    <div className="rounded-2xl border border-[#D9E2F2] bg-[#EEF4FF] p-5 lg:p-6">
      <div className="mb-5 flex items-center gap-2">
        <Info size={18} className="text-slate-700" />
        <h2 className="font-semibold text-slate-900">Assignment Information</h2>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-xs font-medium">
            Assignment Title
          </label>

          <input
            placeholder="e.g. Introduction to Islamic Philosophy"
            {...register('p_title')}
            className="h-11 w-full rounded-lg border border-[#D9E2F2] bg-white px-4"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium">Description</label>

          <textarea
            rows={4}
            placeholder="Briefly describe the learning objectives and instructions..."
            {...register('p_description')}
            className="w-full rounded-lg border border-[#D9E2F2] bg-white p-4"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium">Deadline</label>



<Controller
  name="p_deadline"
  control={control}
  render={({ field }) => (
    <DatePicker
      selected={field.value}
      onChange={(date:Date|null) => field.onChange(date)}
      dateFormat="MMM dd, yyyy"
      className="h-11 w-full rounded-lg border border-[#D9E2F2] bg-white px-4"
    />
  )}
/>
        </div>
      </div>
    </div>
  );
}
