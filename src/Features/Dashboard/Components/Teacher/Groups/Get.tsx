"use client";
import useGetTeacherGroups from '@/Features/Dashboard/Hooks/useGetTeacherGroups';
import { TeacherGroup } from '@/Features/Dashboard/Types';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { Group } from 'next/dist/shared/lib/router/utils/route-regex';
import { useRouter } from 'next/navigation';
import { GroupCard } from './Cart';
import { GroupCardSkeleton } from '@/Features/Dashboard/Skeleton/Teacher/AllGroups';
import ErrorState from '@/Features/Dashboard/Errors/ErrorToLoadPage';
import NoGroupsState from '@/Features/Dashboard/Empty/EmptyTeacherGroups';
import {Filter} from 'lucide-react';
// import {Filter} from '@assets/icons/filter.svg';



export default function TeacherGroupsPage() {
  const router = useRouter();

  const { data: groups = [], isLoading, isError ,refetch} = useGetTeacherGroups();
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl p-4 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                My Learning Groups
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-gray-500">
                Manage your learning groups and monitor their activity. Organize
                cohorts, track assignments, and foster student discussion in a
                structured academic environment.
              </p>
            </div>

            <button
              onClick={() => {
                router.push('/group/create');
              }}
              className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-5 text-white hover:bg-[#014950]"
            >
              <Plus size={18} />
              Create New Group
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                placeholder="Search by group name..."
                className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 outline-none focus:ring-2 focus:ring-teal-700"
              />
            </div>

            <select className="h-12 rounded-xl border border-gray-200 bg-white px-4">
              <option>Newest</option>
              <option>Oldest</option>
            </select>

            <button className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-[#E7EEFF]">
              <Filter size={18} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <GroupCardSkeleton key={index} />
              ))
            ) : isError ? (
              <div className="col-span-full">
                <ErrorState message="Failed to load groups" onRetry={refetch} />
              </div>
            ) : groups.length === 0 ? (
              <NoGroupsState />
            ) : (
              <>
                {groups.map((group: TeacherGroup) => (
                  <GroupCard key={group.id} group={group} />
                ))}

                <div className="flex min-h-[340px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white">
                  <button
                    onClick={() => router.push('/group/create')}
                    className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-3xl text-gray-500"
                  >
                    +
                  </button>

                  <h3 className="mt-6 text-2xl font-semibold text-gray-700">
                    Add Group
                  </h3>

                  <p className="mt-2 text-center text-sm text-gray-400">
                    Start a new learning journey
                    <br />
                    with a fresh cohort.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
}
