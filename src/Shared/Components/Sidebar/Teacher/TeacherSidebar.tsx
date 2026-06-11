"use client";

import DesktopSidebar from "./DesktopView";
import MobileBottomNav from "./MobileView";



export default function TeacherSidebar() {
  return (
    <>
      <DesktopSidebar />
      <MobileBottomNav />
    </>
  );
}