import React from "react";
import { motion } from "framer-motion";

export const JourneyChapter = ({ chapter, index, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0.35 }}
      animate={{ opacity: isActive ? 1 : 0.38 }}
      transition={{ duration: 0.35 }}
      className="relative pl-8 md:pl-12 pb-16 last:pb-6 group"
    >
      {/* Indicator node on timeline line */}
      <div
        className={`absolute left-0 top-2.5 w-4 h-4 -translate-x-1/2 rounded-full border-2 transition-all duration-300 ${
          isActive
            ? "bg-ember border-bone scale-110 shadow-[0_0_14px_rgba(232,104,58,0.7)]"
            : "bg-surface border-hairline/80 group-hover:border-ash"
        }`}
      />

      {/* Date / Period Tag matching reference: OCT 2026 – NOW */}
      <div className="flex items-center gap-2 mb-1.5">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-ash/90 font-medium">
          {chapter.period}
        </span>
      </div>

      {/* Chapter Title */}
      <h3 className="font-sans font-bold text-2xl sm:text-3xl text-bone tracking-tight mb-1">
        {chapter.title}
      </h3>

      {/* Institution & Score Subtitle */}
      <p className="text-sm font-sans text-ash/80 mb-4">
        {chapter.institution}
        {chapter.score && chapter.score !== "Pursuing" && (
          <span className="text-ember font-medium ml-2">
            · {chapter.scoreType}: {chapter.score}
          </span>
        )}
      </p>

      {/* Easy-to-read highlights */}
      {chapter.highlights && chapter.highlights.length > 0 ? (
        <ul className="space-y-2.5 max-w-xl">
          {chapter.highlights.map((h, i) => (
            <li key={i} className="text-sm text-ash leading-relaxed flex items-start gap-2.5">
              <span className="text-ash/60 font-mono mt-[-1px] select-none">-</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-raised/70 border border-hairline/80 text-xs font-mono text-ash">
          <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
          <span>Currently Pursuing (Final Year)</span>
        </div>
      )}
    </motion.div>
  );
};
