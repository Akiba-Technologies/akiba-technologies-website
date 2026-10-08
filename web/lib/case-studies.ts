export type CaseCategory = "web" | "ai-ml" | "mobile" | "iot";

export type CaseImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  slug: string;
  badge: string;
  categoryLabel: string;
  year: string;
  title: string;
  summary: string;
  metricValue?: string;
  metricLabel?: string;
  stack: string[];
  categories: CaseCategory[];
  liveDemoUrl?: string;
  image?: CaseImage;
};

export function isLiveDemoUrl(url?: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (
    trimmed === "" ||
    trimmed === "#" ||
    trimmed.startsWith("/portfolio#") ||
    trimmed.includes("akibatech.com/portfolio#")
  ) {
    return false;
  }
  return true;
}

export const CASE_FILTERS: { key: CaseCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web", label: "Web Development" },
  { key: "ai-ml", label: "AI & ML" },
  { key: "mobile", label: "Mobile App" },
  { key: "iot", label: "IoT" },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "autobridge-systems",
    badge: "GovTech, AI / Automation",
    categoryLabel: "GovTech, AI / Automation",
    year: "2025",
    title: "AutoBridge Systems",
    summary:
      "AI-powered platforms for government service automation, citizen communication, and automated contracting using Azure OpenAI.",
    metricValue: "AI-Powered",
    metricLabel: "government workflow & automated contracting",
    stack: ["Python", "FastAPI", "Azure OpenAI"],
    categories: ["ai-ml", "web"],
    image: {
      src: "/work/autobridge-dashboard.jpg",
      alt: "AutoBridge Systems AI-powered government workflow and automated contracting dashboard",
      width: 1920,
      height: 1080,
    },
  },
  {
    slug: "digifarm-ai",
    badge: "AI & ML",
    categoryLabel: "AI & ML",
    year: "2025",
    title: "DigiFarm AI",
    summary:
      "AI-powered crop health monitoring, disease detection, and yield prediction for farmers.",
    metricValue: "AI Driven",
    metricLabel: "disease detection & agricultural forecasting",
    stack: ["Python", "Scikit-learn", "FastAPI", "Redis"],
    categories: ["ai-ml", "mobile"],
    image: {
      src: "/work/hero-agrifarm-app.webp",
      alt: "DigiFarm AI agricultural operations, crop tracking, and disease detection platform",
      width: 1200,
      height: 675,
    },
  },
  {
    slug: "gym-management",
    badge: "Web Development",
    categoryLabel: "Web Development",
    year: "2025",
    title: "GYM Management System",
    summary:
      "All-in-one gym operations with member tracking, class scheduling, and automated billing.",
    metricValue: "Full Suite",
    metricLabel: "members, workout tracking & payment processing",
    stack: ["Laravel", "React.js", "REST API"],
    categories: ["web"],
    liveDemoUrl: "https://www.amigosgym.app/login",
    image: {
      src: "/work/powerfit-gym.webp",
      alt: "GYM Management System member dashboard and workout schedule",
      width: 1841,
      height: 933,
    },
  },
  {
    slug: "akiba-erp",
    badge: "Web Development",
    categoryLabel: "Web Development",
    year: "2025",
    title: "Akiba ERP",
    summary:
      "Multi-location inventory tracking, automated reorder alerts, and real-time ledger audits.",
    metricValue: "Multi-Hub",
    metricLabel: "real-time stock tracking & barcode reorder alerts",
    stack: ["Laravel", "React", "MySQL", "REST API"],
    categories: ["web"],
    liveDemoUrl: "https://test2.qudwaerp.com/",
    image: {
      src: "/work/akiba-erp-dashboard.png",
      alt: "Akiba ERP real-time inventory management, stock tracking, and supplier portal",
      width: 1904,
      height: 943,
    },
  },
  {
    slug: "royal-candy",
    badge: "Web Development",
    categoryLabel: "Web Development",
    year: "2025",
    title: "Royal Candy & Chocolate",
    summary:
      "Modern confectionery showcase with dynamic catalog management and SEO optimization.",
    metricValue: "High Performance",
    metricLabel: "modern product showcase with admin CMS & SEO",
    stack: ["Laravel", "React", "MySQL", "Bootstrap"],
    categories: ["web"],
    liveDemoUrl: "https://www.royalcandyandchocolate.com/",
    image: {
      src: "/work/royal-candy.jpg",
      alt: "Royal Candy & Chocolate company luxury showcase and responsive web layout",
      width: 1920,
      height: 1080,
    },
  },
  {
    slug: "hailemariam-export",
    badge: "Web Development",
    categoryLabel: "Web Development",
    year: "2024",
    title: "Hailemariam Melese Import & Export",
    summary:
      "Global commodity trading platform connecting Ethiopian agricultural exports to world markets.",
    metricValue: "Global Reach",
    metricLabel: "international commodity catalogs & inquiry pipelines",
    stack: ["React", "Laravel", "MySQL", "Tailwind CSS"],
    categories: ["web"],
    liveDemoUrl: "https://hm.addisvision.com/hm-importexport",
    image: {
      src: "/work/hailemariam-export.jpg",
      alt: "Hailemariam Melese Import & Export global trading portal",
      width: 1920,
      height: 1080,
    },
  },
  {
    slug: "tway-realestate",
    badge: "Web Development",
    categoryLabel: "Web Development",
    year: "2024",
    title: "Tway Realestate",
    summary:
      "Modern property listing platform with virtual property showcases and inquiry workflows.",
    metricValue: "Conversion Focused",
    metricLabel: "optimized property listings & architectural inquiry platform",
    stack: ["React", "Laravel", "MySQL", "Tailwind CSS"],
    categories: ["web"],
    liveDemoUrl: "https://www.twayrealestateplc.com/",
    image: {
      src: "/work/tway-realestate.jpg",
      alt: "Tway Realestate modern property listings and buyer inquiry portal",
      width: 1920,
      height: 1080,
    },
  },
];

export type Testimonial = {
  initials: string;
  quote: string;
  name: string;
  role: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    initials: "TR",
    quote:
      "The Tway Realestate platform transformed how our clients explore properties in Addis Ababa. The responsive design and instant inquiry workflow significantly boosted our verified buyer leads.",
    name: "Tway Real Estate",
    role: "Management • Tway Real Estate PLC",
  },
  {
    initials: "AM",
    quote:
      "The GYM Management System streamlined our memberships, check-ins, and trainer schedules completely. Our front desk operations are now fast and error-free.",
    name: "A. Mengistu",
    role: "General Manager • Amigos Gym",
  },
  {
    initials: "AO",
    quote:
      "Akiba ERP reconciled our warehouse counts across branches automatically. Month-end audits now happen in minutes instead of taking days of manual entry.",
    name: "A. Okonkwo",
    role: "Head of Operations • Akiba ERP deployment",
  },
];
