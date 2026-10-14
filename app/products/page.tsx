import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { getProducts } from "@/lib/content";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Our Products",
  description: "Explore products and digital offerings built by Ayzent Solutions.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <PageHero eyebrow="Our Products" title="Useful digital products, made with care." text="Applications, tools and platforms built to solve real business problems." />
      <section className="py-12 sm:py-20 lg:py-24">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5 sm:mb-10">
            <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Product catalogue</p><p className="mt-2 text-sm text-muted">{products.length} {products.length === 1 ? "product" : "products"}</p></div>
            <Link href="/contact" className="text-sm font-medium text-gold transition hover:text-foreground">Have a product idea? <span aria-hidden="true">↗</span></Link>
          </div>
          {products.length ? (
            <div className="grid gap-5 sm:gap-7 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`} className="group motion-lift min-w-0 overflow-hidden rounded-sm border border-line bg-background focus-visible:outline-offset-4">
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    {product.coverImage ? <Image src={product.coverImage} alt={`${product.name} product preview`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" /> : <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-surface" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-70" />
                    <span className="absolute left-4 top-4 border border-white/30 bg-black/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">{product.category || "Product"}</span>
                    <span aria-hidden="true" className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-black/20 text-lg text-white transition group-hover:translate-x-1 group-hover:bg-white group-hover:text-black">↗</span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h2 className="font-display text-2xl leading-tight sm:text-3xl">{product.name}</h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{product.shortDescription}</p>
                    {product.technologies?.length ? <div className="mt-5 flex flex-wrap gap-2">{product.technologies.slice(0, 3).map((technology) => <span key={technology} className="rounded-full border border-line px-2.5 py-1 text-[10px] text-muted">{technology}</span>)}</div> : null}
                    <p className="mt-6 border-t border-line pt-4 text-sm font-medium transition-colors group-hover:text-gold">Explore product <span aria-hidden="true">→</span></p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid min-h-64 place-items-center border border-dashed border-line bg-surface/40 px-5 py-12 text-center">
              <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">In the works</p><h2 className="mt-3 font-display text-3xl">New products are on the way.</h2><p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted">We are preparing a new collection. In the meantime, tell us what you are looking to build.</p><Link href="/contact" className="mt-6 inline-flex min-h-11 items-center justify-center bg-ink px-5 text-sm text-paper transition hover:bg-gold hover:text-ink dark:bg-paper dark:text-ink">Talk to our team <span aria-hidden="true" className="ml-2">↗</span></Link></div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
