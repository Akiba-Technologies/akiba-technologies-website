export type InquiryStatus = "new" | "in-review" | "contacted" | "converted" | "archived";

export type AdminInquiry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  notes?: string;
  source?: string;
};

export type AdminProject = {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: "Web Development" | "AI & ML" | "Mobile App" | "IoT" | "Enterprise ERP";
  year: string;
  summary: string;
  metricValue: string;
  metricLabel: string;
  stack: string[];
  status: "published" | "draft";
  image?: string;
  liveDemoUrl?: string;
};

export type AdminTestimonial = {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  initials: string;
  status: "published" | "draft";
  rating?: number;
};

export const INITIAL_INQUIRIES: AdminInquiry[] = [
  {
    id: "inq-1",
    name: "Dawit Bekele",
    email: "dawit@twayrealestate.et",
    subject: "ERP & Multi-Property Tenant Portal Expansion",
    message:
      "We want to expand the real estate portal to integrate automated tenant rent reminders via SMS/Chapa and sync with our Bethel branch office.",
    status: "in-review",
    createdAt: "2026-09-28T07:14:00Z",
    notes: "Followed up on Bethel office network latency. Preparing API quote for Chapa webhook listener.",
    source: "Contact Page Form",
  },
  {
    id: "inq-2",
    name: "Selamawit Tadesse",
    email: "s.tadesse@cbe-partner.com",
    subject: "FinTech High-Concurrency API Integration",
    message:
      "Inquiring about Akiba's backend architects to build an ISO 8583 payment settlement microservice capable of 4,000 TPS with Redis caching.",
    status: "new",
    createdAt: "2026-09-27T14:32:00Z",
    source: "Contact Page Form",
  },
  {
    id: "inq-3",
    name: "Yonas Girma",
    email: "yonas.g@awashlogistics.com",
    subject: "Fleet GPS & Offline-First Warehouse System",
    message:
      "Our trucks operate across regions with intermittent 4G. We need your offline-first synchronization architecture for our 45 transit vehicles.",
    status: "contacted",
    createdAt: "2026-09-25T11:20:00Z",
    notes: "Initial discovery call completed with Efrem (CTO). Sending preliminary architecture proposal.",
    source: "Direct Referral",
  },
  {
    id: "inq-4",
    name: "Dr. Aster Hailu",
    email: "a.hailu@mint.gov.et",
    subject: "AkibaTech Academy National Cohort Partnership",
    message:
      "Looking to sponsor 50 young Ethiopian university software graduates for the 2026 System Architecture and Cloud Bootcamp.",
    status: "converted",
    createdAt: "2026-09-22T09:00:00Z",
    notes: "Contract finalized. First training session scheduled for November 2026.",
    source: "Academy Inquiry",
  },
  {
    id: "inq-5",
    name: "Kidus Assefa",
    email: "kidus@addisretail.com",
    subject: "Multi-branch POS & Inventory Sync",
    message:
      "Need a modern POS with offline SQLite caching that syncs to central PostgreSQL when connectivity is restored.",
    status: "new",
    createdAt: "2026-09-21T16:45:00Z",
    source: "Contact Page Form",
  },
];

export const INITIAL_PROJECTS: AdminProject[] = [
  {
    id: "proj-1",
    slug: "digifarm-ai",
    title: "DigiFarm AI",
    client: "East Africa AgriTech Consortium",
    category: "AI & ML",
    year: "2025",
    summary: "AI-powered crop health monitoring, disease detection, and yield prediction for farmers.",
    metricValue: "AI Driven",
    metricLabel: "disease detection & agricultural forecasting",
    stack: ["Python", "Scikit-learn", "FastAPI", "Redis"],
    status: "published",
    image: "/work/hero-agrifarm-app.webp",
    liveDemoUrl: "https://akibatech.com/portfolio#",
  },
  {
    id: "proj-2",
    slug: "gym-management",
    title: "GYM Management System",
    client: "Amigos Gym & Fitness",
    category: "Web Development",
    year: "2025",
    summary: "All-in-one gym operations with member tracking, class scheduling, and automated billing.",
    metricValue: "Full Suite",
    metricLabel: "members, workout tracking & payment processing",
    stack: ["Laravel", "React.js", "REST API"],
    status: "published",
    image: "/work/powerfit-gym.webp",
    liveDemoUrl: "https://www.amigosgym.app/login",
  },
  {
    id: "proj-3",
    slug: "akiba-erp",
    title: "Akiba ERP",
    client: "Qudwa Enterprise Solutions",
    category: "Enterprise ERP",
    year: "2025",
    summary: "Multi-location inventory tracking, automated reorder alerts, and real-time ledger audits.",
    metricValue: "Multi-Hub",
    metricLabel: "real-time stock tracking & barcode reorder alerts",
    stack: ["Laravel", "React", "MySQL", "REST API"],
    status: "published",
    image: "/work/akiba-erp-dashboard.png",
    liveDemoUrl: "https://test2.qudwaerp.com/",
  },
  {
    id: "proj-4",
    slug: "royal-candy",
    title: "Royal Candy & Chocolate",
    client: "Royal Candy & Chocolate PLC",
    category: "Web Development",
    year: "2025",
    summary: "Modern confectionery showcase with dynamic catalog management and SEO optimization.",
    metricValue: "High Performance",
    metricLabel: "modern product showcase with admin CMS & SEO",
    stack: ["Laravel", "React", "MySQL", "Bootstrap"],
    status: "published",
    image: "/work/royal-candy.jpg",
    liveDemoUrl: "https://www.royalcandyandchocolate.com/",
  },
  {
    id: "proj-5",
    slug: "hailemariam-export",
    title: "Hailemariam Melese Import & Export",
    client: "Hailemariam Melese Trading",
    category: "Web Development",
    year: "2024",
    summary: "Global commodity trading platform connecting Ethiopian agricultural exports to world markets.",
    metricValue: "Global Reach",
    metricLabel: "international commodity catalogs & inquiry pipelines",
    stack: ["React", "Laravel", "MySQL", "Tailwind CSS"],
    status: "published",
    image: "/work/hailemariam-export.jpg",
    liveDemoUrl: "https://hm.addisvision.com/hm-importexport",
  },
  {
    id: "proj-6",
    slug: "tway-realestate",
    title: "Tway Realestate",
    client: "Tway Real Estate PLC",
    category: "Web Development",
    year: "2024",
    summary: "Modern property listing platform with virtual property showcases and inquiry workflows.",
    metricValue: "Conversion Focused",
    metricLabel: "optimized property listings & architectural inquiry platform",
    stack: ["React", "Laravel", "MySQL", "Tailwind CSS"],
    status: "published",
    image: "/work/tway-realestate.jpg",
    liveDemoUrl: "https://www.twayrealestateplc.com/",
  },
];

const INQUIRIES_KEY = "akiba_admin_inquiries";
const PROJECTS_KEY = "akiba_admin_projects";
const PROJECTS_EVENT_KEY = "akiba_projects_change";
const AUTH_KEY = "akiba_admin_auth";

export function getStoredInquiries(): AdminInquiry[] {
  if (typeof window === "undefined") return INITIAL_INQUIRIES;
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    if (!raw) {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(INITIAL_INQUIRIES));
      return INITIAL_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_INQUIRIES;
  }
}

export function saveInquiries(inquiries: AdminInquiry[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
  } catch {
    // ignore
  }
}

export function addInquiry(inquiry: Omit<AdminInquiry, "id" | "createdAt" | "status">): AdminInquiry {
  const all = getStoredInquiries();
  const created: AdminInquiry = {
    ...inquiry,
    id: "inq-" + Date.now(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  const updated = [created, ...all];
  saveInquiries(updated);
  return created;
}

export function getStoredProjects(): AdminProject[] {
  if (typeof window === "undefined") return INITIAL_PROJECTS;
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    const requiredSlugs = [
      "digifarm-ai",
      "gym-management",
      "akiba-erp",
      "royal-candy",
      "hailemariam-export",
      "tway-realestate",
    ];
    // If stored array is using the old placeholder data or has fewer than 6 projects, reset to the real 6!
    if (
      !Array.isArray(parsed) ||
      parsed.length < 6 ||
      requiredSlugs.some((slug) => !parsed.some((p: AdminProject) => p.slug === slug))
    ) {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    return parsed;
  } catch {
    return INITIAL_PROJECTS;
  }
}

export function saveProjects(projects: AdminProject[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event(PROJECTS_EVENT_KEY));
  } catch {
    // ignore
  }
}

export function getStoredAuth(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(AUTH_KEY) === "true";
  } catch {
    return false;
  }
}

export function setStoredAuth(val: boolean): void {
  if (typeof window === "undefined") return;
  try {
    if (val) {
      localStorage.setItem(AUTH_KEY, "true");
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  } catch {
    // ignore
  }
}

export const INITIAL_TESTIMONIALS: AdminTestimonial[] = [
  {
    id: "test-1",
    name: "Tway Real Estate",
    role: "Management • Tway Real Estate PLC",
    company: "Tway Real Estate PLC",
    quote:
      "The Tway Realestate platform transformed how our clients explore properties in Addis Ababa. The responsive design and instant inquiry workflow significantly boosted our verified buyer leads.",
    initials: "TR",
    status: "published",
    rating: 5,
  },
  {
    id: "test-2",
    name: "A. Mengistu",
    role: "General Manager • Amigos Gym",
    company: "Amigos Gym",
    quote:
      "The GYM Management System streamlined our memberships, check-ins, and trainer schedules completely. Our front desk operations are now fast and error-free.",
    initials: "AM",
    status: "published",
    rating: 5,
  },
  {
    id: "test-3",
    name: "A. Okonkwo",
    role: "Head of Operations • Akiba ERP deployment",
    company: "Akiba ERP deployment",
    quote:
      "Akiba ERP reconciled our warehouse counts across branches automatically. Month-end audits now happen in minutes instead of taking days of manual entry.",
    initials: "AO",
    status: "published",
    rating: 5,
  },
];

const TESTIMONIALS_KEY = "akiba_admin_testimonials";
const TESTIMONIALS_EVENT_KEY = "akiba_testimonials_change";

export function getStoredTestimonials(): AdminTestimonial[] {
  if (typeof window === "undefined") return INITIAL_TESTIMONIALS;
  try {
    const raw = localStorage.getItem(TESTIMONIALS_KEY);
    if (!raw) {
      localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(INITIAL_TESTIMONIALS));
      return INITIAL_TESTIMONIALS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(INITIAL_TESTIMONIALS));
      return INITIAL_TESTIMONIALS;
    }
    return parsed;
  } catch {
    return INITIAL_TESTIMONIALS;
  }
}

export function saveTestimonials(testimonials: AdminTestimonial[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(testimonials));
    window.dispatchEvent(new Event(TESTIMONIALS_EVENT_KEY));
  } catch {
    // ignore
  }
}

export function resetTestimonials(): AdminTestimonial[] {
  if (typeof window === "undefined") return INITIAL_TESTIMONIALS;
  try {
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(INITIAL_TESTIMONIALS));
    window.dispatchEvent(new Event(TESTIMONIALS_EVENT_KEY));
  } catch {
    // ignore
  }
  return INITIAL_TESTIMONIALS;
}

