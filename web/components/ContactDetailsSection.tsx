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
            <span className="k">Official Email</span>
            <a className="v" href={`mailto:${config.email || "akiba.tech.official@gmail.com"}`}>
              {config.email || "akiba.tech.official@gmail.com"}
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

        {/* WhatsApp & Direct Phone */}
        <div className="ct-line">
          <span className="ico" aria-hidden="true" style={{ color: "#10b981" }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </span>
          <span>
            <span className="k">WhatsApp &amp; Support Phone</span>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginTop: 2 }}>
              <a className="v" href={cleanPhoneLink(config.phone || "+251 960 352 222")}>
                {config.phone || "+251 960 352 222"}
              </a>
              <a
                href="https://wa.me/251960352222"
                target="_blank"
                rel="noopener noreferrer"
                className="chip"
                style={{
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  fontSize: "0.78rem",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                Chat on WhatsApp &rarr;
              </a>
            </div>
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
            <span className="k">Headquarters</span>
            <span className="v">
              {fullAddress || "Addis Ababa, Ethiopia"}
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

        {/* Official Channels */}
        <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid var(--border)" }}>
          <span className="k" style={{ display: "block", marginBottom: 10, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--slate)" }}>
            Connect On Official Channels
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <a
              href="https://linkedin.com/company/akibatech"
              target="_blank"
              rel="noopener noreferrer"
              className="chip"
              style={{ textDecoration: "none", fontSize: "0.82rem", padding: "4px 10px" }}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/akibatech"
              target="_blank"
              rel="noopener noreferrer"
              className="chip"
              style={{ textDecoration: "none", fontSize: "0.82rem", padding: "4px 10px" }}
            >
              GitHub
            </a>
            <a
              href="https://x.com/akibatech"
              target="_blank"
              rel="noopener noreferrer"
              className="chip"
              style={{ textDecoration: "none", fontSize: "0.82rem", padding: "4px 10px" }}
            >
              X / Twitter
            </a>
            <a
              href="https://instagram.com/akibatech"
              target="_blank"
              rel="noopener noreferrer"
              className="chip"
              style={{ textDecoration: "none", fontSize: "0.82rem", padding: "4px 10px" }}
            >
              Instagram
            </a>
            <a
              href="https://facebook.com/akibatech"
              target="_blank"
              rel="noopener noreferrer"
              className="chip"
              style={{ textDecoration: "none", fontSize: "0.82rem", padding: "4px 10px" }}
            >
              Facebook
            </a>
            <a
              href="https://youtube.com/@akibatech"
              target="_blank"
              rel="noopener noreferrer"
              className="chip"
              style={{ textDecoration: "none", fontSize: "0.82rem", padding: "4px 10px" }}
            >
              YouTube
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
