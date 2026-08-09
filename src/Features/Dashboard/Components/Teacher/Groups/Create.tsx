"use client";

import Image from "next/image";
import { useState } from "react";
import { createGroupSchema } from "../../../Schema/CreateGroup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createGroupService } from "../../../lib/Services/teacher/creatGroups.service";
import {
  CreateGroupFormData,
  CreateGroupFormInput,
} from "../../../Types";

export default function CreateGroup() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [students, setStudents] = useState<number>(1);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateGroupFormInput, unknown, CreateGroupFormData>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      no_of_students: 1,
      duration_in_days: undefined,
      start_date: undefined,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createGroupService,

    onSuccess: () => {
      toast.success("Project created successfully");

      queryClient.invalidateQueries({ queryKey: ["groups"] });

      reset();
      setStudents(20);

      router.push("/group");
    },

    onError: (error: unknown) => {
  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Something went wrong");
  }
},
  });

  const onSubmit = async (data: CreateGroupFormData) => {
    await mutateAsync({
      ...data,
      no_of_students: students,
    });
  };

  return (
    <div className="px-4 py-4 lg:py-8">
      <div className="mx-auto max-w-2xl">
        <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm md:p-8">

          <div className="absolute inset-x-0 top-0 h-[4px] bg-gray-200">
            <div className="h-full w-[30%] bg-secondary" />
          </div>

          <div
            className="absolute bottom-0 right-0 h-28 w-28 bg-surface-container"
            style={{
              clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
            }}
          />

          <div className="relative z-10">

            <div className="mb-8 text-center">
              <h1 className="text-headline-md text-primary">
                Create New Group
              </h1>

              <p className="mt-2 text-label-md text-text">
                Set up a new learning space for your students and start
                organizing your mentorship journey.
              </p>
            </div>

            <div className="mb-6 md:hidden">
              <div className="overflow-hidden rounded-xl">
                <Image
                  src="/images/Decorative Element.png"
                  alt="Create Group"
                  width={600}
                  height={220}
                  className="h-36 w-full object-cover"
                  priority
                />
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

              <div>
                <label className="mb-2 block text-label-md text-gray-700">
                  Group Name *
                </label>

                <input
                  {...register("name")}
                  type="text"
                  placeholder="Frontend Mentorship - Batch 2"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-primary"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-label-md text-gray-700">
                  Category{" "}
                  <span className="text-[12px] text-text">
                    (OPTIONAL)
                  </span>
                </label>

                <input
                  {...register("category")}
                  type="text"
                  placeholder="Frontend Development, React, Algorithms"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-label-md text-gray-700">
                  Description{" "}
                  <span className="text-[12px] text-text">
                    (OPTIONAL)
                  </span>
                </label>

                <textarea
                  {...register("description")}
                  rows={4}
                  placeholder="Describe the purpose, goals, and expectations of this group..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-label-md text-gray-700">
                    Maximum Students *
                  </label>

                  <div className="flex items-center justify-between rounded-xl border border-gray-200 px-3 py-2">

                    <button
                      type="button"
                      onClick={() =>
                        setStudents((prev) => Math.max(1, prev - 1))
                      }
                      className="text-4xl font-semibold text-primary"
                    >
                      −
                    </button>

                    <span className="text-lg font-semibold">
                      {students}
                    </span>

                    <button
                      type="button"
                      onClick={() => setStudents((prev) => prev + 1)}
                      className="text-4xl font-semibold text-primary"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-label-md text-gray-700">
                    Duration{" "}
                    <span className="text-[12px] text-text">
                      (OPTIONAL)
                    </span>
                  </label>

                  <div className="relative">
                    <input
                      {...register("duration_in_days")}
                      type="number"
                      placeholder="90"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-16 outline-none focus:border-primary"
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

              <div>
                <label className="mb-2 block text-label-md text-gray-700">
                  Start Date{" "}
                  <span className="text-[12px] text-text">
                    (OPTIONAL)
                  </span>
                </label>

                <input
                  {...register("start_date")}
                  type="date"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                />
                {errors.start_date && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.start_date.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 pt-4 sm:flex-row">

                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-xl bg-primary px-6 py-3 text-white transition hover:opacity-90 disabled:opacity-50"
                >
                  {isPending ? "Creating..." : "Create Group"}
                </button>

                <Link
                  href="/Dashboard"
                  className="rounded-xl border border-primary px-6 py-3 text-center text-primary transition hover:bg-primary hover:text-white"
                >
                  Back
                </Link>

              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}