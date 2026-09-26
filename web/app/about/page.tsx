import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Band } from "@/components/Band";

export const metadata: Metadata = {
  title: "About Us | Akiba Technologies",
  description:
    "Akiba Technologies is an Ethiopian software engineering company and tech academy based in Addis Ababa. We build custom ERPs, scalable web platforms, and AI solutions.",
  openGraph: {
    title: "About Us | Akiba Technologies",
    description: "Engineering Ethiopia's digital future with world-class technical rigor.",
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
    bio: "Leads overall company vision, strategic partnerships, and business operations, championing digital transformation and modern software adoption across Ethiopian enterprises.",
  },
  {
    initials: "AS",
    name: "Abdrehim Shemsu",
    role: "Chief Product Officer (CPO)",
    bio: "Directs product strategy, user experience design, and client discovery, ensuring complex operational workflows are translated into intuitive, reliable software.",
  },
  {
    initials: "EA",
    name: "Efrem Alemnew",
    role: "Chief Technology Officer (CTO)",
    bio: "Oversees core system architecture, cloud infrastructure, and technical rigor, ensuring every production release meets high standards of performance and security.",
  },
  {
    initials: "OS",
    name: "Osama Seid",
    role: "Chief Marketing Officer (CMO)",
    bio: "Leads market expansion, client engagement, and brand strategy, connecting businesses with Akiba's software engineering and AI capabilities.",
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
            Engineering Ethiopia&rsquo;s Digital Future With World-Class Rigor
          </Reveal>
          <Reveal as="p" className="lede" delay={120}>
            We are a team of software engineers, architects, and product builders rooted in Addis Ababa.
            We build custom ERP systems, modern web platforms, and intelligent AI tools designed to solve real
            operational challenges for Ethiopian businesses and growing enterprises.
          </Reveal>
          <Reveal as="div" className="phead-meta" delay={180}>
            <span><b>50+</b> Enterprise Deployments</span>
            <span><b>200+</b> Ethiopian Engineers Trained</span>
            <span><b>99.9%</b> System SLA Uptime</span>
            <span><b>100%</b> Full IP Ownership</span>
          </Reveal>
        </div>
      </section>

      {/* ===================== OUR STORY & PURPOSE ===================== */}
      <section className="sec" aria-labelledby="story-h">
        <div className="wrap">
          <Reveal className="sec-head">
            <p className="kicker">Our Story</p>
            <h2 id="story-h">Why We Founded Akiba in Addis Ababa</h2>
            <p className="lede">
              Building software that understands local reality while meeting international engineering benchmarks.
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
                To empower businesses across Ethiopia and East Africa with robust, custom software that saves time,
                eliminates manual bottlenecks, and accelerates growth — while actively training the next generation
                of African engineering talent through our tech academy.
              </p>
              <div className="b-stack">
                <span className="chip">Addis Ababa Headquartered</span>
                <span className="chip">Custom Business Software</span>
                <span className="chip">Practical Impact</span>
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
                To make Ethiopia a premier hub for software engineering and AI innovation, proving that world-class
                digital platforms can be built locally to transform regional industries and compete globally.
              </p>
              <div className="b-stack">
                <span className="chip">Regional Tech Hub</span>
                <span className="chip">AI &amp; ERP Leadership</span>
                <span className="chip">Global Quality Standards</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== VALUES AS ETHIOPIAN BUILDERS ===================== */}
      <section className="sec sec-tint" aria-labelledby="values-h">
        <div className="wrap">
          <Reveal className="sec-head">
            <p className="kicker">Engineering Ethos</p>
            <h2 id="values-h">How We Build Software</h2>
            <p className="lede">
              Practical values shaped by solving real problems on the ground in Ethiopia.
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
              <h3 style={{ margin: "14px 0 8px", fontSize: "1.1rem" }}>Built For Local Reality</h3>
              <p style={{ color: "var(--slate)", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
                We design for multi-branch operations, real-time inventory synchronization, offline-first reliability,
                and seamless local business workflows.
              </p>
            </Reveal>

            <Reveal as="article" className="card" delay={80} style={{ padding: "26px 22px" }}>
              <span className="ix">02</span>
              <h3 style={{ margin: "14px 0 8px", fontSize: "1.1rem" }}>Code Rigor &amp; Longevity</h3>
              <p style={{ color: "var(--slate)", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
                No quick fixes or fragile templates. We write clean, typed, and well-tested code that your business can
                depend on and scale for years.
              </p>
            </Reveal>

            <Reveal as="article" className="card" delay={120} style={{ padding: "26px 22px" }}>
              <span className="ix">03</span>
              <h3 style={{ margin: "14px 0 8px", fontSize: "1.1rem" }}>AkibaTech Academy</h3>
              <p style={{ color: "var(--slate)", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
                We don&rsquo;t just consume tech — we teach it. Over 200+ Ethiopian developers have been trained in backend
                architecture, algorithms, and system design.
              </p>
            </Reveal>

            <Reveal as="article" className="card" delay={160} style={{ padding: "26px 22px" }}>
              <span className="ix">04</span>
              <h3 style={{ margin: "14px 0 8px", fontSize: "1.1rem" }}>Full Client Ownership</h3>
              <p style={{ color: "var(--slate)", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
                You own 100% of your source code, infrastructure configurations, and business data upon delivery. No
                hidden vendor lock-in.
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
              Passionate Ethiopian technologists committed to delivering outstanding digital solutions.
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

      {/* ===================== BOTTOM CTA ===================== */}
      <Band
        heading="Let's build something meaningful for your business."
        body="Whether you need an enterprise ERP, custom web application, or AI integration, talk directly with our engineering team."
        ctaHref="/contact"
        ctaLabel="Talk to an Engineer"
      />
    </>
  );
}
