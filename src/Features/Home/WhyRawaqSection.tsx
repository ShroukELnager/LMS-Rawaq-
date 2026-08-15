import EIcon from '@/assets/icons/experianceIcon.svg';
import MIcon from '@/assets/icons/mentorIcon.svg';
export default function WhyRawaqSection() {
  return (
    <>
      <section className="container mx-auto overflow-hidden px-6 md:py-[96px] bg-[#E7EEFF] hidden lg:flex">
        <div className="flex w-full items-center justify-between gap-8 xl:gap-16">
          {' '}
          {/* Text Section */}
          <div className="min-w-0 flex-1 text-left">
            {' '}
            <h1 className=" font-inter text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.02rem] text-[#111C2C] ">
              Why Educational Leaders Choose Rawaq
            </h1>
            <p className="font-inter text-[1rem] font-normal leading-[1.5rem] md:pt-[24px] text-[#3E494A]">
              We prioritize human connection and structured pedagogy over
              automated video dumping.
            </p>
            <div className="mt-[1.5rem] mb-[6rem] flex flex-col gap-[1.5rem]  py-[16px] gap-[1.5rem]">
              <div className=" flex  rounded-[0.75rem] shadow-[0px_1px_2px_0px_#0000000D] bg-white  ">
                <div className="py-[16px] pl-[16px] pr-[23px]">
                 <EIcon/>
                </div>
                <div className="flex flex-col gap-1 py-[16px]  ">
                  <h1 className="font-inter text-[1rem] font-bold leading-[1.5rem] text-[#111C2C]">
                    Structured Experience
                  </h1>
                  <p className="font-inter text-sm font-normal leading-5 text-[#3E494A]">
                    Logical progressions that build deep foundational knowledge.
                  </p>
                </div>
              </div>
              <div className=" flex  rounded-[0.75rem] shadow-[0px_1px_2px_0px_#0000000D] bg-white  ">
                <div className="py-[16px] pl-[16px] pr-[23px]">
                  <MIcon/>
                </div>
                <div className="flex flex-col gap-1 py-[16px]  ">
                  <h1 className="font-inter text-[1rem] font-bold leading-[1.5rem] text-[#111C2C]">
                    Active Mentorship
                  </h1>
                  <p className="font-inter text-sm font-normal leading-5 text-[#3E494A]">
                    Direct access to industry experts and scholarly authorities.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Image Section Desktop*/}
          <div className="flex flex-1 justify-end gap-[16px] min-w-0 origin-right scale-[0.82] xl:scale-100">
            {' '}
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[8px] p-[24px] mt-[48px] shadow-[0_1px_2px_0_#0000000D] bg-[#E6E3D0] rounded-[12px]">
                <h1 className="font-inter text-[1.875rem] px-[78.26px] font-bold leading-[2.25rem] text-center text-[#00535B]">
                  500+
                </h1>
                <p className="font-inter text-[0.875rem] font-normal leading-[1.25rem] text-center px-[67px] text-[#111C2C]">
                  Expert Mentors
                </p>
              </div>
              <div className="flex flex-col gap-[8px] p-[24px] mb-[78px] shadow-[0_1px_2px_0_#0000000D] bg-white rounded-[12px]">
                <h1 className="font-inter text-[1.875rem] px-[78.26px] font-bold leading-[2.25rem] text-center text-[#00535B]">
                  500+
                </h1>
                <p className="font-inter text-[0.875rem] font-normal leading-[1.25rem] text-center px-[67px] text-[#111C2C]">
                  Expert Mentors
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[8px] p-[24px] shadow-[0_1px_2px_0_#0000000D] bg-white rounded-[12px]">
                <h1 className="font-inter text-[1.875rem] px-[78.26px] font-bold leading-[2.25rem] text-center text-[#00535B]">
                  98%
                </h1>
                <p className="font-inter text-[0.875rem] font-normal leading-[1.25rem] text-center px-[67px] text-[#111C2C]">
                  Satisfaction Rate
                </p>
              </div>
              <div className="flex flex-col shadow-[0px_8px_10px_-6px_#0000001A,0px_20px_25px_-5px_#0000001A] mb-[126px] gap-[8px] p-[24px] shadow-[0_1px_2px_0_#0000000D] bg-[#006D77] rounded-[12px]">
                <h1 className="font-inter text-[1.875rem] px-[78.26px] font-bold leading-[2.25rem] text-center text-white">
                  24/7
                </h1>
                <p className="font-inter text-[0.875rem] font-normal leading-[1.25rem] text-center px-[67px] text-white">
                  Support Network
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Image Section Mobile */}
      <div className="w-full  py-[64px] px-[16px] grid grid-cols-2 grid-rows-2 gap-[16px] lg:hidden bg-[#E6E3D0]">
        <div className="flex flex-col rounded-[12px] bg-[#F9F9FF] p-[24px]">
          <h1 className=" font-inter text-[1rem] px-[40.31px] font-bold leading-[1.5rem] tracking-[0] text-center text-[#00535B] ">
            500+
          </h1>
          <p className="font-inter text-[1rem] font-bold leading-[1.5rem] text-center text-[#666556]">
            Expert Mentors
          </p>
        </div>

        <div className="flex flex-col rounded-[12px] bg-[#F9F9FF] p-[24px]">
          <h1 className=" font-inter text-[1rem] px-[40.31px] font-bold leading-[1.5rem] tracking-[0] text-center text-[#00535B] ">
            98%
          </h1>
          <p className="font-inter text-[1rem] font-bold leading-[1.5rem] text-center text-[#666556]">
            Satisfaction Rate
          </p>
        </div>

        <div className="flex flex-col rounded-[12px] bg-[#F9F9FF] p-[24px]">
          <h1 className=" font-inter text-[1rem] px-[40.31px] font-bold leading-[1.5rem] tracking-[0] text-center text-[#00535B] ">
            50k+
          </h1>
          <p className="font-inter text-[1rem] font-bold leading-[1.5rem] text-center text-[#666556]">
            Active Learners
          </p>
        </div>

        <div className="flex flex-col rounded-[12px] bg-[#F9F9FF] p-[24px]">
          <h1 className=" font-inter text-[1rem] px-[40.31px] font-bold leading-[1.5rem] tracking-[0] text-center text-[#00535B] ">
            200+
          </h1>
          <p className="font-inter text-[1rem] font-bold leading-[1.5rem] text-center text-[#666556]">
            Specialized Courses
          </p>
        </div>
      </div>
    </>
  );
}
