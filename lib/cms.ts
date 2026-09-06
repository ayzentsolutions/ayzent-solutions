export const cmsCollections = [
  "siteSettings",
  "announcements",
  "services",
  "projects",
  "posts",
  "categories",
  "tags",
  "team",
  "testimonials",
  "clientLogos",
  "faqs",
  "jobs",
  "socialLinks",
  "inquiries",
  "newsletterSubscribers",
  "comments",
] as const;

export type CmsCollection = (typeof cmsCollections)[number];

export const editorCollections: CmsCollection[] = [
  "siteSettings",
  "announcements",
  "services",
  "projects",
  "posts",
  "categories",
  "tags",
  "team",
  "testimonials",
  "clientLogos",
  "faqs",
  "jobs",
  "socialLinks",
  "comments",
];

export function isCmsCollection(value: string): value is CmsCollection {
  return cmsCollections.includes(value as CmsCollection);
}

export function canEditCollection(
  collection: CmsCollection,
  role: "SUPER_ADMIN" | "EDITOR"
) {
  return role === "SUPER_ADMIN" || editorCollections.includes(collection);
}

/*
|--------------------------------------------------------------------------
| CMS Navigation
|--------------------------------------------------------------------------
| This order matches the public website structure.
*/

export const cmsNavigation = [
  {
    title: "Website",
    items: [
      "siteSettings",
      "announcements",
    ],
  },

  {
    title: "Main Content",
    items: [
      "services",
      "projects",
      "posts",
      "categories",
      "tags",
    ],
  },

  {
    title: "Company",
    items: [
      "team",
      "testimonials",
      "clientLogos",
      "faqs",
      "jobs",
    ],
  },

  {
    title: "Global",
    items: [
      "socialLinks",
    ],
  },

  {
    title: "Leads & Communication",
    items: [
      "inquiries",
      "newsletterSubscribers",
      "comments",
    ],
  },
] as const;

export const collectionLabels: Record<CmsCollection, string> = {
  siteSettings: "Site Settings",
  announcements: "Announcements",

  services: "Services",
  projects: "Projects",
  posts: "Blog Posts",
  categories: "Categories",
  tags: "Tags",

  team: "Team",
  testimonials: "Testimonials",
  clientLogos: "Client Logos",
  faqs: "FAQs",
  jobs: "Job Openings",

  socialLinks: "Social Links",

  inquiries: "Inquiries",
  newsletterSubscribers: "Newsletter Subscribers",
  comments: "Comments",
};

const isText = (value: unknown, min = 1) =>
  typeof value === "string" && value.trim().length >= min;

const isOrder = (value: unknown) =>
  value === undefined ||
  (typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0);

const isUrl = (value: unknown) => {
  if (value === undefined || value === "") return true;

  if (typeof value !== "string") return false;

  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return false;
  }
};

const arrayOfStrings = (value: unknown) =>
  value === undefined ||
  (Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "string" &&
        item.length <= 500
    ));

const statuses = [
  "draft",
  "published",
  "archived",
];

export function validateCmsData(
  collection: CmsCollection,
  data: Record<string, unknown>
) {
  const errors: string[] = [];

  const require = (
    key: string,
    label: string
  ) => {
    if (!isText(data[key])) {
      errors.push(`${label} is required.`);
    }
  };

  if (
    [
      "services",
      "projects",
      "posts",
      "jobs",
      "announcements",
      "team",
      "testimonials",
      "clientLogos",
      "faqs",
    ].includes(collection) &&
    !isOrder(data.displayOrder)
  ) {
    errors.push(
      "Display order must be a non-negative whole number."
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Site Settings
  |--------------------------------------------------------------------------
  */

  if (collection === "siteSettings") {
    require("companyName", "Company name");
  }

  /*
  |--------------------------------------------------------------------------
  | Services
  |--------------------------------------------------------------------------
  */

  if (collection === "services") {
    require("title", "Service name");
    require("text", "Summary");
  }

  /*
  |--------------------------------------------------------------------------
  | Projects
  |--------------------------------------------------------------------------
  */

  if (collection === "projects") {
    require("name", "Project name");
    require("slug", "Slug");
    require("overview", "Overview");
    require("category", "Category");

    if (!statuses.includes(String(data.status))) {
      errors.push("Project status is invalid.");
    }

    ["coverImage", "liveLink"].forEach((key) => {
      if (!isUrl(data[key])) {
        errors.push(
          `${key} must be a valid URL.`
        );
      }
    });

    [
      "features",
      "technologies",
      "gallery",
    ].forEach((key) => {
      if (!arrayOfStrings(data[key])) {
        errors.push(
          `${key} must contain only text values.`
        );
      }
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Blog Posts
  |--------------------------------------------------------------------------
  */

  if (collection === "posts") {
    require("title", "Title");
    require("slug", "Slug");
    require("excerpt", "Excerpt");
    require("content", "Content");
    require("category", "Category");

    if (!statuses.includes(String(data.status))) {
      errors.push("Post status is invalid.");
    }

    if (!arrayOfStrings(data.tags)) {
      errors.push(
        "Tags must contain only text values."
      );
    }

    if (!isUrl(data.coverImage)) {
      errors.push(
        "Cover image must be a valid URL."
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Team
  |--------------------------------------------------------------------------
  */

  if (collection === "team") {
    require("name", "Name");
    require("role", "Role");

    if (!isUrl(data.image)) {
      errors.push(
        "Team image must be a valid URL."
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Testimonials
  |--------------------------------------------------------------------------
  */

  if (collection === "testimonials") {
    require("clientName", "Client name");
    require("text", "Testimonial");
  }

  /*
  |--------------------------------------------------------------------------
  | FAQs
  |--------------------------------------------------------------------------
  */

  if (collection === "faqs") {
    require("question", "Question");
    require("answer", "Answer");
  }

  /*
  |--------------------------------------------------------------------------
  | Jobs
  |--------------------------------------------------------------------------
  */

  if (collection === "jobs") {
    require("title", "Job title");
    require("description", "Description");

    if (
      !["open", "closed"].includes(
        String(data.status)
      )
    ) {
      errors.push("Job status is invalid.");
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Client Logos
  |--------------------------------------------------------------------------
  */

  if (collection === "clientLogos") {
    require("name", "Client name");

    if (!isUrl(data.logo)) {
      errors.push(
        "Client logo must be a valid URL."
      );
    }

    if (!isUrl(data.link)) {
      errors.push(
        "Client website must be a valid URL."
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Social Links
  |--------------------------------------------------------------------------
  */

  if (
    collection === "socialLinks" &&
    !isUrl(data.url)
  ) {
    errors.push(
      "Profile URL must be a valid URL."
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Announcements
  |--------------------------------------------------------------------------
  */

  if (collection === "announcements") {
    require("title", "Title");
    require("content", "Content");

    if (!isUrl(data.image)) {
      errors.push(
        "Announcement image must be a valid URL."
      );
    }

    if (!isUrl(data.ctaLink)) {
      errors.push(
        "CTA link must be a valid URL."
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Slugs
  |--------------------------------------------------------------------------
  */

  if (
    [
      "projects",
      "posts",
      "categories",
      "tags",
    ].includes(collection) &&
    data.slug !== undefined &&
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
      String(data.slug)
    )
  ) {
    errors.push(
      "Slug must use lowercase letters, numbers, and hyphens only."
    );
  }

  return errors;
}
