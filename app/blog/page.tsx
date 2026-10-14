import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { getPosts } from "@/lib/content";
export const dynamic = "force-dynamic";
export default async function BlogPage() {
  const posts = await getPosts();
  const [lead, ...rest] = posts;
  return <><PageHero eyebrow="Journal / 04" title="Notes for the work ahead." text="Explore published writing from Ayzent Solutions." primaryText="Discuss an idea" primaryLink="/contact"/>
    <section className="bg-[#080D18] py-10 text-[#E2E8F0] sm:py-16 lg:py-24"><Container>
      <div className="mb-8 flex items-end justify-between gap-4 border-b border-[#27344A] pb-5"><div><p className="eyebrow text-[#477BFF]">Field notes</p><h2 className="mt-3 font-display text-3xl sm:text-4xl">The journal</h2></div><p className="text-sm text-[#94A3B8]">{posts.length} articles</p></div>
      {lead ? <><Link href={`/blog/${lead.slug}`} className="group grid overflow-hidden border border-[#27344A] bg-[#080D18] text-[#E2E8F0] md:grid-cols-[1.1fr_.9fr]">{(lead.coverImage || lead.image) ? <div className="relative min-h-64 overflow-hidden md:min-h-[28rem]"><Image src={(lead.coverImage || lead.image)!} alt={lead.title} fill sizes="(max-width: 768px) 100vw, 55vw" className="object-cover transition duration-700 group-hover:scale-105"/></div> : <div className="grid-blueprint relative min-h-64 bg-[#102746] md:min-h-[28rem]"><div aria-hidden="true" className="absolute left-1/4 top-1/4 h-40 w-40 border border-[#66A0FF]/30 bg-[#477BFF]/15"/></div>}<div className="flex flex-col justify-between p-6 sm:p-10"><div><p className="eyebrow text-[#6792FF]">{lead.category || "Journal"}{lead.date ? ` / ${lead.date}` : ""}</p><h3 className="mt-5 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">{lead.title}</h3><p className="mt-5 text-sm leading-7 text-white/55">{lead.excerpt}</p></div><span className="mt-8 inline-flex items-center gap-3 text-sm text-[#6792FF]">Read article <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">↗</span></span></div></Link>
      {rest.length > 0 && <div className="mt-8 grid gap-0 border-t border-[#27344A] md:grid-cols-2">{rest.map((post,index)=><Link key={post.slug} href={`/blog/${post.slug}`} className={`group border-b border-[#27344A] py-6 sm:py-8 ${index%2 ? "md:border-l md:pl-8" : "md:pr-8"}`}><p className="eyebrow text-[#477BFF]">{post.category || "Journal"}{post.date ? ` / ${post.date}` : ""}</p><h3 className="mt-4 font-display text-2xl leading-tight transition-colors group-hover:text-[#477BFF] sm:text-3xl">{post.title}</h3><p className="mt-3 text-sm leading-7 text-[#94A3B8]">{post.excerpt}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">Read note ↗</span></Link>)}</div>}</> : <div className="py-14"><h3 className="font-display text-3xl">The journal is being prepared.</h3><p className="mt-3 text-sm text-[#94A3B8]">Published articles will appear here.</p></div>}
    </Container></section></>;
}
