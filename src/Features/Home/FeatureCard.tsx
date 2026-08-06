import Image, { StaticImageData } from 'next/image';

type FeatureCardProps = {
  imageSrc: StaticImageData;
  title: string;
  description: string;
};

export default function FeatureCard({
  imageSrc,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div
      className="
        flex
        flex-col
        p-[32px]
        gap-[12px]
        rounded-[0.75rem]
        border
        border-[#D8E3FA]
        bg-white
        shadow-[0_1px_2px_0_#0000000D]
      "
    >
      <Image src={imageSrc} alt={title} width={48} height={48} />

      <h1
        className="
          font-inter
          text-[1.5rem]
          font-semibold
          leading-[2rem]
          text-[#111C2C]
        "
      >
        {title}
      </h1>

      <p
        className="
          font-inter
          text-[1rem]
          font-normal
          leading-[1.5rem]
          text-[#3E494A]
        "
      >
        {description}
      </p>
    </div>
  );
}
