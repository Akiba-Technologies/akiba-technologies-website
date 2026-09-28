"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { useHomeConfig } from "@/lib/home-store";

export function HomeSpotlightVisual() {
  const { config } = useHomeConfig();
  const { erpSpotlight } = config;

  return (
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
            src={erpSpotlight.image || "/work/akiba-erp-dashboard.png"}
            alt="Akiba ERP enterprise dashboard interface"
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="spot-badge-copy">
            <div className="spot-badge-val">{erpSpotlight.badgeTopVal || "99.98% Reconciled"}</div>
            <div className="spot-badge-lbl">{erpSpotlight.badgeTopLbl || "Real-time ledger audit"}</div>
          </div>
        </div>

        <div className="spot-floating-badge badge-bottom-left">
          <div className="spot-badge-icon pulse-blue">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
          <div className="spot-badge-copy">
            <div className="spot-badge-val">{erpSpotlight.badgeBottomVal || "Multi-Site Active"}</div>
            <div className="spot-badge-lbl">{erpSpotlight.badgeBottomLbl || "Automated Bin Tracking"}</div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
