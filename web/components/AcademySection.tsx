import Link from "next/link";
import { Reveal } from "./Reveal";

const DISCIPLINES = [
  {
    num: "01",
    title: "Backend Architecture",
    tag: "High-Concurrency",
    description: "High-throughput engines, multi-tenant schemas, Redis caching & message queues.",
    topics: ["Distributed Systems", "Database Indexing", "Redis Caching", "Queue Workers"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "System Design",
    tag: "Resilience & Scale",
    description: "Distributed system scalability, load balancing, fault tolerance & blue-green deploy.",
    topics: ["Scalability Patterns", "Load Balancing", "Fault Isolation", "Zero-Downtime"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="5" r="3" />
        <circle cx="5" cy="19" r="3" />
        <circle cx="19" cy="19" r="3" />
        <line x1="12" y1="8" x2="5" y2="16" />
        <line x1="12" y1="8" x2="19" y2="16" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Algorithms",
    tag: "Computational Rigor",
    description: "Algorithmic problem-solving, compute complexity reduction & clean code design.",
    topics: ["Data Structures", "Time & Space Complexity", "Memory Profiling", "Clean Architecture"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
];

export function AcademySection() {
  return (
    <section className="sec sec-academy" id="academy" aria-labelledby="academy-h">
      {/* Background ambient lighting and subtle circuit grid */}
      <div className="academy-glow" aria-hidden="true" />
      <div className="sec-pattern pattern-dots-circuit" aria-hidden="true" />

      <div className="wrap">
        {/* Section Header */}
        <Reveal className="sec-head academy-head">
          <p className="kicker">Engineering Rigor &bull; AkibaTech Academy</p>

          <h2 id="academy-h" className="academy-title">
            We don&rsquo;t just consume modern tech <span className="title-accent">we teach it.</span>
          </h2>

          <p className="lede academy-lede">
            <b>200+ hand-selected engineers</b> trained in backend architecture, system design &amp; algorithms &mdash;
            so our clients get a core team at the forefront of clean code.
          </p>
        </Reveal>

        {/* 3 Core Curriculum Disciplines */}
        <div className="academy-grid">
          {DISCIPLINES.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 80} className="academy-card-wrap">
              <article className="card academy-card">
                <div className="academy-card-top">
                  <div className="academy-icon-box" aria-hidden="true">
                    {item.icon}
                  </div>
                  <span className="tag academy-num">{item.num}</span>
                </div>

                <div className="academy-badge-tag">{item.tag}</div>
                <h3 className="academy-card-title">{item.title}</h3>
                <p className="academy-card-desc">{item.description}</p>

                <div className="academy-topics-list" aria-label={`${item.title} topics`}>
                  {item.topics.map((t) => (
                    <span key={t} className="chip academy-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Akiba Hub Portal & Registration Callout */}
        <Reveal delay={120} className="academy-hub-callout-wrap">
          <div className="card academy-hub-callout">
            <div className="hub-callout-glow" aria-hidden="true" />

            <div className="hub-callout-info">
              <div className="hub-stat-ribbon">
                <div className="hub-stat-col">
                  <div className="hub-stat-val">200+</div>
                  <div className="hub-stat-lbl">Engineers Trained</div>
                </div>
                <div className="hub-stat-div" />
                <div className="hub-stat-col">
                  <div className="hub-stat-val">3 Pillars</div>
                  <div className="hub-stat-lbl">Backend, Systems, Algo</div>
                </div>
                <div className="hub-stat-div" />
                <div className="hub-stat-col">
                  <div className="hub-stat-val">100%</div>
                  <div className="hub-stat-lbl">Production Clean Code</div>
                </div>
              </div>

              <h3 className="hub-callout-title">Ready to train with Akiba or deploy an elite pod?</h3>
              <p className="hub-callout-desc">
                Log in or register on the <b>Akiba Hub</b> portal for program syllabus, admissions, and engineering assessments.
              </p>
            </div>

            <div className="hub-callout-actions">
              <a
                href="https://hub.akibatech.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-em btn-lg academy-hub-btn"
                id="akiba-hub-register"
              >
                <span>Akiba Hub &bull; Register</span>
                <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>

              <Link href="/services" className="btn btn-ghost academy-services-btn">
                Explore Our Services
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
