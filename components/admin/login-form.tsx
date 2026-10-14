"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setMessage("");

    try {
      const data = Object.fromEntries(new FormData(event.currentTarget));
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof result.message === "string" ? result.message : "Sign-in failed. Please check your credentials and try again.");
      router.replace("/admin");
      router.refresh();
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "Unable to sign in right now. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-5" aria-busy={pending}>
      <label className="grid gap-2 text-sm font-medium">
        Email address
        <input required name="email" type="email" autoComplete="username" inputMode="email" className="min-h-12 border border-line bg-background px-3 py-3 text-foreground outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20" />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Password
        <input required minLength={10} name="password" type="password" autoComplete="current-password" className="min-h-12 border border-line bg-background px-3 py-3 text-foreground outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20" />
      </label>
      {message && <p role="alert" className="border border-red-500/30 bg-red-500/5 px-3 py-3 text-sm text-red-300">{message}</p>}
      <Button disabled={pending} type="submit" className="min-h-12 w-full">{pending ? "Signing in…" : "Sign in"} <span aria-hidden="true">{pending ? "…" : "→"}</span></Button>
      <p className="text-center text-xs leading-5 text-muted">Authorized administrators only. Your session is protected.</p>
    </form>
  );
}
