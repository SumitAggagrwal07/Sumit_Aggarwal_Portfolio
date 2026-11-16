import React from "react";
import { selectedWork } from "@/content/selectedWork";
import { WorkCard } from "./WorkCard";

export const SelectedWorkSection = () => {
  return (
    <section id="work" className="py-20 sm:py-24 px-6 lg:px-12 border-t border-hairline/40">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-ember mb-2 block font-medium">
            03 · SELECTED
          </span>
          <h2 className="font-serif-italic text-4xl sm:text-5xl md:text-6xl text-bone">
            Work
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {selectedWork.map((project, index) => (
            <WorkCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
