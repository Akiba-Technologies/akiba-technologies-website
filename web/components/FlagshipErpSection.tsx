import Link from "next/link";
import { Reveal } from "./Reveal";
import { HomeSpotlightVisual } from "./HomeSpotlightVisual";

export function FlagshipErpSection() {
  return (
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
                Akiba <span className="title-accent">ERP Platform</span>
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

            <HomeSpotlightVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
