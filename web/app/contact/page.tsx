import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { ContactDetailsSection } from "@/components/ContactDetailsSection";

export const metadata: Metadata = {
  title: "Contact Us | Akiba Tech",
  description:
    "Reach out to Akiba Tech directly at akiba.tech.official@gmail.com, WhatsApp/call +251 960 352 222, or connect with our team in Addis Ababa, Ethiopia.",
  openGraph: {
    title: "Contact Us | Akiba Tech",
    description: "Reach out to us directly. We are ready to help your business grow with modern technology solutions.",
  },
};

export default function ContactPage() {
  return (
    <section className="sec phead phead-contact" style={{ paddingTop: "clamp(44px,6vw,76px)", minHeight: "80vh" }}>
      <div className="wrap">
        <div className="ct-grid">
          {/* ============ LEFT: Dynamic Contact Information ============ */}
          <ContactDetailsSection />

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
