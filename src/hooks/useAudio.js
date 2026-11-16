import { createContext, useContext } from "react";

export const AudioContext = createContext({
  isPlaying: false,
  toggleAudio: () => {}
});

export const useAudio = () => useContext(AudioContext);
