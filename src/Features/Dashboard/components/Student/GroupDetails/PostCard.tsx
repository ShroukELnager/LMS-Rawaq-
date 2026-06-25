'use client';

import Image from 'next/image';
import { Heart, MessageSquare, SendHorizontal } from 'lucide-react';
import { PostCardProps } from '@/Features/Dashboard/Types';
import { fixSupabaseUrl } from '@/Features/Dashboard/lib/FixSupabaseUrl';
import { useAppSelector } from '@/redux/hooks';
import { formatRequestTime } from '@/Features/Dashboard/lib/FormatRequestTime';
import useLikePosts from '@/Features/Dashboard/hooks/useLikePosts';
import useUnlikePost from '@/Features/Dashboard/hooks/useUnLikePosts';
import useCreateComments from '@/Features/Dashboard/hooks/useCreateComment';
import { useState } from 'react';

export default function PostCard(post: PostCardProps) {
  const avatarUrl = fixSupabaseUrl(post.author?.avatar_url);

  const user = useAppSelector((state) => state.user.user);

  const { mutate: likePost } = useLikePosts();

  const { mutate: unlikePost } = useUnlikePost();


    const [content, setContent] = useState("");
   
  const handleLike = () => {
    if (!user?.id) return;

    if (post.is_liked) {
      unlikePost({
        post_id: post.id,
        user_id: user.id,
      });
    } else {
      likePost({
        post_id: post.id,
      });
    }
  };



  const { posts, isPending } = useCreateComments();

      const handlePublish = () => {
        if (!content.trim()) return;

        posts(
          {
            post_id: post.id,
            content: content,
          },
          {
            onSuccess: () => {
              setContent('');
            },
          }
        );
      };
 return (
   <div className="rounded-2xl bg-white p-5 shadow-sm">
     <div className="flex items-center gap-3">
       <Image
         src={avatarUrl || '/images/avatar.png'}
         alt="user"
         width={45}
         height={45}
         className="rounded-full object-cover"
       />

       <div>
         <div className="flex items-center gap-2">
           <h3 className="font-semibold text-[#101828]">
             {post.author?.first_name} {post.author?.last_name}
           </h3>

           {user?.user_metadata?.account_type === 'teacher' && (
             <span className="rounded bg-primary px-2 py-0.5 text-xs text-white">
               Instructor
             </span>
           )}
         </div>

         <span className="text-xs text-[#98A2B3]">
           {formatRequestTime(post.created_at)}
         </span>
       </div>
     </div>

     <p className="mt-4 text-sm leading-7 text-[#475467]">{post.content}</p>

     <div className="mt-5 flex items-center gap-8 border-b border-[#EAECF0] pb-4">
       <button
         onClick={handleLike}
         className={`flex items-center gap-2 text-sm transition ${
           post.is_liked ? 'text-red-500' : 'text-[#667085]'
         }`}
       >
         <Heart size={18} className={post.is_liked ? 'fill-red-500' : ''} />

         <span>{post.likes_count}</span>
       </button>

       <div className="flex items-center gap-2 text-sm text-[#667085]">
         <MessageSquare size={18} />

         <span>{post.comments_count}</span>
       </div>
     </div>

     {/* ================= Comments ================= */}

     <div className="mt-5 space-y-4">
       {/* Comment 1 */}
       <div className="flex items-start gap-3">
         <Image
           src="/images/avatar.png"
           alt="comment"
           width={36}
           height={36}
           className="h-9 w-9 rounded-full object-cover"
         />

         <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-[#EEF4FF] px-4 py-3">
           <h4 className="text-sm font-semibold text-[#101828]">Sara Ali</h4>

           <p className="mt-1 text-sm text-[#475467]">
             Thanks Professor! The video explanation was very clear.
           </p>
         </div>
       </div>

       {/* Comment 2 */}
       <div className="flex items-start gap-3">
         <Image
           src="/images/avatar.png"
           alt="comment"
           width={36}
           height={36}
           className="h-9 w-9 rounded-full object-cover"
         />

         <div className="max-w-[70%] rounded-2xl rounded-tl-md bg-[#EEF4FF] px-4 py-3">
           <h4 className="text-sm font-semibold text-[#101828]">Omar Khaled</h4>

           <p className="mt-1 text-sm text-[#475467]">
             Excited to start this module!
           </p>
         </div>
       </div>
     </div>

     {/* ================= Add Comment ================= */}

     <div className="mt-5 flex items-center gap-3">
       <Image
         src={
           fixSupabaseUrl(user?.user_metadata?.avatar_url) ||
           '/images/avatar.png'
         }
         alt="current-user"
         width={38}
         height={38}
         className="h-10 w-10 rounded-full object-cover"
       />

       <div className="relative flex-1">
         <input
           value={content}
           onChange={(e) => setContent(e.target.value)}
           type="text"
           placeholder="Write a comment..."
           className="
        h-11
        w-full
        rounded-xl
        border
        border-[#D0D5DD]
        bg-[#EEF4FF]
        pl-4
        pr-12
        text-sm
        text-[#344054]
        outline-none
        placeholder:text-[#98A2B3]
        transition
        focus:border-primary
        focus:bg-white
        
      "
         />

         <button
           onClick={handlePublish}
           disabled={isPending}
           type="button"
           className="
    absolute
    right-3
    top-1/2
    -translate-y-1/2
    text-primary
    transition
    hover:text-primary/80
    active:scale-95
    cursor-pointer
  "
         >
           <SendHorizontal size={20} strokeWidth={2} />
         </button>
       </div>
     </div>
   </div>
 );
}
