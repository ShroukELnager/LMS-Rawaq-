import { CalendarDays } from "lucide-react";
import {
    AssignmentCardProps,
    AssignmentStatus,
} from "@/Features/Dashboard/data";

export default function AssignmentCard({ assignment }: AssignmentCardProps) {
    const statusStyles: Record<
        AssignmentStatus,
        {
            badgeBg: string;
            badgeColor: string;
            borderColor: string;
        }
    > = {
        submitted: {
            badgeBg: "#006D77",
            badgeColor: "#FFFFFF",
            borderColor: "#006D77",
        },

        pending: {
            badgeBg: "#FEF3C7",
            badgeColor: "#B45309",
            borderColor: "#D6A63A",
        },

        late: {
            badgeBg: "#FEE2E2",
            badgeColor: "#DC2626",
            borderColor: "#DC2626",
        },

        graded: {
            badgeBg: "#DBEAFE",
            badgeColor: "#1D4ED8",
            borderColor: "#2563EB",
        },
    };

    const currentStyle = statusStyles[assignment.status];

    return (
        <div
            style={{
                borderRadius: "12px",
                borderLeftWidth: "4px",
                borderLeftStyle: "solid",
                borderLeftColor: currentStyle.borderColor,
                backgroundColor: "#fff",
                padding: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "12px",
                }}
            >
                <h3
                    style={{
                        fontWeight: 600,
                        color: "#101828",
                    }}
                >
                    {assignment.title}
                </h3>

                <span
                    style={{
                        borderRadius: "4px",
                        padding: "4px 8px",
                        fontSize: "10px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        backgroundColor: currentStyle.badgeBg,
                        color: currentStyle.badgeColor,
                    }}
                >
                    {assignment.status}
                </span>
            </div>

            <div
                style={{
                    marginTop: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "12px",
                    color: "#667085",
                }}
            >
                <CalendarDays size={13} />

                <span>
                    Due{" "}
                    {new Date(assignment.dueDate)
                        .toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        })
                        .toLowerCase()}        </span>
            </div>
        </div>
    );
}