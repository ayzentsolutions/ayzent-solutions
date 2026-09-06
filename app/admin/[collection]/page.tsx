import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentManager } from "@/components/admin/content-manager";
import { LogoutButton } from "@/components/admin/logout-button";
import { collectionLabels, isCmsCollection } from "@/lib/cms";
export default function CollectionPage({ params }: { params: { collection: string } }) { if (!isCmsCollection(params.collection)) notFound(); return <main className="min-h-screen bg-background"><header className="border-b border-line"><div className="mx-auto flex max-w-[90rem] items-center justify-between px-5 py-5"><Link href="/admin" className="font-display text-xl">AYZENT / ADMIN</Link><LogoutButton /></div></header><div className="mx-auto max-w-[90rem] px-5 py-10"><Link className="text-sm text-muted hover:text-gold" href="/admin">← Dashboard</Link><div className="mt-8"><ContentManager collection={params.collection} label={collectionLabels[params.collection]} /></div></div></main>; }
