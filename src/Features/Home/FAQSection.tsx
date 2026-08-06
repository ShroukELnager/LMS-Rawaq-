import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What makes Rawaq different from other platforms?',
    answer:
      'Rawaq combines structured learning, expert mentorship, and collaborative groups in one platform. Learners gain practical skills through interactive assignments, real-time feedback, and a supportive learning community.',
  },
  {
    question: 'How do I become a mentor?',
    answer:
      'You can apply to become a mentor by completing the mentor application form and submitting your professional background. Our team reviews each application and contacts qualified candidates for the next steps.',
  },
  {
    question: 'Are the certifications recognized?',
    answer:
      'Yes. Learners receive certificates after successfully completing eligible programs and meeting all course requirements. Recognition may vary depending on the program and partnering organizations.',
  },
  {
    question: 'Can I learn at my own pace?',
    answer:
      'Yes. Many learning resources are available on demand, allowing you to study whenever it fits your schedule. Some group activities and live sessions may have fixed deadlines or meeting times.',
  },
];

export default function FAQSection() {
  return (
    <section className="px-4 py-[64px] md:px-[256px] md:py-[6rem]">
      <div className="container mx-auto px-0 md:px-[24px]">
        <div className="mb-8 flex justify-center md:mb-[48px]">
          <h1 className="font-inter text-center text-[32px] font-semibold leading-[40px] tracking-[-0.32px] text-[#111C2C] ">
            Frequently Asked
            <br className="block md:hidden" /> Questions
          </h1>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          className="space-y-3 md:space-y-4"
        >
          {faqs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="rounded-[12px] bg-[#F0F3FF] px-4 py-4 md:px-6 md:py-5"
            >
              <Accordion.Header>
                <Accordion.Trigger className="mb-0 flex w-full items-center justify-between font-inter text-[14px] font-bold leading-[20px] text-[#111C2C] md:mb-[16px] md:text-[16px] md:leading-[24px]">
                  <span className="pr-4 text-left">{faq.question}</span>

                  <ChevronDown
                    className="h-4 w-4 flex-shrink-0 transition-transform duration-300 data-[state=open]:rotate-180 md:h-5 md:w-5"
                    color="#111C2C"
                  />
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="mt-3 border-t border-[#D9DDE8] py-3 font-inter text-[14px] font-normal leading-[20px] tracking-[-0.28px] text-[#000000] md:mt-4 md:py-[16px] md:text-[16px] md:leading-[20px] md:tracking-[-0.32px]">
                {faq.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
