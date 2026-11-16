import React, { useState, useEffect, useRef } from "react";
import { academicJourney } from "@/content/academicJourney";
import { JourneyChapter } from "./JourneyChapter";
import { YearTicker } from "./YearTicker";

export const AcademicJourneySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const chapterRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.45;
      let activeIdx = 0;
      chapterRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY) {
          activeIdx = idx;
        }
      });
      setActiveIndex(activeIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const chapters = academicJourney.chapters;
  const currentChapter = chapters[activeIndex] || chapters[0];

  return (
    <section id="journey" ref={containerRef} className="py-24 sm:py-32 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative">
          <div className="lg:col-span-5 relative">
            <YearTicker
              currentChapter={currentChapter}
              currentIndex={activeIndex}
              totalChapters={chapters.length}
            />
          </div>

          <div className="lg:col-span-7 relative border-l-2 border-hairline/70 ml-2 md:ml-4">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                ref={(el) => (chapterRefs.current[index] = el)}
              >
                <JourneyChapter
                  chapter={chapter}
                  index={index}
                  isActive={activeIndex === index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
