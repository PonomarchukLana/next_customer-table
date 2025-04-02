"use client";

import { IconButton } from "@mui/material";
import { LightMode, ModeNight } from "@mui/icons-material";

import { useDarkMode } from "../hooks/useDarkMode";

export const DarkModeToggle = ({
  defaultMode = "dark",
}: {
  defaultMode: string;
}) => {
  const { theme, toggleTheme } = useDarkMode(defaultMode);
  return (
    <IconButton onClick={toggleTheme} className="text-[var(--color-text)]">
      {theme === "light" && <LightMode className="text-[var(--color-text)]" />}
      {theme === "dark" && (
        <ModeNight className="w-6 h-6 text-[var(--color-text)]" />
      )}
    </IconButton>
  );
};
