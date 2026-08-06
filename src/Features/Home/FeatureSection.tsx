import Feature1 from '@/assets/icons/feature1.png';
import Feature2 from '@/assets/icons/feature2.png';
import Feature3 from '@/assets/icons/feature3.png';
import Feature4 from '@/assets/icons/feature4.png';
import Feature5 from '@/assets/icons/feature5.png';
import Feature6 from '@/assets/icons/feature6.png';

import FeatureCard from './FeatureCard';

export default function FeatureSection() {
  return (
    <section className="md:py-[6rem] py-[4rem]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center">
          <h1 className="font-inter text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.02rem] text-center text-[#111C2C]">
            Master Your Path with Precision
          </h1>

          <p className="mt-4 max-w-[720px] text-center font-inter text-[1rem] font-normal leading-[1.5rem] text-[#3E494A]">
            Everything you need to facilitate high-quality education in a
            focused, collaborative environment.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <FeatureCard
            imageSrc={Feature1}
            title="Learning Groups"
            description="Intimate cohort-based environments where peers learn and grow together under expert guidance."
          />

          <FeatureCard
            imageSrc={Feature2}
            title="Assignment Management"
            description="Powerful tools for tracking tasks, deadlines, and personal milestones within your study path."
          />

          <FeatureCard
            imageSrc={Feature3}
            title="Content Feed"
            description="A centralized stream of curated resources, updates, and discussions tailored to your goals."
          />

          <FeatureCard
            imageSrc={Feature4}
            title="Real-Time Collaboration"
            description="Seamless communication between mentors and students through instant messaging and feedback loops."
          />

          <FeatureCard
            imageSrc={Feature5}
            title="Progress Tracking"
            description='Visualize your journey with detailed analytics and the "Golden Path" progress system.'
          />

          <FeatureCard
            imageSrc={Feature6}
            title="Smart Notifications"
            description="Stay updated on important course milestones and mentor updates without the noise."
          />
        </div>
      </div>
    </section>
  );
}
