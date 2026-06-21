"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Check } from "lucide-react";

type SuccessModalProps = {
  onClose: () => void;
};

export default function SuccessModal({ onClose }: SuccessModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">

      <div className="w-full max-w-[420px] rounded-3xl bg-white px-8 py-10 text-center shadow-2xl">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E0F2F1]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#006D77]">
            <Check
              size={32}
              color="#fff"
              strokeWidth={3}
            />
          </div>
        </div>


        <h2 className="mt-6 text-[30px] font-bold text-[#0f172a]">
          Great Success!
        </h2>


        <p className="mt-3 text-base leading-7 text-[#64748b]">
          Your post has been shared
          <br />
          successfully with the group.
        </p>


        <button
          onClick={onClose}
          className="
          mt-8
          w-full
          rounded-xl
          border-0
          bg-[#006d77]
          py-3.5
          text-base
          font-semibold
          text-white
          cursor-pointer
          transition
          hover:bg-[#00545c]
        "
        >
          Close
        </button>

      </div>

    </div>,
    document.body
  );
}