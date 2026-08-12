"use client";

import { FormEvent, useState } from "react";

type ContactStatus = "idle" | "submitting" | "success" | "error";

export function ContactPageContent() {
  const [status, setStatus] = useState<ContactStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    await new Promise((resolve) => window.setTimeout(resolve, 800));
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");

    if (!email.includes("@") || message.trim().length < 10) {
      setStatus("error");
      return;
    }

    event.currentTarget.reset();
    setStatus("success");
  }

  return (
    <section className="surface-panel rounded-2xl p-6">
      <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="contact-name" className="field-label">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            required
            className="field-input mt-1"
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="contact-email" className="field-label">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className="field-input mt-1"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="field-label">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            rows={5}
            className="field-input mt-1"
          />
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? "Sending..." : "Send message"}
          </button>
        </div>
      </form>

      {status === "success" ? (
        <p className="status-alert status-alert-success mt-4" role="status">
          Message sent successfully. We&apos;ll get back to you soon.
        </p>
      ) : null}

      {status === "error" ? (
        <p className="status-alert status-alert-error mt-4" role="alert">
          Please provide a valid email and a message with at least 10 characters.
        </p>
      ) : null}
    </section>
  );
}
