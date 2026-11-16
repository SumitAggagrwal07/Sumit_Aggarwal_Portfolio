import React, { useState, useEffect } from "react";

export const LocalClock = () => {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timePart = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      }).toLowerCase();
      const datePart = now.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
      setTimeString(`Local time ${timePart} · ${datePart}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline/60 bg-surface/50 text-[11px] font-mono tracking-wider text-ash">
      <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse-subtle" />
      <span>{timeString}</span>
    </div>
  );
};
