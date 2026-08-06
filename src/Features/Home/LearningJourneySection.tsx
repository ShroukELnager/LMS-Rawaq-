import Link from 'next/link';
import React from 'react'

export default function LearningJourneySection() {
  return (
    <div className="md:pt-[4rem] md:pb-[48px] bg-[#F9F9FF] md:px-[24px]">
      <div className="bg-[#006D77] md:rounded-[24px] py-[80px] md:py-[4rem] text-center px-[16px]">
        <h1 className="font-inter text-[28px] md:text-[3rem]  font-bold leading-[56px] tracking-[-0.96px] text-center text-white">
          Start Your Learning Journey Today
        </h1>
        <p className="font-inter my-[24px]  text-[18px] font-normal leading-[28px] tracking-[0px] text-center text-[#FFFFFFCC]">
          Join thousands of students and expert mentors in the most structured
          educational platform online.
        </p>
        <Link
          href="/signup"
          className="inline-block h-14 w-[224px] mt-[16px] py-4 px-8 rounded-full bg-white text-[#006D77] font-inter font-bold text-[16px] leading-[24px] tracking-[0px] text-center"
        >
          Create Free Account
        </Link>
      </div>
    </div>
  );
}
