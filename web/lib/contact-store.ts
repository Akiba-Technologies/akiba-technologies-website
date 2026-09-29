"use client";

import { useState, useEffect } from "react";

export type ContactPageConfig = {
  kicker: string;
  title: string;
  lede: string;
  email: string;
  secondaryEmail?: string;
  phone: string;
  secondaryPhone?: string;
  address: string;
  cityCountry: string;
  workingHours: string;
  weekendHours?: string;
  responseSLA: string;
  linkedin: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  github?: string;
  youtube?: string;
  whatsapp?: string;
  telegram?: string;
};

export const DEFAULT_CONTACT_CONFIG: ContactPageConfig = {
  kicker: "Get In Touch",
  title: "Contact Information",
  lede: "Reach out to us directly. We are ready to help your business grow.",
  email: "akiba.tech.official@gmail.com",
  secondaryEmail: "",
  phone: "+251 960 352 222",
  secondaryPhone: "",
  address: "Addis Ababa",
  cityCountry: "Ethiopia",
  workingHours: "Monday – Friday: 8:30 AM – 5:30 PM (EAT)",
  weekendHours: "Saturday: 9:00 AM – 1:00 PM (EAT)",
  responseSLA: "Under 2 hours during active business hours",
  linkedin: "https://linkedin.com/company/akibatech",
  twitter: "https://x.com/akibatech",
  facebook: "https://facebook.com/akibatech",
  instagram: "https://instagram.com/akibatech",
  github: "https://github.com/akibatech",
  youtube: "https://youtube.com/@akibatech",
  whatsapp: "https://wa.me/251960352222",
  telegram: "",
};

const STORAGE_KEY = "akiba_contact_cms_config";
const EVENT_KEY = "akiba_contact_config_change";

export function getStoredContactConfig(): ContactPageConfig {
  if (typeof window === "undefined") return DEFAULT_CONTACT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONTACT_CONFIG;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_CONTACT_CONFIG, ...parsed };
  } catch {
    return DEFAULT_CONTACT_CONFIG;
  }
}

export function saveContactConfig(config: ContactPageConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    window.dispatchEvent(new Event(EVENT_KEY));
  } catch {
    // ignore
  }
}

export function resetContactConfig(): ContactPageConfig {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event(EVENT_KEY));
    } catch {
      // ignore
    }
  }
  return DEFAULT_CONTACT_CONFIG;
}

export function useContactConfig(): { config: ContactPageConfig; isReady: boolean } {
  const [config, setConfig] = useState<ContactPageConfig>(DEFAULT_CONTACT_CONFIG);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setConfig(getStoredContactConfig());
    setIsReady(true);

    const onUpdate = () => {
      setConfig(getStoredContactConfig());
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
