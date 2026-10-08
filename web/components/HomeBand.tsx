"use client";

import Link from "next/link";
import { Reveal } from "./Reveal";
import { useHomeConfig, DEFAULT_HOME_CONFIG } from "@/lib/home-store";

export function HomeBand() {
  const { config } = useHomeConfig();
  const cta = config.ctaBand || DEFAULT_HOME_CONFIG.ctaBand;

  return (
    <section className="band" aria-label="Call to Action">
      <div className="wrap band-in">
        <Reveal className="band-txt">
          <h2>{cta.heading || "Let’s build something that saves you time, money and resources."}</h2>
          <p className="band-slog">
            <span>{cta.sloganPart1 || "Save time."}</span>
            <span>{cta.sloganPart2 || "Save money."}</span>
            <span>{cta.sloganPart3 || "Save resources."}</span>
          </p>
        </Reveal>
        <Reveal as={Link} href={cta.btnHref || "/contact"} className="btn btn-em" delay={80}>
          {cta.btnLabel || "Start a project"}
          <svg className="btn-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
