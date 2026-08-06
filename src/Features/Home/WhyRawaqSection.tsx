import Image from 'next/image';
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
                  <svg
                    width="22"
                    height="21"
                    viewBox="0 0 22 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.6 21L5.7 17.8L2.1 17L2.45 13.3L0 10.5L2.45 7.7L2.1 4L5.7 3.2L7.6 0L11 1.45L14.4 0L16.3 3.2L19.9 4L19.55 7.7L22 10.5L19.55 13.3L19.9 17L16.3 17.8L14.4 21L11 19.55L7.6 21ZM8.45 18.45L11 17.35L13.6 18.45L15 16.05L17.75 15.4L17.5 12.6L19.35 10.5L17.5 8.35L17.75 5.55L15 4.95L13.55 2.55L11 3.65L8.4 2.55L7 4.95L4.25 5.55L4.5 8.35L2.65 10.5L4.5 12.6L4.25 15.45L7 16.05L8.45 18.45ZM9.95 14.05L15.6 8.4L14.2 6.95L9.95 11.2L7.8 9.1L6.4 10.5L9.95 14.05Z"
                      fill="#006D77"
                    />
                  </svg>
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
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 20V15.7C2.05 14.8333 1.3125 13.8208 0.7875 12.6625C0.2625 11.5042 0 10.2833 0 9C0 6.5 0.875 4.375 2.625 2.625C4.375 0.875 6.5 0 9 0C11.0833 0 12.9292 0.6125 14.5375 1.8375C16.1458 3.0625 17.1917 4.65833 17.675 6.625L18.975 11.75C19.0583 12.0667 19 12.3542 18.8 12.6125C18.6 12.8708 18.3333 13 18 13H16V16C16 16.55 15.8042 17.0208 15.4125 17.4125C15.0208 17.8042 14.55 18 14 18H12V20H10V16H14V11H16.7L15.75 7.125C15.3667 5.60833 14.55 4.375 13.3 3.425C12.05 2.475 10.6167 2 9 2C7.06667 2 5.41667 2.675 4.05 4.025C2.68333 5.375 2 7.01667 2 8.95C2 9.95 2.20417 10.9 2.6125 11.8C3.02083 12.7 3.6 13.5 4.35 14.2L5 14.8V20H3ZM8 13H10L10.15 11.75C10.2833 11.7 10.4042 11.6417 10.5125 11.575C10.6208 11.5083 10.7167 11.4333 10.8 11.35L11.95 11.85L12.95 10.15L11.95 9.4C11.9833 9.26667 12 9.13333 12 9C12 8.86667 11.9833 8.73333 11.95 8.6L12.95 7.85L11.95 6.15L10.8 6.65C10.7167 6.56667 10.6208 6.49167 10.5125 6.425C10.4042 6.35833 10.2833 6.3 10.15 6.25L10 5H8L7.85 6.25C7.71667 6.3 7.59583 6.35833 7.4875 6.425C7.37917 6.49167 7.28333 6.56667 7.2 6.65L6.05 6.15L5.05 7.85L6.05 8.6C6.01667 8.73333 6 8.86667 6 9C6 9.13333 6.01667 9.26667 6.05 9.4L5.05 10.15L6.05 11.85L7.2 11.35C7.28333 11.4333 7.37917 11.5083 7.4875 11.575C7.59583 11.6417 7.71667 11.7 7.85 11.75L8 13ZM9 10.5C8.58333 10.5 8.22917 10.3542 7.9375 10.0625C7.64583 9.77083 7.5 9.41667 7.5 9C7.5 8.58333 7.64583 8.22917 7.9375 7.9375C8.22917 7.64583 8.58333 7.5 9 7.5C9.41667 7.5 9.77083 7.64583 10.0625 7.9375C10.3542 8.22917 10.5 8.58333 10.5 9C10.5 9.41667 10.3542 9.77083 10.0625 10.0625C9.77083 10.3542 9.41667 10.5 9 10.5Z"
                      fill="#006D77"
                    />
                  </svg>
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
