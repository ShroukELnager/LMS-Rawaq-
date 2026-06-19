"use client";

import Image from "next/image";

type Props = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  message = "Something went wrong",
  onRetry,
}: Props) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Image
        src="/images/error.svg"
        alt="error"
        width={60}
        height={60}
      />

      <h2 className="mt-4 text-xl font-semibold text-red-500">
        {message}
      </h2>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-primary px-5 py-2 text-white"
        >
          Try Again
        </button>
      )}
    </div>
  );
}