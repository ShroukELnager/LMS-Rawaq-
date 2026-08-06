import Image from 'next/image';

const stories: {
  text: string;
  image: string;
  name: string;
  job: string;
}[] = [
  {
    text: '"Rawaq changed the way I think about online education. The group structure kept me accountable in a way that self-paced courses never could."',
    image: '/images/sara.png',
    name: 'Sarah Ahmed',
    job: 'Data Scientist',
  },
  {
    text: '"As a mentor, the tools provided by Rawaq allow me to focus on teaching rather than managing logistics. My students are more engaged than ever."',
    image: '/images/omer.png',
    name: 'Dr. Omar Farooq',
    job: 'Senior Academic',
  },
  {
    text: '"The community aspect is incredible. I\'ve built connections with professionals globally that I wouldn\'t have found elsewhere."',
    image: '/images/kareem.png',
    name: 'Kareem Ibrahim',
    job: 'UI/UX Designer',
  },
];

export default function StorySection() {
  return (
    <section className="md:py-[6rem] py-[4rem] px-4 sm:px-6 md:px-[24px]">
      <div className="container mx-auto items-center mb-[4rem]">
        <h1 className="font-inter text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.02rem] text-center text-[#111C2C]">
          Story Section
        </h1>
      </div>

      <div>
        <div className="flex px-0 sm:px-[12px] md:px-[24px] md:flex-row flex-col md:gap-[2rem] gap-[24px]">
          {/* cards */}
          {stories.map((story,idx) => {
            return (
              <div
                key={idx}
                className="flex md:flex-col flex-col-reverse gap-[1.5rem] rounded-[0.75rem] p-[2rem] border border-[#D8E3FA] md:bg-white bg-[#E7EEFF] shadow-[0px_1px_2px_0px_#0000000D]"
              >
                <p className="font-inter text-[16px] font-normal italic leading-[24px] text-[#111C2C] md:text-[1rem] md:font-normal md:italic md:leading-[1.5rem] md:text-[#3E494A]">
                  {story.text}
                </p>

                <div className="flex flex-row-1 gap-[16px]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#006D77] overflow-hidden">
                    <Image
                      src={story.image}
                      alt="story"
                      width={44}
                      height={44}
                      className="h-full w-full object-cover block"
                    />
                  </div>

                  <div className="flex flex-col py-[4px]">
                    <h1 className="font-inter text-[14px] font-normal leading-[20px] text-[#111C2C] md:text-[1rem] md:font-bold md:leading-[1.5rem]">
                      {story.name}
                    </h1>

                    <p className="font-inter text-[12px] font-semibold leading-[16px] text-[#00535B] md:text-[0.75rem] md:font-normal md:leading-[1rem] md:text-[#3E494A]">
                      {story.job}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
