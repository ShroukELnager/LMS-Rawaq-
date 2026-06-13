"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCurrentUser } from "@/redux/features/userThunks";

function SidebarPlaceholder() {
  return (
    <aside className="hidden h-full w-72 shrink-0 bg-[#E6E3D0] lg:block" />
  );
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const { loading, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user && !loading) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user, loading]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <SidebarPlaceholder />

        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <SidebarPlaceholder />

        <p className="text-gray-500">Unauthorized</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <SidebarPlaceholder />
      <main className="flex-1">{children}</main>
    </div>
  );
}