"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_EMAIL } from "@/lib/nav-links";
import { addInquiry } from "@/lib/admin-store";

const FORM_ENDPOINT = "";

type ContactData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const EMPTY: ContactData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [data, setData] = useState<ContactData>(EMPTY);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;

    setSending(true);

    try {
      addInquiry({
        name: data.name,
        email: data.email,
        subject: data.subject || "General Inquiry",
        message: data.message,
        source: "Website Contact Page",
      });
    } catch {
      // ignore
    }

    if (FORM_ENDPOINT) {
      try {
        await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        setSending(false);
        setDone(true);
        return;
      } catch {
        // Fallback to mailto
      }
    }

    const mailtoSubject = encodeURIComponent(data.subject || `Inquiry from ${data.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject || "Not specified"}\n\nMessage:\n${data.message}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSending(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="form ok on" role="status" aria-live="polite" tabIndex={-1}>
        <span className="ring" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h2>Message Received</h2>
        <p>
          Thank you for reaching out! Your message has been sent to our team at <b>{CONTACT_EMAIL}</b>. We will get back to you within 24 hours.
        </p>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          style={{ marginTop: 16 }}
          onClick={() => {
            setDone(false);
            setData(EMPTY);
          }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="form" id="contact-form" noValidate onSubmit={onSubmit}>
      <div className="fgroup">
        <label className="flabel" htmlFor="f-name">
          Your Name <span className="req">*</span>
        </label>
        <input
          className="field"
          id="f-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="e.g. Alex Johnson"
          value={data.name}
          onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
        />
      </div>

      <div className="fgroup">
        <label className="flabel" htmlFor="f-email">
          Email Address <span className="req">*</span>
        </label>
        <input
          className="field"
          id="f-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="e.g. alex@example.com"
          value={data.email}
          onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
        />
      </div>

      <div className="fgroup">
        <label className="flabel" htmlFor="f-subject">
          Subject
        </label>
        <input
          className="field"
          id="f-subject"
          name="subject"
          type="text"
          placeholder="e.g. Web Development or AI Project"
          value={data.subject}
          onChange={(e) => setData((d) => ({ ...d, subject: e.target.value }))}
        />
      </div>

      <div className="fgroup">
        <label className="flabel" htmlFor="f-message">
          Message <span className="req">*</span>
        </label>
        <textarea
          className="field"
          id="f-message"
          name="message"
          required
          rows={5}
          placeholder="How can we help your business? Describe your project or questions..."
          value={data.message}
          onChange={(e) => setData((d) => ({ ...d, message: e.target.value }))}
        />
      </div>

      <div className="fsubmit">
        <button className="btn btn-em" type="submit" disabled={sending} style={{ width: "100%", justifyContent: "center" }}>
          {sending ? "Sending..." : "Send Message"}
          {!sending && (
            <svg className="btn-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        <p className="fnote" style={{ textAlign: "center", marginTop: 12 }}>
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </form>
  );
}
