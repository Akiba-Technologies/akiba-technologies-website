"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { CASE_STUDIES } from "@/lib/case-studies";

const FEATURED_CASES = CASE_STUDIES;

export function RecentWork() {
  const cases = FEATURED_CASES;
  const [activeSlug, setActiveSlug] = useState<string>("akiba-erp");
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  // Active case for meta display
  const activeIndex = Math.max(
    0,
    cases.findIndex((c) => c.slug === activeSlug)
  );
  const activeCase = (cases[activeIndex] ?? cases[0] ?? CASE_STUDIES[0])!;

  // Evaluate which card is currently active in the cards container
  useEffect(() => {
    let ticking = false;

    const evaluateActiveCard = () => {
      const container = cardsContainerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      // Target focal line: 38% down inside the cards container viewport
      const focalY = containerRect.top + containerRect.height * 0.38;

      let bestSlug = "";
      let minDistance = Infinity;

      cardRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();

        if (rect.top <= focalY && rect.bottom >= focalY) {
          bestSlug = el.getAttribute("data-slug") || "";
          minDistance = 0;
        } else if (minDistance !== 0) {
          const cardCenter = rect.top + rect.height * 0.5;
          const dist = Math.abs(cardCenter - focalY);
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

    const container = cardsContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          evaluateActiveCard();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    evaluateActiveCard();

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Click card, preview tab, or arrows to scroll that card into view
  const handleCardSelect = (slug: string, index: number) => {
    setActiveSlug(slug);
    const targetEl = cardRefs.current[index];
    const container = cardsContainerRef.current;
    if (targetEl && container) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      const scrollTarget = targetRect.top - containerRect.top + container.scrollTop - 10;
      container.scrollTo({ top: scrollTarget, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    const prevCase = cases[activeIndex - 1];
    if (prevCase) {
      handleCardSelect(prevCase.slug, activeIndex - 1);
    }
  };

  const handleNext = () => {
    const nextCase = cases[activeIndex + 1];
    if (nextCase) {
      handleCardSelect(nextCase.slug, activeIndex + 1);
    }
  };

  // Allow scrolling the cards list when cursor is over the preview window
  const handleVisualWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = cardsContainerRef.current;
    if (!container) return;

    const isAtTop = container.scrollTop <= 0 && e.deltaY < 0;
    const isAtBottom =
      container.scrollTop + container.clientHeight >= container.scrollHeight - 4 &&
      e.deltaY > 0;

    if (!isAtTop && !isAtBottom) {
      container.scrollTop += e.deltaY;
    }
  };

  return (
    <section className="sec sec-recent-work" aria-labelledby="work-h">
      <div className="pattern-carbon" aria-hidden="true" />
      <div className="wrap">
        <Reveal
          className="sec-head"
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 20,
            maxWidth: "none",
            flexWrap: "wrap",
            marginBottom: 36,
          }}
        >
          <div>
            <p className="kicker">Shipped Work &amp; Deployments</p>
            <h2 id="work-h">Proven software in daily production</h2>
            <p className="lede">
              Real deployments engineered with our clients: from multi-location ERPs to high-concurrency SaaS and
              agritech mobile platforms.
            </p>
          </div>
          <Link className="btn btn-ghost btn-sm" href="/portfolio">
            View full portfolio
            <svg className="btn-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>

        {/* Split Showcase Layout with Immediate Scrollable Cards */}
        <div className="shipped-showcase-split">
          {/* Left Column: Visual Preview Window */}
          <div className="shipped-visual-sticky-col" onWheel={handleVisualWheel}>
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

          {/* Right Column: Scrollable Project Cards with clean header toolbar */}
          <div className="shipped-cards-col-wrap">
            <div className="shipped-cards-toolbar">
              <span className="shipped-cards-count">
                PROJECT <b>0{activeIndex + 1}</b> / 0{cases.length}
              </span>
              <div className="shipped-cards-nav">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  aria-label="Previous project"
                  className="shipped-nav-btn"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={activeIndex === cases.length - 1}
                  aria-label="Next project"
                  className="shipped-nav-btn"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="shipped-cards-col" ref={cardsContainerRef}>
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
      </div>
    </section>
  );
}
