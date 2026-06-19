import Image from "next/image";
import { Group } from "@/Features/Dashboard/data";

type HeaderCardProps = {
  group: Group;
};

export default function HeaderCard({ group }: HeaderCardProps) {
  return (
    <div
      style={{
        borderRadius: "16px",
        backgroundColor: "#006d77", 
        padding: "24px",
        color: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Image
          src={group.instructor.avatar}
          alt={group.instructor.fullName}
          width={56}
          height={56}
          style={{
            borderRadius: "50%",
            border: "2px solid #fff",
          }}
        />

        <div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 700,
              margin: 0,
            }}
          >
            {group.title}
          </h1>

          <p
            style={{
              marginTop: "4px",
              fontSize: "14px",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Instructor: {group.instructor.fullName}
          </p>

          <p
            style={{
              marginTop: "8px",
              fontSize: "14px",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {group.description}
          </p>
        </div>
      </div>
    </div>
  );
}