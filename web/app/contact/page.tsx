import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { ContactDetailsSection } from "@/components/ContactDetailsSection";

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
