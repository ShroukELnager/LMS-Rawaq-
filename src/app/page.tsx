import { cookies } from 'next/headers';

import FAQSection from '@/Features/Home/FAQSection';
import FeatureSection from '@/Features/Home/FeatureSection';
import Footer from '@/Features/Home/Footer';
import HeroSection from '@/Features/Home/HeroSection';
import LearningJourneySection from '@/Features/Home/LearningJourneySection';
import ModernInterfaceSection from '@/Features/Home/ModernInterfaceSection';
import Navbar from '@/Features/Home/Navbar';
import StorySection from '@/Features/Home/StorySection';
import TimelineSection from '@/Features/Home/TimelineSection';
import WhyRawaqSection from '@/Features/Home/WhyRawaqSection';

export default async function Page() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('access_token');

  const isLoggedIn = !!accessToken?.value;

  return (
    <div className="overflow-x-hidden">
      <Navbar isLoggedIn={isLoggedIn} />

      <div className="bg-[#F9F9FF]">
        <HeroSection />
      </div>

      <div className="bg-[#F0F3FF]" id="features">
        <FeatureSection />
      </div>

      <div className="bg-white" id="how-it-works">
        <TimelineSection />
      </div>

      <div className="bg-[#E7EEFF]">
        <WhyRawaqSection />
      </div>

      <div className="bg-white">
        <ModernInterfaceSection />
      </div>

      <div className="bg-white md:bg-[#F0F3FF]">
        <StorySection />
      </div>

      <div className="bg-white" id="faq">
        <FAQSection />
      </div>

      <div>
        <LearningJourneySection />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
