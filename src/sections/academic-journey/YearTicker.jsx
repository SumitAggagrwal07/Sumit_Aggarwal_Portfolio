import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

const RollingDigit = ({ digit }) => {
  return (
    <span className="relative inline-block h-[1.12em] overflow-hidden leading-none align-baseline">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={{ y: "85%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-85%", opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export const YearTicker = ({ currentChapter, currentIndex, totalChapters }) => {
  const digits = String(currentChapter.year || "2021").split("");
  const isPursuing = currentChapter.status === "Pursuing";
  const progressPercent = ((currentIndex + 1) / totalChapters) * 100;

  return (
    <div className="lg:sticky lg:top-36 select-none relative z-10">
      {/* Subtle radial radar circle background like reference image */}
      <div
        className="pointer-events-none absolute -inset-8 opacity-25 dark:opacity-20"
        style={{
          background: "radial-gradient(circle at center, rgba(232, 104, 58, 0.12) 0%, transparent 65%)",
        }}
      />

      <div className="relative">
        {/* Section tag matching reference: ▪ My story */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-[2px] bg-ember" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ash font-medium">
            My story
          </span>
        </div>

        {/* Headline matching reference: Let's go back in time. */}
        <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[2.6rem] text-bone tracking-tight leading-[1.1] mb-6">
          Let's go back in time.
        </h2>

        {/* Large Year Display */}
        <div className="flex items-baseline font-sans font-extrabold text-7xl sm:text-8xl lg:text-[7.5rem] text-bone tracking-tight leading-none mb-3">
          {digits.map((d, i) => (
            <RollingDigit key={i} digit={d} />
          ))}
        </div>

        {/* Period / Date Tag below year */}
        <div className="h-6 flex items-center overflow-hidden mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentChapter.period + currentChapter.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ash"
            >
              <span>{currentChapter.period}</span>
              <span className="text-ash/40">·</span>
              <span className="text-ember font-medium">{currentChapter.label}</span>
              {isPursuing && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ember/15 border border-ember/30 text-[10px] text-ember font-semibold animate-pulse">
                  <span className="w-1 h-1 rounded-full bg-ember" />
                  Now
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Counter with progress bar matching reference: ⏱ 01 / 06 ──────── */}
        <div className="flex items-center gap-3 max-w-xs font-mono text-xs text-ash/80">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 text-ember/90" />
            <span className="tracking-wider">
              0{currentIndex + 1} <span className="text-ash/40">/</span> 0{totalChapters}
            </span>
          </div>
          <div className="flex-1 h-[2px] bg-hairline/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-ember"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
