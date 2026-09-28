"use client";

import { useState, useEffect } from "react";

export type HomeStat = {
  id: string;
  value: string;
  label: string;
};

export type HomePageConfig = {
  hero: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    lede: string;
    stats: HomeStat[];
  };
  mosaic: {
    photo1: string;
    photo1Alt: string;
    photo2: string;
    photo2Alt: string;
    photo3: string;
    photo3Alt: string;
    photo4: string;
    photo4Alt: string;
  };
  erpSpotlight: {
    title: string;
    lede: string;
    image: string;
    badgeTopVal: string;
    badgeTopLbl: string;
    badgeBottomVal: string;
    badgeBottomLbl: string;
  };
  telemetry: {
    aiAccuracy: string;
    aiThroughput: string;
    aiLatency: string;
    lighthouseScore: string;
  };
};

export const DEFAULT_HOME_CONFIG: HomePageConfig = {
  hero: {
    badge: "Software Engineering • Enterprise Services • Tech Academy",
    titlePrefix: "Building scalable software and",
    titleHighlight: "digital solutions",
    lede: "We design, engineer, and deploy high-performance custom software, ERP platforms, and cloud systems for growing enterprises.",
    stats: [
      { id: "stat-1", value: "50+", label: "Enterprise Deployments" },
      { id: "stat-2", value: "99.9%", label: "System Uptime SLA" },
      { id: "stat-3", value: "200+", label: "Engineers Trained" },
    ],
  },
  mosaic: {
    photo1: "/work/hero-agrifarm-app.webp",
    photo1Alt: "AgriFARM smart farming mobile application interface showing crop health telemetry",
    photo2: "/work/hero-powerfit-gym.webp",
    photo2Alt: "PowerFit Gym management SaaS platform dashboard showing member analytics",
    photo3: "/work/hero-akiba-erp.webp",
    photo3Alt: "Akiba ERP Financial Analytics Dashboard showing revenue growth and ARR",
    photo4: "/work/hero-engineering-team.webp",
    photo4Alt: "Senior Akiba Technologies software engineers collaborating over system architecture",
  },
  erpSpotlight: {
    title: "Akiba ERP Platform",
    lede: "One unified system for inventory, purchasing, and financial ledgers. Built for high-volume operations running across multiple warehouses with sub-second accuracy.",
    image: "/work/akiba-erp-dashboard.png",
    badgeTopVal: "99.98% Reconciled",
    badgeTopLbl: "Real-time ledger audit",
    badgeBottomVal: "Multi-Site Active",
    badgeBottomLbl: "Automated Bin Tracking",
  },
  telemetry: {
    aiAccuracy: "99.4%",
    aiThroughput: "+4.8x",
    aiLatency: "82ms",
    lighthouseScore: "100",
  },
};

export const AVAILABLE_WORK_IMAGES = [
  { label: "AgriFarm Mobile App (Hero 1)", value: "/work/hero-agrifarm-app.webp" },
  { label: "PowerFit Gym SaaS (Hero 2)", value: "/work/hero-powerfit-gym.webp" },
  { label: "Akiba ERP Financial (Hero 3)", value: "/work/hero-akiba-erp.webp" },
  { label: "Engineering Team Studio (Hero 4)", value: "/work/hero-engineering-team.webp" },
  { label: "Akiba ERP Full Dashboard", value: "/work/akiba-erp-dashboard.png" },
  { label: "Tway Real Estate ERP", value: "/work/tway-realestate.jpg" },
  { label: "Hailemariam Coffee Export", value: "/work/hailemariam-export.jpg" },
  { label: "Royal Candy ERP", value: "/work/royal-candy.jpg" },
  { label: "FinTech Settlement Pipeline", value: "/work/payment-settlement-pipeline.png" },
  { label: "Engineering Team Collab", value: "/work/engineering-collaboration.webp" },
  { label: "Field Weather App", value: "/work/field-weather-app.webp" },
];

const STORAGE_KEY = "akiba_home_cms_config";
const EVENT_KEY = "akiba_home_config_change";

export function getStoredHomeConfig(): HomePageConfig {
  if (typeof window === "undefined") return DEFAULT_HOME_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_HOME_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      hero: { ...DEFAULT_HOME_CONFIG.hero, ...(parsed.hero || {}) },
      mosaic: { ...DEFAULT_HOME_CONFIG.mosaic, ...(parsed.mosaic || {}) },
      erpSpotlight: { ...DEFAULT_HOME_CONFIG.erpSpotlight, ...(parsed.erpSpotlight || {}) },
      telemetry: { ...DEFAULT_HOME_CONFIG.telemetry, ...(parsed.telemetry || {}) },
    };
  } catch {
    return DEFAULT_HOME_CONFIG;
  }
}

export function saveHomeConfig(config: HomePageConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    window.dispatchEvent(new Event(EVENT_KEY));
  } catch {
    // ignore
  }
}

export function resetHomeConfig(): HomePageConfig {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event(EVENT_KEY));
    } catch {
      // ignore
    }
  }
  return DEFAULT_HOME_CONFIG;
}

export function useHomeConfig(): { config: HomePageConfig; isReady: boolean } {
  const [config, setConfig] = useState<HomePageConfig>(DEFAULT_HOME_CONFIG);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setConfig(getStoredHomeConfig());
    setIsReady(true);

    const onUpdate = () => {
      setConfig(getStoredHomeConfig());
    };

    window.addEventListener(EVENT_KEY, onUpdate);
    window.addEventListener("storage", onUpdate);

    return () => {
      window.removeEventListener(EVENT_KEY, onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  return { config, isReady };
}
