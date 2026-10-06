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
    lede: "We build modern software and digital solutions that help businesses innovate and scale efficiently.",
    stats: [
      { id: "stat-1", value: "50+", label: "Enterprise Deployments" },
      { id: "stat-2", value: "99.9%", label: "System Uptime SLA" },
      { id: "stat-3", value: "200+", label: "Engineers Trained" },
    ],
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
    if (!hero.lede || hero.lede.startsWith("Akiba Tech builds modern, reliable")) {
      hero.lede = DEFAULT_HOME_CONFIG.hero.lede;
    }
    return {
      hero,
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
