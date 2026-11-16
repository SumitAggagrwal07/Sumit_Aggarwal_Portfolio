import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { TiltSurface } from "@/components/TiltSurface";
import { SoundOnInteract } from "@/components/SoundOnInteract";

export const WorkCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="w-full"
    >
      <TiltSurface className="p-6 sm:p-8 md:p-12 border border-hairline/80 bg-surface/80 flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-hairline/60">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-ember block mb-1">
              Project 0{index + 1} · {project.category}
            </span>
            <h3 className="font-serif-italic text-2xl sm:text-3xl md:text-4xl text-bone">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <SoundOnInteract>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-hairline bg-raised hover:border-ember/50 text-xs font-mono tracking-wider text-bone hover:text-ember transition-colors min-h-[44px]"
              >
                <Github className="w-4 h-4" />
                <span>Source</span>
              </a>
            </SoundOnInteract>

            {project.liveUrl && project.liveUrl !== "TODO" && (
              <SoundOnInteract>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bone text-canvas hover:bg-ember hover:text-bone text-xs font-mono tracking-wider font-semibold transition-colors min-h-[44px]"
                >
                  <span>Live demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </SoundOnInteract>
            )}
          </div>
        </div>

        <ul className="space-y-3 mb-8">
          {project.bullets.map((bullet, idx) => (
            <li
              key={idx}
              className="text-xs sm:text-sm text-ash font-light leading-relaxed flex items-start gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-ember mt-2 flex-shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-hairline/40">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wide border border-hairline/60 bg-raised/50 text-ash"
            >
              {tag}
            </span>
          ))}
        </div>
      </TiltSurface>
    </motion.div>
  );
};
