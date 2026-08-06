import React from 'react'

export default function Footer() {
  return (
    <div className="bg-[#E6E3D0] py-[48px] ">
      <div className="hidden px-[24px] py-[40px] md:grid grid-cols-4 gap-[2rem] md:mb-[48px] mb-[40px]">
        <div>
          <h3 className="font-inter font-bold text-[1.5rem] leading-[2rem] tracking-[0px] text-[#00535B] mb-[16px]">
            Rawaq
          </h3>
          <p className="font-inter font-normal text-[0.875rem] leading-[1.25rem] tracking-normal text-[#666556]">
            Empowering students through structured knowledge and dedicated
            mentorship in a modern digital space.
          </p>
        </div>

        <div>
          <h3 className="font-inter mb-[24px] font-bold text-[1rem] leading-[1.5rem] tracking-normal text-[#00535B]">
            Product
          </h3>
          <ul className="space-y-[12px] font-inter font-normal text-base leading-6 tracking-normal text-[#666556]">
            <li>Features</li>
            <li>Course</li>
            <li>Mentorship</li>
            <li>Pricing</li>
          </ul>
        </div>

        <div>
          <h3 className="font-inter mb-[24px] font-bold text-[1rem] leading-[1.5rem] tracking-normal text-[#00535B]">
            Resources
          </h3>
          <ul className="space-y-[12px] font-inter font-normal text-base leading-6 tracking-normal text-[#666556]">
            <li>Documentation</li>
            <li>Help Center</li>
            <li>Community</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div>
          <h3 className="font-inter mb-[24px] font-bold text-[1rem] leading-[1.5rem] tracking-normal text-[#00535B]">
            Company
          </h3>
          <ul className="space-y-[12px] font-inter font-normal text-base leading-6 tracking-normal text-[#666556]">
            <li>About Us</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
      <div className="md:hidden px-[24px] py-[40px] mb-[40px]">
        <div className="mb-[40px]">
          <h3 className="font-inter font-bold text-[1.5rem] leading-[2rem] tracking-[0px] text-[#00535B] mb-[16px]">
            Rawaq
          </h3>

          <p className="font-inter font-normal text-[0.875rem] leading-[1.25rem] tracking-normal text-[#666556]">
            Empowering students through structured knowledge and dedicated
            mentorship in a modern digital space.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-[32px]">
          <div>
            <h3 className="font-inter mb-[24px] font-bold text-[1rem] leading-[1.5rem] tracking-normal text-[#00535B]">
              Product
            </h3>

            <ul className="space-y-[12px] font-inter font-normal text-base leading-6 tracking-normal text-[#666556]">
              <li>Features</li>
              <li>Course</li>
              <li>Mentorship</li>
              <li>Pricing</li>
            </ul>
          </div>

          <div>
            <h3 className="font-inter mb-[24px] font-bold text-[1rem] leading-[1.5rem] tracking-normal text-[#00535B]">
              Resources
            </h3>

            <ul className="space-y-[12px] font-inter font-normal text-base leading-6 tracking-normal text-[#666556]">
              <li>Documentation</li>
              <li>Help Center</li>
              <li>Community</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div>
            <h3 className="font-inter mb-[24px] font-bold text-[1rem] leading-[1.5rem] tracking-normal text-[#00535B]">
              Company
            </h3>

            <ul className="space-y-[12px] font-inter font-normal text-base leading-6 tracking-normal text-[#666556]">
              <li>About Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div />
        </div>
      </div>
      <div className="pt-[48px]">
        <p className="font-inter font-normal text-[0.875rem] leading-[1.25rem] tracking-[0px] text-center text-[#66655699]">
          © 2024 Rawaq. All rights reserved.
        </p>
      </div>
    </div>
  );
}
