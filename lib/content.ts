import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

import {
  faqs,
  posts,
  projects,
  services,
  type Project,
} from "@/lib/site-data";

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type Service = {
  _id?: string;

  title: string;

  text: string;

  slug?: string;

  displayOrder?: number;

  published?: boolean;
};

export type PageSection = {
  _id?: string;
  pageKey: "about" | "services" | "products" | "projects" | "blog" | "careers" | "contact" | "search";
  sectionKey: "hero" | "story" | "mission" | "values" | "team" | "quote" | "cta" | "service-list" | "project-list" | "product-list" | "article-list" | "job-list" | "contact-form" | "search-results";
  title?: string;
  eyebrow?: string;
  description?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  layoutVariant?: "editorial" | "compact" | "full-bleed";
  backgroundVariant?: "midnight" | "navy" | "elevated";
  displayOrder: number;
  active?: boolean;
  status: "draft" | "published" | "archived";
};
export type PageContent = {
  _id?: string;
  pageKey: "about" | "services" | "products" | "projects" | "blog" | "careers" | "contact" | "search";
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  layoutVariant?: "editorial" | "compact" | "image-led";
  backgroundVariant?: "midnight" | "navy" | "elevated";
  seoTitle?: string;
  seoDescription?: string;
  socialImage?: string;
  status: "draft" | "published" | "archived";
};
export type NavigationItem = {
  _id?: string;
  label: string;
  href: string;
  location: "header" | "footer" | "both";
  displayOrder: number;
  active?: boolean;
  status: "draft" | "published" | "archived";
};

export type HomeSection = {
  _id?: string;
  sectionKey: "hero" | "intro" | "services" | "projects" | "products" | "process" | "studio" | "testimonials" | "faqs" | "cta";
  title?: string;
  eyebrow?: string;
  description?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  layoutVariant?: "editorial" | "compact" | "full-bleed";
  backgroundVariant?: "midnight" | "navy" | "elevated";
  displayOrder: number;
  active?: boolean;
  status: "draft" | "published" | "archived";
};

export type ProcessStep = {
  _id?: string;
  step?: string;
  title: string;
  description: string;
  displayOrder?: number;
  active?: boolean;
  status?: "draft" | "published" | "archived";
};

export type Product = {
  _id?: string; name: string; slug: string; shortDescription: string; content: string;
  category?: string; coverImage?: string; gallery?: string[]; technologies?: string[]; features?: string[];
  url?: string; ctaText?: string; ctaLink?: string; displayOrder?: number;
  status: "draft" | "published" | "archived"; seoTitle?: string; seoDescription?: string; updatedAt?: Date;
};

export type Post = {
  _id?: string;

  slug: string;

  title: string;

  category: string;

  date?: string;

  excerpt: string;

  content?: string;

  tags?: string[];

  coverImage?: string;

  image?: string;

  seoTitle?: string;

  seoDescription?: string;

  published?: boolean;

  displayOrder?: number;
};

export type Category = {
  _id?: string;

  name: string;

  slug: string;

  displayOrder?: number;

  published?: boolean;
};

export type Tag = {
  _id?: string;

  name: string;

  slug: string;

  displayOrder?: number;

  published?: boolean;
};

export type TeamMember = {
  _id?: string;

  name: string;

  role: string;

  shortBio?: string;

  image?: string;

  socialLinks?: string[];

  displayOrder?: number;

  published?: boolean;
};

export type Testimonial = {
  _id?: string;

  clientName: string;

  roleCompany?: string;

  company?: string;

  role?: string;

  text: string;

  image?: string;

  active?: boolean;

  published?: boolean;

  displayOrder?: number;
};

export type ClientLogo = {
  _id?: string;

  name: string;

  logo?: string;

  image?: string;

  link?: string;

  url?: string;

  active?: boolean;

  published?: boolean;

  displayOrder?: number;
};

export type Job = {
  _id?: string;

  title: string;

  description: string;

  requirements?: string[];

  location?: string;

  type?: string;

  applicationInstructions?: string;

  status: "open" | "closed";

  displayOrder?: number;

  published?: boolean;
};

export type Announcement = {
  _id?: string;

  title: string;

  content: string;

  image?: string;

  ctaText?: string;

  ctaLink?: string;

  active?: boolean;

  published?: boolean;

  displayOrder?: number;
};

export type SocialLink = {
  _id?: string;

  label: string;

  url: string;

  active?: boolean;

  published?: boolean;

  displayOrder?: number;
};

/*
|--------------------------------------------------------------------------
| Hero Slides
|--------------------------------------------------------------------------
*/

export type HeroSlide = {
  _id?: string;

  eyebrow?: string;

  /*
  |--------------------------------------------------------------------------
  | Optional intentionally
  |
  | CMS entries may be incomplete.
  | The public component handles missing values safely.
  |--------------------------------------------------------------------------
  */

  title?: string;

  highlight?: string;

  text?: string;

  /*
  |--------------------------------------------------------------------------
  | Optional intentionally
  |
  | Some old Hero entries may not have an image.
  |--------------------------------------------------------------------------
  */

  image?: string;

  overlayStrength?:
    | "light"
    | "medium"
    | "dark";

  primaryText?: string;

  primaryLink?: string;

  secondaryText?: string;

  secondaryLink?: string;

  active?: boolean;

  published?: boolean;

  displayOrder?: number;
};

/*
|--------------------------------------------------------------------------
| Site Settings
|--------------------------------------------------------------------------
*/

export type SiteSettings = {
  _id?: string;

  /*
  |--------------------------------------------------------------------------
  | Brand & Identity
  |--------------------------------------------------------------------------
  */

  companyName?: string;

  companyLogo?: string;

  socialImage?: string;

  seoTitle?: string;

  seoDescription?: string;

  /*
  |--------------------------------------------------------------------------
  | Contact Information
  |--------------------------------------------------------------------------
  */

  email?: string;

  phone?: string;

  whatsapp?: string;

  location?: string;

  /*
  |--------------------------------------------------------------------------
  | Header
  |--------------------------------------------------------------------------
  */

  headerButtonText?: string;

  headerButtonLink?: string;

  /*
  |--------------------------------------------------------------------------
  | Homepage Hero
  |--------------------------------------------------------------------------
  |
  | Kept for backward compatibility.
  |
  | The new Hero system uses HeroSlide entries.
  |
  | First active HeroSlide:
  | → Hero content
  |
  | All active HeroSlides:
  | → Background carousel
  |--------------------------------------------------------------------------
  */

  heroEyebrow?: string;

  heroTitle?: string;

  heroHighlight?: string;

  heroText?: string;

  heroPrimaryText?: string;

  heroPrimaryLink?: string;

  heroSecondaryText?: string;

  heroSecondaryLink?: string;

  /*
  |--------------------------------------------------------------------------
  | Homepage CTA
  |--------------------------------------------------------------------------
  */

  homeCtaEyebrow?: string;

  homeCtaTitle?: string;

  homeCtaButtonText?: string;

  homeCtaButtonLink?: string;

  /*
  |--------------------------------------------------------------------------
  | Footer
  |--------------------------------------------------------------------------
  */

  footerDescription?: string;

  /*
  |--------------------------------------------------------------------------
  | Contact Page
  |--------------------------------------------------------------------------
  */

  contactEyebrow?: string;

  contactTitle?: string;

  contactText?: string;
};

/*
|--------------------------------------------------------------------------
| About Page Content
|--------------------------------------------------------------------------
*/

export type AboutContent = {
  _id?: string;

  /*
  |--------------------------------------------------------------------------
  | Hero
  |--------------------------------------------------------------------------
  */

  heroEyebrow?: string;

  heroTitle?: string;

  heroText?: string;

  /*
  |--------------------------------------------------------------------------
  | Story
  |--------------------------------------------------------------------------
  */

  storyEyebrow?: string;

  storyParagraphOne?: string;

  storyParagraphTwo?: string;

  /*
  |--------------------------------------------------------------------------
  | Mission
  |--------------------------------------------------------------------------
  */

  missionEyebrow?: string;

  mission?: string;

  /*
  |--------------------------------------------------------------------------
  | Vision
  |--------------------------------------------------------------------------
  */

  visionEyebrow?: string;

  vision?: string;

  /*
  |--------------------------------------------------------------------------
  | Values
  |--------------------------------------------------------------------------
  */

  valuesEyebrow?: string;

  values?: string[];

  /*
  |--------------------------------------------------------------------------
  | Team
  |--------------------------------------------------------------------------
  */

  teamEyebrow?: string;

  teamTitle?: string;

  teamText?: string;

  /*
  |--------------------------------------------------------------------------
  | Quote
  |--------------------------------------------------------------------------
  */

  quote?: string;

  quoteAuthor?: string;

  /*
  |--------------------------------------------------------------------------
  | CTA
  |--------------------------------------------------------------------------
  */

  ctaTitle?: string;

  ctaText?: string;

  ctaButtonText?: string;

  ctaButtonLink?: string;
};

/*
|--------------------------------------------------------------------------
| Generic Database Reader
|--------------------------------------------------------------------------
|
| Used for collections containing multiple entries.
|
| Public-side content automatically excludes:
|
| published === false
|
|--------------------------------------------------------------------------
*/

type CmsPreviewRecord = {
  token: string;
  collection: string;
  id?: string;
  data: Record<string, unknown>;
  expiresAt: Date;
};

async function getCmsPreviewToken() {
  try {
    return (await cookies()).get("ayzent-cms-preview")?.value || null;
  } catch {
    return null;
  }
}

export async function getCmsPreviewSession(): Promise<{ collection: string } | null> {
  const token = await getCmsPreviewToken();
  if (!token) return null;
  try {
    const record = await (await getDb()).collection("cmsPreviews").findOne(
      { token, expiresAt: { $gt: new Date() } },
      { projection: { collection: 1 } }
    );
    return record && typeof record.collection === "string"
      ? { collection: record.collection }
      : null;
  } catch {
    return null;
  }
}

async function getCmsPreviewSnapshot(collection: string): Promise<CmsPreviewRecord | null> {
  const token = await getCmsPreviewToken();
  if (!token) return null;
  try {
    const record = await (await getDb()).collection("cmsPreviews").findOne({
      token,
      collection,
      expiresAt: { $gt: new Date() },
    });
    if (!record || !record.data || typeof record.data !== "object") return null;
    return record as unknown as CmsPreviewRecord;
  } catch {
    return null;
  }
}

function makePreviewVisible(collection: string, data: Record<string, unknown>) {
  const visible = { ...data };
  if ("active" in visible) visible.active = true;
  if ("published" in visible) visible.published = true;
  if (visible.status === "draft" || visible.status === "archived") visible.status = "published";
  if (collection === "jobs" && visible.status === "closed") visible.status = "open";
  return visible;
}

function previewMatches(
  collection: string,
  item: Record<string, unknown>,
  preview: CmsPreviewRecord
) {
  if (preview.id && String(item._id) === preview.id) return true;
  const data = preview.data;
  if (collection === "pageContent") return Boolean(data.pageKey) && item.pageKey === data.pageKey;
  if (collection === "pageSections") return Boolean(data.pageKey && data.sectionKey) && item.pageKey === data.pageKey && item.sectionKey === data.sectionKey;
  if (collection === "homeSections") return Boolean(data.sectionKey) && item.sectionKey === data.sectionKey;
  if (["projects", "products", "posts", "services", "jobs"].includes(collection)) return Boolean(data.slug) && item.slug === data.slug;
  return false;
}

/**
 * Public pages read only published content. The preview cookie grants access
 * to one short-lived, authenticated snapshot without publishing or overwriting
 * the live record.
 */
async function read<T>(collection: string, fallback: T[]): Promise<T[]> {
  try {
    const db = await getDb();
    const preview = await getCmsPreviewSnapshot(collection);
    const filter = {
      $or: [
        { status: "published" },
        { status: { $exists: false }, published: { $ne: false } },
      ],
    };
    const [total, documents] = await Promise.all([
      db.collection(collection).countDocuments(),
      db.collection(collection).find(filter).sort({ displayOrder: 1, order: 1, createdAt: -1 }).toArray(),
    ]);
    const rows = documents as unknown as Record<string, unknown>[];

    if (preview) {
      const index = rows.findIndex((item) => previewMatches(collection, item, preview));
      const current = index >= 0 ? rows[index] : {};
      const merged = { ...current, ...makePreviewVisible(collection, preview.data), ...(preview.id ? { _id: current._id || preview.id } : {}) };
      if (index >= 0) rows[index] = merged;
      else rows.push(merged);
      rows.sort((a, b) => Number(a.displayOrder ?? a.order ?? 999) - Number(b.displayOrder ?? b.order ?? 999));
      return rows as unknown as T[];
    }

    if (rows.length) return rows as unknown as T[];
    // Static seed content remains a fallback only before the CMS collection
    // has ever been populated. Drafting/archiving every record must not
    // unexpectedly resurrect old hardcoded content.
    return total === 0 ? fallback : [];
  } catch (error) {
    console.error(`CMS read failed for ${collection}`, error);
    return fallback;
  }
}

/*
|--------------------------------------------------------------------------
| Standard Content
|--------------------------------------------------------------------------
*/

export async function getServices(): Promise<Service[]> {
  const items = await read<Record<string, unknown>>("services", services as unknown as Record<string, unknown>[]);
  return items.filter((item) => item.active !== false && item.published !== false).map((item) => ({
    ...item,
    title: String(item.title || item.name || "Service"),
    text: String(item.text || item.shortDescription || item.description || ""),
    slug: typeof item.slug === "string" ? item.slug : undefined,
    displayOrder: Number(item.displayOrder ?? item.order ?? 999),
    published: item.published !== false,
  })) as unknown as Service[];
}

function normalizeProject(item: Record<string, unknown>): Project {
  const name = String(item.name || item.title || "Project");
  const description = String(item.summary || item.shortDescription || item.description || item.overview || "");
  const stringList = (value: unknown) => Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : [];
  return {
    slug: String(item.slug || "project"),
    name,
    category: String(item.category || "Project"),
    summary: description,
    client: typeof item.client === "string" ? item.client : undefined,
    technologies: stringList(item.technologies),
    accent: "bg-[#477BFF]",
    challenge: String(item.challenge || item.description || description),
    solution: String(item.solution || item.approach || item.description || description),
    features: stringList(item.features),
    overview: String(item.overview || item.description || description),
    featured: item.featured === true || item.active === true,
    coverImage: typeof item.coverImage === "string" ? item.coverImage : typeof item.image === "string" ? item.image : undefined,
    seoTitle: typeof item.seoTitle === "string" ? item.seoTitle : undefined,
    seoDescription: typeof item.seoDescription === "string" ? item.seoDescription : undefined,
    displayOrder: Number(item.displayOrder ?? item.order ?? 999),
  };
}

export async function getProjects(): Promise<Project[]> {
  const items = await read<Record<string, unknown>>("projects", projects as unknown as Record<string, unknown>[]);
  return items.filter((item) => item.active !== false && item.published !== false).map(normalizeProject).sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
}

export async function getPageSections(pageKey: PageSection["pageKey"]): Promise<PageSection[]> {
  const sections = (await read<PageSection>("pageSections", [])).filter((section) => section.pageKey === pageKey).sort((a, b) => a.displayOrder - b.displayOrder);
  const seen = new Set<string>();
  return sections.filter((section) => { if (seen.has(section.sectionKey)) return false; seen.add(section.sectionKey); return true; });
}
export async function getPageContent(pageKey: PageContent["pageKey"]): Promise<PageContent | undefined> {
  const pages = await read<PageContent>("pageContent", []);
  return pages.find((page) => page.pageKey === pageKey);
}

export async function getNavigation(): Promise<NavigationItem[]> {
  const items = await read<NavigationItem>("navigation", []);
  return items.filter((item) => item.active !== false).sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getHomeSections(): Promise<HomeSection[]> {
  const sections = (await read<HomeSection>("homeSections", [])).sort((a, b) => a.displayOrder - b.displayOrder);
  const seen = new Set<string>();
  return sections.filter((section) => { if (seen.has(section.sectionKey)) return false; seen.add(section.sectionKey); return true; });
}

export async function getProcess(): Promise<ProcessStep[]> {
  const steps = await read<ProcessStep>("process", []);
  return steps.filter((step) => step.active !== false).sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
}

export function getProducts() { return read<Product>("products", []); }
export async function getProduct(slug: string) { return getPublishedBySlug<Product>("products", slug); }

export function getPosts() {
  return read<Post>(
    "posts",
    posts
  );
}

/*
|--------------------------------------------------------------------------
| Individual Project
|--------------------------------------------------------------------------
*/

export async function getProject(slug: string): Promise<Project | undefined> {
  const item = await getPublishedBySlug<Record<string, unknown>>("projects", slug);
  if (item) return normalizeProject(item);
  if (await hasCmsRecords("projects")) return undefined;
  const fallback = projects.find((project) => project.slug === slug);
  return fallback ? normalizeProject(fallback as unknown as Record<string, unknown>) : undefined;
}

/*
|--------------------------------------------------------------------------
| Individual Post
|--------------------------------------------------------------------------
*/

export async function getPost(slug: string): Promise<Post | undefined> {
  const item = await getPublishedBySlug<Post>("posts", slug);
  if (item) return item;
  if (await hasCmsRecords("posts")) return undefined;
  return posts.find((post) => post.slug === slug);
}

async function getPublishedBySlug<T>(collection: string, slug: string): Promise<T | undefined> {
  try {
    const db = await getDb();
    const preview = await getCmsPreviewSnapshot(collection);
    if (preview) {
      let existing: Record<string, unknown> | null = null;
      if (preview.id && ObjectId.isValid(preview.id)) {
        existing = await db.collection(collection).findOne({ _id: new ObjectId(preview.id) }) as Record<string, unknown> | null;
      } else if (typeof preview.data.slug === "string") {
        existing = await db.collection(collection).findOne({ slug: preview.data.slug }) as Record<string, unknown> | null;
      }
      const merged = { ...(existing || {}), ...makePreviewVisible(collection, preview.data), ...(existing?._id ? { _id: existing._id } : {}) };
      if (merged.slug === slug) return merged as T;
    }
    return (await db.collection(collection).findOne({
      slug,
      $or: [
        { status: "published" },
        { status: { $exists: false }, published: { $ne: false } },
      ],
    })) as T | undefined;
  } catch (error) {
    console.error(`CMS item read failed for ${collection}`, error);
    return undefined;
  }
}

async function hasCmsRecords(collection: string) {
  try {
    return await (await getDb()).collection(collection).countDocuments() > 0;
  } catch {
    return false;
  }
}

/*
|--------------------------------------------------------------------------
| Categories
|--------------------------------------------------------------------------
*/

export function getCategories() {
  return read<Category>(
    "categories",
    []
  );
}

/*
|--------------------------------------------------------------------------
| Tags
|--------------------------------------------------------------------------
*/

export function getTags() {
  return read<Tag>(
    "tags",
    []
  );
}

/*
|--------------------------------------------------------------------------
| Team
|--------------------------------------------------------------------------
*/

export async function getTeam(): Promise<TeamMember[]> {
  const items = await read<Record<string, unknown>>("team", []);
  return items.filter((item) => item.active !== false && item.published !== false).map((item) => ({
    _id: typeof item._id === "string" ? item._id : undefined,
    name: String(item.name || item.title || "Team member"),
    role: String(item.role || item.position || ""),
    shortBio: typeof item.shortBio === "string" ? item.shortBio : typeof item.bio === "string" ? item.bio : undefined,
    image: typeof item.image === "string" ? item.image : undefined,
    socialLinks: Array.isArray(item.socialLinks) ? item.socialLinks.filter((value): value is string => typeof value === "string") : [item.linkedin, item.instagram].filter((value): value is string => typeof value === "string"),
    displayOrder: Number(item.displayOrder ?? item.order ?? 999),
    published: item.published !== false,
  })).sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
}

/*
|--------------------------------------------------------------------------
| FAQ
|--------------------------------------------------------------------------
*/

export async function getFaqs() {
  const items =
    await read<
      Record<string, unknown>
    >(
      "faqs",
      []
    );

  /*
  |--------------------------------------------------------------------------
  | Use existing static FAQs when CMS has no entries.
  |--------------------------------------------------------------------------
  */

  if (!items.length) {
    return faqs;
  }

  return items
    .filter(
      (item) =>
        item.active !== false
    )
    .map(
      (item) =>
        [
          String(
            item.question || ""
          ),

          String(
            item.answer || ""
          ),
        ] as [string, string]
    )
    .filter(
      ([question, answer]) =>
        Boolean(question) &&
        Boolean(answer)
    );
}

/*
|--------------------------------------------------------------------------
| Testimonials
|--------------------------------------------------------------------------
*/

export async function getTestimonials(): Promise<Testimonial[]> {
  const items = await read<Record<string, unknown>>("testimonials", []);
  return items.filter((item) => item.active !== false && item.published !== false).map((item) => ({
    _id: typeof item._id === "string" ? item._id : undefined,
    clientName: String(item.clientName || item.name || "Client"),
    roleCompany: String(item.roleCompany || [item.clientRole, item.company].filter((value) => typeof value === "string" && value).join(" · ") || ""),
    company: typeof item.company === "string" ? item.company : undefined,
    role: typeof item.role === "string" ? item.role : typeof item.clientRole === "string" ? item.clientRole : undefined,
    text: String(item.text || item.quote || ""),
    image: typeof item.image === "string" ? item.image : undefined,
    active: item.active !== false,
    published: item.published !== false,
    displayOrder: Number(item.displayOrder ?? item.order ?? 999),
  })).filter((item) => Boolean(item.text)).sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
}

/*
|--------------------------------------------------------------------------
| Client Logos
|--------------------------------------------------------------------------
*/

export async function getClientLogos() {
  return (
    await read<ClientLogo>(
      "clientLogos",
      []
    )
  )
    .filter(
      (item) =>
        item.active !== false
    )
    .map(
      (item) => ({
        ...item,

        /*
        |--------------------------------------------------------------------------
        | Support both old and new CMS field names.
        |--------------------------------------------------------------------------
        */

        logo:
          item.logo ||
          item.image,

        link:
          item.link ||
          item.url,
      })
    )
    .sort(
      (a, b) =>
        (a.displayOrder ?? 999) -
        (b.displayOrder ?? 999)
    );
}

/*
|--------------------------------------------------------------------------
| Jobs
|--------------------------------------------------------------------------
*/

export async function getJobs(): Promise<Job[]> {
  try {
    const db = await getDb();
    const preview = await getCmsPreviewSnapshot("jobs");
    const documents = await db.collection("jobs").find({ status: "open" }).sort({ displayOrder: 1, order: 1, createdAt: -1 }).toArray();
    const rows = documents as unknown as Record<string, unknown>[];
    if (preview) {
      const index = rows.findIndex((item) => previewMatches("jobs", item, preview));
      const current = index >= 0 ? rows[index] : {};
      const merged = { ...current, ...makePreviewVisible("jobs", preview.data), ...(preview.id ? { _id: current._id || preview.id } : {}) };
      if (index >= 0) rows[index] = merged;
      else rows.push(merged);
    }
    return rows.filter((job) => job.status === "open" && job.published !== false)
      .sort((a, b) => Number(a.displayOrder ?? a.order ?? 999) - Number(b.displayOrder ?? b.order ?? 999)) as unknown as Job[];
  } catch (error) {
    console.error("CMS read failed for jobs", error);
    return [];
  }
}

/*
|--------------------------------------------------------------------------
| Announcements
|--------------------------------------------------------------------------
*/

export async function getAnnouncements(): Promise<Announcement[]> {
  const items = await read<Record<string, unknown>>("announcements", []);
  return items
    .filter((item) => item.active !== false && item.published !== false)
    .map((item) => ({
      ...item,
      title: String(item.title || ""),
      content: String(item.content || item.description || ""),
      ctaText: String(item.ctaText || item.linkText || ""),
      ctaLink: String(item.ctaLink || item.link || ""),
      image: typeof item.image === "string" ? item.image : undefined,
      active: item.active !== false,
      published: item.published !== false,
      displayOrder: Number(item.displayOrder ?? item.order ?? 999),
    })) as unknown as Announcement[];
}

/*
|--------------------------------------------------------------------------
| Active Announcement
|--------------------------------------------------------------------------
*/

export async function getActiveAnnouncement() {
  const announcements =
    await getAnnouncements();

  return (
    announcements.find(
      (item) =>
        item.active === true
    ) ||
    announcements[0] ||
    null
  );
}

/*
|--------------------------------------------------------------------------
| Social Links
|--------------------------------------------------------------------------
*/

export async function getSocialLinks() {
  return (
    await read<SocialLink>(
      "socialLinks",
      []
    )
  )
    .filter(
      (item) =>
        item.active !== false
    )
    .sort(
      (a, b) =>
        (a.displayOrder ?? 999) -
        (b.displayOrder ?? 999)
    );
}

/*
|--------------------------------------------------------------------------
| Hero Slides
|--------------------------------------------------------------------------
|
| Hero slides are separate CMS entries.
|
| Public Hero behavior:
|
| First active slide:
| → Fixed Hero content
|
| All active slides with images:
| → Background carousel
|
|--------------------------------------------------------------------------
*/

export async function getHeroSlides(): Promise<HeroSlide[]> {
  return (
    await read<HeroSlide>(
      "heroSlides",
      []
    )
  )
    .filter(
      (slide) =>
        slide.active !== false && slide.published !== false
    )
    .sort(
      (a, b) =>
        (a.displayOrder ?? 999) -
        (b.displayOrder ?? 999)
    );
}

/*
|--------------------------------------------------------------------------
| Site Settings
|--------------------------------------------------------------------------
|
| Site Settings is a singleton collection.
|
| Only the first saved document is used.
|
|--------------------------------------------------------------------------
*/

export async function getSiteSettings(): Promise<SiteSettings> {
  const fallback: SiteSettings = {

    /*
    |--------------------------------------------------------------------------
    | Brand & Identity
    |--------------------------------------------------------------------------
    */

    companyName:
      "Ayzent Solutions",

    companyLogo:
      "",

    socialImage:
      "",

    seoTitle:
      "",

    seoDescription:
      "",

    /*
    |--------------------------------------------------------------------------
    | Contact Information
    |--------------------------------------------------------------------------
    */

    email:
      "hello@ayzent.com",

    phone:
      "",

    whatsapp:
      "",

    location:
      "India · Serving clients worldwide",

    /*
    |--------------------------------------------------------------------------
    | Header
    |--------------------------------------------------------------------------
    */

    headerButtonText:
      "Get a Quote",

    headerButtonLink:
      "/contact",

    /*
    |--------------------------------------------------------------------------
    | Homepage Hero
    |
    | Backward compatibility only.
    |--------------------------------------------------------------------------
    */

    heroEyebrow:
      "Ayzent Solutions",

    heroTitle:
      "Digital work with real momentum.",

    heroHighlight:
      "real momentum.",

    heroText:
      "We build thoughtful websites, brands, and digital products for businesses ready to make their next move count.",

    heroPrimaryText:
      "Start a Project",

    heroPrimaryLink:
      "/contact",

    heroSecondaryText:
      "Explore Our Work",

    heroSecondaryLink:
      "/projects",

    /*
    |--------------------------------------------------------------------------
    | Homepage CTA
    |--------------------------------------------------------------------------
    */

    homeCtaEyebrow:
      "A good place to begin",

    homeCtaTitle:
      "Have something worthwhile in mind?",

    homeCtaButtonText:
      "Discuss Your Requirements",

    homeCtaButtonLink:
      "/contact",

    /*
    |--------------------------------------------------------------------------
    | Footer
    |--------------------------------------------------------------------------
    */

    footerDescription:
      "Ideas. Engineered.",

    /*
    |--------------------------------------------------------------------------
    | Contact Page
    |--------------------------------------------------------------------------
    */

    contactEyebrow:
      "Contact",

    contactTitle:
      "Tell us what you’re working towards.",

    contactText:
      "A little context goes a long way. Tell us about the opportunity, and we’ll come back with a practical next step.",
  };

  try {
    const db = await getDb();

    const document =
      await db
        .collection(
          "siteSettings"
        )
        .find()
        .sort({
          createdAt: 1,
        })
        .limit(1)
        .next();

    const preview = await getCmsPreviewSnapshot("siteSettings");
    if (!document && !preview) return fallback;

    const raw = {
      ...(document as unknown as Record<string, unknown> | null || {}),
      ...(preview?.data || {}),
    };
    return {
      ...fallback,
      ...(raw as unknown as SiteSettings),
      homeCtaEyebrow: typeof raw.homeCtaEyebrow === "string" ? raw.homeCtaEyebrow : typeof raw.ctaEyebrow === "string" ? raw.ctaEyebrow : fallback.homeCtaEyebrow,
      homeCtaTitle: typeof raw.homeCtaTitle === "string" ? raw.homeCtaTitle : typeof raw.ctaTitle === "string" ? raw.ctaTitle : fallback.homeCtaTitle,
      homeCtaButtonText: typeof raw.homeCtaButtonText === "string" ? raw.homeCtaButtonText : typeof raw.ctaButtonText === "string" ? raw.ctaButtonText : fallback.homeCtaButtonText,
      homeCtaButtonLink: typeof raw.homeCtaButtonLink === "string" ? raw.homeCtaButtonLink : typeof raw.ctaButtonLink === "string" ? raw.ctaButtonLink : fallback.homeCtaButtonLink,
      contactText: typeof raw.contactText === "string" ? raw.contactText : typeof raw.contactDescription === "string" ? raw.contactDescription : fallback.contactText,
    };
  } catch {
    return fallback;
  }
}

/*
|--------------------------------------------------------------------------
| About Page Content
|--------------------------------------------------------------------------
|
| About Content is a singleton collection.
|
|--------------------------------------------------------------------------
*/

export async function getAboutContent(): Promise<AboutContent> {
  const fallback: AboutContent = {

    /*
    |--------------------------------------------------------------------------
    | Hero
    |--------------------------------------------------------------------------
    */

    heroEyebrow:
      "About Ayzent",

    heroTitle:
      "The ideas behind more purposeful digital work.",

    heroText:
      "Ayzent Solutions is a design and technology studio for organisations with a clear sense of where they are going.",

    /*
    |--------------------------------------------------------------------------
    | Story
    |--------------------------------------------------------------------------
    */

    storyEyebrow:
      "Our story",

    storyParagraphOne:
      "We started Ayzent with a simple belief: the digital work that matters most is built with attention, not noise. It should make a business easier to understand, easier to choose, and easier to grow.",

    storyParagraphTwo:
      "Today, we work at the point where strong ideas meet practical delivery—bringing strategy, design, and engineering into one considered process.",

    /*
    |--------------------------------------------------------------------------
    | Mission
    |--------------------------------------------------------------------------
    */

    missionEyebrow:
      "Mission",

    mission:
      "Help good businesses make a stronger digital impression.",

    /*
    |--------------------------------------------------------------------------
    | Vision
    |--------------------------------------------------------------------------
    */

    visionEyebrow:
      "Vision",

    vision:
      "A more thoughtful internet, shaped by teams that care about the people they serve.",

    /*
    |--------------------------------------------------------------------------
    | Values
    |--------------------------------------------------------------------------
    */

    valuesEyebrow:
      "What guides us",

    values: [
      "Curiosity before certainty",
      "Clarity over clutter",
      "Care in the details",
      "Partnership over hand-off",
    ],

    /*
    |--------------------------------------------------------------------------
    | Team
    |--------------------------------------------------------------------------
    */

    teamEyebrow:
      "The people",

    teamTitle:
      "The people behind the work.",

    teamText:
      "Ayzent is led by people who care about the balance of ideas, craft, and dependable execution.",

    /*
    |--------------------------------------------------------------------------
    | Quote
    |--------------------------------------------------------------------------
    */

    quote:
      "The best work happens when ambition is met with honesty and care.",

    quoteAuthor:
      "Founder, Ayzent Solutions",

    /*
    |--------------------------------------------------------------------------
    | CTA
    |--------------------------------------------------------------------------
    */

    ctaTitle:
      "Let’s build what’s next.",

    ctaText:
      "Bring us the opportunity, challenge, or half-formed idea.",

    ctaButtonText:
      "Start a Project",

    ctaButtonLink:
      "/contact",
  };

  try {
    const db = await getDb();

    const document =
      await db
        .collection(
          "aboutContent"
        )
        .find()
        .sort({
          createdAt: 1,
        })
        .limit(1)
        .next();

    const preview = await getCmsPreviewSnapshot("aboutContent");
    if (!document && !preview) return fallback;

    const raw = {
      ...(document as unknown as Record<string, unknown> | null || {}),
      ...(preview?.data || {}),
    };
    const text = (...values: unknown[]) => {
      const found = values.find((value) => typeof value === "string");
      return typeof found === "string" ? found : "";
    };
    const cmsValues = Array.isArray(raw.values) ? raw.values.filter((value): value is string => typeof value === "string") : undefined;
    return {
      ...fallback,
      ...(raw as unknown as AboutContent),
      heroEyebrow: text(raw.heroEyebrow, raw.eyebrow, fallback.heroEyebrow),
      heroTitle: text(raw.heroTitle, raw.title, fallback.heroTitle),
      heroText: text(raw.heroText, raw.description, fallback.heroText),
      storyEyebrow: text(raw.storyEyebrow, raw.storyLabel, fallback.storyEyebrow),
      storyParagraphOne: text(raw.storyParagraphOne, raw.story, fallback.storyParagraphOne),
      storyParagraphTwo: text(raw.storyParagraphTwo, raw.storyContinuation, fallback.storyParagraphTwo),
      mission: text(raw.mission, raw.missionDescription, fallback.mission),
      vision: text(raw.vision, raw.visionDescription, fallback.vision),
      values: cmsValues !== undefined ? cmsValues : fallback.values,
      teamTitle: text(raw.teamTitle, raw.teamHeading, fallback.teamTitle),
      teamText: text(raw.teamText, raw.teamDescription, fallback.teamText),
    };
  } catch {
    return fallback;
  }
}
