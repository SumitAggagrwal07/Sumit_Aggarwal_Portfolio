import { useRef, useEffect, useCallback } from "react";
import { useAudio } from "@/app/providers/AudioProvider";

const THROTTLE_MS = 150;

export const useInterfaceSound = () => {
  const { isEnabled } = useAudio();
  const ctxRef = useRef(null);
  const bufRef = useRef(null);
  const lastRef = useRef(0);
  const isEnabledRef = useRef(isEnabled);

  useEffect(() => { isEnabledRef.current = isEnabled; }, [isEnabled]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        const ctx = new Ctx();
        ctxRef.current = ctx;
        const res = await fetch("/audio/ui-stamp.mp3");
        if (!res.ok || cancelled) return;
        const ab = await res.arrayBuffer();
        if (cancelled) return;
        bufRef.current = await ctx.decodeAudioData(ab);
      } catch {}
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const play = useCallback((vol = 0.04) => {
    if (!isEnabledRef.current || !bufRef.current || !ctxRef.current) return;
    const now = Date.now();
    if (now - lastRef.current < THROTTLE_MS) return;
    lastRef.current = now;

    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    const src = ctx.createBufferSource();
    src.buffer = bufRef.current;
    src.playbackRate.value = 0.9;

    const filt = ctx.createBiquadFilter();
    filt.type = "lowpass";
    filt.frequency.value = 1400;

    const gain = ctx.createGain();
    const t = ctx.currentTime;
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);

    src.connect(filt);
    filt.connect(gain);
    gain.connect(ctx.destination);
    src.start(t);
    src.stop(t + 0.25);
  }, []);

  return {
    playHover: useCallback(() => play(0.04), [play]),
    playClick: useCallback(() => play(0.12), [play]),
  };
};
