import Link from "next/link";
import { Logo } from "./Logo";
import { CONTACT_EMAIL, FOOTER_CAPABILITIES, FOOTER_COMPANY } from "@/lib/nav-links";

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
