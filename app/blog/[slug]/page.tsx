import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { getPost } from "@/lib/content";
import { Comments } from "@/components/blog/comments";
import { Markdown } from "@/components/content/markdown";
import { ShareButtons } from "@/components/content/share-buttons";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const post = await getPost((await params).slug); return { title: post?.seoTitle || post?.title, description: post?.seoDescription || post?.excerpt }; }
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) { const post = await getPost((await params).slug); if (!post) notFound(); const content = post.content || "A well-made website begins with an honest understanding of what it is there to change. Not every business needs more pages, more features, or more noise. It needs a clearer path between the people it can help and the value it offers.\n\nBefore a design direction or technical choice, we look for the underlying job. The answer makes the work more focused—and more valuable to the people who rely on it."; return <article><header className="border-b border-line py-16 sm:py-24"><Container><p className="text-xs font-medium uppercase tracking-[.18em] text-gold">{post.category} · {post.date}</p><h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.05] sm:text-7xl">{post.title}</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{post.excerpt}</p></Container></header><Container className="max-w-3xl py-16 sm:py-24"><Markdown content={content} /><ShareButtons title={post.title} /><Comments slug={post.slug} /></Container></article> }
