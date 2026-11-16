import React from "react";
import { ArrowUp } from "lucide-react";
import { biography } from "@/content/biography";

export const SiteFooter = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-6 lg:px-12 border-t border-hairline/60 bg-canvas flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-ash tracking-wider">
      <div>
        <span>{biography.name}</span>
        <span className="mx-2 text-hairline">·</span>
        <span>© {currentYear} ALL RIGHTS RESERVED</span>
      </div>

      <div className="flex items-center gap-6">
        <span className="hidden md:inline-block">
          ENGINEERED WITH REACT, THREE.JS & LENIS
        </span>
        <button
          onClick={scrollToTop}
          type="button"
          aria-label="Back to top"
          className="flex items-center gap-1.5 p-2 px-3 rounded-full border border-hairline hover:border-ember/60 hover:text-bone transition-colors"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-ember" />
        </button>
      </div>
    </footer>
  );
};
