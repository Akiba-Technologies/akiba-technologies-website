"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { CASE_STUDIES } from "@/lib/case-studies";

const FEATURED_CASES = CASE_STUDIES;

export function RecentWork() {
  const cases = FEATURED_CASES;
  const [activeSlug, setActiveSlug] = useState<string>(cases[0]?.slug ?? "digifarm-ai");
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(128);

  // Measure sticky header height dynamically for exact alignment
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const updateH = () => {
      if (el) {
        setHeaderHeight(el.offsetHeight);
      }
    };

    updateH();
    const ro = new ResizeObserver(updateH);
    ro.observe(el);
    window.addEventListener("resize", updateH, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateH);
    };
  }, []);

  // Active case for meta display
  const activeIndex = Math.max(
    0,
    cases.findIndex((c) => c.slug === activeSlug)
  );
  const activeCase = (cases[activeIndex] ?? cases[0] ?? CASE_STUDIES[0])!;

  // Full-page scroll spy: evaluates which project card is centered at the reading focal line
  useEffect(() => {
    let ticking = false;

    const evaluateActiveCard = () => {
      // Natural reading focal line: 46% down the viewport
      const focalLine = window.innerHeight * 0.46;
      let bestSlug = "";
      let minDistance = Infinity;

      cardRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();

        // If card brackets the focal line, it is definitively the active one
        if (rect.top <= focalLine && rect.bottom >= focalLine) {
          bestSlug = el.getAttribute("data-slug") || "";
          minDistance = 0;
        } else if (minDistance !== 0) {
          const cardCenter = rect.top + rect.height * 0.5;
          const dist = Math.abs(cardCenter - focalLine);
          if (dist < minDistance) {
            minDistance = dist;
            bestSlug = el.getAttribute("data-slug") || "";
          }
        }
      });

      if (bestSlug) {
        setActiveSlug((prev) => (prev === bestSlug ? prev : bestSlug));
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          evaluateActiveCard();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    evaluateActiveCard();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Click card or preview tab to smoothly scroll that card to the focal line
  const handleCardSelect = (slug: string, index: number) => {
    setActiveSlug(slug);
    const targetEl = cardRefs.current[index];
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const focalLine = window.innerHeight * 0.46;
      const targetY = window.scrollY + rect.top - focalLine + rect.height * 0.35;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <section className="sec sec-recent-work" aria-labelledby="work-h">
      <div className="pattern-carbon" aria-hidden="true" />
      {/* Full-width Sticky Header Bar across the entire section */}
      <header ref={headerRef} className="shipped-sticky-header-bar">
        <div className="wrap">
          <Reveal className="shipped-header-content">
            <div className="shipped-header-info">
              <p className="kicker">Shipped Work &amp; Deployments</p>
              <h2 id="work-h" className="shipped-header-title">Proven software in <span className="title-accent">daily production</span></h2>
              <p className="lede shipped-header-lede">
                Real deployments engineered with our clients: from multi-location ERPs to high-concurrency SaaS and
                agritech mobile platforms.
              </p>
            </div>
            <div className="shipped-header-action">
              <Link className="btn btn-ghost btn-sm" href="/portfolio">
                View full portfolio
                <svg className="btn-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Split Showcase Layout: Left Sticky Preview, Right Scrollable Cards (Horizontally Aligned) */}
      <div className="wrap shipped-showcase-container">
        <div className="shipped-showcase-split">
          {/* Left Column: Sticky Visual Browser Preview (Aligned with Card 01) */}
          <div
            className="shipped-visual-sticky-col"
            style={{ "--shipped-hdr-h": `${headerHeight}px` } as React.CSSProperties}
          >
            <div className="shipped-preview-window">
              {/* Window Header Bar with interactive tabs */}
              <div className="shipped-preview-bar">
                <div className="kavana-window-dots">
                  <span className="dot dot-close" />
                  <span className="dot dot-min" />
                  <span className="dot dot-max" />
                </div>
                <div className="shipped-preview-tabs" role="tablist" aria-label="Project visual switcher">
                  {cases.map((c, idx) => (
                    <button
                      key={c.slug}
                      type="button"
                      role="tab"
                      aria-selected={c.slug === activeSlug}
                      onClick={() => handleCardSelect(c.slug, idx)}
                      className={`shipped-preview-tab ${c.slug === activeSlug ? "is-active" : ""}`}
                    >
                      <span className="tab-num">0{idx + 1}</span>
                      <span className="tab-name">{c.badge}</span>
                    </button>
                  ))}
                </div>
                <div className="shipped-preview-live">
                  <span className="live-dot" />
                  <span>Live</span>
                </div>
              </div>

              {/* Crossfading Preview Stage */}
              <div className="shipped-preview-stage">
                {cases.map((c) => (
                  <div
                    key={c.slug}
                    className={`shipped-preview-screen ${c.slug === activeSlug ? "is-active" : ""}`}
                    aria-hidden={c.slug !== activeSlug}
                  >
                    {c.image && (
                      <div className={`shipped-img-wrap ${c.slug === "digifarm-ai" ? "is-phone" : ""}`}>
                        <Image
                          src={c.image.src}
                          alt={c.image.alt}
                          width={c.image.width}
                          height={c.image.height}
                          sizes="(max-width: 960px) 100vw, 55vw"
                          className="shipped-img"
                          priority
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Window Caption / Metric Ribbon */}
              <div className="shipped-preview-footer">
                <span className="shipped-footer-title">{activeCase.title}</span>
                {activeCase.metricValue && (
                  <span className="shipped-footer-metric">
                    <b>{activeCase.metricValue}</b> &bull; {activeCase.metricLabel}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Full-Page Scrollable Project Cards */}
          <div className="shipped-cards-col">
            {cases.map((c, i) => {
              const isActive = c.slug === activeSlug;
              return (
                <article
                  key={c.slug}
                  data-slug={c.slug}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  onClick={() => handleCardSelect(c.slug, i)}
                  className={`card shipped-project-card ${isActive ? "is-active" : ""}`}
                >
                  <div className="case-top">
                    <span className="shipped-index-badge">0{i + 1}</span>
                    <span className="badge">{c.badge}</span>
                    <span className="tag">{c.year}</span>
                    {isActive && (
                      <span className="shipped-active-pill">
                        <span className="shipped-pulse-dot" /> Active Preview
                      </span>
                    )}
                  </div>

                  <h3 className="shipped-card-title">{c.title}</h3>
                  <p className="shipped-card-summary">{c.summary}</p>

                  {c.stack.length > 0 && (
                    <div className="b-stack">
                      {c.stack.map((s) => (
                        <span className="chip" key={s}>
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="shipped-card-action">
                    <Link
                      href={`/portfolio#${c.slug}`}
                      className="btn btn-ghost btn-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Explore Case Study
                      <svg className="btn-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
