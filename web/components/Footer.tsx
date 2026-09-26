import Link from "next/link";
import { Logo } from "./Logo";
import { CONTACT_EMAIL, FOOTER_CAPABILITIES, FOOTER_COMPANY } from "@/lib/nav-links";

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4V9Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-about">
            <Logo />
            <p>Enterprise software engineering for operations that have outgrown the tools running them.</p>
            <p className="foot-slog">
              Save time.
              <br />
              Save money.
              <br />
              Save resources.
            </p>
            <div className="foot-socials" aria-label="Social links">
              <a
                href="https://www.linkedin.com/company/akiba-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="foot-soc-link"
                aria-label="LinkedIn - Akiba Technologies"
                title="LinkedIn - Akiba Technologies"
              >
                <LinkedinIcon />
              </a>
              <span
                className="foot-soc-link foot-soc-disabled"
                aria-label="Instagram (Coming soon)"
                title="Instagram (Coming soon)"
              >
                <InstagramIcon />
              </span>
              <span
                className="foot-soc-link foot-soc-disabled"
                aria-label="TikTok (Coming soon)"
                title="TikTok (Coming soon)"
              >
                <TiktokIcon />
              </span>
            </div>
          </div>

          <div>
            <h2>Capabilities</h2>
            <ul>
              {FOOTER_CAPABILITIES.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Company</h2>
            <ul>
              {FOOTER_COMPANY.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="foot-bar">
          <span>&copy; {year} Akiba Technologies</span>
          <span>{CONTACT_EMAIL}</span>
          <span className="r">
            <Link href="/contact">Start a project</Link>
            <Link href="/services">Our services</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
