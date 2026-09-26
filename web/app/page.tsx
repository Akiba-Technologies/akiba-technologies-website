import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { HeroMosaic } from "@/components/HeroMosaic";
import { DotWavePattern } from "@/components/DotWavePattern";
import { DevelopmentProcess } from "@/components/DevelopmentProcess";
import { RecentWork } from "@/components/RecentWork";
import { WhyChooseKnocker } from "@/components/WhyChooseKnocker";
import { AcademySection } from "@/components/AcademySection";
import { BuildBand } from "@/components/BuildBand";
import { TrustedBy } from "@/components/TrustedBy";

export default function HomePage() {
  return (
    <>
      {/* ===================== HERO SECTION ===================== */}
      <section className="hero hero-split-section" aria-label="Hero">
        {/* Seamless 3D Halftone Spherical Dot Wave Pattern (from vector asset) */}
        <div className="dot-wave-container" aria-hidden="true">
          <DotWavePattern opacity={0.09} className="hero-dot-wave" />
        </div>

        {/* Ambient radial spotlight tailored to Akiba logo colors (Emerald #2DCA79 & Deep Navy #002259) */}
        <div className="hero-radial-spotlight" aria-hidden="true" />

        <div className="wrap">
          <div className="hero-split-grid">
            {/* Left Column: Typography, Value Proposition & CTAs */}
            <div className="hero-copy">
              <Reveal as="div" className="pill pill-brand">
                <span className="dot dot-pulse" aria-hidden="true" />
                <span>Software Engineering &bull; Enterprise Services &bull; Tech Academy</span>
              </Reveal>

              <Reveal as="h1" delay={60}>
                Building scalable software and{" "}
                <span className="grad">digital solutions</span>
              </Reveal>

              <Reveal as="p" className="lede" delay={120}>
                We design, engineer, and deploy high-performance custom software, ERP platforms, and cloud systems for growing enterprises.
              </Reveal>

              <Reveal className="hero-cta" delay={180}>
                <Link className="btn btn-em" href="/contact">
                  Schedule Consultation
                  <svg className="btn-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link className="btn btn-ghost" href="/services">
                  Our Services
                  <svg className="btn-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </Reveal>

              <Reveal as="div" className="hero-note" delay={240}>
                <Link href="/services#erp">ERP Systems</Link>
                <Link href="/services#web">Web &amp; Mobile</Link>
                <Link href="/services#ai">AI &amp; ML</Link>
                <Link href="/services#academy">AkibaTech Academy</Link>
              </Reveal>

              {/* Mini-telemetry stats ribbon */}
              <Reveal as="div" className="hero-quick-stats" delay={300}>
                <div className="quick-stat">
                  <div className="quick-stat-val">50+</div>
                  <div className="quick-stat-lbl">Enterprise Deployments</div>
                </div>
                <div className="quick-stat-divider" />
                <div className="quick-stat">
                  <div className="quick-stat-val">99.9%</div>
                  <div className="quick-stat-lbl">System Uptime SLA</div>
                </div>
                <div className="quick-stat-divider" />
                <div className="quick-stat">
                  <div className="quick-stat-val">200+</div>
                  <div className="quick-stat-lbl">Engineers Trained</div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Organic Floating Project Photo Mosaic (Mention-style layout with real project photos) */}
            <div className="hero-visual">
              <Reveal delay={150}>
                <HeroMosaic />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TRUSTED BY ===================== */}
      <TrustedBy />

      {/* ===================== WHY CHOOSE KNOCKER AI ===================== */}
      <WhyChooseKnocker />

      {/* ===================== ERP FLAGSHIP SPOTLIGHT (Kavana Luxury Glass Style) ===================== */}
      <section className="sec sec-spotlight" aria-labelledby="erp-h">
        {/* Modern Geometric 3D Gradient Backdrop (from user asset) */}
        <div className="modern-geometric-bg" aria-hidden="true" />
        <div className="spotlight-radial-backdrop" aria-hidden="true" />
        <div className="wrap">
          {/* Kavana-inspired Frosted Luxury Glass Card Container */}
          <div className="kavana-spotlight-card">
            <div className="kavana-card-glow-border" aria-hidden="true" />
            <div className="spot-grid">
              <Reveal className="spot-copy-col">
                <div className="kavana-badge">
                  <span className="live-dot" />
                  <span>Flagship Production System</span>
                </div>
                <h2 id="erp-h" className="spot-title">
                  Akiba ERP Platform
                </h2>
                <p className="lede spot-lede">
                  One unified system for inventory, purchasing, and financial ledgers. Built for high-volume operations running across multiple warehouses with sub-second accuracy.
                </p>

                {/* Compact 2x2 Feature Matrix */}
                <div className="spot-feature-grid">
                  <div className="spot-feat-item">
                    <div className="spot-feat-head">
                      <span className="spot-feat-num">01</span>
                      <span className="spot-feat-name">Multi-Location Stock</span>
                    </div>
                    <p className="spot-feat-desc">
                      Real-time inventory per warehouse &amp; bin with reconciled stock transfers.
                    </p>
                  </div>

                  <div className="spot-feat-item">
                    <div className="spot-feat-head">
                      <span className="spot-feat-num">02</span>
                      <span className="spot-feat-name">Barcode Hardware</span>
                    </div>
                    <p className="spot-feat-desc">
                      Native USB &amp; Bluetooth scanner support for keyboard-free workflows.
                    </p>
                  </div>

                  <div className="spot-feat-item">
                    <div className="spot-feat-head">
                      <span className="spot-feat-num">03</span>
                      <span className="spot-feat-name">Ledger Reconciliation</span>
                    </div>
                    <p className="spot-feat-desc">
                      Source-referenced accounting ledger agreeing with physical stock to the cent.
                    </p>
                  </div>

                  <div className="spot-feat-item">
                    <div className="spot-feat-head">
                      <span className="spot-feat-num">04</span>
                      <span className="spot-feat-name">Automated Reordering</span>
                    </div>
                    <p className="spot-feat-desc">
                      Location safety thresholds drafting purchase orders automatically.
                    </p>
                  </div>
                </div>

                <div className="hero-cta spot-cta-wrap">
                  <Link className="btn btn-em" href="/portfolio#akiba-erp">
                    Explore Akiba ERP Deployment
                    <svg className="btn-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <Link className="btn btn-ghost" href="/contact">
                    Request a Walkthrough
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={120} className="spot-visual-col">
                <div className="kavana-screen-container">
                  <div className="kavana-window-bar">
                    <div className="kavana-window-dots">
                      <span className="dot dot-close" />
                      <span className="dot dot-min" />
                      <span className="dot dot-max" />
                    </div>
                    <div className="kavana-window-title">akiba.erp / live / enterprise</div>
                    <div className="kavana-window-status">
                      <span className="status-live-dot" />
                      <span>Live Sync</span>
                    </div>
                  </div>

                  <div className="kavana-screen-reflection" aria-hidden="true" />
                  <div className="feat-shot">
                    <Image
                      src="/work/akiba-erp-dashboard.png"
                      alt="Akiba ERP dashboard showing total sales orders, sales and purchase amounts, revenue, products, suppliers, customers, approval queues, and monthly sales and weekly purchase trend charts"
                      width={1904}
                      height={943}
                      sizes="(max-width: 1000px) 100vw, 60vw"
                      style={{ width: "100%", height: "auto", display: "block" }}
                      priority
                    />
                  </div>

                  {/* Floating Glass Telemetry Badges */}
                  <div className="spot-floating-badge badge-top-right">
                    <div className="spot-badge-icon pulse-emerald">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="spot-badge-copy">
                      <div className="spot-badge-val">99.98% Reconciled</div>
                      <div className="spot-badge-lbl">Real-time ledger audit</div>
                    </div>
                  </div>

                  <div className="spot-floating-badge badge-bottom-left">
                    <div className="spot-badge-icon pulse-blue">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                    </div>
                    <div className="spot-badge-copy">
                      <div className="spot-badge-val">Multi-Site Active</div>
                      <div className="spot-badge-lbl">Automated Bin Tracking</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SHIPPED REAL WORK SHOWCASE ===================== */}
      <RecentWork />

      {/* ===================== DEVELOPMENT PROCESS ===================== */}
      <DevelopmentProcess />

      {/* ===================== AKIBATECH ACADEMY ===================== */}
      <AcademySection />

      {/* ===================== BUILD BAND / CTA ===================== */}
      <BuildBand />
    </>
  );
}
