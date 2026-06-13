"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCurrentUser } from "@/redux/features/userThunks";

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

  if (loading) return null;

  if (!user) return null;

  return <>{children}</>;
}