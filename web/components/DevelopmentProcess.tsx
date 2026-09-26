import { Reveal } from "./Reveal";

type ProcessStage = {
  hex: string;
  tag: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: (props: { className?: string }) => React.ReactNode;
};

const PROCESS_STAGES: ProcessStage[] = [
  {
    hex: "0x01",
    tag: "PLANNING",
    title: "PLANNING",
    description: "Requirements analysis, user stories, and project roadmap creation",
    deliverables: [
      "Requirements analysis",
      "User stories & backlog",
      "Project roadmap creation",
    ],
    icon: ({ className }) => (
      <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    hex: "0x02",
    tag: "DESIGN",
    title: "DESIGN",
    description: "UI/UX design, system architecture, and database modeling",
    deliverables: [
      "UI/UX interface design",
      "System architecture",
      "Database modeling",
    ],
    icon: ({ className }) => (
      <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    hex: "0x03",
    tag: "DEVELOPMENT",
    title: "DEVELOPMENT",
    description: "Agile coding sprints with continuous integration and testing",
    deliverables: [
      "Agile coding sprints",
      "Continuous integration",
      "Automated test suites",
    ],
    icon: ({ className }) => (
      <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    hex: "0x04",
    tag: "DEPLOYMENT",
    title: "DEPLOYMENT",
    description: "Production launch with monitoring and ongoing maintenance",
    deliverables: [
      "Production launch",
      "Real-time monitoring",
      "Ongoing maintenance",
    ],
    icon: ({ className }) => (
      <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
];

export function DevelopmentProcess() {
  return (
    <section className="sec sec-process" aria-labelledby="process-h">
      {/* Background circuit dots ambient pattern */}
      <div className="sec-pattern pattern-dots-circuit" aria-hidden="true" />

      <div className="wrap">
        <Reveal className="sec-head">
          <p className="kicker">DEVELOPMENT PROCESS</p>
          <h2 id="process-h">Agile software development methodology that delivers high-quality solutions</h2>
          <p className="lede">
            Structured engineering cycles designed for predictability, transparent milestones, and zero-defect production releases.
          </p>
        </Reveal>

        {/* Process Pipeline Grid */}
        <div className="process-pipeline-wrap">
          {/* Visual connected pipeline rail on desktop */}
          <div className="process-rail-line" aria-hidden="true">
            <span className="process-rail-pulse" />
          </div>

          <div className="process-pipeline-grid">
            {PROCESS_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <Reveal
                  key={stage.hex}
                  delay={idx * 80}
                  className="process-card-wrap"
                >
                  <article className="card process-card">
                    {/* Top Status & Telemetry Header */}
                    <div className="process-card-top">
                      <div className="process-hex-badge">
                        <span className="process-hex-num">{stage.hex}</span>
                      </div>
                      <div className="process-icon-wrap" aria-hidden="true">
                        <Icon className="process-icon" />
                      </div>
                    </div>

                    {/* Stage Kicker & Title */}
                    <div className="process-card-body">
                      <span className="process-stage-kicker">{stage.tag}</span>
                      <h3 className="process-stage-title">{stage.title}</h3>
                      <p className="process-stage-desc">{stage.description}</p>
                    </div>

                    {/* Deliverables / Checklist List */}
                    <div className="process-card-deliverables">
                      <span className="process-deliv-label">Key Milestones</span>
                      <ul className="process-deliv-list">
                        {stage.deliverables.map((item) => (
                          <li key={item} className="process-deliv-item">
                            <svg className="process-check-icon" width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                              <path d="M3 8.5l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Step indicator footer ribbon */}
                    <div className="process-card-foot">
                      <span className="process-step-pill">Phase 0{idx + 1} of 04</span>
                      <span className="process-foot-flow">Next &rarr;</span>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
