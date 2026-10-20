
"use client";

import type React from "react";
import { useContext, useEffect, useState } from "react";
import { Theme, themeContext } from "./themeContext";

const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const initialTheme = savedTheme ?? "light";

    document.documentElement.classList.toggle(
      "dark",
      initialTheme === "dark",
    );
  }, []);

  const setTheme = (newTheme: Theme) => {
    const updateTheme = () => {
      setThemeState(newTheme);

      document.documentElement.classList.toggle(
        "dark",
        newTheme === "dark",
      );

      localStorage.setItem("theme", newTheme);
    };

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      updateTheme();
      return;
    }

    document.startViewTransition(updateTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <themeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </themeContext.Provider>
  );
};

export default ThemeContextProvider;

export function useTheme() {
  const context = useContext(themeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeContextProvider",
    );
  }

  return context;
}
