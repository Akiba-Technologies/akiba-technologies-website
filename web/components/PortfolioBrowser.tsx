"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { Reveal } from "./Reveal";
import { CASE_FILTERS, CASE_STUDIES, type CaseCategory, type CaseStudy } from "@/lib/case-studies";
import { getStoredProjects, type AdminProject } from "@/lib/admin-store";

function mapAdminProjectToCaseStudy(p: AdminProject): CaseStudy {
  const orig = CASE_STUDIES.find(
    (c) => c.slug === p.slug || c.title.toLowerCase() === p.title.toLowerCase()
  );

  let categories: CaseCategory[] = orig ? [...orig.categories] : [];
  if (categories.length === 0) {
    const catLower = (p.category || "").toLowerCase();
    if (catLower.includes("ai") || catLower.includes("ml")) categories = ["ai-ml"];
    else if (catLower.includes("mobile")) categories = ["mobile"];
    else if (catLower.includes("iot")) categories = ["iot"];
    else categories = ["web"];
  }

  const imageSrc = p.image || orig?.image?.src || "/work/akiba-erp-dashboard.png";

  return {
    slug: p.slug || orig?.slug || p.id,
    badge: p.category || orig?.badge || "Web Development",
    categoryLabel: p.category || orig?.categoryLabel || "Web Development",
    year: p.year || orig?.year || "2025",
    title: p.title,
    summary: p.summary,
    metricValue: p.metricValue || orig?.metricValue || "Full Suite",
    metricLabel: p.metricLabel || orig?.metricLabel || "verified platform impact",
    stack: p.stack && p.stack.length > 0 ? p.stack : orig?.stack || ["Laravel", "React"],
    categories,
    liveDemoUrl: p.liveDemoUrl || orig?.liveDemoUrl || "#",
    image: {
      src: imageSrc,
      alt: orig?.image?.alt || `${p.title} showcase screenshot`,
      width: orig?.image?.width || 1200,
      height: orig?.image?.height || 675,
    },
  };
}

export function PortfolioBrowser() {
  const [filter, setFilter] = useState<CaseCategory | "all">("all");
  const [studies, setStudies] = useState<CaseStudy[]>(CASE_STUDIES);

  useEffect(() => {
    const load = () => {
      const stored = getStoredProjects();
      if (stored && stored.length > 0) {
        const published = stored.filter((p) => p.status !== "draft");
        setStudies(published.map(mapAdminProjectToCaseStudy));
      }
    };
    load();

    const handleUpdate = () => load();
    window.addEventListener("akiba_projects_change", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("akiba_projects_change", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? studies : studies.filter((c) => c.categories.includes(filter))),
    [filter, studies]
  );

  return (
    <div className="portfolio-browser-wrap">
      {/* Category Filter Tabs */}
      <div className="filters" role="group" aria-label="Filter portfolio projects">
        {CASE_FILTERS.map((f) => (
          <button
            key={f.key}
            className="filter"
            type="button"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid Meta Header */}
      <div
        className="sec-head"
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 20,
          maxWidth: "none",
          flexWrap: "wrap",
          marginTop: 28,
        }}
      >
        <h2 id="cases-h" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)" }}>
          {filter === "all" ? "All Projects" : `${CASE_FILTERS.find((f) => f.key === filter)?.label}`}
        </h2>
        <span className="tag">
          Showing {String(visible.length).padStart(2, "0")} project{visible.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Projects Grid */}
      {visible.length > 0 ? (
        <div className="cases">
          {visible.map((c, i) => (
            <Reveal as="article" className="card case" delay={(i % 3) * 60} key={c.slug}>
              {c.image && (
                <div className="case-shot">
                  <Image
                    src={c.image.src}
                    alt={c.image.alt}
                    fill
                    sizes="(max-width: 680px) 100vw, (max-width: 1060px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                  <div className="case-shot-overlay" aria-hidden="true" />
                </div>
              )}

              <div className="case-top">
                <span className="badge">{c.badge}</span>
                <span className="tag">{c.year}</span>
              </div>

              <h3>{c.title}</h3>
              <p>{c.summary}</p>

              {c.metricValue && (
                <div className="case-metric">
                  <div className="v">{c.metricValue}</div>
                  <div className="l">{c.metricLabel}</div>
                </div>
              )}

              {c.stack.length > 0 && (
                <div className="b-stack">
                  {c.stack.map((s) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {/* Live Demo Action */}
              <div className="case-action">
                <a
                  href={c.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm case-demo-btn"
                  aria-label={`View live demo for ${c.title} (opens in new tab)`}
                >
                  <span>Live Demo</span>
                  <svg
                    className="btn-arrow"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="case-empty">
          <div className="card case-empty-box">
            <span className="badge">Custom Engineering</span>
            <h3>Specialized solutions built on demand</h3>
            <p>
              We engineer custom hardware telemetry, edge gateways, and connected software platforms. Contact our
              team to review technical specifications and request an architecture brief.
            </p>
            <div style={{ marginTop: 20 }}>
              <Link href="/contact" className="btn btn-em btn-sm">
                Discuss Your Requirements
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

