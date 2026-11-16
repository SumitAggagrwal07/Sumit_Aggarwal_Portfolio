import React, { createContext, useContext } from "react";
import { useAmbientAudio } from "@/hooks/useAmbientAudio";

export const AudioContext = createContext({
  isEnabled: true,
  isPlaying: false,
  toggleSound: () => {},
});

export const AudioProvider = ({ children }) => {
  const audio = useAmbientAudio();
  return (
    <AudioContext.Provider value={audio}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
