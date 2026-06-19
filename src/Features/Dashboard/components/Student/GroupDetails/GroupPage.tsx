import { ClipboardList, FileText, Users } from "lucide-react";
import HeaderCard from "./HeaderCard";
import SectionCard from "./SectionCard";
import { assignmentsMock, groupMock, latestPostsMock } from "@/Features/Dashboard/data";
import PostCard from "./PostCard";
import AssignmentCard from "./AssignmentCard";
import FloatingButton from "./FloatingButton";





export default function GroupPage() {
    return (
        <div className="min-h-screen bg-[#F5F7FA] p-5">
            <div className="mx-auto max-w-7xl">

                <HeaderCard group={groupMock} />

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
                    {/* Latest Posts */}
                    <div>
                        <div
                            style={{
                                marginBottom: "20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: "24px",
                                    fontWeight: 700,
                                    color: "#101828",
                                }}
                            >
                                Latest Posts
                            </h2>

                            <button
                                style={{
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    color: "#006d77",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                View All Posts
                            </button>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                            }}
                        >
                            {latestPostsMock.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>

                    {/* Assignments */}
                    <div>
                        <h2
                            style={{
                                marginBottom: "20px",
                                fontSize: "20px",
                                fontWeight: 700,
                                color: "#101828",
                            }}
                        >
                            Assignments
                        </h2>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                            }}
                        >
                            {assignmentsMock.map((assignment) => (
                                <AssignmentCard
                                    key={assignment.id}
                                    assignment={assignment}
                                />
                            ))}
                        </div>
                    </div>
                </div>


                <FloatingButton />

            </div>
        </div>
    );
}