"use client";

import { useState, useEffect } from "react";
import { Reveal } from "./Reveal";
import {
  type AdminTestimonial,
  INITIAL_TESTIMONIALS,
  getStoredTestimonials,
} from "@/lib/admin-store";

export function PortfolioTestimonials() {
  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>(INITIAL_TESTIMONIALS);

  useEffect(() => {
    const load = () => {
      const stored = getStoredTestimonials();
      const published = stored.filter((t) => t.status !== "draft");
      setTestimonials(published.length > 0 ? published : INITIAL_TESTIMONIALS);
    };
    load();

    const handleUpdate = () => load();
    window.addEventListener("akiba_testimonials_change", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("akiba_testimonials_change", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return (
    <section className="sec sec-tint" aria-labelledby="say-h">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="kicker">Verified engagements</p>
          <h2 id="say-h">What the people who own the system say</h2>
          <p className="lede">
            Real feedback from technical leaders and operational managers running software engineered by Akiba.
          </p>
        </Reveal>

        <div className="quotes">
          {testimonials.map((t, i) => (
            <Reveal as="figure" className="card quote" delay={i * 60} key={t.id || t.name}>
              <span className="mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <span className="avatar" aria-hidden="true">
                  {t.initials || t.name.slice(0, 2).toUpperCase()}
                </span>
                <span>
                  <span className="who">{t.name}</span>
                  <span className="role">{t.role}</span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
