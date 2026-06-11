import { useState } from "react";
import SphericalIntro from "../components/SphericalIntro";
import Hero from "../components/Hero";
import IntroSection from "../components/IntroSection";
import FeaturedWork from "../components/FeaturedWork";
import SkillsMarquee, { PixelMarquee } from "../components/Marquee";
import ToolsSection from "../components/ToolsSection";
import StatsBlock from "../components/StatsBlock";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ContactModal from "../components/ContactModal";

export default function Home() {
  const [open, setOpen] = useState(false);
  const start = () => setOpen(true);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-main)]" data-testid="home-page">
      <SphericalIntro />
      <Hero onStartProject={start} />
      <PixelMarquee />
      <IntroSection />
      <SkillsMarquee />
      <FeaturedWork />
      <ToolsSection />
      <StatsBlock />
      <ContactSection onStartProject={start} />
      <Footer />
      <ContactModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
