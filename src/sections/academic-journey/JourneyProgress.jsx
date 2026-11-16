import React from "react";
import { motion } from "framer-motion";

export const JourneyProgress = ({ currentChapter, currentIndex, totalChapters }) => {
  const progressPercent = ((currentIndex + 1) / totalChapters) * 100;

  return (
    <div className="sticky top-32 flex flex-col justify-between h-auto">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-ember block mb-2 font-medium">
          ACADEMIC ODYSSEY
        </span>
        <h2 className="font-serif-italic text-3xl sm:text-4xl text-bone mb-6">
          Educational chapters & milestones.
        </h2>

        <div className="mt-8">
          <motion.div
            key={currentChapter.year}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="font-sans font-bold text-5xl sm:text-6xl lg:text-7xl text-bone tracking-tight"
          >
            {currentChapter.year}
          </motion.div>
          <span className="font-mono text-xs uppercase tracking-widest text-ash mt-2 block">
            {currentChapter.period}
          </span>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-hairline/60">
        <div className="flex items-center justify-between font-mono text-xs text-ash mb-2">
          <span>CHAPTER PROGRESS</span>
          <span>
            0{currentIndex + 1} / 0{totalChapters}
          </span>
        </div>
        <div className="w-full h-[2px] bg-hairline rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-ember"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </div>
  );
};
