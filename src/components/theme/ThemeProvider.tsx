"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { motionBudget, prefersReducedMotion } from "@/lib/motion";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: (origin?: { x: number; y: number } | null) => void;
};

const STORAGE_KEY = "portfolio-theme";
const THEME_EVENT = "portfolio-theme";
const THEME_TRANSITION_CLASS = "theme-transition";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readTheme(): Theme {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return getSystemTheme();
}

function applyTheme(theme: Theme, options?: { animate?: boolean }) {
  const root = document.documentElement;
  const shouldAnimate = Boolean(options?.animate) && !prefersReducedMotion();

  if (shouldAnimate) {
    root.classList.add(THEME_TRANSITION_CLASS);
    window.setTimeout(() => {
      root.classList.remove(THEME_TRANSITION_CLASS);
    }, motionBudget.themeTransitionMs);
  } else {
    root.classList.remove(THEME_TRANSITION_CLASS);
  }

  root.setAttribute("data-theme", theme);
}

function setThemeOrigin(origin?: { x: number; y: number } | null) {
  const root = document.documentElement;
  if (origin) {
    root.style.setProperty("--theme-origin-x", `${origin.x}px`);
    root.style.setProperty("--theme-origin-y", `${origin.y}px`);
  } else {
    root.style.setProperty("--theme-origin-x", "50%");
    root.style.setProperty("--theme-origin-y", "0%");
  }
}

function subscribeTheme(onStoreChange: () => void) {
  const handleChange = () => {
    applyTheme(readTheme(), { animate: false });
    onStoreChange();
  };

  window.addEventListener(THEME_EVENT, handleChange);
  window.addEventListener("storage", handleChange);

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", handleChange);

  return () => {
    window.removeEventListener(THEME_EVENT, handleChange);
    window.removeEventListener("storage", handleChange);
    media.removeEventListener("change", handleChange);
  };
}

function getThemeSnapshot(): Theme {
  return readTheme();
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const lastOrigin = useRef<{ x: number; y: number } | null>(null);

  const setTheme = useCallback((next: Theme) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next, { animate: true });
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number } | null) => {
      lastOrigin.current = origin ?? null;
      setThemeOrigin(origin ?? null);
      const next = theme === "light" ? "dark" : "light";
      window.localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next, { animate: true });
      window.dispatchEvent(new Event(THEME_EVENT));
    },
    [theme],
  );

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [setTheme, theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
