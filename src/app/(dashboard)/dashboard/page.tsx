'use client';

import { useAppSelector } from '@/redux/hooks';

export default function Page() {
  const user = useAppSelector((state) => state.user.user);

  const role = user?.user_metadata?.account_type;

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to the Dashboard
        </h1>

        <p className="mt-4 text-gray-600">
          {role === 'teacher'
            ? "You're logged in as a teacher. Your dashboard is currently under development and will be available soon."
            : "You're logged in as a student. Your dashboard is currently under development and will be available soon."}
        </p>

        <div className="mt-6 rounded-xl bg-[#EEF4FF] p-4">
          <p className="text-sm text-gray-700">
             Stay tuned! New features and analytics will be added here soon.
          </p>
        </div>
      </div>
    </div>
  );
}
