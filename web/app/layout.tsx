import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Env } from "@/components/Env";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

// Plus Jakarta Sans configured across all display and body typography
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-m",
  display: "swap",
});

// Setting metadataBase means every page's relative openGraph url resolves to
// an absolute one automatically. Set NEXT_PUBLIC_SITE_URL at deploy time and
// every page's social tags pick up the real domain with no manual patching.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Akiba Tech | Building Modern Technology Solutions",
    template: "%s | Akiba Tech",
  },
  description:
    "Akiba Tech is a modern technology company designing scalable software, cloud systems, and intelligent digital products. Empowering digital transformation through scalable, high-performance technology.",
  keywords: [
    "Akiba Tech",
    "Building Modern Technology Solutions",
    "Scalability",
    "Performance",
    "Modern Architecture",
    "Enterprise Tech",
    "Full-Stack",
    "AI",
    "Digital Transformation",
    "Cloud Infrastructure",
    "ERP software Addis Ababa",
    "Custom Software Development Ethiopia",
    "High-concurrency architecture",
  ],
  authors: [{ name: "Akiba Tech", url: siteUrl }],
  creator: "Akiba Tech",
  publisher: "Akiba Tech",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Akiba Tech",
    title: "Akiba Tech | Building Modern Technology Solutions",
    description:
      "Akiba Tech builds modern, reliable, and high-impact software solutions. Empowering digital transformation through scalable, high-performance technology.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akiba Tech | Building Modern Technology Solutions",
    description:
      "Akiba Tech is a modern technology company designing scalable software, cloud systems, and intelligent digital products.",
    creator: "@akibatech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F6F8",
};

// Light mode is the default and standard view. This runs before paint
// to ensure data-theme="light" is consistently applied.
const themeInitScript = `(function(){try{document.documentElement.setAttribute('data-theme','light');localStorage.setItem('akiba-theme','light');}catch(e){}})();`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Akiba Tech",
      alternateName: "Akiba Technologies",
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      description:
        "Akiba Tech is a modern technology company designing scalable software, cloud systems, and intelligent digital products.",
      email: "akiba.tech.official@gmail.com",
      telephone: "+251 960 352 222",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Addis Ababa",
        addressCountry: "ET",
      },
      sameAs: [
        "https://linkedin.com/company/akibatech",
        "https://x.com/akibatech",
        "https://facebook.com/akibatech",
        "https://instagram.com/akibatech",
        "https://github.com/akibatech",
        "https://youtube.com/@akibatech",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+251 960 352 222",
          contactType: "customer service",
          areaServed: ["ET", "Global"],
          availableLanguage: ["English", "Amharic"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Akiba Tech",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={`${plusJakartaSans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>

        <Env />
        <Nav />

        <main id="main" tabIndex={-1}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
