import React, { useState } from "react";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AudioProvider } from "./providers/AudioProvider";
import { SmoothScrollProvider } from "./providers/SmoothScrollProvider";
import { PageLoader } from "@/layout/PageLoader";
import { SiteHeader } from "@/layout/SiteHeader";
import { SiteFooter } from "@/layout/SiteFooter";
import { ScrollProgressBar } from "@/layout/ScrollProgressBar";
import { PointerFollower } from "@/layout/PointerFollower";
import { HeroSection } from "@/sections/hero/HeroSection";
import { AcademicJourneySection } from "@/sections/academic-journey/AcademicJourneySection";
import { SelectedWorkSection } from "@/sections/selected-work/SelectedWorkSection";
import { CredentialsSection } from "@/sections/credentials/CredentialsSection";
import { ContactSection } from "@/sections/contact/ContactSection";

export const App = () => {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <ThemeProvider>
      <AudioProvider>
        <SmoothScrollProvider>
          <div className="relative min-h-screen bg-canvas text-bone selection:bg-ember/20 selection:text-ember transition-colors duration-500">
            <ScrollProgressBar />
            <PointerFollower />
            <PageLoader onComplete={() => setHasLoaded(true)} />
            <SiteHeader />

            <main>
              <HeroSection />
              <AcademicJourneySection />
              <SelectedWorkSection />
              <CredentialsSection />
              <ContactSection />
            </main>

            <SiteFooter />
          </div>
        </SmoothScrollProvider>
      </AudioProvider>
    </ThemeProvider>
  );
};

export default App;
