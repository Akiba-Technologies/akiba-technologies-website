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
    <section className="build-band-sec">
      <div className="wrap">
        <Reveal as="div" className="build-band-row">
          <div className="build-band-copy">
            <h2 className="build-band-title">
              Let’s build something that saves you time, money and resources.
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
            <Link className="btn btn-navy build-band-btn" href="/contact">
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
