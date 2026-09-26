import Link from "next/link";
import { Reveal } from "./Reveal";

type HomeService = {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  points: string[];
  icon: React.ReactNode;
  linkUrl?: string;
  linkLabel?: string;
  isExternal?: boolean;
};

const SERVICES: HomeService[] = [
  {
    id: "erp",
    badge: "Enterprise",
    title: "ERP Systems",
    tagline: "Complete enterprise resource planning to streamline business processes.",
    points: [
      "Custom ERP Development",
      "Inventory Management Systems",
      "Financial Management Integration",
      "Supply Chain Optimization",
      "Business Intelligence & Reporting",
      "Multi-location Support",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: "web",
    badge: "Full-Stack",
    title: "Custom Web Development",
    tagline: "Fast, responsive, and SEO-friendly websites using latest technologies.",
    points: [
      "React, Next.js, & Vue.js Development",
      "Progressive Web Apps (PWA)",
      "E-commerce Solutions (Shopify, WooCommerce)",
      "CMS Integration (Sanity, Contentful)",
      "API Design & Integration",
      "Performance Optimization",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
  {
    id: "ai",
    badge: "Intelligence",
    title: "AI & Machine Learning",
    tagline: "Leverage the power of AI to automate tasks and gain valuable insights.",
    points: [
      "Custom LLM Integration (GPT-4, Claude)",
      "Chatbots & Virtual Assistants",
      "Predictive Analytics Models",
      "Natural Language Processing (NLP)",
      "Computer Vision Solutions",
      "Process Automation (RPA)",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93l-.75.14V14h3a3 3 0 0 1 3 3v1a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-1a3 3 0 0 1 3-3h3v-3.93l-.75-.14A4.002 4.002 0 0 1 8 6a4 4 0 0 1 4-4Z" />
        <circle cx="12" cy="6" r="1" />
      </svg>
    ),
  },
  {
    id: "learning",
    badge: "EdTech",
    title: "Learning Solutions",
    tagline: "Educational platforms and LMS tailored to your training needs.",
    points: [
      "Custom Learning Management Systems",
      "Interactive Course Content",
      "Student Progress Tracking",
      "Gamification & Engagement",
      "Certification & Badge Systems",
      "Video Streaming Integration",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: "mobile",
    badge: "Mobile Apps",
    title: "Mobile App Development",
    tagline: "Native and cross-platform mobile applications for iOS and Android.",
    points: [
      "React Native & Flutter Development",
      "iOS & Android Native Apps",
      "App Store Optimization (ASO)",
      "Mobile UI/UX Design",
      "Push Notifications",
      "Offline Functionality",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    id: "academy",
    badge: "Education",
    title: "Education Services (AkibaTech Academy)",
    tagline: "We don't just consume modern tech — we teach it with engineering rigor.",
    points: [
      "Backend Architecture",
      "System Design & Scalability",
      "Data Structures & Algorithms",
      "Clean Code & Engineering Rigor",
      "200+ Hand-Selected Engineers",
      "Akiba Hub Admissions Portal",
    ],
    linkUrl: "https://hub.akibatech.com/login",
    linkLabel: "Register on Akiba Hub",
    isExternal: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10" />
        <path d="M6 10h10" />
        <path d="M6 14h6" />
      </svg>
    ),
  },
];

export function HomeServices() {
  return (
    <section className="sec sec-home-services" id="services" aria-labelledby="home-serv-h">
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
            marginBottom: 42,
          }}
        >
          <div>
            <p className="kicker">Our Services</p>
            <h2 id="home-serv-h">Comprehensive technical solutions tailored to meet your unique challenges</h2>
            <p className="lede">
              From concept to deployment, we handle it all with senior engineering rigor.
            </p>
          </div>
          <Link className="btn btn-ghost btn-sm" href="/services">
            View All Services
            <svg className="btn-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>

        <div className="services-grid">
          {SERVICES.map((s, idx) => (
            <Reveal key={s.id} delay={idx * 60} className="service-card-wrap">
              <article id={`service-${s.id}`} className="card service-card">
                {/* Top Row: Icon & Badge */}
                <div className="service-card-top">
                  <div className="service-icon-box" aria-hidden="true">
                    {s.icon}
                  </div>
                  <span className="badge">{s.badge}</span>
                </div>

                {/* Title & 1-line Tagline */}
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.tagline}</p>

                {/* Visual Feature Checklist */}
                <ul className="service-feature-list" aria-label={`${s.title} capabilities`}>
                  {s.points.map((pt) => (
                    <li key={pt} className="service-feature-item">
                      <svg className="service-check" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8.5l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{pt}</span>
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
          ))}
        </div>
      </div>
    </section>
  );
}
