import Link from "next/link";

import {
  notFound,
} from "next/navigation";

import {
  ContentManager,
} from "@/components/admin/content-manager";

import {
  LogoutButton,
} from "@/components/admin/logout-button";

import {
  cmsNavigation,
  collectionLabels,
  isCmsCollection,
} from "@/lib/cms";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  if (
    !isCmsCollection(
      collection
    )
  ) {
    notFound();
  }

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

        <aside className="lg:sticky lg:top-6 lg:h-fit">

          <nav className="space-y-8">

            {cmsNavigation.map(
              (group) => (

                <div
                  key={
                    group.title
                  }
                >

                  <p className="mb-2 px-3 text-xs font-medium uppercase tracking-[.16em] text-muted">

                    {group.title}

                  </p>

                  <div className="space-y-1">

                    {group.items.map(
                      (collection) => {

                        const active =
                          collection ===
                          collection;

                        return (

                          <Link
                            key={collection}
                            href={`/admin/${collection}`}
                            className={`block px-3 py-2 text-sm transition ${
                              active
                                ? "border-l-2 border-gold bg-surface text-gold"
                                : "hover:bg-surface hover:text-gold"
                            }`}
                          >

                            {
                              collectionLabels[
                                collection
                              ]
                            }

                          </Link>

                        );
                      }
                    )}

                  </div>

                </div>

              )
            )}

          </nav>

        </aside>

        <section>

          <div className="mb-8">

            <Link
              className="text-sm text-muted transition hover:text-gold"
              href="/admin"
            >
              ← Dashboard
            </Link>

          </div>

          <ContentManager
            collection={
              collection
            }
            label={
              collectionLabels[
                collection
              ]
            }
          />

        </section>

      </div>

    </main>

  );
}
