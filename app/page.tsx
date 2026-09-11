import { HeroSection } from "@/components/hero-section";
import { PrepProcess } from "@/components/prep-process";
import { SplitExperience } from "@/components/split-experience";
import { InstagramStrip } from "@/components/instagram-strip";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PrepProcess />
      <SplitExperience />
      <InstagramStrip />
    </>
  );
}

