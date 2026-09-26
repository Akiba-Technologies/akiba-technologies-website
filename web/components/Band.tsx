import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Band({
  heading,
  body,
  ctaHref,
  ctaLabel,
  showSlogan = false,
}: {
  heading: string;
  body?: ReactNode;
  ctaHref: string;
  ctaLabel: string;
  showSlogan?: boolean;
}) {
  return (
    <section className="band">
      <div className="wrap band-in">
        <Reveal className="band-txt">
          <h2>{heading}</h2>
          {showSlogan ? (
            <p className="band-slog">
              <span>Save time.</span>
              <span>Save money.</span>
              <span>Save resources.</span>
            </p>
          ) : (
            body && <p className="lede" style={{ marginTop: 14 }}>{body}</p>
          )}
        </Reveal>
        <Reveal as={Link} href={ctaHref} className="btn btn-em" delay={80}>
          {ctaLabel}
          <svg className="btn-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
