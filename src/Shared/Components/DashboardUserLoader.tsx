"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { fetchCurrentUser } from "@/redux/features/userThunks";

export default function DashboardUserLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return <>{children}</>;
}
