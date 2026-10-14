import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SearchBrowser } from "@/components/search/search-browser";
import { getFaqs, getPosts, getProjects, getServices } from "@/lib/content";
export const dynamic = "force-dynamic";
export default async function SearchPage() {
  const [projects,posts,services,faqs] = await Promise.all([getProjects(),getPosts(),getServices(),getFaqs()]);
  const items = [...projects.map(item=>({title:item.name,text:item.summary||item.overview||"",href:`/projects/${item.slug}`,type:"Project"})),...posts.map(item=>({title:item.title,text:item.excerpt,href:`/blog/${item.slug}`,type:"Article"})),...services.map(item=>({title:item.title,text:item.text,href:"/services",type:"Service"})),...faqs.map(([title,text])=>({title,text,href:"/services#faq",type:"FAQ"}))];
  return <section className="relative isolate min-h-[65vh] overflow-hidden bg-[#080D18] py-12 text-[#E2E8F0] sm:py-20 lg:py-28"><div aria-hidden="true" className="grid-blueprint pointer-events-none absolute inset-0 -z-10 opacity-70"/><Container className="max-w-5xl"><p className="eyebrow text-[#6792FF]">Find your way</p><div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><h1 className="font-display text-5xl leading-[.95] tracking-[-.04em] sm:text-6xl lg:text-7xl">Search the studio archive.</h1><p className="max-w-lg text-sm leading-7 text-white/55">Search across published projects, articles, services, and frequently asked questions.</p></div><div className="mt-10 border-t border-white/15 pt-8"><SearchBrowser items={items}/></div><div className="mt-8 flex flex-wrap gap-4 text-sm text-white/50"><Link href="/projects" className="hover:text-white">Projects ↗</Link><Link href="/blog" className="hover:text-white">Journal ↗</Link><Link href="/contact" className="hover:text-white">Contact ↗</Link></div></Container></section>;
}
