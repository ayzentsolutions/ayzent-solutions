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

  displayOrder?: number;
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
  _id?: string;

  /*
  |--------------------------------------------------------------------------
  | Company
  |--------------------------------------------------------------------------
  */

  companyName?: string;

  companyDescription?: string;

  email?: string;

  phone?: string;

  whatsapp?: string;

  location?: string;

  footerDescription?: string;

  /*
  |--------------------------------------------------------------------------
  | Homepage Hero
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
  | Header
  |--------------------------------------------------------------------------
  */

  headerButtonText?: string;

  headerButtonLink?: string;

  /*
  |--------------------------------------------------------------------------
  | Contact
  |--------------------------------------------------------------------------
  */

  contactEyebrow?: string;

  contactTitle?: string;

  contactText?: string;
};

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
| Database Reader
|--------------------------------------------------------------------------
*/

async function read<T>(
  collection: string,
  fallback: T[]
): Promise<T[]> {
  try {
    const db = await getDb();

    const documents = await db
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
  return read<TeamMember>(
    "team",
    []
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
        question &&
        answer
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
  ).filter(
    (item) =>
      item.active !== false
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
| Announcement
|--------------------------------------------------------------------------
*/

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
| Site Settings
|--------------------------------------------------------------------------
*/

export async function getSiteSettings(): Promise<SiteSettings> {
  const fallback: SiteSettings = {
    companyName:
      "Ayzent Solutions",

    companyDescription:
      "A design and engineering studio building websites, brands, and digital products for companies ready to move faster.",

    email:
      "hello@ayzent.com",

    whatsapp:
      "00000000000",

    location:
      "Remote-first · Serving clients worldwide",

    footerDescription:
      "A design and engineering studio building websites, brands, and digital products for companies ready to move faster.",

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

    homeCtaEyebrow:
      "A good place to begin",

    homeCtaTitle:
      "Have something worthwhile in mind?",

    homeCtaButtonText:
      "Discuss Your Requirements",

    homeCtaButtonLink:
      "/contact",

    headerButtonText:
      "Get a Quote",

    headerButtonLink:
      "/contact",

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

    /*
    |--------------------------------------------------------------------------
    | Remove MongoDB _id
    |--------------------------------------------------------------------------
    |
    | MongoDB returns _id as ObjectId.
    | SiteSettings expects _id as string.
    | We do not need _id on the public website,
    | so remove it before returning the content.
    |
    */

    const {
      _id,
      ...settings
    } = document;

    return {
      ...fallback,
      ...(settings as SiteSettings),
    };
  } catch {
    return fallback;
  }
}

/*
|--------------------------------------------------------------------------
| About Page Content
|--------------------------------------------------------------------------
*/

export async function getAboutContent(): Promise<AboutContent> {
  const fallback: AboutContent = {
    heroEyebrow:
      "About Ayzent",

    heroTitle:
      "The ideas behind more purposeful digital work.",

    heroText:
      "Ayzent Solutions is a design and technology studio for organisations with a clear sense of where they are going.",

    storyEyebrow:
      "Our story",

    storyParagraphOne:
      "We started Ayzent with a simple belief: the digital work that matters most is built with attention, not noise. It should make a business easier to understand, easier to choose, and easier to grow.",

    storyParagraphTwo:
      "Today, we work at the point where strong ideas meet practical delivery—bringing strategy, design, and engineering into one considered process.",

    missionEyebrow:
      "Mission",

    mission:
      "Help good businesses make a stronger digital impression.",

    visionEyebrow:
      "Vision",

    vision:
      "A more thoughtful internet, shaped by teams that care about the people they serve.",

    valuesEyebrow:
      "What guides us",

    values: [
      "Curiosity before certainty",
      "Clarity over clutter",
      "Care in the details",
      "Partnership over hand-off",
    ],

    teamEyebrow:
      "The people",

    teamTitle:
      "The people behind the work.",

    teamText:
      "Ayzent is led by people who care about the balance of ideas, craft, and dependable execution.",

    quote:
      "The best work happens when ambition is met with honesty and care.",

    quoteAuthor:
      "Founder, Ayzent Solutions",

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

    /*
    |--------------------------------------------------------------------------
    | Remove MongoDB _id
    |--------------------------------------------------------------------------
    */

    const {
      _id,
      ...aboutContent
    } = document;

    return {
      ...fallback,
      ...(aboutContent as AboutContent),
    };
  } catch {
    return fallback;
  }
}
