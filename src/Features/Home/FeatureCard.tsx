import { ComponentType, SVGProps } from 'react';

type FeatureCardProps = {
  imageSrc: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

export default function FeatureCard({
  imageSrc: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-3
        rounded-xl
        border
        border-[#D8E3FA]
        bg-white
        p-8
        shadow-[0_1px_2px_0_#0000000D]
      "
    >
      <Icon className="h-12 w-12" />

      <h3
        className="
          font-inter
          text-2xl
          font-semibold
          leading-8
          text-[#111C2C]
        "
      >
        {title}
      </h3>

      <p
        className="
          font-inter
          text-base
          font-normal
          leading-6
          text-[#3E494A]
        "
      >
        {description}
      </p>
    </div>
  );
}
