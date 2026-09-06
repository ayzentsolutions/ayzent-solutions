import { getDb } from "@/lib/mongodb";
import { faqs, posts, projects, services, type Project } from "@/lib/site-data";

type Service = { number?: string; title: string; text: string; displayOrder?: number };
export type Post = { slug: string; title: string; category: string; date: string; excerpt: string; content?: string; tags?: string[]; seoTitle?: string; seoDescription?: string };
export type Testimonial = { clientName: string; roleCompany?: string; text: string; active?: boolean };
export type ClientLogo = { name: string; logo?: string; link?: string; active?: boolean };
export type Announcement = { _id?: string; title: string; content: string; image?: string; ctaText?: string; ctaLink?: string; active?: boolean };
export type SocialLink = { label: string; url: string; active?: boolean };
async function read<T>(collection: string, fallback: T[]): Promise<T[]> { try { const documents = await (await getDb()).collection(collection).find({ published: { $ne: false } }).sort({ displayOrder: 1, createdAt: -1 }).toArray(); return documents.length ? documents as unknown as T[] : fallback; } catch { return fallback; } }
export function getServices() { return read<Service>("services", services); }
export function getProjects() { return read<Project>("projects", projects); }
export function getPosts() { return read<Post>("posts", posts); }
export async function getProject(slug: string) { return (await getProjects()).find((project) => project.slug === slug); }
export async function getPost(slug: string) { return (await getPosts()).find((post) => post.slug === slug); }
export async function getFaqs() { const items = await read<Record<string, unknown>>("faqs", []); return items.length ? items.filter((item) => item.active !== false).map((item) => [String(item.question || ""), String(item.answer || "")] as [string, string]).filter(([question, answer]) => question && answer) : faqs; }
export async function getTestimonials() { return (await read<Testimonial>("testimonials", [])).filter((item) => item.active !== false); }
export async function getClientLogos() { return (await read<ClientLogo>("clientLogos", [])).filter((item) => item.active !== false); }
export async function getActiveAnnouncement() { return (await read<Announcement>("announcements", [])).find((item) => item.active); }
export async function getSocialLinks() { return (await read<SocialLink>("socialLinks", [])).filter((item) => item.active !== false); }
