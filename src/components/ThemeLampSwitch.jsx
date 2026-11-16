import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "@/app/providers/ThemeProvider";

export const ThemeLampSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  const [pulled, setPulled] = useState(false);
  const dragY = useMotionValue(0);
  const springY = useSpring(dragY, { stiffness: 440, damping: 28 });
  const cordH = useTransform(springY, (v) => 60 + Math.max(0, v));

  const handleDragEnd = (_, info) => {
    if (info.offset.y > 20) {
      setPulled(true);
      toggleTheme();
      setTimeout(() => setPulled(false), 450);
    }
    dragY.set(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setPulled(true);
      toggleTheme();
      setTimeout(() => setPulled(false), 450);
    }
  };

  return (
    <div className="fixed top-0 right-4 sm:right-20 z-50 flex flex-col items-center select-none pointer-events-auto">
      <motion.div
        style={{ height: cordH }}
        className="w-[2px] bg-[#B08D57] dark:bg-[#6E5034] origin-top"
      />
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 42 }}
        dragElastic={0.35}
        onDragEnd={handleDragEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className={`w-4 h-9 rounded-full cursor-grab active:cursor-grabbing flex flex-col items-center justify-between py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-ember shadow-lg transition-shadow duration-300 ${pulled || theme === "light" ? "shadow-[0_0_18px_rgba(232,104,58,0.5)]" : ""}`}
        style={{
          background: "linear-gradient(180deg,#A76735 0%,#7A4418 50%,#4A280D 100%)",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]/80" />
        <span className="w-2 h-2.5 rounded-full bg-[#4A280D]/90" />
      </motion.div>
    </div>
  );
};
