import Image from 'next/image';

export default function ModernInterfaceSection() {
  return (
    <section className="py-[4rem] md:py-[6rem] px-6">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="flex flex-col items-center">
          <h1 className="text-center font-inter text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.02rem] text-[#111C2C]">
            A Truly Modern Interface
          </h1>

          <p className="mt-4 max-w-[720px] text-center font-inter text-[1rem] leading-[1.5rem] text-[#3E494A]">
            Built for focus. No distractions, just learning.
          </p>
        </div>

        {/* Desktop & Tablet */}
        <div className="mt-[64px] hidden md:flex flex-col">
          <Image
            src="/images/interface1.png"
            alt="Modern Interface"
            width={520}
            height={294}
            className="h-auto w-full max-w-[520px]"
          />

          <Image
            src="/images/interface2.png"
            alt="Modern Interface"
            width={520}
            height={287}
            className="
              mt-[19px]
              h-auto
              w-full
              max-w-[520px]
              md:ml-[8rem]
              lg:ml-[14rem]
              xl:ml-[20rem]
              2xl:ml-[25.67rem]
            "
          />
        </div>

        {/* Mobile */}
        <div className="mt-[40px] flex justify-center md:hidden w-full">
          <Image
            src="/images/interface-mobile.png"
            alt="Modern Interface"
            width={240}
            height={434}
            className="h-auto w-full "
          />
        </div>
      </div>
    </section>
  );
}
