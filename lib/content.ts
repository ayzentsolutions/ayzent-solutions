import {
  unstable_cache,
} from "next/cache";

import {
  getDb,
} from "@/lib/mongodb";

import {
  faqs,
  posts,
  projects,
  services,

  type Project,
} from "@/lib/site-data";

import type {
  HeroSlide,
} from "@/components/sections/home-hero-carousel";

/*
|--------------------------------------------------------------------------
| Revalidation
|--------------------------------------------------------------------------
*/

export const CONTENT_REVALIDATE =
  60;

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type Service = {
  title: string;
  text: string;

  displayOrder?: number;

  published?: boolean;
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

  displayOrder?: number;
};

export type SiteSettings = {
  _id?: string;

  /*
  |--------------------------------------------------------------------------
  | Brand
  |--------------------------------------------------------------------------
  */

  companyName?: string;

  companyDescription?: string;

  /*
  |--------------------------------------------------------------------------
  | Contact
  |--------------------------------------------------------------------------
  */

  email?: string;

  phone?: string;

  whatsapp?: string;

  location?: string;

  /*
  |--------------------------------------------------------------------------
  | Footer
  |--------------------------------------------------------------------------
  */

  footerDescription?: string;

  /*
  |--------------------------------------------------------------------------
  | Header
  |--------------------------------------------------------------------------
  */

  headerButtonText?: string;

  headerButtonLink?: string;

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
  | Contact Page
  |--------------------------------------------------------------------------
  */

  contactEyebrow?: string;

  contactTitle?: string;

  contactText?: string;
};

export type AboutContent = {
  _id?: string;

  heroEyebrow?: string;

  heroTitle?: string;

  heroText?: string;

  storyEyebrow?: string;

  storyParagraphOne?: string;

  storyParagraphTwo?: string;

  missionEyebrow?: string;

  mission?: string;

  visionEyebrow?: string;

  vision?: string;

  valuesEyebrow?: string;

  values?: string[];

  teamEyebrow?: string;

  teamTitle?: string;

  teamText?: string;

  quote?: string;

  quoteAuthor?: string;

  ctaTitle?: string;

  ctaText?: string;

  ctaButtonText?: string;

  ctaButtonLink?: string;
};

/*
|--------------------------------------------------------------------------
| Generic Collection Reader
|--------------------------------------------------------------------------
*/

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

    if (
      documents.length
    ) {
      return documents as unknown as T[];
    }

    return fallback;
  } catch {
    return fallback;
  }
}

/*
|--------------------------------------------------------------------------
| Services
|--------------------------------------------------------------------------
*/

const readServices =
  unstable_cache(
    async () =>
      read<Service>(
        "services",
        services
      ),
    ["ayzent-services"],
    {
      revalidate:
        CONTENT_REVALIDATE,
    }
  );

export function getServices() {
  return readServices();
}

/*
|--------------------------------------------------------------------------
| Projects
|--------------------------------------------------------------------------
*/

const readProjects =
  unstable_cache(
    async () =>
      read<Project>(
        "projects",
        projects
      ),
    ["ayzent-projects"],
    {
      revalidate:
        CONTENT_REVALIDATE,
    }
  );

export function getProjects() {
  return readProjects();
}

export async function getProject(
  slug: string
) {
  const items =
    await getProjects();

  return items.find(
    (project) =>
      project.slug === slug
  );
}

/*
|--------------------------------------------------------------------------
| Blog Posts
|--------------------------------------------------------------------------
*/

const readPosts =
  unstable_cache(
    async () =>
      read<Post>(
        "posts",
        posts
      ),
    ["ayzent-posts"],
    {
      revalidate:
        CONTENT_REVALIDATE,
    }
  );

export function getPosts() {
  return readPosts();
}

export async function getPost(
  slug: string
) {
  const items =
    await getPosts();

  return items.find(
    (post) =>
      post.slug === slug
  );
}

/*
|--------------------------------------------------------------------------
| Categories
|--------------------------------------------------------------------------
*/

const readCategories =
  unstable_cache(
    async () =>
      read<Category>(
        "categories",
        []
      ),
    ["ayzent-categories"],
    {
      revalidate:
        CONTENT_REVALIDATE,
    }
  );

export function getCategories() {
  return readCategories();
}

/*
|--------------------------------------------------------------------------
| Tags
|--------------------------------------------------------------------------
*/

const readTags =
  unstable_cache(
    async () =>
      read<Tag>(
        "tags",
        []
      ),
    ["ayzent-tags"],
    {
      revalidate:
        CONTENT_REVALIDATE,
    }
  );

export function getTags() {
  return readTags();
}

/*
|--------------------------------------------------------------------------
| Hero Slides
|--------------------------------------------------------------------------
*/

const fallbackHeroSlides:
  HeroSlide[] = [
  {
    eyebrow:
      "Ayzent Solutions",

    title:
      "Digital work with real momentum.",

    highlight:
      "real momentum.",

    text:
      "We build thoughtful websites, digital products, and technology solutions for businesses ready to make their next move count.",

    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85",

    overlayStrength:
      "dark",

    primaryText:
      "Start a Project",

    primaryLink:
      "/contact",

    secondaryText:
      "Explore Our Work",

    secondaryLink:
      "/projects",

    active: true,

    displayOrder: 1,
  },
];

const readHeroSlides =
  unstable_cache(
    async (): Promise<
      HeroSlide[]
    > => {
      try {
        const db =
          await getDb();

        const documents =
          await db
            .collection(
              "heroSlides"
            )
            .find({
              active: {
                $ne: false,
              },
            })
            .sort({
              displayOrder: 1,
              createdAt: -1,
            })
            .toArray();

        if (
          documents.length
        ) {
          return documents.map(
            (document) => ({
              _id:
                document._id.toString(),

              eyebrow:
                document.eyebrow,

              title:
                document.title,

              highlight:
                document.highlight,

              text:
                document.text,

              image:
                document.image,

              overlayStrength:
                document.overlayStrength,

              primaryText:
                document.primaryText,

              primaryLink:
                document.primaryLink,

              secondaryText:
                document.secondaryText,

              secondaryLink:
                document.secondaryLink,

              active:
                document.active,

              displayOrder:
                document.displayOrder,
            })
          ) as HeroSlide[];
        }

        return fallbackHeroSlides;
      } catch {
        return fallbackHeroSlides;
      }
    },
    ["ayzent-hero-slides"],
    {
      revalidate:
        CONTENT_REVALIDATE,
    }
  );

export function getHeroSlides() {
  return readHeroSlides();
}

/*
|--------------------------------------------------------------------------
| Team
|--------------------------------------------------------------------------
*/

const readTeam =
  unstable_cache(
    async () =>
      read<TeamMember>(
        "team",
        []
      ),
    ["ayzent-team"],
    {
      revalidate:
        CONTENT_REVALIDATE,
    }
  );

export function getTeam() {
  return readTeam();
}

/*
|--------------------------------------------------------------------------
| FAQs
|--------------------------------------------------------------------------
*/

const readFaqs =
  unstable_cache(
    async () => {
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
          (
            [question, answer]
          ) =>
            question &&
            answer
        );
    },
    ["ayzent-faqs"],
    {
      revalidate:
        CONTENT_REVALIDATE,
    }
  );

export function getFaqs() {
  return readFaqs();
}

/*
|--------------------------------------------------------------------------
| Testimonials
|--------------------------------------------------------------------------
*/

const readTestimonials =
  unstable_cache(
    async () =>
      (
        await read<
          Testimonial
        >(
          "testimonials",
          []
        )
      ).filter(
        (item) =>
          item.active !== false
      ),
    ["ayzent-testimonials"],
    {
      revalidate:
        CONTENT_REVALIDATE,
    }
  );

export function getTestimonials() {
  return readTestimonials();
}

/*
|--------------------------------------------------------------------------
| Client Logos
|--------------------------------------------------------------------------
*/

const readClientLogos =
  unstable_cache(
    async () =>
      (
        await read<
          ClientLogo
        >(
          "clientLogos",
          []
        )
      ).filter(
        (item) =>
          item.active !== false
      ),
    ["ayzent-client-logos"],
    {
      revalidate:
        CONTENT_REVALIDATE,
    }
  );

export function getClientLogos() {
  return readClientLogos();
}

/*
|--------------------------------------------------------------------------
| Jobs
|--------------------------------------------------------------------------
*/

const readJobs =
  unstable_cache(
    async () =>
      (
        await read<Job>(
          "jobs",
          []
        )
      ).filter(
        (job) =>
          job.status === "open"
      ),
    ["ayzent-jobs"],
    {
      revalidate:
        CONTENT_REVALIDATE,
    }
  );

export function getJobs() {
  return readJobs();
}

/*
|--------------------------------------------------------------------------
| Active Announcement
|--------------------------------------------------------------------------
*/

const readActiveAnnouncement =
  unstable_cache(
    async () => {
      const items =
        await read<
          Announcement
        >(
          "announcements",
          []
        );

      return items.find(
        (item) =>
          item.active
      );
    },
    ["ayzent-announcement"],
    {
      revalidate:
        CONTENT_REVALIDATE,
    }
  );

export function getActiveAnnouncement() {
  return readActiveAnnouncement();
}

/*
|--------------------------------------------------------------------------
| Social Links
|--------------------------------------------------------------------------
*/

const readSocialLinks =
  unstable_cache(
    async () =>
      (
        await read<
          SocialLink
        >(
          "socialLinks",
          []
        )
      ).filter(
        (item) =>
          item.active !== false
      ),
    ["ayzent-social-links"],
    {
      revalidate:
        CONTENT_REVALIDATE,
    }
  );

export function getSocialLinks() {
  return readSocialLinks();
}

/*
|--------------------------------------------------------------------------
| Site Settings
|--------------------------------------------------------------------------
*/

const fallbackSettings:
  SiteSettings = {
    companyName:
      "Ayzent Solutions",

    companyDescription:
      "A design and engineering studio building websites and digital products.",

    email:
      "hello@ayzent.com",

    location:
      "India · Serving clients worldwide",

    footerDescription:
      "Ideas. Engineered.",

    headerButtonText:
      "Get a Quote",

    headerButtonLink:
      "/contact",

    homeCtaEyebrow:
      "A good place to begin",

    homeCtaTitle:
      "Have something worthwhile in mind?",

    homeCtaButtonText:
      "Discuss Your Requirements",

    homeCtaButtonLink:
      "/contact",

    contactEyebrow:
      "Contact",

    contactTitle:
      "Tell us what you’re working towards.",

    contactText:
      "Tell us about your requirements and we will help you find the right next step.",
  };

const readSiteSettings =
  unstable_cache(
    async (): Promise<
      SiteSettings
    > => {
      try {
        const db =
          await getDb();

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
          return fallbackSettings;
        }

        const {
          _id,
          ...settings
        } = document;

        return {
          ...fallbackSettings,
          ...(settings as SiteSettings),
        };
      } catch {
        return fallbackSettings;
      }
    },
    ["ayzent-site-settings"],
    {
      revalidate:
        CONTENT_REVALIDATE,
    }
  );

export function getSiteSettings() {
  return readSiteSettings();
}

/*
|--------------------------------------------------------------------------
| About Content
|--------------------------------------------------------------------------
*/

const fallbackAbout:
  AboutContent = {
    heroEyebrow:
      "About Ayzent",

    heroTitle:
      "The ideas behind more purposeful digital work.",

    heroText:
      "Ayzent Solutions combines design, engineering, and practical thinking to build digital experiences that move businesses forward.",

    storyEyebrow:
      "Our story",

    storyParagraphOne:
      "We believe digital work should solve real business problems instead of simply adding noise.",

    storyParagraphTwo:
      "Our approach brings strategy, design, development, and dependable delivery together.",

    missionEyebrow:
      "Mission",

    mission:
      "Build digital solutions that create practical value.",

    visionEyebrow:
      "Vision",

    vision:
      "Make technology more useful, accessible, and purposeful.",

    valuesEyebrow:
      "What guides us",

    values: [
      "Clarity",
      "Curiosity",
      "Craft",
      "Accountability",
    ],

    teamEyebrow:
      "The people",

    teamTitle:
      "The people behind the work.",

    teamText:
      "A team focused on ideas, execution, and meaningful digital outcomes.",

    quote:
      "Good technology should make progress easier.",

    quoteAuthor:
      "Ayzent Solutions",

    ctaTitle:
      "Let’s build what’s next.",

    ctaText:
      "Bring us your challenge, opportunity, or idea.",

    ctaButtonText:
      "Start a Project",

    ctaButtonLink:
      "/contact",
  };

const readAboutContent =
  unstable_cache(
    async (): Promise<
      AboutContent
    > => {
      try {
        const db =
          await getDb();

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
          return fallbackAbout;
        }

        const {
          _id,
          ...content
        } = document;

        return {
          ...fallbackAbout,
          ...(content as AboutContent),
        };
      } catch {
        return fallbackAbout;
      }
    },
    ["ayzent-about-content"],
    {
      revalidate:
        CONTENT_REVALIDATE,
    }
  );

export function getAboutContent() {
  return readAboutContent();
}
