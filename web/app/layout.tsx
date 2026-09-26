import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { Env } from "@/components/Env";
import { Rail } from "@/components/Rail";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

// next/font self-hosts these and injects each family as the named CSS
// variable, so globals.css just does font-family:var(--font-d) etc. with no
// manual <link> or preconnect needed.
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-d",
  display: "swap",
});
const body = IBM_Plex_Sans({
  subsets: ["latin"],
  // 600 added for the light-theme nav (see [data-theme="light"] .nav-link
  // in globals.css) so it renders the real semibold cut, not a synthetic one.
  weight: ["400", "500", "600"],
  variable: "--font-b",
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
    default: "Akiba Technologies | Scalable Systems and Enterprise Software Engineering",
    template: "%s | Akiba Technologies",
  },
  description:
    "Akiba Technologies builds high-concurrency enterprise software, ERP platforms and cloud infrastructure that hold up under real load. Save time. Save money. Save resources.",
  openGraph: {
    type: "website",
    siteName: "Akiba Technologies",
  },
};

export const viewport: Viewport = {
  themeColor: "#080B11",
};

// Dark is the default for every first-time visitor, unchanged. This only
// runs to restore a visitor's own earlier choice of light mode, and it runs
// before paint so there's no flash of the wrong theme on repeat visits.
const themeInitScript = `(function(){try{var t=localStorage.getItem('akiba-theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>

        <Env />
        <Rail />
        <Nav />

        <main id="main" tabIndex={-1}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
