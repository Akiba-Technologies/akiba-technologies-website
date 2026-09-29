export type NavLink = {
  href: string;
  label: string;
};

// Shared between the desktop nav, the mobile nav panel, and the footer's
// capability list, so a new page or a renamed route only has to change here.
export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_CAPABILITIES: NavLink[] = [
  { href: "/services#erp", label: "Akiba ERP platforms" },
  { href: "/services#web", label: "Full-stack web" },
  { href: "/services#ai", label: "AI & Machine Learning" },
  { href: "/services#academy", label: "Education Services (Academy)" },
];

export const FOOTER_COMPANY: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Case studies" },
  { href: "/about#team", label: "Engineering pods" },
  { href: "https://hub.akibatech.com/login", label: "AkibaTech Academy (Hub)" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin Portal" },
];

export const CONTACT_EMAIL = "akiba.tech.official@gmail.com";
export const SUPPORT_PHONE = "+251 960 352 222";
export const SUPPORT_WHATSAPP = "https://wa.me/251960352222";

export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/company/akibatech",
  twitter: "https://x.com/akibatech",
  facebook: "https://facebook.com/akibatech",
  instagram: "https://instagram.com/akibatech",
  github: "https://github.com/akibatech",
  youtube: "https://youtube.com/@akibatech",
  whatsapp: "https://wa.me/251960352222",
};
