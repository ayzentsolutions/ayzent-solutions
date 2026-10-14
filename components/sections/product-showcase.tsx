"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProductItem = { slug: string; name: string; category?: string; shortDescription?: string; coverImage?: string; description?: string };
export function ProductShowcase({ products }: { products: ProductItem[] }) {
  const [active, setActive] = useState(0);
  const product = products[active];
  if (!product) return null;
  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-[.72fr_1.28fr] lg:gap-8">
      <div className="flex flex-col border-y border-[#27344A]">
        {products.map((item,index)=><button key={item.slug} type="button" onClick={()=>setActive(index)} aria-pressed={active===index} className={`group flex min-h-24 items-center justify-between gap-4 border-b border-[#27344A] px-4 py-5 text-left transition-colors last:border-b-0 sm:px-6 ${active===index ? "bg-[#131D30]" : "hover:bg-[#0D1423]"}`}>
          <span className="flex min-w-0 items-start gap-4"><span className={`mt-1 font-mono text-xs ${active===index ? "text-[#8AA8FF]" : "text-[#64748B]"}`}>0{index+1}</span><span className="min-w-0"><span className="block font-display text-xl sm:text-2xl">{item.name}</span><span className="mt-1 block text-xs text-[#94A3B8]">{item.category || "Digital product"}</span></span></span><span aria-hidden="true" className={`grid h-9 w-9 shrink-0 place-items-center border transition-colors ${active===index ? "border-[#477BFF] bg-[#477BFF] text-white" : "border-[#27344A] text-[#94A3B8]"}`}>↗</span>
        </button>)}
      </div>
      <article className="min-w-0 overflow-hidden border border-[#27344A] bg-[#0D1423]">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#131D30]">
          {product.coverImage ? <Image src={product.coverImage} alt={`${product.name} preview`} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" /> : <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 gap-3 p-5 sm:p-8"><div className="border border-[#27344A] bg-[#080D18] p-4"><div className="h-2 w-2/3 bg-[#477BFF]/70" /><div className="mt-4 h-2 w-1/2 bg-[#27344A]" /><div className="mt-8 grid grid-cols-2 gap-2"><div className="h-20 border border-[#27344A] bg-[#131D30]" /><div className="h-20 border border-[#27344A] bg-[#131D30]" /></div></div><div className="border border-[#27344A] bg-[#477BFF]/10" /></div>}
          <span className="absolute left-4 top-4 border border-[#27344A] bg-[#080D18]/90 px-3 py-1.5 text-[10px] uppercase tracking-[.18em] text-[#C7D5F7]">{product.category || "Product"}</span>
        </div>
        <div className="grid gap-5 p-5 sm:p-7 md:grid-cols-[1fr_auto] md:items-end"><div><p className="eyebrow text-[#8AA8FF]">Selected product</p><h3 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">{product.name}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-[#94A3B8]">{product.shortDescription || product.description || ""}</p></div><Link href={`/products/${product.slug}`} className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-[#8AA8FF] hover:text-white">Explore product <span aria-hidden="true">↗</span></Link></div>
      </article>
    </div>
  );
}
