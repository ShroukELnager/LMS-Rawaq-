"use client";

import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useState } from "react";

interface UserAvatarProps {
  size?: number;
}

function fixSupabaseUrl(url?: string) {
  if (!url) return "";

  return url.replace(
    "https://nyrnpjrhajarawlpyxdd.supabase.co//",
    "https://nyrnpjrhajarawlpyxdd.supabase.co/"
  );
}

export default function UserAvatar({ size = 40 }: UserAvatarProps) {
  const user = useAppSelector((state) => state.user.user);
  const [imgError, setImgError] = useState(false);

  const firstName = user?.user_metadata?.first_name?.trim() || "";
  const lastName = user?.user_metadata?.last_name?.trim() || "";

  const rawAvatar = user?.user_metadata?.avatar_url?.trim();
  const avatarUrl = fixSupabaseUrl(rawAvatar);

  const initials =
    firstName && lastName
      ? `${firstName[0]}${lastName[0]}`.toUpperCase()
      : firstName.slice(0, 2).toUpperCase();

  // لو مفيش صورة أو فيها error → fallback
  if (!avatarUrl || imgError) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-primary text-white font-semibold"
        style={{
          width: size,
          height: size,
          fontSize: size * 0.4,
        }}
      >
        {initials || "US"}
      </div>
    );
  }

  return (
    <Image
      src={avatarUrl}
      alt="avatar"
      width={size}
      height={size}
      className="rounded-full object-cover"
      onError={() => setImgError(true)}
    />
  );
}