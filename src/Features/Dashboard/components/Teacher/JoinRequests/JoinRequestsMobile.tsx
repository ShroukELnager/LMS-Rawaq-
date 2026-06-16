"use client";

import { JoinRequestsMobileProps } from "@/Features/Dashboard/Types";
import JoinRequestsHeader from "./JoinRequestsDesktopHeader";


export default function JoinRequestsMobile({
  requests,
}: JoinRequestsMobileProps) {
  return (
    <>
      <JoinRequestsHeader
        count={requests?.length ?? 0}
      />

      <div className="space-y-4 px-4">
        {requests?.map((request) => (
          <div
            key={request.id}
            className="rounded-xl border bg-white p-4"
          >
            Mobile Card
          </div>
        ))}
      </div>
    </>
  );
}