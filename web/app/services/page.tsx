import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { FlagshipErpSection } from "@/components/FlagshipErpSection";
import { Band } from "@/components/Band";

export const metadata: Metadata = {
  title: "Our Services | Akiba Tech",
  description:
    "Explore Akiba Tech's core engineering offerings: Custom Software & Web Development, Cloud & Infrastructure Solutions, AI & Automation Systems, and Akiba ERP platforms.",
  openGraph: {
    title: "Our Services | Akiba Tech",
    description: "Building modern technology solutions: custom software, cloud systems, and intelligent digital products.",
  },
};

type ServiceItem = {
  id: string;
  badge: string;
  title: string;
  description: string;
  features: string[];
  icon: (props: { className?: string }) => React.ReactNode;
  linkUrl?: string;
  linkLabel?: string;
  isExternal?: boolean;
};

const SERVICES: ServiceItem[] = [
  {
    id: "web",
    badge: "Full-Stack & APIs",
    title: "Custom Software & Web Development",
    description: "Full-stack development, modern APIs, responsive web applications, and UI/UX design with clean code and fast delivery.",
    features: [
      "Modern React & Next.js Web Platforms",
      "Robust REST & GraphQL API Design",
      "Intuitive Responsive UI/UX Engineering",
      "Clean Architecture & Modular Code",
      "Progressive Web Apps (PWA) & Offline Sync",
      "Fast, Reliable, & Continuous Delivery",
    ],
    icon: ({ className }) => (
      <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
  {
    id: "cloud",
    badge: "Cloud & DevOps",
    title: "Cloud & Infrastructure Solutions",
    description: "DevOps automation, database design, Docker containerization, and cloud deployment emphasizing security, high uptime, and enterprise scalability.",
    features: [
      "DevOps Automation & CI/CD Pipelines",
      "High-Performance Database Architecture",
      "Docker Containerization & Orchestration",
      "Multi-Cloud Deployment (AWS, GCP, Azure)",
      "Zero-Downtime Infrastructure & Backups",
      "Enterprise Scalability & 99.9% SLA Uptime",
    ],
    icon: ({ className }) => (
      <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
  {
    id: "ai",
    badge: "Intelligence & Automation",
    title: "AI & Automation Systems",
    description: "Intelligent workflow automation, AI integration, and data pipelines engineered for business efficiency and cost reduction.",
    features: [
      "Intelligent Workflow Automation (RPA)",
      "Custom LLM Integration & AI Agents",
      "Automated Business Data Pipelines & ETL",
      "Predictive Analytics & Decision Models",
      "Natural Language Processing (NLP)",
      "Secure On-Prem & Private Cloud Inference",
    ],
    icon: ({ className }) => (
      <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93l-.75.14V14h3a3 3 0 0 1 3 3v1a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-1a3 3 0 0 1 3-3h3v-3.93l-.75-.14A4.002 4.002 0 0 1 8 6a4 4 0 0 1 4-4Z" />
        <circle cx="12" cy="6" r="1" />
      </svg>
    ),
  },
  {
    id: "erp",
    badge: "Enterprise Flagship",
    title: "Akiba ERP Platforms",
    description: "Unified enterprise resource planning for multi-location inventory, warehouse management, purchasing, and real-time financial ledgers.",
    features: [
      "Custom Enterprise ERP Architecture",
      "Multi-Warehouse Real-Time Inventory",
      "Reconciled Accounting & Tax Ledgers",
      "Supply Chain & Automated Reordering",
      "Barcode & Hardware Scanner Support",
      "Executive Analytics & Multi-Branch Auditing",
    ],
    icon: ({ className }) => (
      <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: "academy",
    badge: "Education & Talent",
    title: "Education Services (AkibaTech Academy)",
    description: "We don't just consume modern tech — we teach it with engineering rigor across Africa.",
    features: [
      "Backend Architecture & System Design",
      "Data Structures & Algorithmic Problem Solving",
      "Clean Code & Production Quality Rigor",
      "200+ Engineers Trained in Addis Ababa",
      "Enterprise Apprenticeship Pods",
      "Akiba Hub Admissions Portal",
    ],
    linkUrl: "https://hub.akibatech.com/login",
    linkLabel: "Register on Akiba Hub",
    isExternal: true,
    icon: ({ className }) => (
      <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10" />
        <path d="M6 10h10" />
        <path d="M6 14h6" />
      </svg>
    ),
  },
  {
    id: "mobile",
    badge: "Mobile Apps",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    features: [
      "React Native & Flutter Development",
      "iOS & Android Native Apps",
      "App Store Optimization (ASO)",
      "Mobile UI/UX Design",
      "Push Notifications & Telemetry",
      "Offline-First Data Synchronization",
    ],
    icon: ({ className }) => (
      <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
];

type IndustryItem = {
  title: string;
  description: string;
  icon: (props: { className?: string }) => React.ReactNode;
};

const INDUSTRIES: IndustryItem[] = [
  {
    title: "Healthcare",
    description: "Patient portals, clinic management & health data systems",
    icon: ({ className }) => (
      <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    title: "Finance & Fintech",
    description: "Wallets, payment gateways & financial dashboards",
    icon: ({ className }) => (
      <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    title: "E-commerce",
    description: "Online stores, inventory & recommendation engines",
    icon: ({ className }) => (
      <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    ),
  },
  {
    title: "Education",
    description: "LMS platforms, e-learning & student tracking systems",
    icon: ({ className }) => (
      <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    title: "Real Estate",
    description: "Property listings, CRM & management platforms",
    icon: ({ className }) => (
      <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Logistics",
    description: "Fleet tracking, supply chain & delivery management",
    icon: ({ className }) => (
      <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ===================== PAGE HEADER (with wavy pattern) ===================== */}
      <section className="phead" aria-labelledby="serv-h">
        <div className="wrap">
          <Reveal as="p" className="kicker">
            Technical Capabilities
          </Reveal>
          <Reveal as="h1" delay={60} id="serv-h">
            Our Services
          </Reveal>
          <Reveal as="p" className="lede" delay={120}>
            Comprehensive technical solutions tailored to meet your unique business challenges. From concept to deployment, we handle it all.
          </Reveal>
          <Reveal as="div" className="phead-meta" delay={180}>
            <span><b>6</b> Core Engineering Disciplines</span>
            <span><b>Full</b> IP Transfer on Delivery</span>
            <span><b>SLA</b> Backed Deployments</span>
            <span>Save <b>Time, Money &amp; Resources</b></span>
          </Reveal>
        </div>
      </section>

      {/* ===================== 6 CORE SERVICES GRID ===================== */}
      <section className="sec sec-services" aria-labelledby="serv-grid-h">
        <div className="wrap">
          <Reveal className="sec-head">
            <p className="kicker">Capabilities &amp; Specializations</p>
            <h2 id="serv-grid-h">Engineering disciplines <span className="title-accent">built for scale</span></h2>
            <p className="lede">
              Explore our core technical offerings. Every project receives dedicated senior engineering leadership,
              transparent sprints, and continuous integration.
            </p>
          </Reveal>

          <div className="services-grid">
            {SERVICES.map((s, idx) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.id} delay={idx * 60} className="service-card-wrap">
                  <article id={s.id} className="card service-card">
                    {/* Top Bar with Icon & Badge */}
                    <div className="service-card-top">
                      <div className="service-icon-box" aria-hidden="true">
                        <Icon className="service-icon" />
                      </div>
                      <span className="badge">{s.badge}</span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="service-title">{s.title}</h3>
                    <p className="service-desc">{s.description}</p>

                    {/* Feature Checklist */}
                    <ul className="service-feature-list" aria-label={`${s.title} capabilities`}>
                      {s.features.map((feat) => (
                        <li key={feat} className="service-feature-item">
                          <svg className="service-check" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8.5l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Button */}
                    <div className="service-card-action">
                      {s.isExternal ? (
                        <a
                          className="btn btn-em btn-sm service-quote-btn"
                          href={s.linkUrl || "https://hub.akibatech.com/login"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {s.linkLabel || "Register on Akiba Hub"}
                          <svg className="btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      ) : (
                        <Link className="btn btn-ghost btn-sm service-quote-btn" href={`/contact?service=${s.id}`}>
                          Get a Quote
                          <svg className="btn-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
 
       {/* ===================== FLAGSHIP PRODUCTION SYSTEM (AKIBA ERP SPOTLIGHT) ===================== */}
       <FlagshipErpSection />

      {/* ===================== INDUSTRIES WE SERVE ===================== */}
      <section className="sec sec-industries" aria-labelledby="ind-h">
        <div className="sec-pattern pattern-dots-circuit" aria-hidden="true" />
        <div className="wrap">
          <Reveal className="sec-head">
            <p className="kicker">Industries We Serve</p>
            <h2 id="ind-h">Delivering excellence across diverse sectors with <span className="title-accent">specialized expertise</span></h2>
            <p className="lede">
              We design software around the exact compliance frameworks, transaction velocities, and operational realities of your vertical.
            </p>
          </Reveal>

          <div className="industries-grid">
            {INDUSTRIES.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <Reveal key={ind.title} delay={i * 60} className="industry-card-wrap">
                  <div className="card industry-card">
                    <div className="industry-icon-box" aria-hidden="true">
                      <Icon className="industry-icon" />
                    </div>
                    <h3 className="industry-title">{ind.title}</h3>
                    <p className="industry-desc">{ind.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== CALL TO ACTION (PORTFOLIO BAND STYLE) ===================== */}
      <Band
        heading="Not sure what you need? Let’s talk architecture."
        body="Schedule a consultation with our architects. We will analyze your workflow and propose a fixed-timeline engineering roadmap."
        ctaHref="/contact"
        ctaLabel="Start a project"
        showSlogan
      />
    </>
  );
}
