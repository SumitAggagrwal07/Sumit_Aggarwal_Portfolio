import React from "react";
import { motion } from "framer-motion";
import { useAudio } from "@/app/providers/AudioProvider";
import { useInterfaceSound } from "@/hooks/useInterfaceSound";

export const SoundToggle = () => {
  const { isEnabled, isPlaying, toggleSound } = useAudio();
  const { playClick } = useInterfaceSound();
  const active = isEnabled && isPlaying;

  const barVariants = (delay) => ({
    playing: {
      height: ["4px", "14px", "5px", "16px", "4px"],
      transition: { duration: 1.1, repeat: Infinity, ease: "easeInOut", delay },
    },
    stopped: {
      height: "3px",
      transition: { duration: 0.3 },
    },
  });

  return (
    <button
      type="button"
      aria-label="Toggle sound"
      onClick={() => { playClick(); toggleSound(); }}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full border border-hairline/70 bg-surface/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-xl hover:border-ember/60 hover:bg-raised/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
    >
      <div className="flex items-center gap-[3.5px]">
        {[0, 0.18, 0.35].map((delay, i) => (
          <motion.span
            key={i}
            animate={active ? "playing" : "stopped"}
            variants={barVariants(delay)}
            className={`w-[3px] rounded-full block ${active ? "bg-ember" : "bg-ash/50"}`}
          />
        ))}
      </div>
    </button>
  );
};
