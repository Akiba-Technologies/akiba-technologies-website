"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_LINKS } from "@/lib/nav-links";

// A link is "active" when its path (ignoring any #hash) matches the current
// route. /portfolio#akiba-erp and /portfolio both light up on /portfolio.
function isActive(pathname: string, href: string) {
  const [path] = href.split("#");
  return path === pathname;
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel on route change and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-in">
          <Logo priority />

          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                className={`nav-link${isActive(pathname, link.href) ? " active" : ""}`}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link className="btn btn-em btn-sm nav-cta" href="/contact">
            Start a Project
          </Link>

          <ThemeToggle />

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="m-nav"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </header>

      <div className="nav-mobile" id="m-nav" hidden={!open}>
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        <Link className="btn btn-em" href="/contact">
          Start a Project
        </Link>
      </div>
    </>
  );
}
