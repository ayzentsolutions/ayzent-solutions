"use client";

import { useCallback, useEffect, useState } from "react";

type DashboardData = {
  counts: Record<string, number>;
  recentInquiries: Array<{ _id: string; name?: string; email?: string; service?: string; status?: string; createdAt?: string }>;
  activities: Array<{ _id: string; action?: string; detail?: string; userEmail?: string; createdAt?: string }>;
};

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/dashboard", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to load dashboard.");
      if (!result || typeof result !== "object" || !result.counts) throw new Error("The dashboard returned an unexpected response.");
      setData(result as DashboardData);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  if (loading && !data) {
    return (
      <div aria-live="polite" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[0, 1, 2, 3, 4].map((item) => <div key={item} className="animate-pulse border border-line p-5" aria-hidden="true"><div className="h-3 w-24 rounded bg-surface" /><div className="mt-5 h-9 w-16 rounded bg-surface" /><div className="mt-4 h-2 w-full rounded bg-surface" /></div>)}
        <p className="sr-only">Loading dashboard data…</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <section role="alert" className="border border-line bg-surface p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Dashboard unavailable</p>
        <h2 className="mt-3 font-display text-2xl">We couldn&apos;t load your workspace.</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{error}</p>
        <button type="button" onClick={() => void load()} className="mt-5 inline-flex min-h-11 items-center justify-center bg-ink px-5 text-sm text-paper transition hover:bg-gold hover:text-ink dark:bg-paper dark:text-ink">Try again</button>
      </section>
    );
  }

  const counts = data?.counts ?? {};
  const cards = [
    { label: "New inquiries", key: "newInquiries", note: "Needs a response" },
    { label: "Projects", key: "projects", note: "Portfolio entries" },
    { label: "Articles", key: "posts", note: "Journal content" },
    { label: "Services", key: "services", note: "Capabilities listed" },
    { label: "Team", key: "team", note: "People profiles" },
  ];

  return (
    <div className="grid gap-8 sm:gap-10">
      {error && <p role="status" className="border border-line px-4 py-3 text-sm text-muted">Some data may be out of date. {error} <button type="button" onClick={() => void load()} className="ml-2 font-medium text-gold underline underline-offset-4">Refresh</button></p>}
      <section aria-label="Content overview" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card, index) => (
          <article key={card.key} className="motion-lift min-w-0 border border-line bg-background p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-muted">{card.label}</p>
              <span className="text-[10px] font-semibold tracking-[0.12em] text-gold">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <p className="mt-5 font-display text-4xl tracking-tight tabular-nums">{counts[card.key] ?? 0}</p>
            <p className="mt-2 text-xs text-muted">{card.note}</p>
            <div aria-hidden="true" className="mt-5 h-0.5 overflow-hidden bg-surface"><div className="h-full w-1/3 bg-gold" /></div>
          </article>
        ))}
      </section>

      <div className="grid min-w-0 gap-8 xl:grid-cols-2 xl:gap-10">
        <section className="min-w-0">
          <div className="flex items-end justify-between gap-3 border-b border-line pb-4">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">Inbox</p><h2 className="mt-2 font-display text-2xl sm:text-3xl">Recent inquiries</h2></div>
            <LinkToCollection href="/admin/inquiries" label="View inbox" />
          </div>
          <div className="divide-y divide-line">
            {data?.recentInquiries?.length ? data.recentInquiries.map((item) => (
              <article key={item._id} className="flex min-w-0 flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0"><p className="break-words text-sm font-medium">{item.name || "Unnamed inquiry"}</p><p className="mt-1 break-all text-xs text-muted">{item.email || "No email provided"}</p><p className="mt-2 text-sm text-muted">{item.service || "General inquiry"}</p></div>
                <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end"><span className="inline-flex rounded-full border border-line px-2.5 py-1 text-[11px] text-muted">{item.status || "New"}</span><span className="text-[10px] text-muted">{formatDate(item.createdAt)}</span></div>
              </article>
            )) : <p className="py-6 text-sm text-muted">No inquiries yet. New messages will appear here.</p>}
          </div>
        </section>

        <section className="min-w-0">
          <div className="flex items-end justify-between gap-3 border-b border-line pb-4">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">Audit trail</p><h2 className="mt-2 font-display text-2xl sm:text-3xl">Recent activity</h2></div>
            <span className="text-xs text-muted">Latest 8</span>
          </div>
          <div className="divide-y divide-line">
            {data?.activities?.length ? data.activities.map((item) => (
              <article key={item._id} className="flex gap-3 py-4">
                <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                <div className="min-w-0 flex-1"><p className="break-words text-sm">{item.action || "Updated"} <span className="font-medium">{item.detail || "content"}</span></p><div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted"><span className="break-all">{item.userEmail || "Admin"}</span>{formatDate(item.createdAt) && <span>{formatDate(item.createdAt)}</span>}</div></div>
              </article>
            )) : <p className="py-6 text-sm text-muted">Activity will appear here as the CMS is used.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}

function LinkToCollection({ href, label }: { href: string; label: string }) {
  return <a href={href} className="shrink-0 text-xs font-medium text-gold transition hover:text-foreground">{label} <span aria-hidden="true">→</span></a>;
}
