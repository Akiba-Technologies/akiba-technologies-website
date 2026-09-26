import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Band } from "@/components/Band";

export const metadata: Metadata = {
  title: "About Us | Akiba Technologies",
  description:
    "Learn about Akiba Technologies, our mission, vision, engineering standards, and leadership team based in Addis Ababa, Ethiopia.",
  openGraph: {
    title: "About Us | Akiba Technologies",
    description: "Empowering businesses through scalable software engineering, AI solutions, and tech education.",
  },
};

type TeamMember = {
  initials: string;
  name: string;
  role: string;
  bio: string;
};

const LEADERSHIP: TeamMember[] = [
  {
    initials: "AH",
    name: "Abdulhamid Hayredin",
    role: "Chief Executive Officer (CEO)",
    bio: "Leads overall company vision, strategic partnerships, and operations, driving digital transformation and sustainable business growth.",
  },
  {
    initials: "AS",
    name: "Abdrehim Shemsu",
    role: "Chief Product Officer (CPO)",
    bio: "Directs product strategy, user experience, and feature roadmaps, ensuring technical solutions translate into seamless client outcomes.",
  },
  {
    initials: "EA",
    name: "Efrem Alemnew",
    role: "Chief Technology Officer (CTO)",
    bio: "Oversees core system architecture, engineering rigor, and infrastructure scalability, ensuring enterprise-grade performance and security.",
  },
  {
    initials: "OS",
    name: "Osama Seid",
    role: "Chief Marketing Officer (CMO)",
    bio: "Leads market expansion, client engagement, and brand strategy, connecting businesses with modern software and AI capabilities.",
  },
];

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.51 2.87 8.34 6.84 9.69.5.09.68-.22.68-.49l-.01-1.71c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9l-.01 2.81c0 .27.18.59.69.49A10.03 10.03 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4V9Z" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ===================== HERO / PAGE HEADER ===================== */}
      <section className="phead" aria-labelledby="about-h">
        <div className="wrap">
          <Reveal as="p" className="kicker">
            About Akiba Technologies
          </Reveal>
          <Reveal as="h1" delay={60} id="about-h">
            Engineering Solutions That Drive Real Business Growth
          </Reveal>
          <Reveal as="p" className="lede" delay={120}>
            We design, develop, and maintain high-performance software systems for growing businesses and enterprises.
            Based in Addis Ababa, Ethiopia, our focus is practical: delivering reliable digital infrastructure that
            saves time, reduces operational costs, and accelerates growth.
          </Reveal>
          <Reveal as="div" className="phead-meta" delay={180}>
            <span><b>50+</b> Production Systems Deployed</span>
            <span><b>200+</b> Engineers Trained at Academy</span>
            <span><b>99.9%</b> System Uptime SLA</span>
            <span><b>100%</b> Full IP Transfer</span>
          </Reveal>
        </div>
      </section>

      {/* ===================== MISSION & VISION ===================== */}
      <section className="sec" aria-labelledby="mv-h">
        <div className="wrap">
          <Reveal className="sec-head">
            <p className="kicker">Mission &amp; Vision</p>
            <h2 id="mv-h">Our Purpose and Direction</h2>
            <p className="lede">
              Clear commitments that guide how we engineer software and build relationships with our clients.
            </p>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 20,
              marginTop: 20,
            }}
          >
            {/* Mission Card */}
            <Reveal as="article" className="card" delay={60} style={{ padding: "32px 28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--mint)",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 style={{ margin: 0, fontSize: "1.28rem" }}>Our Mission</h3>
              </div>
              <p style={{ color: "var(--slate)", lineHeight: 1.65, fontSize: "0.95rem", margin: "0 0 20px" }}>
                To deliver scalable, production-grade software and industry-leading technical education that empowers
                businesses to automate workflows, streamline operations, and scale with confidence.
              </p>
              <div className="b-stack">
                <span className="chip">Scalable Systems</span>
                <span className="chip">Measurable Business ROI</span>
                <span className="chip">Reliable Support</span>
              </div>
            </Reveal>

            {/* Vision Card */}
            <Reveal as="article" className="card" delay={120} style={{ padding: "32px 28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--mint)",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 style={{ margin: 0, fontSize: "1.28rem" }}>Our Vision</h3>
              </div>
              <p style={{ color: "var(--slate)", lineHeight: 1.65, fontSize: "0.95rem", margin: "0 0 20px" }}>
                To establish East Africa as a premier global hub for software engineering and AI innovation, building
                world-class digital solutions that compete on the international stage.
              </p>
              <div className="b-stack">
                <span className="chip">Global Quality Standards</span>
                <span className="chip">Regional Tech Leadership</span>
                <span className="chip">Elite Engineering Talent</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== CORE VALUES ===================== */}
      <section className="sec sec-tint" aria-labelledby="values-h">
        <div className="wrap">
          <Reveal className="sec-head">
            <p className="kicker">Core Values</p>
            <h2 id="values-h">How We Work &amp; What We Stand For</h2>
            <p className="lede">
              Practical principles that define our engineering approach and delivery quality.
            </p>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
              marginTop: 20,
            }}
          >
            <Reveal as="article" className="card" delay={40} style={{ padding: "26px 22px" }}>
              <span className="ix">01</span>
              <h3 style={{ margin: "14px 0 8px", fontSize: "1.1rem" }}>Technical Excellence</h3>
              <p style={{ color: "var(--slate)", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
                Clean, typed, and well-architected code built for longevity. We prioritize maintainability and performance
                over temporary shortcuts.
              </p>
            </Reveal>

            <Reveal as="article" className="card" delay={80} style={{ padding: "26px 22px" }}>
              <span className="ix">02</span>
              <h3 style={{ margin: "14px 0 8px", fontSize: "1.1rem" }}>Client Collaboration</h3>
              <p style={{ color: "var(--slate)", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
                Transparent communication, bi-weekly progress demos, and clear delivery roadmaps so you are always in
                complete control.
              </p>
            </Reveal>

            <Reveal as="article" className="card" delay={120} style={{ padding: "26px 22px" }}>
              <span className="ix">03</span>
              <h3 style={{ margin: "14px 0 8px", fontSize: "1.1rem" }}>Measurable Impact</h3>
              <p style={{ color: "var(--slate)", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
                Software designed to solve tangible operational challenges: saving team hours, automating repetitive tasks,
                and increasing capacity.
              </p>
            </Reveal>

            <Reveal as="article" className="card" delay={160} style={{ padding: "26px 22px" }}>
              <span className="ix">04</span>
              <h3 style={{ margin: "14px 0 8px", fontSize: "1.1rem" }}>Education &amp; Talent</h3>
              <p style={{ color: "var(--slate)", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
                Through AkibaTech Academy, we actively train hundreds of developers in backend architecture, system design,
                and algorithms.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== LEADERSHIP TEAM ===================== */}
      <section className="sec" id="team" aria-labelledby="team-h">
        <div className="wrap">
          <Reveal className="sec-head">
            <p className="kicker">Leadership Team</p>
            <h2 id="team-h">Meet Our Leadership</h2>
            <p className="lede">
              Experienced leaders guiding product innovation, engineering rigor, and client success.
            </p>
          </Reveal>

          <div className="team">
            {LEADERSHIP.map((person, i) => (
              <Reveal as="article" className="card person" delay={i * 60} key={person.name}>
                <span className="face" aria-hidden="true">
                  {person.initials}
                </span>
                <h3>{person.name}</h3>
                <p className="role">{person.role}</p>
                <p>{person.bio}</p>
                <div className="links">
                  <a className="ilink" href="#" aria-label={`LinkedIn profile, ${person.name}`}>
                    <LinkedinIcon />
                  </a>
                  <a className="ilink" href="#" aria-label={`GitHub profile, ${person.name}`}>
                    <GithubIcon />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TRUST & STANDARDS ===================== */}
      <section className="sec-tight sec-tint" aria-labelledby="trust-h">
        <div className="wrap">
          <Reveal className="sec-head">
            <p className="kicker">Trust &amp; Standards</p>
            <h2 id="trust-h">Built On Industry-Standard Commitments</h2>
            <p className="lede">
              Clear agreements and operational practices you can depend on.
            </p>
          </Reveal>

          <Reveal delay={60}>
            <div className="comply">
              <div>
                <span className="ico" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="10.5" width="16" height="10" rx="2" />
                    <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5M12 14.5v2.5" />
                  </svg>
                </span>
                <h3>Full IP Ownership</h3>
                <p>All source code, database structures, configurations, and documentation belong 100% to you upon delivery.</p>
              </div>

              <div>
                <span className="ico" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3 4.5 6v6c0 4.4 3.1 7.9 7.5 9 4.4-1.1 7.5-4.6 7.5-9V6L12 3Z" />
                    <path d="m9 12 2.2 2.2L15.4 10" />
                  </svg>
                </span>
                <h3>Security by Design</h3>
                <p>Role-based access control, encrypted data storage and transmission, and regular code reviews for peace of mind.</p>
              </div>

              <div>
                <span className="ico" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
                    <path d="M14 3v5h5M9 14h6M9 17.5h4" />
                  </svg>
                </span>
                <h3>Confidentiality &amp; NDA</h3>
                <p>Mutual non-disclosure agreements signed before discussing technical specifications or business data.</p>
              </div>

              <div>
                <span className="ico" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5.2l3.4 2" />
                  </svg>
                </span>
                <h3>Dedicated SLA &amp; Support</h3>
                <p>Proactive monitoring, uptime guarantees, and responsive support channels for production environments.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== BOTTOM CTA ===================== */}
      <Band
        heading="Ready to discuss your software project?"
        body="Get in touch with our team today for a free discovery consultation and technical assessment."
        ctaHref="/contact"
        ctaLabel="Contact Our Team"
      />
    </>
  );
}
