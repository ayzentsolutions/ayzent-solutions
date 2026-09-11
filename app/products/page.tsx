import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { getProducts } from "@/lib/content";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Our Products", description: "Explore products and digital offerings built by Ayzent Solutions." };
export default async function ProductsPage() {
  const products = await getProducts();
  return <><PageHero eyebrow="Our Products" title="Useful digital products, made with care." text="Applications, tools and platforms built to solve real business problems." />
    <section className="py-14 sm:py-20"><Container><div className="grid gap-8 md:grid-cols-2">{products.map((product) => <Link key={product.slug} href={`/products/${product.slug}`} className="group overflow-hidden border border-line bg-background transition hover:border-gold"><div className="relative aspect-[16/9] bg-muted">{product.coverImage && <Image src={product.coverImage} alt="" fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 768px) 50vw, 100vw" />}</div><div className="p-6"><p className="text-xs uppercase tracking-[.18em] text-gold">{product.category || "Product"}</p><h2 className="mt-3 font-display text-3xl">{product.name}</h2><p className="mt-3 text-muted">{product.shortDescription}</p></div></Link>)}</div>{!products.length && <p className="text-muted">New products are coming soon.</p>}</Container></section></>;
}
