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

export const INITIAL_INQUIRIES: AdminInquiry[] = [];


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

const LEGACY_SAMPLE_INQUIRY_IDS = new Set(["inq-1", "inq-2", "inq-3", "inq-4", "inq-5"]);

export function getStoredInquiries(): AdminInquiry[] {
  if (typeof window === "undefined") return INITIAL_INQUIRIES;
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    if (!raw) {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(INITIAL_INQUIRIES));
      return INITIAL_INQUIRIES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const cleaned = parsed.filter((inq: AdminInquiry) => !LEGACY_SAMPLE_INQUIRY_IDS.has(inq.id));
      if (cleaned.length !== parsed.length) {
        localStorage.setItem(INQUIRIES_KEY, JSON.stringify(cleaned));
      }
      return cleaned;
    }
    return INITIAL_INQUIRIES;
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

export type AdminAccount = {
  username: string;
  email: string;
  password: string;
};

export const DEFAULT_ADMIN_ACCOUNT: AdminAccount = {
  username: "admin",
  email: "admin@akibatech.com",
  password: "akiba2026",
};

const ACCOUNT_KEY = "akiba_admin_account";

export function getStoredAdminAccount(): AdminAccount {
  if (typeof window === "undefined") return DEFAULT_ADMIN_ACCOUNT;
  try {
    const raw = localStorage.getItem(ACCOUNT_KEY);
    if (!raw) {
      localStorage.setItem(ACCOUNT_KEY, JSON.stringify(DEFAULT_ADMIN_ACCOUNT));
      return DEFAULT_ADMIN_ACCOUNT;
    }
    const parsed = JSON.parse(raw);
    return {
      username: parsed.username || DEFAULT_ADMIN_ACCOUNT.username,
      email: parsed.email || DEFAULT_ADMIN_ACCOUNT.email,
      password: parsed.password || DEFAULT_ADMIN_ACCOUNT.password,
    };
  } catch {
    return DEFAULT_ADMIN_ACCOUNT;
  }
}

export function saveStoredAdminAccount(account: AdminAccount): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
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

