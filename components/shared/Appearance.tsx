
"use client";

import { useTheme } from "@/context/ThemeProvider";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

export default function Appearance() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <Button
      variant="outline"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="gap-2 rounded-xl border-slate-200 bg-white text-slate-600 shadow-xs transition-all hover:border-gray-200 hover:bg-gray-50 hover:text-gray-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-gray-900 dark:hover:bg-gray-950/30 dark:hover:text-gray-400"
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}
