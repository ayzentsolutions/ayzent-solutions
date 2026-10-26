"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { inquiryBudgetOptions } from "@/lib/site-data";

type ContactFormProps = {
  serviceOptions?: string[];
};

export function ContactForm({ serviceOptions = [] }: ContactFormProps) {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setPending(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      const result: { message?: string } = await response.json().catch(() => ({}));

      if (!response.ok) {
        setIsError(true);
        setMessage(result.message || "We couldn’t send your inquiry. Please check the details and try again.");
        return;
      }

      setMessage(result.message || "Thank you. Your inquiry has been received.");
      formElement.reset();
    } catch {
      setIsError(true);
      setMessage("We couldn’t connect to the server. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  const services = [...new Set(serviceOptions.filter(Boolean))];

  return (
    <form className="grid gap-5" onSubmit={submit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone (optional)" name="phone" type="tel" />
        <Field label="Company (optional)" name="company" />
      </div>
      <Select label="Service" name="service" values={services} required />
      <Select label="Budget" name="budget" values={[...inquiryBudgetOptions]} required />

      <label className="grid gap-2 text-sm" htmlFor="inquiry-description">
        Project description
        <textarea
          id="inquiry-description"
          name="description"
          required
          rows={5}
          maxLength={4000}
          className="resize-y border border-line bg-transparent px-3 py-3 text-foreground"
          placeholder="What would you like help with?"
        />
      </label>

      <div aria-hidden="true" className="sr-only">
        <label htmlFor="inquiry-website">Leave this field empty</label>
        <input id="inquiry-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" disabled={pending} className="mt-2 w-fit">
        {pending ? "Sending…" : "Send inquiry"}
      </Button>
      {message && (
        <p role={isError ? "alert" : "status"} aria-live={isError ? "assertive" : "polite"} className="text-sm text-muted">
          {message}
        </p>
      )}
      <p className="text-xs leading-5 text-muted">
        We use the information you submit to handle your request. Read our{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
          privacy notice
        </Link>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm" htmlFor={`inquiry-${name}`}>
      {label}
      <input
        id={`inquiry-${name}`}
        name={name}
        required={required}
        type={type}
        autoComplete={name === "name" ? "name" : name === "email" ? "email" : name === "phone" ? "tel" : "organization"}
        className="min-h-11 border border-line bg-transparent px-3 py-3 text-foreground"
      />
    </label>
  );
}

function Select({
  label,
  name,
  values,
  required = false,
}: {
  label: string;
  name: string;
  values: string[];
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm" htmlFor={`inquiry-${name}`}>
      {label}
      <select
        id={`inquiry-${name}`}
        name={name}
        required={required}
        defaultValue=""
        className="min-h-11 border border-line bg-transparent px-3 py-3 text-foreground"
      >
        <option value="" disabled>Choose an option</option>
        {values.map((value) => <option key={value} value={value}>{value}</option>)}
        {name === "service" && <option value="Not sure yet">Not sure yet</option>}
      </select>
    </label>
  );
}
