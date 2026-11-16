import React, { createContext, useContext } from "react";
import { useThemeMode } from "@/hooks/useThemeMode";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
  const themeState = useThemeMode();

  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
