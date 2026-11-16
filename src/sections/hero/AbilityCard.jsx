import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROLES = [
  { label: "Full-Stack MERN Developer", idx: "01 / 02" },
  { label: "DSA Problem Solver",         idx: "02 / 02" },
];

export const AbilityCard = () => {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFlipping(true);
      setTimeout(() => {
        setCurrent((p) => (p + 1) % ROLES.length);
        setFlipping(false);
      }, 250);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  const role = ROLES[current];

  return (
    <div
      className="relative w-full max-w-md sm:max-w-lg"
      style={{
        perspective: "800px",
        transformOrigin: "top center",
      }}
    >
      <motion.div
        initial={{ rotate: -1.5 }}
        whileHover={{ rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        style={{ transformOrigin: "top center" }}
      >
        <div className="absolute -top-3 left-4 right-4 flex justify-between z-20 px-2 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="w-2 h-4 border border-zinc-400 bg-zinc-200 dark:bg-zinc-700 rounded-full shadow-sm" />
            </div>
          ))}
        </div>

        <motion.div
          animate={{ rotateX: flipping ? -90 : 0 }}
          transition={{ duration: 0.25, ease: "easeIn" }}
          style={{ transformOrigin: "top", backfaceVisibility: "hidden" }}
          className="pt-3.5 pb-4 px-6 sm:px-7 rounded-2xl bg-[#EDE9E3] dark:bg-[#F4F0EB] shadow-xl border border-zinc-300 mt-2"
        >
          <div className="flex items-center justify-end text-[11px] font-mono tracking-widest text-zinc-500 uppercase mb-0.5">
            {role.idx}
          </div>
          <div className="h-11 sm:h-12 flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h3
                key={role.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="text-2xl sm:text-[1.7rem] font-bold tracking-tight text-zinc-900 font-sans"
              >
                {role.label}
              </motion.h3>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
