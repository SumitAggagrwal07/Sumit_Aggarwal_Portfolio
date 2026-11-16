import { useState, useEffect, useRef, useCallback } from "react";

const STORAGE_KEY = "portfolio_sound_enabled";
const MAX_VOL = 0.2;

export const useAmbientAudio = () => {
  const getStored = () => {
    try { return localStorage.getItem(STORAGE_KEY) !== "false"; }
    catch { return true; }
  };

  const [isEnabled, setIsEnabled] = useState(getStored);
  const [isPlaying, setIsPlaying] = useState(false);
  const howlRef = useRef(null);
  const startedRef = useRef(false);
  const idRef = useRef(null);

  useEffect(() => {
    let howl;
    let mounted = true;

    const init = async () => {
      const { Howl } = await import("howler");
      howl = new Howl({
        src: ["/audio/shivelight.mp3"],
        html5: true,
        loop: true,
        volume: 0,
        onloaderror: () => {},
        onplayerror: () => {},
        onplay: () => { if (mounted) setIsPlaying(true); },
        onpause: () => { if (mounted) setIsPlaying(false); },
        onstop: () => { if (mounted) setIsPlaying(false); },
      });
      howlRef.current = howl;

      const tryPlay = () => {
        if (startedRef.current || !mounted) return;
        const enabled = localStorage.getItem(STORAGE_KEY) !== "false";
        if (!enabled) return;
        startedRef.current = true;
        const id = howl.play();
        idRef.current = id;
        howl.fade(0, MAX_VOL, 3000, id);
        detach();
      };

      const detach = () => {
        window.removeEventListener("pointerdown", tryPlay);
        window.removeEventListener("keydown", tryPlay);
        window.removeEventListener("touchend", tryPlay);
      };

      if (getStored()) {
        const id = howl.play();
        if (id !== null && id !== undefined) {
          startedRef.current = true;
          idRef.current = id;
          howl.fade(0, MAX_VOL, 3000, id);
        } else {
          window.addEventListener("pointerdown", tryPlay, { passive: true, once: true });
          window.addEventListener("keydown", tryPlay, { passive: true, once: true });
          window.addEventListener("touchend", tryPlay, { passive: true, once: true });
        }
      }

      const onVisibility = () => {
        if (!howlRef.current || !startedRef.current) return;
        if (localStorage.getItem(STORAGE_KEY) === "false") return;
        if (document.hidden) {
          howlRef.current.fade(howlRef.current.volume(), 0, 800, idRef.current);
          setTimeout(() => {
            if (document.hidden && howlRef.current) howlRef.current.pause(idRef.current);
          }, 850);
        } else {
          if (!howlRef.current.playing(idRef.current)) {
            idRef.current = howlRef.current.play();
          }
          howlRef.current.fade(0, MAX_VOL, 1200, idRef.current);
        }
      };
      document.addEventListener("visibilitychange", onVisibility);
      howl._visibilityHandler = onVisibility;
    };

    init();

    return () => {
      mounted = false;
      if (howl) {
        if (howl._visibilityHandler) {
          document.removeEventListener("visibilitychange", howl._visibilityHandler);
        }
        howl.unload();
      }
    };
  }, []);

  const toggleSound = useCallback(() => {
    const h = howlRef.current;
    if (!h) return;

    if (isEnabled) {
      h.fade(h.volume(), 0, 600, idRef.current);
      setTimeout(() => { if (h) h.pause(idRef.current); }, 650);
      setIsEnabled(false);
      setIsPlaying(false);
      try { localStorage.setItem(STORAGE_KEY, "false"); } catch {}
    } else {
      if (!h.playing(idRef.current)) {
        idRef.current = h.play();
        startedRef.current = true;
      }
      h.fade(0, MAX_VOL, 1000, idRef.current);
      setIsEnabled(true);
      try { localStorage.setItem(STORAGE_KEY, "true"); } catch {}
    }
  }, [isEnabled]);

  return { isEnabled, isPlaying, toggleSound };
};
