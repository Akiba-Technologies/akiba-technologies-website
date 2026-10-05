"use client";

import Link from "next/link";
import { Reveal } from "./Reveal";
import { useHomeConfig } from "@/lib/home-store";

export function HomeHeroCopy() {
  const { config } = useHomeConfig();
  const { hero } = config;

  return (
    <div className="hero-copy">
      <Reveal as="p" className="kicker hero-kicker">
        {hero.badge || "Building Modern Technology Solutions"}
      </Reveal>

      <Reveal as="h1" delay={60}>
        {hero.titlePrefix || "Empowering digital transformation through"}{" "}
        <span className="grad">{hero.titleHighlight || "scalable technology"}</span>
      </Reveal>

      <Reveal as="p" className="lede" delay={120}>
        {hero.lede ||
          "Akiba Tech builds modern, reliable, and high-impact software solutions. From full-stack web and cloud systems to custom enterprise platforms, we help modern businesses scale efficiently with clean architecture and cutting-edge engineering."}
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

    </div>
  );
}
