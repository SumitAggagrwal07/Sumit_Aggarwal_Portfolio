import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { PortraitParticleCanvas } from "./PortraitParticleCanvas";
import { AbilityCard } from "./AbilityCard";
import { useSmoothScroll } from "@/app/providers/SmoothScrollProvider";
import { SoundOnInteract } from "@/components/SoundOnInteract";

export const HeroSection = () => {
  const lenisRef = useSmoothScroll();

  const scrollTo = (e, id) => {
    e.preventDefault();
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(id, { offset: -72, duration: 1.2 });
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-dvh lg:h-dvh lg:max-h-dvh overflow-hidden bg-canvas pt-16 sm:pt-20 lg:pt-0 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 h-full lg:h-[calc(100dvh-4.5rem)] items-center">

        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center px-6 sm:px-10 lg:px-14 xl:px-16 pt-10 lg:pt-14 pb-8 lg:pb-0 order-2 lg:order-1 z-10 lg:translate-y-7">

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mb-3"
          >
            <h1 className="font-serif-italic text-5xl sm:text-6xl lg:text-[4.75rem] tracking-tight text-bone leading-[0.98]">
              Hi, I'm Sumit
            </h1>
            <h1 className="font-serif-italic text-5xl sm:text-6xl lg:text-[4.75rem] tracking-tight text-bone leading-[0.98] mb-3">
              Aggarwal
            </h1>
            <p className="font-sans font-medium text-xl sm:text-2xl text-ash/80 mt-2">
              I am a
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="w-full mt-2 mb-6"
          >
            <AbilityCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <SoundOnInteract>
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, "#contact")}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-bone text-canvas hover:bg-ember hover:text-bone text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 shadow-md group min-h-[44px]"
              >
                <span>Hire me</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </SoundOnInteract>

            <SoundOnInteract>
              <a
                href="#work"
                onClick={(e) => scrollTo(e, "#work")}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-hairline/80 hover:border-ember/60 bg-transparent hover:bg-raised text-bone text-xs font-mono uppercase tracking-wider font-medium transition-all duration-300 min-h-[44px]"
              >
                <span>See my work</span>
              </a>
            </SoundOnInteract>
          </motion.div>

          <SoundOnInteract>
            <motion.a
              href="#journey"
              onClick={(e) => scrollTo(e, "#journey")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.7 }}
              className="flex items-center gap-2.5 text-[10px] font-mono tracking-[0.22em] text-ash/60 hover:text-ember uppercase cursor-pointer transition-colors group mt-8 lg:mt-10 min-h-[36px]"
            >
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="w-3.5 h-3.5 text-ember" />
              </motion.div>
              <span>Scroll to discover</span>
            </motion.a>
          </SoundOnInteract>
        </div>

        <div className="lg:col-span-6 xl:col-span-6 relative order-1 lg:order-2 h-[52vh] sm:h-[60vh] lg:h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="w-full h-full max-h-[92vh] flex items-center justify-center translate-y-2 lg:translate-y-5"
          >
            <PortraitParticleCanvas />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
