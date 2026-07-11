'use client';

import { ArrowRight } from 'lucide-react';

type Member = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

const members: Member[] = [
  {
    id: 1,
    name: 'Sara Ali',
    email: 'sara.ali@student.edu',
    avatar: 'https://i.pravatar.cc/100?img=1',
  },
  {
    id: 2,
    name: 'Omar Khaled',
    email: 'omar.k@student.edu',
    avatar: 'https://i.pravatar.cc/100?img=12',
  },
  {
    id: 3,
    name: 'Laila Hassan',
    email: 'l.hassan@student.edu',
    avatar: 'https://i.pravatar.cc/100?img=5',
  },
];

export default function GroupMembers() {
  return (
    <div className="rounded-2xl bg-[#F3F6FC] p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#045D6C]">Group Members</h2>

        <button className="text-sm font-medium text-[#045D6C] hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="h-12 w-12 rounded-full object-cover"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-[#101828]">{member.name}</h3>

              <p className="text-xs text-gray-500">{member.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
