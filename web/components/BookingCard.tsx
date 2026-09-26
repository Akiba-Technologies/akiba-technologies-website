"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "./Reveal";

const SLOTS = ["Tue 09:30 UTC", "Wed 14:00 UTC", "Thu 11:00 UTC", "Fri 16:30 UTC"];

/* ------------------------------------------------------------------------
   NOTE FOR THE SITE OWNER
   This is a designed booking card, not a live calendar. The slots below are
   indicative and the button sends the visitor to the brief form. To make it
   real, swap this component's body for your Cal.com or Calendly embed, or
   point the link at your public booking URL.
------------------------------------------------------------------------- */
export function BookingCard() {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <Reveal className="book">
      <div className="book-txt">
        <p className="kicker">Ready sooner</p>
        <h2 id="book-h">Take a 30 minute discovery call instead</h2>
        <p>
          If you would rather talk it through, book half an hour with a technical lead. Bring your current stack and
          the thing that keeps breaking. No deck, no discovery questionnaire.
        </p>
        <div className="book-slots" role="group" aria-label="Indicative slots">
          {SLOTS.map((slot) => (
            <button
              key={slot}
              className="slot"
              type="button"
              aria-pressed={picked === slot}
              onClick={() => setPicked(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
      <Link className="btn btn-ghost" href="#brief">
        Request this slot
        <svg className="btn-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </Reveal>
  );
}
