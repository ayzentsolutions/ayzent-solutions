import { getDb } from "@/lib/mongodb";

import {
  faqs,
  posts,
  projects,
  services,
  type Project,
} from "@/lib/site-data";

export type Service = {
  title: string;
  text: string;
  displayOrder?: number;
};

export type Post = {
  slug: string;
  title: string;
  category: string;
  date?: string;
  excerpt: string;
  content?: string;
  tags?: string[];
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  published?: boolean;
};

export type Category = {
  name: string;
  slug: string;
  displayOrder?: number;
};

export type Tag = {
  name: string;
  slug: string;
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
  clientName: string;
  roleCompany?: string;
  text: string;
  active?: boolean;
};

export type ClientLogo = {
  name: string;
  logo?: string;
  link?: string;
  active?: boolean;
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
};

export type Announcement = {
  _id?: string;
  title: string;
  content: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  active?: boolean;
  displayOrder?: number;
};

export type SocialLink = {
  label: string;
  url: string;
  active?: boolean;
};

export type SiteSettings = {
  companyName?: string;
  companyDescription?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;

  heroEyebrow?: string;
  heroTitle?: string;
  heroText?: string;

  heroPrimaryText?: string;
  heroPrimaryLink?: string;

  heroSecondaryText?: string;
  heroSecondaryLink?: string;

  footerDescription?: string;
};

async function read<T>(
  collection: string,
  fallback: T[]
): Promise<T[]> {
  try {
    const db =
      await getDb();

    const documents =
      await db
        .collection(collection)
        .find({
          published: {
            $ne: false,
          },
        })
        .sort({
          displayOrder: 1,
          createdAt: -1,
        })
        .toArray();

    return documents.length
      ? (documents as unknown as T[])
      : fallback;
  } catch {
    return fallback;
  }
}

export function getServices() {
  return read<Service>(
    "services",
    services
  );
}

export function getProjects() {
  return read<Project>(
    "projects",
    projects
  );
}

export function getPosts() {
  return read<Post>(
    "posts",
    posts
  );
}

export async function getProject(
  slug: string
) {
  return (
    await getProjects()
  ).find(
    (project) =>
      project.slug === slug
  );
}

export async function getPost(
  slug: string
) {
  return (
    await getPosts()
  ).find(
    (post) =>
      post.slug === slug
  );
}

export async function getCategories() {
  return read<Category>(
    "categories",
    []
  );
}

export async function getTags() {
  return read<Tag>(
    "tags",
    []
  );
}

export async function getTeam() {
  return read<TeamMember>(
    "team",
    []
  );
}

export async function getFaqs() {
  const items =
    await read<
      Record<string, unknown>
    >(
      "faqs",
      []
    );

  return items.length
    ? items
        .filter(
          (item) =>
            item.active !== false
        )
        .map(
          (item) =>
            [
              String(
                item.question ||
                  ""
              ),

              String(
                item.answer ||
                  ""
              ),
            ] as [
              string,
              string
            ]
        )
        .filter(
          ([question, answer]) =>
            question &&
            answer
        )
    : faqs;
}

export async function getTestimonials() {
  return (
    await read<Testimonial>(
      "testimonials",
      []
    )
  ).filter(
    (item) =>
      item.active !== false
  );
}

export async function getClientLogos() {
  return (
    await read<ClientLogo>(
      "clientLogos",
      []
    )
  ).filter(
    (item) =>
      item.active !== false
  );
}

export async function getJobs() {
  return (
    await read<Job>(
      "jobs",
      []
    )
  ).filter(
    (job) =>
      job.status === "open"
  );
}

export async function getActiveAnnouncement() {
  const announcements =
    await read<Announcement>(
      "announcements",
      []
    );

  return announcements.find(
    (item) =>
      item.active
  );
}

export async function getSocialLinks() {
  return (
    await read<SocialLink>(
      "socialLinks",
      []
    )
  ).filter(
    (item) =>
      item.active !== false
  );
}

export async function getSiteSettings() {
  try {
    const db =
      await getDb();

    const settings =
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

    return (
      settings as
        | SiteSettings
        | null
    );
  } catch {
    return null;
  }
}
