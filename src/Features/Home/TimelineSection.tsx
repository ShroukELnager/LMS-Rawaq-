import Image, { StaticImageData } from 'next/image';

import CAcount from '../../assets/icons/createAcountIcon.svg';
import JGroup from '../../assets/icons/JoinGroupIcon.svg';
import Learn from '../../assets/icons/learnIcon.svg';
import Scale from '../../assets/icons/scaleIcon.svg';
import { Icon } from 'lucide-react';

import { ComponentType, SVGProps } from 'react';

const steps: {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  {
    title: 'Create Account',
    description:
      'Set up your profile and identify your learning objectives and expertise.',
    icon: CAcount,
  
  },
  {
    title: 'Join Group',
    description:
      'Browse specialized groups and join the cohort that matches your schedule and pace.',
    icon: JGroup,

  },
  {
    title: 'Engage & Learn',
    description:
      'Access curriculum, complete assignments, and receive feedback from mentors.',
    icon: Learn,

  },
  {
    title: 'Scale & Grow',
    description:
      'Certify your knowledge and move into advanced cohorts or mentorship roles.',
    icon: Scale,
   
  },
];

export default function TimelineSection() {
  
  return (
    <section className="py-[64px] md:py-[6rem]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center">
          <h1 className="font-inter text-center text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.02rem] text-[#111C2C]">
            Your Path to Mastery
          </h1>

          <p className="mt-4 max-w-[720px] text-center font-inter text-[1rem] font-normal leading-[1.5rem] text-[#3E494A]">
            A streamlined journey from novice to knowledge expert.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-[48px] md:mt-[80px]">
          <div className="flex flex-col md:flex-row">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
const StepIcon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative flex md:flex-1 md:flex-col md:mr-[2.25rem]"
                >
                  {/* Mobile */}
                  <div className="relative flex shrink-0 md:hidden">
                    {!isLast && (
                      <div className="absolute top-12 left-6 h-[calc(100%+2rem)] w-[2px] bg-[#E6E3D0]" />
                    )}

                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#016D77] font-inter text-[1rem] font-semibold text-white">
                      {index + 1}
                    </div>
                  </div>

                  {/* Desktop */}
                  <div className="hidden md:flex md:items-center md:w-full relative">
                    <div className="absolute left-0 right-[-2.25rem] h-[4px] bg-[#E6E3D0]" />

                    <div className="relative z-10 shrink-0 rounded-full bg-white p-[4px] shadow-[0px_8px_10px_-6px_#0000001A,0px_20px_25px_-5px_#0000001A]">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#016D77]">
                        <StepIcon className="h-7 w-7" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-[48px]  md:pt-[24px]">
                    <h3 className=" font-inter text-[16px] md:text-[1.5rem] font-semibold leading-[24px] md:leading-[2rem] text-[#111C2C]   ">
                      {step.title}
                    </h3>

                    <p className=" pt-[8px] font-inter text-[16px] md:text-[1rem] font-normal leading-[24px] md:leading-[1.5rem] text-[#3E494A]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
