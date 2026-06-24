import Image from "next/image";
import { Heart, MessageSquare } from "lucide-react";
import { PostCardProps } from "@/Features/Dashboard/Types";



export default function PostCard( post : PostCardProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <Image
          src={post.author?.avatar_url || '/images/avatar.png'}
          alt={post.author?.first_name || 'User'}
          width={45}
          height={45}
          className="rounded-full"
        />

        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-[#101828]">
              {post.author?.first_name} {post.author?.last_name}
            </h3>

            <span className="text-xs text-[#98A2B3]">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>

          <span className="text-xs text-teal-700">Instructor</span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-[#475467] line-clamp-3">
        {post.content}
      </p>

      <div className="mt-4 flex gap-6">
        <div
          className={`flex items-center gap-2 text-sm ${
            post.is_liked ? 'text-red-500' : 'text-[#667085]'
          }`}
        >
          <Heart size={15} className={post.is_liked ? 'fill-red-500' : ''} />

          <span>{post.likes_count} likes</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#667085]">
          <MessageSquare size={15} />
          <span>{post.comments_count} comments</span>
        </div>
      </div>
    </div>
  );
}