"use client";

import { createContext } from "react";

export type Theme = "light" | "dark" ;

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const themeContext = createContext<ThemeContextType | null>(null);