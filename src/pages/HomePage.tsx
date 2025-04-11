import { HeroSection } from "@/components/HeroSection";
import { ServicesOverview } from "@/components/ServicesOverview";
import { EmergencyHelp } from "@/components/EmergencyHelp";
import { Resources } from "@/components/Resources";
export function HomePage() {
  

  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <EmergencyHelp />
      <Resources />
    </>
  );
}
