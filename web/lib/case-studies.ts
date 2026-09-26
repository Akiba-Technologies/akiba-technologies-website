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
  liveDemoUrl: string;
  image?: CaseImage;
};

export const CASE_FILTERS: { key: CaseCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web", label: "Web Development" },
  { key: "ai-ml", label: "AI & ML" },
  { key: "mobile", label: "Mobile App" },
  { key: "iot", label: "IoT" },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "digifarm-ai",
    badge: "AI & ML",
    categoryLabel: "AI & ML",
    year: "2025",
    title: "DigiFarm AI",
    summary:
      "An AI-powered platform for managing agricultural operations, including crop tracking, inventory management, and farmer support services. Features include real-time weather updates, crop disease detection, and personalized recommendations for optimal growth. AI-powered insights for decision-making and improved productivity.",
    metricValue: "AI Driven",
    metricLabel: "disease detection & agricultural forecasting",
    stack: ["Python", "Scikit-learn", "FastAPI", "Redis"],
    categories: ["ai-ml", "mobile"],
    liveDemoUrl: "https://akibatech.com/portfolio#",
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
      "A complete gym management solution featuring member management, workout tracking, payment processing, class scheduling, and trainer assignment. Includes comprehensive reporting, mobile-responsive design, and real-time notifications for enhanced member experience.",
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
      "A comprehensive inventory management system with real-time stock tracking, automated reorder alerts, barcode scanning, supplier management, and detailed reporting. Includes multi-location support, role-based access control, and integration with accounting systems.",
    metricValue: "Multi-Hub",
    metricLabel: "real-time stock tracking & barcode reorder alerts",
    stack: ["Laravel", "React", "MySQL", "REST API"],
    categories: ["web"],
    liveDemoUrl: "https://test2.qudwaerp.com/",
    image: {
      src: "/work/akiba-erp-dashboard.webp",
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
      "A modern, elegant landing page for Royal Candy & Chocolate company featuring product showcase, company information, contact forms, and responsive design optimized for mobile and desktop. Includes admin panel for content management and SEO optimization.",
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
      "A professional business landing page showcasing Ethiopia's agricultural excellence and industrial potential to global markets. Features company services, product catalogs, contact information, and business inquiry forms designed to attract international clients and partners.",
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
      "A real estate company landing page showcasing their properties, services, and contact information. Features a modern design with a focus on user experience and conversion optimization.",
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
    initials: "DG",
    quote:
      "The DigiFarm AI platform transformed our agricultural field tracking. Farmers receive actionable predictions directly on mobile, reducing crop loss significantly.",
    name: "Dr. G. Haile",
    role: "Director of AgriTech Operations",
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
