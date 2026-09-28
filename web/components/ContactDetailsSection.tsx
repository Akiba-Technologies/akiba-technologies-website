"use client";

import { Reveal } from "@/components/Reveal";
import { useContactConfig } from "@/lib/contact-store";

export function ContactDetailsSection() {
  const { config } = useContactConfig();

  const fullAddress = [config.address, config.cityCountry].filter(Boolean).join(", ");
  const cleanPhoneLink = (num: string) => `tel:${num.replace(/[^0-9+]/g, "")}`;

  return (
    <div>
      <Reveal as="p" className="kicker">
        {config.kicker || "Get In Touch"}
      </Reveal>
      <Reveal
        as="h1"
        delay={60}
        style={{ fontSize: "clamp(2.1rem,4vw,3.2rem)", marginBottom: 14 }}
      >
        {config.title || "Contact Information"}
      </Reveal>
      <Reveal as="p" className="lede" delay={120}>
        {config.lede || "Reach out to us directly."}
      </Reveal>

      <Reveal className="ct-lines" delay={180}>
        {/* Email */}
        <div className="ct-line">
          <span className="ico" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <path d="m3.6 6.5 8.4 6 8.4-6" />
            </svg>
          </span>
          <span>
            <span className="k">Email</span>
            <a className="v" href={`mailto:${config.email || "contact@akibatech.com"}`}>
              {config.email || "contact@akibatech.com"}
            </a>
            {config.secondaryEmail && (
              <a
                className="v"
                href={`mailto:${config.secondaryEmail}`}
                style={{ display: "block", marginTop: 4, opacity: 0.85 }}
              >
                {config.secondaryEmail}
              </a>
            )}
          </span>
        </div>

        {/* Phone */}
        <div className="ct-line">
          <span className="ico" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </span>
          <span>
            <span className="k">Phone</span>
            <a className="v" href={cleanPhoneLink(config.phone || "+251 911 648 816")}>
              {config.phone || "+251 911 648 816"}
            </a>
            {config.secondaryPhone && (
              <a
                className="v"
                href={cleanPhoneLink(config.secondaryPhone)}
                style={{ display: "block", marginTop: 4, opacity: 0.85 }}
              >
                {config.secondaryPhone}
              </a>
            )}
          </span>
        </div>

        {/* Office Location */}
        <div className="ct-line">
          <span className="ico" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.6" />
            </svg>
          </span>
          <span>
            <span className="k">Our Office</span>
            <span className="v">
              {fullAddress || "Bethel, Addis Ababa, Ethiopia"}
            </span>
          </span>
        </div>

        {/* Working Hours */}
        {config.workingHours && (
          <div className="ct-line">
            <span className="ico" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
            <span>
              <span className="k">Business Hours</span>
              <span className="v">
                {config.workingHours}
                {config.weekendHours && (
                  <span style={{ display: "block", marginTop: 3, opacity: 0.85 }}>
                    {config.weekendHours}
                  </span>
                )}
              </span>
            </span>
          </div>
        )}

        {/* Response Time SLA */}
        {config.responseSLA && (
          <div className="ct-line">
            <span className="ico" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </span>
            <span>
              <span className="k">Response Time SLA</span>
              <span className="v">{config.responseSLA}</span>
            </span>
          </div>
        )}
      </Reveal>
    </div>
  );
}
