'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '@/redux/hooks';
import UserAvatar from '@/Shared/Utils/UserAvatar';
import Image from 'next/image';
import useCreatePosts from '@/Features/Dashboard/Hooks/useCreatePost';

type CreatePostModalProps = {
  onClose: () => void;
  onSuccess: () => void;
  groupId: string;
};

export default function CreatePostModal({
  onClose,
  onSuccess,
  groupId,
}: CreatePostModalProps) {
  const user = useAppSelector((state) => state.user.user);
  const [content, setContent] = useState('');

  const { posts, isPending } = useCreatePosts();

  const firstName = user?.user_metadata?.first_name?.trim() || '';
  const lastName = user?.user_metadata?.last_name?.trim() || '';

  const handlePublish = () => {
    if (!content.trim()) return;

    posts(
      {
        group_id: groupId,
        author_id: user?.id!,
        content: content,
      },
      {
        onSuccess: () => {
          setContent('');
          onClose();
          onSuccess();
        },
      }
    );
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white">
        <div className="flex items-center justify-between px-8 py-6">
          <h2 className="text-[28px] font-bold">Create New Post</h2>

          <button onClick={onClose} className="border-0 bg-transparent">
            <Image src="/images/close.png" alt="close" width={28} height={28} />
          </button>
        </div>

        <div className="px-8 pb-5">
          <div className="flex items-center gap-3">
            <UserAvatar size={60} />

            <div>
              <p className="font-semibold">
                {firstName} {lastName}
              </p>

              <p className="text-xs text-slate-500">Posting to Group</p>
            </div>
          </div>
        </div>

        <div className="px-8 pb-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="
          h-40
          w-full
          rounded-xl
          border
          border-[#ccc]
          p-3
          outline-none
        "
          />
        </div>

        <div className="flex justify-end gap-3 bg-slate-50 px-8 py-5">
          <button onClick={onClose} className="border-0 bg-transparent">
            Cancel
          </button>

          <button
            onClick={handlePublish}
            disabled={isPending}
            className="
          rounded-xl
          border-0
          bg-[#006d77]
          px-5
          py-2.5
          text-white
          disabled:opacity-60
        "
          >
            {isPending ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
