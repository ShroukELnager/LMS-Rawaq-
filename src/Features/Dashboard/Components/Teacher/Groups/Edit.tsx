'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import useEditGroup from '@/Features/Dashboard/Hooks/useEditGroup';

import { editGroupSchema } from '@/Features/Dashboard/Schema/EditGroup';
import { UpdateGroupPayload } from '@/Features/Dashboard/Types';
import useGetSingleGroup from '@/Features/Dashboard/Hooks/useGetStudentSingleGroup';
import useGetTeacherSingleGroup from '@/Features/Dashboard/Hooks/useGetTeacherSingleGroup';

export default function EditGroup() {
  const router = useRouter();
  const params = useParams();

  const groupId = params?.groupId as string;

  const [students, setStudents] = useState(1);

  // Get current group data
  const {
    data: groupData,
    isPending: isLoadingGroup,
    isError: isGroupError,
    refetch,
  } = useGetTeacherSingleGroup(groupId);

  const group = groupData?.[0];

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateGroupPayload>({
    resolver: zodResolver(editGroupSchema),
    defaultValues: {
      name: '',
      description: '',
      no_of_students: 1,
      category: '',
      start_date: '',
      duration_in_days: undefined,
    },
  });

  // Edit mutation
  const { mutateAsync, isPending } = useEditGroup();

  /**
   * Populate form with existing group data
   */
  useEffect(() => {
    if (!group) return;

    reset({
      name: group.name ?? '',
       description: group.description ?? '',
      no_of_students: group.no_of_students?? 1,
      category: group.category ?? '',
      start_date: group.start_date ? String(group.start_date).slice(0, 10) : '',
      duration_in_days: group.duration_in_days ?? undefined,
    });

    setStudents(group.no_of_students ?? 1);
  }, [group, reset]);

  /**
   * Submit form
   */
  const onSubmit = async (data: UpdateGroupPayload) => {
    try {
      await mutateAsync({
        groupId,
        data: {
          name: data.name,
          description: data.description || '',
          no_of_students: students,
          category: data.category || '',
          start_date: data.start_date ,
          duration_in_days: data.duration_in_days,
        },
      });

      toast.success('Group updated successfully.');

      router.push(`/group/${groupId}`);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "We couldn't update the group. Please try again."
      );
    }
  };

  /**
   * Loading state
   */
  if (isLoadingGroup) {
    return (
      <div className="px-4 py-4 lg:py-8">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="animate-pulse space-y-6">
            <div className="mx-auto h-8 w-40 rounded bg-gray-200" />

            <div className="h-12 w-full rounded-xl bg-gray-200" />

            <div className="h-28 w-full rounded-xl bg-gray-200" />

            <div className="h-12 w-full rounded-xl bg-gray-200" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="h-12 rounded-xl bg-gray-200" />
              <div className="h-12 rounded-xl bg-gray-200" />
            </div>

            <div className="h-12 w-full rounded-xl bg-gray-200" />

            <div className="flex gap-3">
              <div className="h-12 w-32 rounded-xl bg-gray-200" />
              <div className="h-12 w-32 rounded-xl bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Error state
   */
  if (isGroupError || !group) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">
            Unable to load group information.
          </h2>

          <p className="mt-2 text-sm text-gray-500">Please try again.</p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 lg:py-8">
      <div className="mx-auto max-w-2xl">
        <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm md:p-8">
          {/* Top border */}
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gray-200">
            <div className="h-full w-[30%] bg-secondary" />
          </div>

          {/* Decorative element */}
          <div
            className="absolute bottom-0 right-0 h-28 w-28 bg-surface-container"
            style={{
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            }}
          />

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-headline-md text-primary">Edit Group</h1>

              <p className="mt-2 text-label-md text-text">
                Update your group information.
              </p>
            </div>

            {/* Mobile Image */}
            <div className="mb-6 md:hidden">
              <div className="overflow-hidden rounded-xl">
                <Image
                  src="/images/Decorative Element.png"
                  alt="Edit Group"
                  width={600}
                  height={220}
                  className="h-36 w-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Form */}
            <form
              id="editForm"
              className="space-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Group Name */}
              <div>
                <label className="mb-2 block text-label-md text-gray-700">
                  Group Name *
                </label>

                <input
                  {...register('name')}
                  type="text"
                  placeholder="Group name"
                  disabled={isPending}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-primary disabled:bg-gray-100"
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-label-md text-gray-700">
                  Description{' '}
                  <span className="text-[12px] text-text">(OPTIONAL)</span>
                </label>

                <textarea
                  {...register('description')}
                  rows={4}
                  placeholder="Group description"
                  disabled={isPending}
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-primary disabled:bg-gray-100"
                />

                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-label-md text-gray-700">
                  Category{' '}
                  <span className="text-[12px] text-text">(OPTIONAL)</span>
                </label>

                <input
                  {...register('category')}
                  type="text"
                  placeholder="React"
                  disabled={isPending}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-primary disabled:bg-gray-100"
                />

                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Students + Duration */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Number of Students */}
                <div>
                  <label className="mb-2 block text-label-md text-gray-700">
                    Number of Students *
                  </label>

                  <div className="flex items-center justify-between rounded-xl border border-gray-200 px-3 py-2">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() =>
                        setStudents((prev) => Math.max(1, prev - 1))
                      }
                      className="cursor-pointer text-4xl font-semibold text-primary disabled:opacity-50"
                    >
                      −
                    </button>

                    <span className="text-lg font-semibold">{students}</span>

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => setStudents((prev) => prev + 1)}
                      className="cursor-pointer text-4xl font-semibold text-primary disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>

                  {errors.no_of_students && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.no_of_students.message}
                    </p>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <label className="mb-2 block text-label-md text-gray-700">
                    Duration{' '}
                    <span className="text-[12px] text-text">(OPTIONAL)</span>
                  </label>

                  <div className="relative">
                    <input
                      {...register('duration_in_days', {
                        valueAsNumber: true,
                      })}
                      type="number"
                      min={1}
                      placeholder="30"
                      disabled={isPending}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-16 outline-none focus:border-primary disabled:bg-gray-100"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text">
                      days
                    </span>
                  </div>

                  {errors.duration_in_days && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.duration_in_days.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="mb-2 block text-label-md text-gray-700">
                  Start Date{' '}
                  <span className="text-[12px] text-text">(OPTIONAL)</span>
                </label>

                <input
                  {...register('start_date')}
                  type="date"
                  disabled={isPending}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary disabled:bg-gray-100"
                />

                {errors.start_date && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.start_date.message}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-xl bg-primary px-6 py-3 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isPending ? 'Saving...' : 'Save Changes'}
                </button>

                <Link
                  href={`/group/${groupId}`}
                  className="rounded-xl border border-primary px-6 py-3 text-center text-primary transition hover:bg-primary hover:text-white"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
