import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CitiesSection } from "@/components/home/CitiesSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { StepsSection } from "@/components/home/StepsSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CitiesSection />
      <FeaturesSection />
      <TestimonialsSection />
      <StepsSection />
      <ContactSection />
    </>
  );
}
