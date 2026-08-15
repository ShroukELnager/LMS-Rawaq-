import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 sm:px-5 md:px-6 py-12 sm:py-16 md:py-24 lg:py-[128px]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16">
        {/* Text Section */}
        <div className="w-full md:w-[48%] lg:w-1/2 text-center md:text-left">
          <h1 className="font-inter text-[2.5rem] lg:text-[3rem] font-bold leading-[3rem] lg:leading-[3.75rem] tracking-[-0.06rem]">
            Structured Learning.
            <br />
            <span className="text-[#006D77]">Real Mentorship.</span>
            <br />
            Better Results.
          </h1>

          <p className="py-6 font-inter text-[1.125rem] font-normal leading-[1.75rem] text-[#3E494A]">
            Rawaq bridges the gap between traditional scholarship and modern
            digital education through focused groups and expert-led guidance.
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-start">
            <button className="inline-flex w-full md:w-auto items-center justify-center rounded-[0.5rem] md:rounded-full bg-[#00535B] hover:bg-[#003F45] px-8 py-4 text-white font-inter text-[1.5rem] font-semibold leading-[2rem] text-center cursor-pointer shadow-[0_8px_10px_-6px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.1)] transition-colors duration-300">
              Get Started
            </button>

            <button className="inline-flex w-full md:w-auto items-center justify-center rounded-[0.5rem] md:rounded-full border-2 border-[#00535B] px-8 py-4 text-[#00535B] hover:bg-[#F0F3FF] bg-[#E6E3D04D] md:bg-white font-inter text-[1.5rem] font-semibold leading-[2rem] text-center cursor-pointer transition-colors duration-300">
              Login
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-[48%] lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-[550px] rounded-[0.75rem] border border-white bg-white p-2 sm:p-3 md:p-4 backdrop-blur-[0.25rem] shadow-[0_8px_10px_-6px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.1)]">
            <Image
              src="/images/hero.png"
              alt="Hero Image"
              width={550}
              height={300}
              priority
              className="hidden md:block w-full h-auto rounded-[0.5rem] object-cover"
            />

            <Image
              src="/images/heroMobile.png"
              alt="Hero Image"
              width={308}
              height={665.38}
              priority
              className="block w-full h-auto rounded-[0.375rem] object-cover md:hidden"
            />

            <Image
              src="/images/Overlay.png"
              alt="Overlay Image"
              width={235}
              height={112}
              quality={60}
              className="hidden md:block absolute -bottom-8 lg:-bottom-14 -left-6 lg:-left-10 w-[9rem] lg:w-[12.18rem] h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
