import Image from 'next/image';

type Teacher = {
  first_name: string;
  last_name: string;
  avatar_url: string | null;
};

type AssignmentHeaderProps = {
  title: string;
  teacher: Teacher;
};

const avatarColors = [
  'bg-[#006D77]',
  'bg-[#7C3AED]',
  'bg-[#2563EB]',
  'bg-[#059669]',
  'bg-[#DC2626]',
  'bg-[#D97706]',
];

function getAvatarColor(name: string) {
  const index =
    name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    avatarColors.length;

  return avatarColors[index];
}

export default function AssignmentHeader({
  title,
  teacher,
}: AssignmentHeaderProps) {
  const initials = `${teacher.first_name.charAt(0)}${teacher.last_name.charAt(0)}`;

  return (
    <div className="mb-8">
      {/* Title */}
      <h1
        className="
          font-inter
          text-[48px]
          font-bold
          leading-[60px]
          tracking-[-0.96px]
          text-[#111C2C]
        "
      >
        {title}
      </h1>

      {/* Teacher */}
      <div className="mt-4 flex items-center gap-3">
        {teacher.avatar_url ? (
          <Image
            src={teacher.avatar_url}
            alt={`${teacher.first_name} ${teacher.last_name}`}
            width={28}
            height={28}
            className="
              h-7
              w-7
              rounded-full
              border-2
              border-primary
              object-cover
            "
          />
        ) : (
          <div
            className={`
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              border-2
              border-primary
              text-xs
              font-semibold
              text-white
              ${getAvatarColor(teacher.first_name + teacher.last_name)}
            `}
          >
            {initials.toUpperCase()}
          </div>
        )}

        <p
          className="
            font-inter
            text-base
            font-normal
            leading-6
            tracking-normal
            text-[#3E494A]
          "
        >
          {teacher.first_name} {teacher.last_name}
        </p>
      </div>
    </div>
  );
}
