"use client";

import Link from "next/link";
import { Reveal } from "./Reveal";
import { useHomeConfig } from "@/lib/home-store";

export function HomeHeroCopy() {
  const { config } = useHomeConfig();
  const { hero } = config;

  return (
    <div className="hero-center-box">
      <Reveal as="p" className="kicker hero-kicker">
        {hero.badge || "Building Modern Technology Solutions"}
      </Reveal>

      <Reveal as="h1" className="hero-stretched-h1" delay={60}>
        {hero.titlePrefix || "Empowering digital transformation through"}{" "}
        <span className="grad">{hero.titleHighlight || "scalable technology"}</span>
      </Reveal>

      <Reveal as="p" className="lede hero-stretched-lede" delay={120}>
        {hero.lede ||
          "We build modern software and digital solutions that help businesses innovate and scale efficiently."}
      </Reveal>

      <Reveal className="hero-cta" delay={180}>
        <Link className="btn btn-em" href="/contact">
          Schedule Consultation
          <svg className="btn-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <Link className="btn btn-ghost" href="/services">
          Our Services
          <svg className="btn-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </Reveal>

      <Reveal as="div" className="hero-note" delay={240}>
        <Link href="/services#erp">ERP Systems</Link>
        <Link href="/services#web">Web &amp; Mobile</Link>
        <Link href="/services#ai">AI &amp; ML</Link>
        <Link href="/services#academy">AkibaTech Academy</Link>
      </Reveal>

      {hero.stats && hero.stats.length > 0 && (
        <Reveal as="div" className="hero-center-stats" delay={300}>
          {hero.stats.map((st) => (
            <div key={st.id} className="hero-center-stat-item">
              <span className="stat-val">{st.value}</span>
              <span className="stat-lbl">{st.label}</span>
            </div>
          ))}
        </Reveal>
      )}
    </div>
  );
}
