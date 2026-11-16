import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { biography } from "@/content/biography";
import { AvailabilityBadge } from "./AvailabilityBadge";

export const HeroHeadline = () => {
  return (
    <div className="relative z-10 flex flex-col items-center text-center mt-[-40px] md:mt-[-80px] pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="pointer-events-auto"
      >
        <h1 className="font-serif-italic text-6xl sm:text-7xl md:text-9xl lg:text-[10.5rem] tracking-tight leading-[0.85] text-bone select-none drop-shadow-sm">
          {biography.name}
        </h1>
        <p className="mt-3 md:mt-4 text-xs sm:text-sm md:text-base font-mono uppercase tracking-[0.25em] text-ash">
          {biography.designation}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-6 pointer-events-auto"
      >
        <AvailabilityBadge />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        className="flex flex-wrap items-center justify-center gap-4 mt-8 pointer-events-auto"
      >
        <a
          href="#work"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-bone text-canvas hover:bg-ember hover:text-bone text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 shadow-md"
        >
          <span>Explore my work</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-hairline bg-surface/80 hover:bg-raised text-bone text-xs font-mono uppercase tracking-wider font-medium transition-all duration-300"
        >
          <span>Start a conversation</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </div>
  );
};
