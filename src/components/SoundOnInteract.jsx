import React from "react";
import { useInterfaceSound } from "@/hooks/useInterfaceSound";

export const SoundOnInteract = ({ children }) => {
  const { playHover, playClick } = useInterfaceSound();

  if (!React.isValidElement(children)) return children;

  return React.cloneElement(children, {
    onMouseEnter: (e) => {
      playHover();
      children.props.onMouseEnter?.(e);
    },
    onClick: (e) => {
      playClick();
      children.props.onClick?.(e);
    },
  });
};
