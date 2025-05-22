"use client";
import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeBodyClassProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const systemDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (theme === "system" && systemDark);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  return <>{children}</>;
}
