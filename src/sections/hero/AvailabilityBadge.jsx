import React from "react";
import { biography } from "@/content/biography";

export const AvailabilityBadge = () => {
  return (
    <a
      href="#contact"
      className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-hairline/70 bg-surface/70 hover:border-ember/50 hover:bg-raised transition-all duration-300 group"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-ember" />
      </span>
      <span className="text-[11px] font-mono uppercase tracking-widest text-ash group-hover:text-bone transition-colors">
        {biography.availability}
      </span>
    </a>
  );
};
