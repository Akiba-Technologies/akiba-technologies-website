"use client";

import { useState, useEffect, useRef } from "react";
import { TechIcon } from "./TechIcons";
import { Reveal } from "./Reveal";

interface TechCategory {
  id: string;
  title: string;
  highlightWord: string;
  remainingTitle: string;
  tagline: string;
  description: string;
  deployedIn: string;
  skills: string[];
}

// 100% authentic Akiba Technologies tech stack derived directly from our production systems:
// Akiba ERP, AutoBridge Systems, DigiFarm AI, Tway Real Estate, Royal Candy, Amigos Gym, and AkibaTech Academy.
const CATEGORIES: TechCategory[] = [
  {
    id: "web-platforms",
    title: "Enterprise Web Platforms",
    highlightWord: "Enterprise Web",
    remainingTitle: "Platforms",
    tagline: "Mission-critical portals, customer dashboards & high-conversion platforms",
    description:
      "Engineered for sub-second page loads, responsive architectural showcases, and distributed multi-branch management across Akiba ERP, Tway Real Estate, Royal Candy, and Hailemariam Export.",
    deployedIn: "Deployed in Akiba ERP, Tway Real Estate & Royal Candy Platforms",
    skills: [
      "REACT",
      "NEXT.JS",
      "TYPESCRIPT",
      "JAVASCRIPT",
      "TAILWIND CSS",
      "BOOTSTRAP",
      "HTML5",
    ],
  },
  {
    id: "backend-systems",
    title: "Backend & Ledger Systems",
    highlightWord: "Backend &",
    remainingTitle: "Ledger Systems",
    tagline: "High-concurrency transaction engines, REST APIs & audit-proof ledgers",
    description:
      "Powering the core multi-warehouse inventory ledgers, automated reorder triggers, double-entry financial audits, and member billing engines for Akiba ERP and Amigos Gym.",
    deployedIn: "Deployed in Akiba ERP Transaction Engine & Amigos Gym Management",
    skills: [
      "LARAVEL",
      "PHP",
      "PYTHON",
      "FASTAPI",
      "NODE.JS",
      "REST API",
      "NGINX",
    ],
  },
  {
    id: "ai-automation",
    title: "AI & Intelligent Automation",
    highlightWord: "AI &",
    remainingTitle: "Intelligent Automation",
    tagline: "Predictive machine learning, crop telemetry & automated contracting",
    description:
      "Practical intelligence embedded directly into client workflows — from DigiFarm crop disease diagnosis and yield prediction to AutoBridge citizen communication and automated government contracting.",
    deployedIn: "Deployed in AutoBridge GovTech & DigiFarm Agricultural AI",
    skills: [
      "PYTHON",
      "FASTAPI",
      "AZURE OPENAI",
      "OPENAI",
      "SCIKIT-LEARN",
      "PYTORCH",
      "PANDAS",
      "NUMPY",
    ],
  },
  {
    id: "database-engineering",
    title: "Database & Caching Engineering",
    highlightWord: "Database &",
    remainingTitle: "Caching Engineering",
    tagline: "ACID-compliant relational schemas, high-throughput caching & zero data loss",
    description:
      "Relational architectures and distributed in-memory caching built to maintain financial ledger accuracy to the cent across multi-branch transactions and high-traffic property catalogs.",
    deployedIn: "Deployed in Akiba ERP Ledgers, MySQL Clusters & Redis Cache",
    skills: [
      "MYSQL",
      "POSTGRESQL",
      "REDIS",
      "SQLITE",
    ],
  },
  {
    id: "mobile-field",
    title: "Mobile & Field Applications",
    highlightWord: "Mobile &",
    remainingTitle: "Field Applications",
    tagline: "Cross-platform mobile tools, barcode scanning & offline-first data sync",
    description:
      "Native and hybrid mobile applications built for smallholder farmers, gym front-desk check-ins, and warehouse barcode scanner hardware with resilient offline-first data synchronization.",
    deployedIn: "Deployed in DigiFarm Mobile & Warehouse Barcode Scanner Apps",
    skills: [
      "REACT NATIVE",
      "FLUTTER",
      "KOTLIN",
      "ANDROID SDK",
      "FIREBASE",
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Infrastructure",
    highlightWord: "Cloud &",
    remainingTitle: "DevOps Infrastructure",
    tagline: "Containerized deployments, multi-cloud hosting & automated CI/CD pipelines",
    description:
      "Hardened cloud environments delivering 99.9% uptime SLA for government portals, enterprise ERP installations, and public web platforms with automated failover and zero-downtime rollouts.",
    deployedIn: "Deployed on AWS Hosting, Microsoft Azure & Docker Clusters",
    skills: [
      "DOCKER",
      "AWS",
      "MICROSOFT AZURE",
      "GOOGLE CLOUD",
      "CLOUDFLARE",
      "GITHUB ACTIONS",
      "LINUX",
    ],
  },
];

export function TechnologiesWeUse() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const isScrollingToRef = useRef<boolean>(false);

  // Smooth scroll to card when clicking timeline node
  const scrollToCategory = (id: string) => {
    const el = cardRefs.current[id];
    if (!el) return;
    const targetIdx = CATEGORIES.findIndex((c) => c.id === id);
    if (targetIdx !== -1) {
      setActiveCategoryIndex(targetIdx);
    }

    isScrollingToRef.current = true;

    // Calculate scroll target taking sticky top into account
    const rect = el.getBoundingClientRect();
    const stickyTop = 105 + targetIdx * 8;
    const targetScrollTop = window.scrollY + rect.top - stickyTop;

    window.scrollTo({
      top: Math.max(0, targetScrollTop),
      behavior: "smooth",
    });

    setTimeout(() => {
      isScrollingToRef.current = false;
    }, 750);
  };

  // Scrollspy: update active category as the user scrolls through stacking cards
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isScrollingToRef.current) return;

      const stickyBase = 120;
      let highestPassedIdx = 0;

      for (let i = 0; i < CATEGORIES.length; i++) {
        const cat = CATEGORIES[i];
        if (!cat) continue;
        const el = cardRefs.current[cat.id];
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        // If the card has reached or passed its sticky threshold
        if (rect.top <= stickyBase + i * 8 + 30) {
          highestPassedIdx = i;
        }
      }

      setActiveCategoryIndex(highestPassedIdx);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Compute progress line percentage
  const progressPercent =
    CATEGORIES.length > 1
      ? (activeCategoryIndex / (CATEGORIES.length - 1)) * 100
      : 0;

  return (
    <section className="sec sec-tech-stack" id="technologies" aria-labelledby="tech-stack-h">
      {/* Background carbon pattern */}
      <div className="pattern-carbon" aria-hidden="true" />

      <div className="wrap">
        <div className="tech-stack-split">
          {/* Left Column: Fixed / Sticky with Connected Timeline Stepper */}
          <aside className="tech-stack-left-sticky">
            <Reveal>
              <div className="tech-badge-dna">
                <span className="tech-badge-dna-dot" />
                <span>Battle-Tested Systems</span>
              </div>

              <h2 id="tech-stack-h" className="tech-stack-title">
                ENGINEERED FOR SCALE, <br />
                <span className="tech-title-highlight">BUILT FOR PRODUCTION.</span>
              </h2>

              <p className="tech-stack-lede">
                Our technology stack is drawn strictly from our live production platforms. Every tool is
                battle-tested in real-world systems, from enterprise ERP ledgers to agricultural AI and
                GovTech platforms.
              </p>

              {/* Connected Timeline Track (Matching User's Reference Stepper) */}
              <div className="tech-timeline-container" aria-label="Technology disciplines timeline">
                {/* Continuous Background Vertical Track Line */}
                <div className="tech-timeline-track-line" aria-hidden="true" />

                {/* Animated Active Emerald Progress Line */}
                <div
                  className="tech-timeline-progress-line"
                  style={{ height: `${progressPercent}%` }}
                  aria-hidden="true"
                />

                {/* Step Nodes */}
                <nav className="tech-timeline-steps-list">
                  {CATEGORIES.map((cat, idx) => {
                    const isActive = idx === activeCategoryIndex;
                    const isPassed = idx < activeCategoryIndex;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => scrollToCategory(cat.id)}
                        className={`tech-timeline-step-btn ${isActive ? "is-active" : ""} ${isPassed ? "is-passed" : ""}`}
                        aria-current={isActive ? "true" : undefined}
                      >
                        {/* Circular Ring Node on the Vertical Line */}
                        <span className="tech-timeline-node-ring" aria-hidden="true">
                          <span className="tech-timeline-node-core" />
                        </span>

                        {/* Category Label beside the Node */}
                        <span className="tech-timeline-label-text">{cat.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Left Column Engineering Guarantee Box */}
              <div className="tech-stack-guarantee">
                <div className="tech-guarantee-stat">
                  <span className="tech-stat-val">99.9%</span>
                  <span className="tech-stat-lbl">Uptime SLA</span>
                </div>
                <div className="tech-guarantee-divider" />
                <div className="tech-guarantee-stat">
                  <span className="tech-stat-val">100%</span>
                  <span className="tech-stat-lbl">Type-Safe</span>
                </div>
                <div className="tech-guarantee-divider" />
                <div className="tech-guarantee-stat">
                  <span className="tech-stat-val">Zero</span>
                  <span className="tech-stat-lbl">Legacy Debt</span>
                </div>
              </div>
            </Reveal>
          </aside>

          {/* Right Column: Stacking Colliding Cards */}
          <div className="tech-stack-cards-column">
            {CATEGORIES.map((cat, idx) => {
              return (
                <article
                  key={cat.id}
                  id={`tech-cat-${cat.id}`}
                  ref={(el) => {
                    cardRefs.current[cat.id] = el;
                  }}
                  className="tech-stack-card"
                  style={{
                    top: `calc(105px + ${idx * 8}px)`,
                    zIndex: idx + 1,
                  }}
                >
                  <div className="tech-stack-card-inner">
                    {/* Card Header Information */}
                    <div className="tech-card-header">
                      {cat.deployedIn && (
                        <div className="tech-card-meta-bar">
                          <span className="tech-deployed-badge">
                            <span className="tech-deployed-dot" />
                            {cat.deployedIn}
                          </span>
                        </div>
                      )}

                      <h3 className="tech-card-title">
                        <span className="tech-title-accent">{cat.highlightWord}</span> {cat.remainingTitle}
                      </h3>
                      <h4 className="tech-card-tagline">{cat.tagline}</h4>
                      <p className="tech-card-desc">{cat.description}</p>
                    </div>

                    {/* Clean Tech Icons Grid directly on white card background - No fake terminal, no icon boxes */}
                    <div className="tech-tiles-grid">
                      {cat.skills.map((skill) => (
                        <div key={skill} className="tech-tile-item">
                          <div className="tech-tile-icon-box">
                            <TechIcon name={skill} size={38} />
                          </div>
                          <span className="tech-tile-name">{skill}</span>
                        </div>
                      ))}
                    </div>
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
