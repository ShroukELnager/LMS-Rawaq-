"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { fixSupabaseUrl } from "@/Features/Dashboard/lib/FixSupabaseUrl";

interface StudentAvatarProps {
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  size?: number;
}

const COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-rose-500",
];

export default function StudentAvatar({
  firstName,
  lastName,
  avatarUrl,
  size = 40,
}: StudentAvatarProps) {
  const [imgError, setImgError] = useState(false);

  const fixedAvatar = fixSupabaseUrl(avatarUrl?.trim());

  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

  const bgColor = useMemo(() => {
    const text = `${firstName}${lastName}`;

    const hash = text
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return COLORS[hash % COLORS.length];
  }, [firstName, lastName]);

  if (!fixedAvatar || imgError) {
    return (
      <div
        className={`flex items-center justify-center rounded-full font-semibold text-white ${bgColor}`}
        style={{
          width: size,
          height: size,
          fontSize: size * 0.4,
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
      className="rounded-full object-cover"
      onError={() => setImgError(true)}
    />
  );
}