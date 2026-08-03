import { Plus } from "lucide-react";

type FloatingButtonProps = {
  onClick: () => void;
};

export default function FloatingButton({
  onClick,
}: FloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        absolute
        bottom-8
        right-8
        z-50
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-primary
        text-white
        shadow-lg
        transition
        hover:scale-105
        left-[65%] 
      "
    >
      <Plus size={24} />
    </button>
  );
}