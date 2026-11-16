import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { biography } from "@/content/biography";
import { Code2 } from "lucide-react";

export const HeroPortrait = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] aspect-[4/5] mx-auto select-none flex items-end justify-center group"
    >
      <div className="relative w-full h-full overflow-hidden rounded-3xl bg-[#0B0B0C]">
        <img
          src="/portrait.jpg"
          alt={biography.name}
          className="w-full h-full object-cover object-top filter grayscale contrast-110 pointer-events-none"
          style={{
            maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)"
          }}
        />

        <img
          src="/portrait.jpg"
          alt={biography.name}
          className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none transition-opacity duration-200"
          style={{
            opacity: mousePos.isHovered ? 1 : 0,
            maskImage: `radial-gradient(circle 90px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 50%, transparent 100%), linear-gradient(to bottom, black 80%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 90px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 50%, transparent 100%), linear-gradient(to bottom, black 80%, transparent 100%)`
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute bottom-6 left-6 z-20 px-4 py-2 rounded-full border border-hairline/80 bg-surface/90 backdrop-blur-md flex items-center gap-2 shadow-xl"
      >
        <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
        <span className="text-xs font-mono tracking-wider text-bone font-medium">
          My ability card
        </span>
        <Code2 className="w-3.5 h-3.5 text-ash" />
      </motion.div>
    </div>
  );
};
