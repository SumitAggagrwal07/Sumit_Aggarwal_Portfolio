import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { biography } from "@/content/biography";

export const PageLoader = ({ onComplete }) => {
  const { progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const target = Math.max(progress, 100);
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev < target) {
          const next = prev + Math.ceil((target - prev) * 0.15) + 1;
          return next >= target ? target : next;
        }
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          onComplete?.();
        }, 300);
        return prev;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loader"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 0.85, ease: [0.77, 0, 0.175, 1] }
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-14 bg-canvas text-bone pointer-events-auto"
        >
          <div className="flex justify-between items-center text-xs font-mono tracking-widest text-ash uppercase">
            <span>{biography.name}</span>
            <span>PORTFOLIO © 2026</span>
          </div>

          <div className="max-w-4xl w-full mx-auto flex flex-col items-start justify-center flex-1">
            <span className="font-mono text-xs uppercase tracking-widest text-ember mb-2">
              INITIALIZING EXPERIENCE
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif-italic text-7xl md:text-9xl font-light tracking-tighter">
                {Math.min(100, Math.round(displayProgress))}
              </span>
              <span className="font-serif-italic text-3xl md:text-5xl text-ash">%</span>
            </div>
            <div className="w-full h-[1px] bg-hairline/80 mt-6 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-ember"
                style={{ width: `${Math.min(100, displayProgress)}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-xs font-mono text-ash tracking-widest uppercase">
            <span>Systems & Algorithmic Craft</span>
            <span>Loading assets & shaders</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
