"use client";

import Image from "next/image";

export default function EmptyGroups() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Image
        src="/images/empty.png"
        alt="no groups"
        width={140}
        height={140}
      />

      <h2 className="mt-4 text-xl font-semibold text-gray-700">
        No Groups Found
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        There are no learning groups available right now.
      </p>
    </div>
  );
}