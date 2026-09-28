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
    slug: "tway-real-estate",
    title: "Tway Real Estate ERP",
    client: "Tway Real Estate PLC",
    category: "Enterprise ERP",
    year: "2025",
    summary:
      "Multi-branch property management, automated tenant billing, and offline-first leasing workflows tailored to the Ethiopian commercial market.",
    metricValue: "100%",
    metricLabel: "lease audit accuracy & zero data loss",
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Node.js"],
    status: "published",
  },
  {
    id: "proj-2",
    slug: "digifarm-ai",
    title: "DigiFarm AI",
    client: "East Africa AgriTech Consortium",
    category: "AI & ML",
    year: "2025",
    summary:
      "AI-driven platform for managing agricultural field operations, crop disease detection, and yield prediction directly to farmers' mobile devices.",
    metricValue: "AI Driven",
    metricLabel: "disease detection & agricultural forecasting",
    stack: ["Python", "Scikit-learn", "FastAPI", "Redis"],
    status: "published",
  },
  {
    id: "proj-3",
    slug: "gym-management",
    title: "Gym & Fitness Management System",
    client: "FitLife Addis Network",
    category: "Web Development",
    year: "2025",
    summary:
      "Comprehensive fitness club management platform with member check-in QR codes, automated billing renewals, trainer scheduling, and analytics.",
    metricValue: "4.8/5",
    metricLabel: "member retention rating across 6 locations",
    stack: ["React", "Tailwind CSS", "Node.js", "PostgreSQL"],
    status: "published",
  },
  {
    id: "proj-4",
    slug: "awash-fleet-os",
    title: "Awash Logistics Fleet OS",
    client: "Awash Cargo & Transit",
    category: "Enterprise ERP",
    year: "2024",
    summary:
      "High-throughput GPS telematics, cargo weight sensor integration, and offline-tolerant manifest synchronization across freight transit corridors.",
    metricValue: "3.8x",
    metricLabel: "faster dispatch turnaround & route tracking",
    stack: ["Go", "MQTT", "Docker", "PostgreSQL"],
    status: "published",
  },
  {
    id: "proj-5",
    slug: "ethiofin-switch",
    title: "EthioFin Micro-Switch",
    client: "Regional Banking Pod",
    category: "Web Development",
    year: "2024",
    summary:
      "High-availability ISO 8583 settlement gateway processing retail transactions with sub-40ms response times and zero failover downtime.",
    metricValue: "4,200",
    metricLabel: "transactions per second at peak load",
    stack: ["Rust", "Redis", "Kafka", "Linux"],
    status: "draft",
  },
];

const INQUIRIES_KEY = "akiba_admin_inquiries";
const PROJECTS_KEY = "akiba_admin_projects";
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
    return JSON.parse(raw);
  } catch {
    return INITIAL_PROJECTS;
  }
}

export function saveProjects(projects: AdminProject[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
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
