"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

type ContactResponse = {
  ok?: boolean;
  error?: string;
};

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(form),
      });

      const result = (await response.json().catch(() => ({}))) as ContactResponse;

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(result.error || "The message could not be sent. Please try again.");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMessage("The message could not be sent. Please check your connection and try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="grid min-h-[430px] place-items-center border border-ink/15 bg-warm-white p-10 text-center" role="status">
        <div>
          <span className="mx-auto mb-6 grid size-14 place-items-center rounded-full bg-copper text-white"><Check /></span>
          <p className="eyebrow mb-4">Message received</p>
          <h2 className="font-serif text-5xl">Thank you.</h2>
          <p className="mx-auto mt-4 max-w-sm leading-7 text-ink/65">We&apos;ll read your note with care and get back to you within two working days.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
      <div className="field">
        <label htmlFor="contact-name">Your name *</label>
        <input id="contact-name" name="name" autoComplete="name" required maxLength={120} placeholder="Name" />
      </div>
      <div className="field">
        <label htmlFor="contact-email">Email address *</label>
        <input id="contact-email" type="email" name="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" />
      </div>
      <div className="field">
        <label htmlFor="contact-phone">Phone number</label>
        <input id="contact-phone" type="tel" name="phone" autoComplete="tel" maxLength={40} placeholder="Country code and phone number" />
      </div>
      <div className="field">
        <label htmlFor="contact-event-date">Event date</label>
        <input id="contact-event-date" type="date" name="eventDate" />
      </div>
      <div className="field sm:col-span-2">
        <label htmlFor="contact-message">Tell us about your story *</label>
        <textarea id="contact-message" name="message" required maxLength={5000} rows={5} placeholder="Where, when, and what matters most to you?" />
      </div>
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" type="text" autoComplete="off" tabIndex={-1} />
      </div>
      <div className="sm:col-span-2 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <p className="max-w-sm text-xs leading-5 text-ink/50">By sending this form, you agree that we can use these details to respond to your enquiry.</p>
        <button disabled={status === "sending"} className="button button--dark min-w-44" type="submit">
          {status === "sending" ? "Sending…" : "Send enquiry"} <ArrowUpRight size={17} />
        </button>
      </div>
      {status === "error" && <p className="text-sm text-red-700 sm:col-span-2" role="alert">{errorMessage}</p>}
    </form>
  );
}
