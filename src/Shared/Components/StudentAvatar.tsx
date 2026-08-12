'use client';

import Image from 'next/image';
import { useState } from 'react';
import { fixSupabaseUrl } from '@/Features/Dashboard/lib/FixSupabaseUrl';

interface StudentAvatarProps {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  avatarUrl?: string | null;
  size?: number;
}

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);

  return `hsl(${hue}, 70%, 50%)`;
};

export default function StudentAvatar({
  firstName,
  lastName,
  avatarUrl,
  size = 40,
}: StudentAvatarProps) {
  const [imgError, setImgError] = useState(false);

  const [bgColor] = useState(() => getRandomColor());

  const fixedAvatar = fixSupabaseUrl(avatarUrl?.trim());

  const initials =
    `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();

  if (!fixedAvatar || imgError) {
    return (
      <div
        className="flex items-center justify-center rounded-full border-2 border-primary font-semibold text-white"
        style={{
          width: size,
          height: size,
          fontSize: size * 0.4,
          backgroundColor: bgColor,
        }}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={fixedAvatar}
      alt={`${firstName} ${lastName}`}
      width={size}
      height={size}
      className="rounded-full border-2 border-primary object-cover"
      onError={() => setImgError(true)}
    />
  );
}
