"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "akiba-theme";

type Theme = "dark" | "light";

// Dark is the site's real look and stays the default for every first-time
// visitor. This only ever switches a visitor INTO light mode, and only after
// they ask for it — see the no-flash script in layout.tsx for how the
// stored choice is applied before paint on repeat visits.
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // private browsing / storage blocked: the toggle still works for this
      // page view, it just won't be remembered next visit.
    }
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.8 14.3a8.5 8.5 0 0 1-10.6-11 8.6 8.6 0 1 0 10.6 11Z" />
        </svg>
      )}
    </button>
  );
}
