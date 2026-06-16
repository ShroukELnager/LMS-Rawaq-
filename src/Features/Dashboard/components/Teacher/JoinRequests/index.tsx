"use client";

import useJoinRequests from "@/Features/Dashboard/hooks/useJoinRequests";
import JoinRequestsDesktop from "./JoinRequestsDesktop";
import JoinRequestsMobile from "./JoinRequestsMobile";


export default function JoinRequests() {
  const joinRequestsQuery = useJoinRequests();

  return (
    <>
      <div className="hidden lg:block">
        <JoinRequestsDesktop
          {...joinRequestsQuery}
        />
      </div>

      <div className="block lg:hidden">
        <JoinRequestsMobile
          {...joinRequestsQuery}
        />
      </div>
    </>
  );
}