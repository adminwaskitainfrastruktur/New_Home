"use client";

import { useState } from "react";
import { Eyebrow } from "../ui/Layout";
import { Button } from "../ui/Button";

const subjects = [
  "General enquiry",
  "Construction rental",
  "Equipment rental",
  "Steel trading",
  "Material trading",
  "Procurement / vendor",
  "Media",
];

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Presentational only — wire `onSubmit` to the real endpoint (server action or
 * /api/contact). Validation shown here is the browser's; add zod on the server.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // TODO: POST to the contact endpoint.
    setTimeout(() => setStatus("sent"), 600);
  }

  return (
    <form onSubmit={onSubmit} className="bg-paper p-6 lg:p-11">
      <Eyebrow className="text-navy">Send a message</Eyebrow>

      <div className="mt-6 flex flex-col gap-4">
        <Field label="Full name">
          <input
            required
            name="name"
            placeholder="Your name"
            className="w-full border border-navy/15 bg-white px-4 py-3.5 text-[14px] text-ink outline-none transition-colors placeholder:text-navy/40 focus:border-green"
          />
        </Field>
        <Field label="Email">
          <input
            required
            type="email"
            name="email"
            placeholder="you@company.com"
            className="w-full border border-navy/15 bg-white px-4 py-3.5 text-[14px] text-ink outline-none transition-colors placeholder:text-navy/40 focus:border-green"
          />
        </Field>
        <Field label="Subject">
          <select
            required
            name="subject"
            defaultValue=""
            className="w-full appearance-none border border-navy/15 bg-white px-4 py-3.5 text-[14px] text-ink outline-none transition-colors focus:border-green"
          >
            <option value="" disabled>
              Select a topic
            </option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Message">
          <textarea
            required
            name="message"
            rows={5}
            placeholder="How can we help?"
            className="w-full resize-y border border-navy/15 bg-white px-4 py-3.5 text-[14px] text-ink outline-none transition-colors placeholder:text-navy/40 focus:border-green"
          />
        </Field>

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" className="self-start">
            {status === "sending" ? "Sending…" : "Send message"}
          </Button>
          {status === "sent" && (
            <p role="status" className="t-cap text-green">
              Message sent. We reply within 2 working days.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="t-cap text-red">
              Something went wrong. Please email us directly.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="t-cap mb-2 block">{label}</span>
      {children}
    </label>
  );
}
