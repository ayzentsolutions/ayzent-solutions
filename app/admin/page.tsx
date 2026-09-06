import Link from "next/link";

import {
  Dashboard,
} from "@/components/admin/dashboard";

import {
  LogoutButton,
} from "@/components/admin/logout-button";

import {
  cmsNavigation,
  collectionLabels,
} from "@/lib/cms";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background">

      <header className="border-b border-line">

        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-5 py-5">

          <Link
            href="/admin"
            className="font-display text-xl"
          >
            AYZENT / ADMIN
          </Link>

          <LogoutButton />

        </div>

      </header>

      <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-10 lg:grid-cols-[17rem_1fr]">

        <aside>

          <nav className="space-y-8">

            {cmsNavigation.map(
              (group) => (

                <div
                  key={group.title}
                >

                  <p className="mb-2 px-3 text-xs font-medium uppercase tracking-[.16em] text-muted">

                    {
                      group.title
                    }

                  </p>

                  <div className="space-y-1">

                    {group.items.map(
                      (
                        collection
                      ) => (

                        <Link
                          key={
                            collection
                          }
                          href={`/admin/${collection}`}
                          className="block px-3 py-2 text-sm transition hover:bg-surface hover:text-gold"
                        >

                          {
                            collectionLabels[
                              collection
                            ]
                          }

                        </Link>

                      )
                    )}

                  </div>

                </div>

              )
            )}

          </nav>

        </aside>

        <section>

          <p className="text-xs font-medium uppercase tracking-[.18em] text-gold">
            Overview
          </p>

          <h1 className="mt-3 font-display text-4xl">
            Good to see you.
          </h1>

          <div className="mt-10">

            <Dashboard />

          </div>

        </section>

      </div>

    </main>
  );
}
