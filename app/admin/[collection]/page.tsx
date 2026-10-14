import Link from "next/link";
import { notFound } from "next/navigation";

import { ContentManager } from "@/components/admin/content-manager";
import { LogoutButton } from "@/components/admin/logout-button";
import { cmsNavigation, collectionLabels, isCmsCollection } from "@/lib/cms";

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  if (!isCmsCollection(collection)) notFound();

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-line bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
          <Link href="/admin" className="rounded-sm font-display text-lg tracking-tight sm:text-xl">AYZENT <span className="text-gold">/</span> ADMIN</Link>
          <LogoutButton />
        </div>
      </header>

      <div className="mx-auto grid max-w-[90rem] gap-6 px-4 py-6 sm:px-6 sm:py-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10">
        <aside className="min-w-0 lg:sticky lg:top-24 lg:h-fit">
          <nav aria-label="CMS collections" className="space-y-5 lg:space-y-7">
            {cmsNavigation.map((group) => (
              <div key={group.title}>
                <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">{group.title}</p>
                <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
                  {group.items.map((item) => {
                    const active = item === collection;
                    return (
                      <Link key={item} href={`/admin/${item}`} aria-current={active ? "page" : undefined} className={`min-h-10 shrink-0 rounded-md border px-3 py-2.5 text-sm transition-colors focus-visible:outline-offset-2 lg:shrink ${active ? "border-gold/30 bg-surface font-medium text-gold lg:border-l-2 lg:border-l-gold" : "border-transparent text-foreground hover:border-line hover:bg-surface hover:text-gold"}`}>
                        {collectionLabels[item]}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        <section className="min-w-0">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
            <div>
              <Link className="inline-flex min-h-10 items-center text-sm text-muted transition-colors hover:text-gold focus-visible:rounded-sm" href="/admin">← Dashboard</Link>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">Content management</p>
              <h1 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">{collectionLabels[collection]}</h1>
            </div>
            <span className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">CMS collection</span>
          </div>
          <ContentManager collection={collection} label={collectionLabels[collection]} />
        </section>
      </div>
    </main>
  );
}
