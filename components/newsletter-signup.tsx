"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    await new Promise((resolve) => window.setTimeout(resolve, 700));

    if (!email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  }

  return (
    <section className="surface-panel rounded-3xl border-dashed p-6 sm:p-8">
      <p className="font-tech text-[11px] uppercase tracking-[0.14em] text-slate-500">
        Shipping list signup
      </p>
      <h2 className="font-display mt-2 text-3xl font-semibold text-slate-900">
        Join the Discovery Dispatch
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
        Get new arrivals, hidden gems, and price drops before they vanish.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="field-input w-full rounded-full"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-accent disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {status === "success" ? (
        <p className="status-alert status-alert-success mt-3" role="status">
          Success! You&apos;re on the list. Live Long and Prosper.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="status-alert status-alert-error mt-3" role="alert">
          Please enter a valid email address.
        </p>
      ) : null}
    </section>
  );
}
