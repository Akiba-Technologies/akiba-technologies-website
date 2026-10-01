import Link from "next/link";
import { Reveal } from "./Reveal";

const POINTS = [
  "Fixed-timeline sprints",
  "Full IP transfer on delivery",
  "Senior engineers only",
  "Response within 2 hours",
];

export function BuildBand() {
  return (
    <section className="build-band-sec" aria-label="Call to Action">
      <div className="wrap">
        <Reveal
          as="div"
          className="build-band-card"
          style={{
            background: "linear-gradient(135deg, #10B981 0%, #059669 45%, #047857 100%)",
          }}
        >
          <div className="build-band-copy">
            <h2 className="build-band-title">
              Let’s build something that saves you <span className="title-accent">time, money and resources.</span>
            </h2>
            <div className="build-band-points">
              {POINTS.map((point, index) => (
                <span key={point} className="build-band-point">
                  {index > 0 && <span className="build-band-sep" aria-hidden="true">&bull;</span>}
                  <span>{point}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="build-band-action">
            <Link className="btn btn-em build-band-btn" href="/contact">
              Book an engineering consult
              <svg className="btn-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
