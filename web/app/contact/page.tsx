import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Akiba Technologies",
  description:
    "Reach out to us directly at contact@akibatech.com, call +251 911 648 816, or visit our office in Bethel, Addis Ababa, Ethiopia.",
  openGraph: {
    title: "Contact Us | Akiba Technologies",
    description: "Reach out to us directly. We are ready to help your business grow.",
  },
};

export default function ContactPage() {
  return (
    <section className="sec phead phead-contact" style={{ paddingTop: "clamp(44px,6vw,76px)", minHeight: "80vh" }}>
      <div className="wrap">
        <div className="ct-grid">
          {/* ============ LEFT: Contact Information ============ */}
          <div>
            <Reveal as="p" className="kicker">
              Get In Touch
            </Reveal>
            <Reveal as="h1" delay={60} style={{ fontSize: "clamp(2.1rem,4vw,3.2rem)", marginBottom: 14 }}>
              Contact Information
            </Reveal>
            <Reveal as="p" className="lede" delay={120}>
              Reach out to us directly.
            </Reveal>

            <Reveal className="ct-lines" delay={180}>
              {/* Email */}
              <div className="ct-line">
                <span className="ico" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2.5" />
                    <path d="m3.6 6.5 8.4 6 8.4-6" />
                  </svg>
                </span>
                <span>
                  <span className="k">Email</span>
                  <a className="v" href="mailto:contact@akibatech.com">
                    contact@akibatech.com
                  </a>
                </span>
              </div>

              {/* Phone */}
              <div className="ct-line">
                <span className="ico" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span>
                  <span className="k">Phone</span>
                  <a className="v" href="tel:+251911648816">
                    +251 911 648 816
                  </a>
                </span>
              </div>

              {/* Office Location */}
              <div className="ct-line">
                <span className="ico" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
                    <circle cx="12" cy="10" r="2.6" />
                  </svg>
                </span>
                <span>
                  <span className="k">Our Office</span>
                  <span className="v">
                    Bethel, Addis Ababa, Ethiopia
                  </span>
                </span>
              </div>
            </Reveal>
          </div>

          {/* ============ RIGHT: Simple & clean contact form ============ */}
          <div>
            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
