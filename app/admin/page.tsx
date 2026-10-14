import Link from "next/link";

import { Dashboard } from "@/components/admin/dashboard";
import { LogoutButton } from "@/components/admin/logout-button";
import { cmsNavigation, collectionLabels } from "@/lib/cms";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-line bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
          <Link href="/admin" className="rounded-sm font-display text-lg tracking-tight sm:text-xl">
            AYZENT <span className="text-gold">/</span> ADMIN
          </Link>
          <LogoutButton />
        </div>
      </header>

      <div className="mx-auto grid max-w-[90rem] gap-7 px-4 py-6 sm:px-6 sm:py-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10">
        <aside className="min-w-0 lg:sticky lg:top-24 lg:h-fit">
          <nav aria-label="CMS collections" className="space-y-5 lg:space-y-7">
            {cmsNavigation.map((group) => (
              <div key={group.title}>
                <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">{group.title}</p>
                <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
                  {group.items.map((collection) => (
                    <Link
                      key={collection}
                      href={`/admin/${collection}`}
                      className="min-h-10 shrink-0 rounded-md border border-transparent px-3 py-2.5 text-sm text-foreground transition-colors hover:border-line hover:bg-surface hover:text-gold focus-visible:outline-offset-2 lg:shrink"
                    >
                      {collectionLabels[collection]}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        <section className="min-w-0">
          <div className="border-b border-line pb-7 sm:pb-9">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Content workspace
            </div>
            <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl">Good to see you.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              Manage the public-facing Ayzent Solutions website from one workspace. Choose a collection to edit content, images, and publishing details.
            </p>
          </div>
          <div className="mt-7 sm:mt-10">
            <Dashboard />
          </div>
        </section>
      </div>
    </main>
  );
}
