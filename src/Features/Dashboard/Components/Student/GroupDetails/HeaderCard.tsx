import useGetSingleGroup from '@/Features/Dashboard/Hooks/useGetSingleGroup';
import Image from 'next/image';
import { Plus, } from 'lucide-react';
import ClipboardPlus from '@/assets/icons/ClipboardPlus.svg';
import { useRouter } from 'next/navigation';
type HeaderCardProps = {
  groupId: string;
};

export default function HeaderCard({ groupId }: HeaderCardProps) {
  const { data } = useGetSingleGroup(groupId);
  const group = data?.[0];
const router =useRouter()
  if (!group) return null;

  return (
    <div
      style={{
        borderRadius: '16px',
        backgroundColor: '#fff',
        padding: '24px',
        color: '#111',
        boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
        }}
      >
        {/* <Image
          src={group.instructor.avatar || '/default-avatar.png'}
          alt={group.instructor.fullName}
          width={56}
          height={56}
          style={{
            borderRadius: '50%',
            border: '2px solid #006d77',
          }}
        /> */}

        <div className="flex-1">
          {/* <h1
            style={{
              fontSize: '24px',
              fontWeight: 700,
              margin: 0,
              color: '#005F6B',
            }}
          >
            {group.title}
          </h1>

          <p
            style={{
              marginTop: '4px',
              fontSize: '14px',
              color: '#3E494A',
            }}
          >
            Instructor: {group.instructor.fullName}
          </p> */}

          <p
            style={{
              marginTop: '8px',
              fontSize: '14px',
              color: '#3E494A',
            }}
          >
            {group.description}
          </p>

          {/* Buttons */}
          <div className="mt-5 flex gap-3">
            <button
              className="
                flex h-10 items-center gap-2 rounded-lg
                bg-[#006D77] px-5
                text-sm font-semibold text-white
                transition hover:bg-[#005F6B]
              "
            >
              <Plus size={18} />
              Create New Post
            </button>

            <button
              className="
                flex h-10 items-center gap-2 rounded-lg
                border border-[#006D77]
                px-5
                text-sm font-semibold text-[#006D77]
                transition hover:bg-[#E6F5F5]
              "
            >
              <ClipboardPlus size={18} />
              Create Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
