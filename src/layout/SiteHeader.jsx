import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { biography } from "@/content/biography";
import { navigationLinks } from "@/content/navigation";
import { useSmoothScroll } from "@/app/providers/SmoothScrollProvider";
import { SoundOnInteract } from "@/components/SoundOnInteract";
import { useTheme } from "@/app/providers/ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="w-9 h-9 rounded-full border border-hairline/70 bg-surface/80 hover:bg-raised hover:border-ember/70 text-bone transition-all duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember shadow-sm group"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -70, scale: 0.6, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 70, scale: 0.6, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-300 group-hover:text-ember transition-colors" />
        ) : (
          <Moon className="w-4 h-4 text-zinc-700 group-hover:text-ember transition-colors" />
        )}
      </motion.div>
    </button>
  );
};

export const SiteHeader = () => {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const lenisRef = useSmoothScroll();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < 80 || y < lastY);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  const goTo = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    setActive(id);
    setMenuOpen(false);
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(href, { offset: -72, duration: 1.2 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      animate={{ y: visible ? 0 : -88 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-10 py-5 flex items-center justify-between bg-canvas/80 backdrop-blur-md border-b border-hairline/20"
    >
      <SoundOnInteract>
        <a
          href="#hero"
          onClick={(e) => goTo(e, "#hero")}
          className="font-serif-italic text-xl sm:text-2xl text-bone hover:text-ember transition-colors"
        >
          {biography.name}
        </a>
      </SoundOnInteract>

      <nav className="hidden md:flex items-center gap-6 lg:gap-8">
        {navigationLinks.map((link) => {
          const isAct = active === link.href.replace("#", "");
          return (
            <SoundOnInteract key={link.label}>
              <a
                href={link.href}
                onClick={(e) => goTo(e, link.href)}
                className={`relative text-sm font-sans tracking-wide py-1 transition-colors min-h-[44px] flex items-center ${isAct ? "text-bone font-medium" : "text-ash/60 hover:text-bone"}`}
              >
                {link.label}
                {isAct && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-ember rounded-full"
                  />
                )}
              </a>
            </SoundOnInteract>
          );
        })}
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <ThemeToggle />
      </div>

      <div className="flex items-center gap-3 md:hidden">
        <ThemeToggle />
        <SoundOnInteract>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="p-2 text-bone hover:text-ember transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </SoundOnInteract>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-canvas/97 backdrop-blur-xl border-b border-hairline/40 p-8 flex flex-col gap-5 md:hidden shadow-2xl z-50"
          >
            {navigationLinks.map((link) => (
              <SoundOnInteract key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => goTo(e, link.href)}
                  className="font-serif-italic text-2xl text-bone hover:text-ember transition-colors py-1"
                >
                  {link.label}
                </a>
              </SoundOnInteract>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
