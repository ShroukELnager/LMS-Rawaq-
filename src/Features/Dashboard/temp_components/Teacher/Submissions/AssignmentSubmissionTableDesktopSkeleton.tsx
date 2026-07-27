export default function AssignmentSubmissionTableDesktopSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#EAECF0] bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EAECF0] bg-white px-6 py-4">
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-10 w-24 animate-pulse rounded-lg bg-gray-200"
            />
          ))}
        </div>

        <div className="h-10 w-[260px] animate-pulse rounded-lg bg-gray-200" />
      </div>

      {/* Table */}
      <table className="w-full">
        <thead className="bg-[#F0F3FF]">
          <tr className="text-left text-sm font-semibold text-[#3E494A]">
            {Array.from({ length: 5 }).map((_, index) => (
              <th key={index} className="px-6 py-8">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="border-t border-[#EAECF0]">
              {/* Student */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 animate-pulse rounded-full bg-gray-200" />

                  <div className="space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200" />
              </td>

              {/* Grade */}
              <td className="px-6 py-4">
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
              </td>

              {/* Date */}
              <td className="px-6 py-4">
                <div className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

                  <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                </div>
              </td>

              {/* Action */}
              <td className="px-6 py-4 text-center">
                <div className="mx-auto h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
