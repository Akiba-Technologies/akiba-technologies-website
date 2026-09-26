import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { PortfolioBrowser } from "@/components/PortfolioBrowser";
import { Band } from "@/components/Band";
import { TESTIMONIALS } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Our Portfolio | Akiba Technologies",
  description:
    "Explore our latest projects and see how we've helped businesses transform their ideas into reality. Enterprise ERPs, AI platforms, and high-concurrency web systems.",
  openGraph: {
    title: "Our Portfolio | Akiba Technologies",
    description: "Explore our latest projects and see how we've helped businesses transform their ideas into reality.",
  },
};

export default function PortfolioPage() {
  return (
    <>
      {/* ===================== PAGE HEADER (with wavy pattern) ===================== */}
      <section className="phead" aria-labelledby="port-h">
        <div className="wrap">
          <Reveal as="p" className="kicker">
            Engineering Deployments
          </Reveal>
          <Reveal as="h1" delay={60} id="port-h">
            Our Portfolio
          </Reveal>
          <Reveal as="p" className="lede" delay={120}>
            Explore our latest projects and see how we&rsquo;ve helped businesses transform their ideas into reality.
          </Reveal>
          <Reveal as="div" className="phead-meta" delay={180}>
            <span><b>6</b> Verified Systems</span>
            <span><b>Real</b> Production Clients</span>
            <span><b>Full-Stack</b> &amp; AI Engineering</span>
            <span>Save <b>Time, Money &amp; Resources</b></span>
          </Reveal>
        </div>
      </section>

      {/* ===================== CASE GRID + FILTERS ===================== */}
      <section className="sec sec-portfolio-browser" aria-labelledby="cases-h">
        <div className="wrap">
          <PortfolioBrowser />
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="sec sec-tint" aria-labelledby="say-h">
        <div className="wrap">
          <Reveal className="sec-head">
            <p className="kicker">Verified engagements</p>
            <h2 id="say-h">What the people who own the system say</h2>
            <p className="lede">
              Real feedback from technical leaders and operational managers running software engineered by Akiba.
            </p>
          </Reveal>

          <div className="quotes">
            {TESTIMONIALS.map((t, i) => (
              <Reveal as="figure" className="card quote" delay={i * 60} key={t.name}>
                <span className="mark" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <span className="avatar" aria-hidden="true">
                    {t.initials}
                  </span>
                  <span>
                    <span className="who">{t.name}</span>
                    <span className="role">{t.role}</span>
                  </span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Band
        heading="Your system could be the next one on this page."
        body="Schedule a consultation with our architects. We will analyze your workflow and propose a fixed-timeline engineering roadmap."
        ctaHref="/contact"
        ctaLabel="Start a project"
        showSlogan
      />
    </>
  );
}
