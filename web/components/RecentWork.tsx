"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { CASE_STUDIES, isLiveDemoUrl, type CaseStudy } from "@/lib/case-studies";

const CAROUSEL_PROJECTS: CaseStudy[] = CASE_STUDIES.slice(0, 5);

export function RecentWork() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const total = CAROUSEL_PROJECTS.length;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // 15-second auto-scroll with pause-on-hover and reset on manual slide change
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, 15000);

    return () => clearInterval(timer);
  }, [handleNext, isHovered, currentIndex]);

  // Keyboard navigation when user is in the carousel section
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handlePrev, handleNext]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    if (e.targetTouches && e.targetTouches[0]) {
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.targetTouches && e.targetTouches[0]) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <section className="sec sec-recent-work" aria-labelledby="work-h">
      {/* Carbon pattern background */}
      <div className="pattern-carbon" aria-hidden="true" />

      {/* Entire Section Content Contained in .wrap */}
      <div className="wrap portfolio-section-container">
        {/* Header Bar */}
        <Reveal className="portfolio-section-header">
          <div className="portfolio-header-text">
            <p className="kicker">Shipped Deployments</p>
            <h2 id="work-h" className="portfolio-section-title">
              Akiba Technologies <span className="title-accent">Portfolio</span>
            </h2>
            <p className="lede portfolio-section-lede">
              Proven software in daily production: from multi-location ERPs to high-concurrency SaaS and
              agritech mobile platforms.
            </p>
          </div>
          <div className="portfolio-header-action">
            <Link className="btn btn-ghost btn-sm" href="/portfolio">
              View full portfolio
              <svg className="btn-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </Reveal>

        {/* 3D Circular Rotate Carousel Stage */}
        <div
          className="portfolio-carousel-wrapper"
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="portfolio-carousel-stage">
            {CAROUSEL_PROJECTS.map((project, idx) => {
              let offset = idx - currentIndex;
              // Shortest distance for circular wrapping
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const isActive = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              let transformVal = "translateX(-50%) translateZ(0) rotateY(0deg) scale(1)";
              let zIndexVal = 10;
              let opacityVal = 1;

              if (isActive) {
                transformVal = "translateX(-50%) translateZ(0) rotateY(0deg) scale(1)";
                zIndexVal = 10;
                opacityVal = 1;
              } else if (isLeft) {
                // Peek card aligned precisely with section width boundary, layered behind active card
                transformVal =
                  "translateX(calc(-50% - var(--portfolio-peek-shift, 98px))) translateZ(-70px) rotateY(5deg) scale(0.96)";
                zIndexVal = 2;
                opacityVal = 0.22;
              } else if (isRight) {
                // Peek card aligned precisely with section width boundary, layered behind active card
                transformVal =
                  "translateX(calc(-50% + var(--portfolio-peek-shift, 98px))) translateZ(-70px) rotateY(-5deg) scale(0.96)";
                zIndexVal = 2;
                opacityVal = 0.22;
              } else {
                transformVal = `translateX(calc(-50% + ${offset * 180}px)) translateZ(-250px) rotateY(${offset > 0 ? -20 : 20}deg) scale(0.82)`;
                zIndexVal = 1;
                opacityVal = 0;
              }

              return (
                <div
                  key={project.slug}
                  className={`portfolio-card-slide ${isActive ? "is-active" : ""} ${isLeft ? "is-left-peek" : ""} ${isRight ? "is-right-peek" : ""}`}
                  style={{
                    transform: transformVal,
                    opacity: opacityVal,
                    zIndex: zIndexVal,
                    pointerEvents: isActive ? "auto" : "none",
                    cursor: "default",
                  }}
                  aria-hidden={!isActive}
                >
                  <div className="portfolio-card-inner">
                    {/* Left Column: Project Copy & Metadata with Fixed Equal Height */}
                    <div className="portfolio-card-copy">
                      <div className="portfolio-card-copy-top">
                        <div className="portfolio-pill-badge">
                          {project.badge.toUpperCase()}
                        </div>

                        <h3 className="portfolio-card-title">{project.title}</h3>
                        <p className="portfolio-card-desc">{project.summary}</p>
                      </div>

                      <div className="portfolio-card-copy-bottom">
                        <div className="portfolio-core-tech">
                          <div className="portfolio-tech-indicator" aria-hidden="true" />
                          <div className="portfolio-tech-info">
                            <span className="portfolio-tech-label">CORE TECHNOLOGY</span>
                            <span className="portfolio-tech-values">{project.stack.join(", ")}</span>
                          </div>
                        </div>

                        <div className="portfolio-card-cta">
                          {isLiveDemoUrl(project.liveDemoUrl) ? (
                            <a
                              href={project.liveDemoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="portfolio-details-link"
                            >
                              <span>Live demo</span>
                              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                <path d="M4.167 10h11.666m-5-5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </a>
                          ) : (
                            <Link
                              href="/portfolio"
                              className="portfolio-details-link"
                            >
                              <span>View details</span>
                              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                <path d="M4.167 10h11.666m-5-5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: High-Res Dashboard / Visual Mockup */}
                    <div className="portfolio-card-visual">
                      {project.image && (
                        <div className="portfolio-img-container">
                          <Image
                            src={project.image.src}
                            alt={project.image.alt}
                            fill
                            sizes="(max-width: 960px) 92vw, 540px"
                            className="portfolio-dashboard-img"
                            style={{ objectFit: "contain", objectPosition: "center" }}
                            priority={idx === 0}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Controls: Elongated Active Dot Pagination & Arrow Navigation Buttons */}
        <div className="portfolio-carousel-controls">
          {/* Pagination Dots */}
          <div className="portfolio-pagination-dots" role="tablist" aria-label="Portfolio carousel slides">
            {CAROUSEL_PROJECTS.map((p, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={p.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${idx + 1}: ${p.title}`}
                  onClick={() => setCurrentIndex(idx)}
                  className={`portfolio-dot-btn ${isActive ? "is-active" : ""}`}
                />
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="portfolio-nav-arrows">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project slide"
              className="portfolio-nav-arrow-btn is-prev"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M12.5 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project slide"
              className="portfolio-nav-arrow-btn is-next"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
