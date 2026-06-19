import Image from "next/image";
import { Heart, MessageSquare } from "lucide-react";
import { Post } from "@/Features/Dashboard/data";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <div
      style={{
        borderRadius: "16px",
        backgroundColor: "#fff",
        padding: "20px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <Image
          src={post.authorAvatar}
          alt={post.authorName}
          width={45}
          height={45}
          style={{
            borderRadius: "50%",
          }}
        />

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <h3
              style={{
                fontWeight: 600,
                color: "#101828",
              }}
            >
              {post.authorName}
            </h3>

            <span
              style={{
                fontSize: "12px",
                color: "#98A2B3",
              }}
            >
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          <span
            style={{
              fontSize: "12px",
              color: "#0F766E",
            }}
          >
            Instructor
          </span>
        </div>
      </div>

      <p
        style={{
          marginTop: "16px",
          fontSize: "14px",
          lineHeight: "28px",
          color: "#475467",
        }}
      >
        {post.content}
      </p>

      <div
        style={{
          display: "flex",
          gap: "24px",
          marginTop: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            color: "#667085",
          }}
        >
          <Heart size={15} />
          {post.likesCount} likes
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            color: "#667085",
          }}
        >
          <MessageSquare size={15} />
          {post.commentsCount} comments
        </div>
      </div>
    </div>
  );
}