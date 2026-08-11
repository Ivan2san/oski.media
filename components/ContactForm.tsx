"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Posts to Formspree as JSON so the visitor stays on the page and gets the
 * designed "Got it" state instead of Formspree's own thank-you screen.
 *
 * Set NEXT_PUBLIC_FORMSPREE_ID to the form id from your Formspree dashboard
 * (the part after /f/). Without it the form refuses to submit and says so,
 * rather than quietly dropping enquiries.
 */
export function ContactForm() {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formId) return;

    const form = event.currentTarget;
    setStatus("sending");
    setError(null);

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          body?.errors?.[0]?.message ?? "That didn't send. Try again?",
        );
      }

      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "That didn't send.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={styles.done} role="status">
        <span className={`display display-64 ${styles.doneHead}`}>Got it</span>
        <span className={styles.doneLine}>
          I&rsquo;ll come back to you today. If it&rsquo;s urgent, DM me and
          I&rsquo;ll see it faster.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <label className={styles.field}>
        <span className={styles.label}>Your name</span>
        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          className={styles.input}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className={styles.input}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Club or organisation</span>
        <input
          type="text"
          name="club"
          autoComplete="organization"
          className={styles.input}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>What do you need?</span>
        <textarea
          name="message"
          rows={4}
          required
          placeholder="e.g. Round 3 at home, highlights plus a few verticals for Instagram"
          className={styles.textarea}
        />
      </label>

      {/* Formspree's honeypot: bots fill it, humans never see it. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className={styles.gotcha}
        aria-hidden="true"
      />

      <button
        type="submit"
        className="btn btn-primary"
        disabled={!formId || status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>

      {!formId && (
        <p className={styles.note}>
          Form endpoint not configured yet — set{" "}
          <code>NEXT_PUBLIC_FORMSPREE_ID</code>. Email still works.
        </p>
      )}

      {status === "error" && error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
