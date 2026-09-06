"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    setPending(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.get("email"),
        }),
      });

      const data = await response.json();

      setMessage(
        data.message ||
          (response.ok
            ? "Successfully subscribed!"
            : "Something went wrong.")
      );

      if (response.ok) {
        formElement.reset();
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <label
        htmlFor="newsletter-email"
        className="text-sm text-muted"
      >
        Subscribe to our newsletter
      </label>

      <div className="flex gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="Your email"
          className="w-full border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-gold"
        />

        <button
          type="submit"
          disabled={pending}
          className="border border-line px-4 py-2 text-sm transition-colors hover:border-gold hover:text-gold disabled:opacity-50"
        >
          {pending ? "..." : "Subscribe"}
        </button>
      </div>

      {message && (
        <p className="text-xs text-muted">
          {message}
        </p>
      )}
    </form>
  );
}