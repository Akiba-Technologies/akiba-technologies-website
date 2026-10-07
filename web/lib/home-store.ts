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
    ctaPrimaryLabel?: string;
    ctaPrimaryHref?: string;
    ctaSecondaryLabel?: string;
    ctaSecondaryHref?: string;
    stats: HomeStat[];
  };
  whyChoose: {
    kicker: string;
    title: string;
    titleAccent: string;
    lede: string;
    btnLabel: string;
    btnHref: string;
  };
  byTheNumbers: {
    kicker: string;
    title: string;
    highlight: string;
    subtitle?: string;
    stat1Target: number;
    stat1Suffix: string;
    stat1Label: string;
    stat2Target: number;
    stat2Suffix: string;
    stat2Label: string;
    stat3Target: number;
    stat3Suffix: string;
    stat3Label: string;
  };
  process: {
    kicker: string;
    title: string;
    titleAccent: string;
    lede: string;
  };
  academy: {
    kicker: string;
    title: string;
    titleAccent: string;
    lede: string;
    hubBtnLabel: string;
    hubBtnHref: string;
    servicesBtnLabel: string;
    servicesBtnHref: string;
  };
  ctaBand: {
    heading: string;
    btnLabel: string;
    btnHref: string;
    sloganPart1: string;
    sloganPart2: string;
    sloganPart3: string;
  };
  mosaic: {
    photo1: string;
    photo1Alt: string;
    photo1Fit?: "contain" | "cover";
    photo2: string;
    photo2Alt: string;
    photo2Fit?: "contain" | "cover";
    photo3: string;
    photo3Alt: string;
    photo3Fit?: "contain" | "cover";
    photo4: string;
    photo4Alt: string;
    photo4Fit?: "contain" | "cover";
    imageFit?: "contain" | "cover";
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
    badge: "Building Modern Technology Solutions",
    titlePrefix: "Empowering digital transformation through",
    titleHighlight: "scalable technology",
    lede: "We engineer modern, reliable, and high-impact software solutions for ambitious enterprises. From web and cloud systems to custom platforms, we help modern businesses scale with cutting-edge technology.",
    ctaPrimaryLabel: "Schedule Consultation",
    ctaPrimaryHref: "/contact",
    ctaSecondaryLabel: "Our Services",
    ctaSecondaryHref: "/services",
    stats: [
      { id: "stat-1", value: "50+", label: "Enterprise Deployments" },
      { id: "stat-2", value: "99.9%", label: "System Uptime SLA" },
      { id: "stat-3", value: "200+", label: "Engineers Trained" },
    ],
  },
  whyChoose: {
    kicker: "Why Akiba Tech",
    title: "Why Choose",
    titleAccent: "Akiba Tech",
    lede: "Empowering digital transformation through scalable, high-performance technology. We build modern, reliable, and high-impact software solutions with clean architecture and cutting-edge engineering.",
    btnLabel: "Explore Capabilities",
    btnHref: "/services",
  },
  byTheNumbers: {
    kicker: "Engineering Scale • Proven Impact",
    title: "Akiba Technologies by the",
    highlight: "numbers",
    subtitle: "Delivering high-performance software with engineering rigor and scalable architecture.",
    stat1Target: 50,
    stat1Suffix: "+",
    stat1Label: "Enterprise Deployments",
    stat2Target: 99.9,
    stat2Suffix: "%",
    stat2Label: "System Uptime SLA",
    stat3Target: 200,
    stat3Suffix: "+",
    stat3Label: "Engineers Trained",
  },
  process: {
    kicker: "DEVELOPMENT PROCESS",
    title: "Agile software development methodology that delivers",
    titleAccent: "high-quality solutions",
    lede: "Structured engineering cycles designed for predictability, transparent milestones, and zero-defect production releases.",
  },
  academy: {
    kicker: "Engineering Rigor • AkibaTech Academy",
    title: "We don’t just consume modern tech",
    titleAccent: "we teach it.",
    lede: "200+ hand-selected engineers trained in backend architecture, system design & algorithms — so our clients get a core team at the forefront of clean code.",
    hubBtnLabel: "Akiba Hub • Register",
    hubBtnHref: "https://hub.akibatech.com/login",
    servicesBtnLabel: "Explore Our Services",
    servicesBtnHref: "/services",
  },
  ctaBand: {
    heading: "Let’s build something that saves you time, money and resources.",
    btnLabel: "Start a project",
    btnHref: "/contact",
    sloganPart1: "Save time.",
    sloganPart2: "Save money.",
    sloganPart3: "Save resources.",
  },
  mosaic: {
    photo1: "/work/hero-card-royal-candy.svg",
    photo1Alt: "Royal Candy & Chocolate luxury confectionery digital catalog",
    photo1Fit: "contain",
    photo2: "/work/hero-card-amigos-gym.svg",
    photo2Alt: "Amigos Gym management platform SaaS dashboard and workout schedule",
    photo2Fit: "contain",
    photo3: "/work/hero-card-akiba-erp.svg",
    photo3Alt: "Akiba ERP multi-location inventory and real-time ledger audit",
    photo3Fit: "contain",
    photo4: "/work/hero-card-tway-realestate.svg",
    photo4Alt: "Tway Real Estate modern property listings and buyer inquiry portal",
    photo4Fit: "contain",
    imageFit: "contain",
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
  { label: "Royal Candy (Vector SVG)", value: "/work/hero-card-royal-candy.svg" },
  { label: "Amigos Gym (Vector SVG)", value: "/work/hero-card-amigos-gym.svg" },
  { label: "Akiba ERP (Vector SVG)", value: "/work/hero-card-akiba-erp.svg" },
  { label: "Tway Real Estate (Vector SVG)", value: "/work/hero-card-tway-realestate.svg" },
  { label: "Akiba ERP Full Dashboard", value: "/work/akiba-erp-dashboard.png" },
  { label: "Amigos Gym System", value: "/work/powerfit-gym.png" },
  { label: "Tway Real Estate Portal", value: "/work/tway-realestate.jpg" },
  { label: "Royal Candy Confectionery", value: "/work/royal-candy.jpg" },
  { label: "Hailemariam Coffee Export", value: "/work/hailemariam-export.jpg" },
  { label: "AutoBridge Systems", value: "/work/autobridge-dashboard.jpg" },
  { label: "DigiFarm Agri App", value: "/work/hero-agrifarm-app.webp" },
];

const STORAGE_KEY = "akiba_home_cms_config";
const EVENT_KEY = "akiba_home_config_change";

export function getStoredHomeConfig(): HomePageConfig {
  if (typeof window === "undefined") return DEFAULT_HOME_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_HOME_CONFIG;
    const parsed = JSON.parse(raw);
    const mosaic = { ...DEFAULT_HOME_CONFIG.mosaic, ...(parsed.mosaic || {}) };
    // Automatically upgrade stale webp references to high-quality SVG vector cards
    if (!mosaic.photo1 || mosaic.photo1.endsWith(".webp")) mosaic.photo1 = DEFAULT_HOME_CONFIG.mosaic.photo1;
    if (!mosaic.photo2 || mosaic.photo2.endsWith(".webp")) mosaic.photo2 = DEFAULT_HOME_CONFIG.mosaic.photo2;
    if (!mosaic.photo3 || mosaic.photo3.endsWith(".webp")) mosaic.photo3 = DEFAULT_HOME_CONFIG.mosaic.photo3;
    if (!mosaic.photo4 || mosaic.photo4.endsWith(".webp")) mosaic.photo4 = DEFAULT_HOME_CONFIG.mosaic.photo4;
    const hero = { ...DEFAULT_HOME_CONFIG.hero, ...(parsed.hero || {}) };
    if (!hero.lede || hero.lede.startsWith("Akiba Tech builds") || hero.lede.startsWith("We build modern") || hero.lede.startsWith("We engineer modern, reliable, and high-impact software solutions. From full-stack")) {
      hero.lede = DEFAULT_HOME_CONFIG.hero.lede;
    }
    return {
      hero,
      whyChoose: { ...DEFAULT_HOME_CONFIG.whyChoose, ...(parsed.whyChoose || {}) },
      byTheNumbers: { ...DEFAULT_HOME_CONFIG.byTheNumbers, ...(parsed.byTheNumbers || {}) },
      process: { ...DEFAULT_HOME_CONFIG.process, ...(parsed.process || {}) },
      academy: { ...DEFAULT_HOME_CONFIG.academy, ...(parsed.academy || {}) },
      ctaBand: { ...DEFAULT_HOME_CONFIG.ctaBand, ...(parsed.ctaBand || {}) },
      mosaic,
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
