
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

  title: string;

  highlight?: string;

  text?: string;

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
  |
  | Kept for backward compatibility.
  | Hero slides can now control Hero content/background.
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
| This is used for collections containing multiple entries.
|
| Public-side content automatically excludes entries where:
|
| published === false
|
|--------------------------------------------------------------------------
*/

async function read<T>(
  collection: string,
  fallback: T[]
): Promise<T[]> {
  try {
    const db = await getDb();

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

/*
|--------------------------------------------------------------------------
| Standard Content
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Individual Project
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Individual Post
|--------------------------------------------------------------------------
*/

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

export async function getTeam() {
  return (
    await read<TeamMember>(
      "team",
      []
    )
  ).filter(
    (member) =>
      member.published !== false
  );
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
    );
}

/*
|--------------------------------------------------------------------------
| Jobs
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Announcements
|--------------------------------------------------------------------------
*/

export async function getAnnouncements() {
  return (
    await read<Announcement>(
      "announcements",
      []
    )
  ).filter(
    (item) =>
      item.active !== false
  );
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
  ).filter(
    (item) =>
      item.active !== false
  );
}

/*
|--------------------------------------------------------------------------
| Hero Slides
|--------------------------------------------------------------------------
|
| Hero slides are separate CMS entries.
|
| The public Hero component can use:
|
| 1. First active slide -> fixed Hero content
| 2. All active slides -> background carousel
|
|--------------------------------------------------------------------------
*/

export async function getHeroSlides() {
  return (
    await read<HeroSlide>(
      "heroSlides",
      []
    )
  )
    .filter(
      (slide) =>
        slide.active !== false
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
    | Backward compatibility fallback.
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

    if (!document) {
      return fallback;
    }

    return {
      ...fallback,

      ...(document as unknown as SiteSettings),
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
| About Content is also a singleton collection.
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

    if (!document) {
      return fallback;
    }

    return {
      ...fallback,

      ...(document as unknown as AboutContent),
    };
  } catch {
    return fallback;
  }
}
