'use client';

import Image from 'next/image';
import { useMemo } from 'react';

type Teacher = {
  first_name: string;
  last_name: string;
  avatar_url: string | null;
};

type AssignmentHeaderProps = {
  title: string;
  teacher: Teacher;
};

function getRandomAvatarColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 21) + 65;
  const lightness = Math.floor(Math.random() * 16) + 40;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export default function AssignmentHeader({
  title,
  teacher,
}: AssignmentHeaderProps) {
  const initials = `${teacher.first_name.charAt(0)}${teacher.last_name.charAt(0)}`;

  const avatarColor = useMemo(() => getRandomAvatarColor(), []);

  return (
    <div>
      <h1 className="font-inter text-2xl font-bold leading-8 text-[#111C2C]">
        {title}
      </h1>

      <div className="mt-4 flex items-center gap-3">
        {teacher.avatar_url ? (
          <Image
            src={teacher.avatar_url}
            alt={`${teacher.first_name} ${teacher.last_name}`}
            width={28}
            height={28}
            className="h-7 w-7 rounded-full border-2 border-primary object-cover"
          />
        ) : (
          <div
            style={{ backgroundColor: avatarColor }}
            className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary text-xs font-semibold text-white"
          >
            {initials.toUpperCase()}
          </div>
        )}

        <p className="font-inter text-base font-normal leading-6 tracking-normal text-[#3E494A]">
          {teacher.first_name} {teacher.last_name}
        </p>
      </div>
    </div>
  );
}
