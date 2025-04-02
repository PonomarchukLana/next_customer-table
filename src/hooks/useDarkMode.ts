"use client";

import { useState } from "react";
import { useCookies } from "react-cookie";

export const useDarkMode = (defaultTheme = "dark") => {
  const [theme, setTheme] = useState(defaultTheme);
  const [_, setCookie] = useCookies(["theme"]);

  const setAndSaveTheme = (theme: string) => {
    setTheme(theme);
    document.documentElement.classList.remove("light", "dark");
    if (theme === "dark") {
      document.documentElement.classList.add(theme);
    } else {
      document.documentElement.classList.add(theme);
    }
    setCookie("theme", theme, { path: "/" });
  };
  const toggleTheme = () => {
    setAndSaveTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
};
