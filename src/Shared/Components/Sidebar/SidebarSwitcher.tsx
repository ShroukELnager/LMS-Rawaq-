"use client";

import { useAppSelector } from "@/redux/hooks";
import StudentSidebar from "./Student/StudentSidebar";
import TeacherSidebar from "./Teacher/TeacherSidebar";

function SidebarPlaceholder() {
  return (
    <aside className="hidden h-full w-72 shrink-0 bg-[#E6E3D0] lg:block" />
  );
}

export default function SidebarSwitcher() {
  const user = useAppSelector((state) => state.user.user);
  const loading = useAppSelector((state) => state.user.loading);

  if (loading && !user) {
    return <SidebarPlaceholder />;
  }

  const accountType = user?.user_metadata?.account_type;

  if (accountType === "teacher") {
    return <TeacherSidebar />;
  }
  else if
    (accountType === "student") {
    return <StudentSidebar />;
  }
  return <SidebarPlaceholder />;

}
