export default function GroupMembersTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      {/* Search */}
      <div className="px-6 pt-6">
        <div className="h-[49px] w-[384px] animate-pulse rounded-lg bg-[#F0F3FF]" />
      </div>

      {/* Table */}
      <div className="mt-6">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F0F3FF] text-left">
              <th className="px-6 py-4">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-300" />
              </th>

              <th className="px-6 py-4">
                <div className="h-4 w-16 animate-pulse rounded bg-gray-300" />
              </th>

              <th className="px-6 py-4">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-300" />
              </th>

              <th className="px-6 py-4">
                <div className="mx-auto h-4 w-16 animate-pulse rounded bg-gray-300" />
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />

                    <div className="space-y-2">
                      <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
                </td>

                <td className="px-6 py-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                </td>

                <td className="px-6 py-5 text-center">
                  <div className="mx-auto h-5 w-5 animate-pulse rounded bg-gray-200" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
