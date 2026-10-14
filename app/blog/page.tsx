import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { getPosts } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHero eyebrow="Journal" title="Useful thinking for better digital decisions." text="Notes on strategy, design, technology, and the practical work of making a business more useful online." />
      <section className="py-12 sm:py-20 lg:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
            <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Ideas in progress</p><p className="mt-2 text-sm text-muted">{posts.length} {posts.length === 1 ? "article" : "articles"}</p></div>
            <Link href="/contact" className="text-sm font-medium text-gold transition hover:text-foreground">Discuss an idea <span aria-hidden="true">↗</span></Link>
          </div>
          {posts.length ? (
            <div className="divide-y divide-line border-b border-line">
              {posts.map((post, index) => (
                <Link className="group grid gap-4 py-7 transition-colors hover:bg-surface/50 sm:gap-6 sm:py-9 md:grid-cols-[3rem_minmax(0,1fr)_auto] md:items-start" href={`/blog/${post.slug}`} key={post.slug}>
                  <span className="pt-1 text-xs font-medium tabular-nums text-gold">{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted"><span className="text-gold">{post.category || "Journal"}</span>{post.date ? <><span aria-hidden="true">·</span><time>{post.date}</time></> : null}</div>
                    <h2 className="mt-3 break-words font-display text-2xl leading-tight transition-colors group-hover:text-gold sm:text-3xl lg:text-4xl">{post.title}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">{post.excerpt}</p>
                  </div>
                  <span aria-hidden="true" className="mt-1 hidden h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-lg transition group-hover:translate-x-1 group-hover:border-gold group-hover:text-gold md:grid">↗</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-16 sm:py-24"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Coming soon</p><h2 className="mt-3 font-display text-3xl sm:text-4xl">A little more thinking, soon.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-muted">Our journal is being prepared. Check back for ideas on strategy, design, and technology.</p></div>
          )}
        </Container>
      </section>
    </>
  );
}
