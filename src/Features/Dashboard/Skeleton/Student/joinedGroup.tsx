import React from "react";

export default function JoinedGroupSkeleton() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-gray-300 bg-white p-4 shadow-sm"
        >
          <div className="animate-pulse">
            <div className="h-7 w-24 rounded-full bg-gray-200" />

            <div className="mt-4 h-6 w-3/4 rounded bg-gray-200" />

            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200" />

              <div className="flex-1">
                <div className="h-4 w-32 rounded bg-gray-200" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-gray-200" />
              <div className="h-4 w-40 rounded bg-gray-200" />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-gray-200" />
              <div className="h-4 w-28 rounded bg-gray-200" />
            </div>

            <div className="mt-5 h-11 w-full rounded-lg bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}