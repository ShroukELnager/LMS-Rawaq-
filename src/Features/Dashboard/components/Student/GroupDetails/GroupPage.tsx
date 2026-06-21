"use client";

import { ClipboardList, FileText, Users } from "lucide-react";
import HeaderCard from "./HeaderCard";
import SectionCard from "./SectionCard";
import {
  assignmentsMock,
  latestPostsMock,
} from "@/Features/Dashboard/data";
import PostCard from "./PostCard";
import AssignmentCard from "./AssignmentCard";
import FloatingButton from "./FloatingButton";
import { useState } from "react";
import CreatePostModal from "../Posts/CreatePostModal";
import SuccessModal from "../Posts/SuccessModal";

type GroupPageProps = {
  groupId: string;
};

export default function GroupPage({ groupId }: GroupPageProps) {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const group = {
    id: groupId,
    name: "Frontend Group 2", 
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-5">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        {/* <HeaderCard group={group} /> */}

        {/* Top Cards */}
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <SectionCard
            title="Posts"
            description="Stay updated with class updates"
            icon={<FileText size={18} color="#0F766E" />}
            borderColor="#0F766E"
            iconBg="#D8EEF0"
          />

          <SectionCard
            title="Assignments"
            description="Manage your submissions"
            icon={<ClipboardList size={18} color="#A16207" />}
            borderColor="#A16207"
            iconBg="#FFF2D8"
          />

          <SectionCard
            title="Members"
            description="Connect with classmates"
            icon={<Users size={18} color="#78716C" />}
            borderColor="#78716C"
            iconBg="#F1F0EA"
          />
        </div>

        {/* Content */}
        <div
          style={{
            marginTop: "32px",
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "2fr 1fr",
          }}
        >
          {/* Posts */}
          <div>
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h2 style={{ fontSize: "24px", fontWeight: 700 }}>
                Latest Posts
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {latestPostsMock.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Assignments */}
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 700 }}>
              Assignments
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {assignmentsMock.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                />
              ))}
            </div>
          </div>
        </div>

        <FloatingButton onClick={() => setIsCreatePostOpen(true)} />

        {isCreatePostOpen && (
          <CreatePostModal
            onClose={() => setIsCreatePostOpen(false)}
            onSuccess={() => {
              setIsCreatePostOpen(false);
              setIsSuccessModalOpen(true);
            }}
            groupId={groupId} 
          />
        )}

        {isSuccessModalOpen && (
          <SuccessModal
            onClose={() => setIsSuccessModalOpen(false)}
          />
        )}

      </div>
    </div>
  );
}