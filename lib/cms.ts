export const cmsCollections = [
  /*
  |--------------------------------------------------------------------------
  | Website
  |--------------------------------------------------------------------------
  */

  "siteSettings",
  "heroSlides",

  /*
  |--------------------------------------------------------------------------
  | About
  |--------------------------------------------------------------------------
  */

  "aboutContent",

  /*
  |--------------------------------------------------------------------------
  | Core Content
  |--------------------------------------------------------------------------
  */

  "services",
  "projects",

  /*
  |--------------------------------------------------------------------------
  | Blog
  |--------------------------------------------------------------------------
  */

  "posts",
  "categories",
  "tags",

  /*
  |--------------------------------------------------------------------------
  | Careers
  |--------------------------------------------------------------------------
  */

  "jobs",

  /*
  |--------------------------------------------------------------------------
  | Homepage / Company
  |--------------------------------------------------------------------------
  */

  "team",
  "testimonials",
  "clientLogos",
  "faqs",

  /*
  |--------------------------------------------------------------------------
  | Global
  |--------------------------------------------------------------------------
  */

  "announcements",
  "socialLinks",

  /*
  |--------------------------------------------------------------------------
  | Communication
  |--------------------------------------------------------------------------
  */

  "inquiries",
  "newsletterSubscribers",
  "comments",
] as const;

export type CmsCollection =
  (typeof cmsCollections)[number];

export const editorCollections:
  CmsCollection[] = [
  "siteSettings",
  "heroSlides",
  "aboutContent",

  "services",
  "projects",

  "posts",
  "categories",
  "tags",

  "jobs",

  "team",
  "testimonials",
  "clientLogos",
  "faqs",

  "announcements",
  "socialLinks",

  "comments",
];

export function isCmsCollection(
  value: string
): value is CmsCollection {
  return cmsCollections.includes(
    value as CmsCollection
  );
}

export function canEditCollection(
  collection: CmsCollection,
  role: "SUPER_ADMIN" | "EDITOR"
) {
  return (
    role === "SUPER_ADMIN" ||
    editorCollections.includes(
      collection
    )
  );
}

/*
|--------------------------------------------------------------------------
| CMS NAVIGATION
|--------------------------------------------------------------------------
*/

export const cmsNavigation = [
  {
    title: "HOME",
    items: [
      "heroSlides",
      "siteSettings",
      "testimonials",
      "clientLogos",
      "faqs",
    ],
  },

  {
    title: "ABOUT",
    items: [
      "aboutContent",
      "team",
    ],
  },

  {
    title: "SERVICES",
    items: [
      "services",
    ],
  },

  {
    title: "PROJECTS",
    items: [
      "projects",
    ],
  },

  {
    title: "BLOG",
    items: [
      "posts",
      "categories",
      "tags",
    ],
  },

  {
    title: "CAREERS",
    items: [
      "jobs",
    ],
  },

  {
    title: "CONTACT",
    items: [
      "socialLinks",
      "inquiries",
    ],
  },

  {
    title: "WEBSITE GLOBAL",
    items: [
      "announcements",
      "newsletterSubscribers",
      "comments",
    ],
  },
] as const;

export const collectionLabels:
  Record<CmsCollection, string> = {
    siteSettings:
      "Homepage & Site Settings",

    heroSlides:
      "Hero Background Slides",

    aboutContent:
      "About Page Content",

    services:
      "Services",

    projects:
      "Projects",

    posts:
      "Blog Posts",

    categories:
      "Blog Categories",

    tags:
      "Blog Tags",

    jobs:
      "Job Openings",

    team:
      "Team Members",

    testimonials:
      "Testimonials",

    clientLogos:
      "Client Logos",

    faqs:
      "Frequently Asked Questions",

    announcements:
      "Announcements",

    socialLinks:
      "Social Links",

    inquiries:
      "Contact Inquiries",

    newsletterSubscribers:
      "Newsletter Subscribers",

    comments:
      "Blog Comments",
  };

const statuses = [
  "draft",
  "published",
  "archived",
];

const isText = (
  value: unknown,
  minimum = 1
) =>
  typeof value === "string" &&
  value.trim().length >= minimum;

const isOrder = (
  value: unknown
) =>
  value === undefined ||
  value === "" ||
  (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0
  );

const isUrl = (
  value: unknown
) => {
  if (
    value === undefined ||
    value === ""
  ) {
    return true;
  }

  if (
    typeof value !== "string"
  ) {
    return false;
  }

  /*
  |--------------------------------------------------------------------------
  | Internal links are valid.
  |--------------------------------------------------------------------------
  */

  if (
    value.startsWith("/")
  ) {
    return true;
  }

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

const arrayOfStrings = (
  value: unknown
) =>
  value === undefined ||
  (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "string" &&
        item.length <= 500
    )
  );

export function validateCmsData(
  collection: CmsCollection,
  data: Record<string, unknown>
) {
  const errors: string[] = [];

  const requireField = (
    key: string,
    label: string
  ) => {
    if (
      !isText(data[key])
    ) {
      errors.push(
        `${label} is required.`
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Display Order
  |--------------------------------------------------------------------------
  */

  if (
    [
      "heroSlides",
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
  | SITE SETTINGS
  |--------------------------------------------------------------------------
  */

  if (
    collection === "siteSettings"
  ) {
    requireField(
      "companyName",
      "Company name"
    );
  }

  /*
  |--------------------------------------------------------------------------
  | HERO SLIDES
  |--------------------------------------------------------------------------
  */

  if (
    collection === "heroSlides"
  ) {
    requireField(
      "title",
      "Hero title"
    );

    requireField(
      "image",
      "Background image"
    );

    if (
      !isUrl(data.image)
    ) {
      errors.push(
        "Hero background image is invalid."
      );
    }

    if (
      !isUrl(data.primaryLink)
    ) {
      errors.push(
        "Primary button link is invalid."
      );
    }

    if (
      !isUrl(data.secondaryLink)
    ) {
      errors.push(
        "Secondary button link is invalid."
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | ABOUT
  |--------------------------------------------------------------------------
  */

  if (
    collection === "aboutContent"
  ) {
    requireField(
      "heroTitle",
      "Hero title"
    );
  }

  /*
  |--------------------------------------------------------------------------
  | SERVICES
  |--------------------------------------------------------------------------
  */

  if (
    collection === "services"
  ) {
    requireField(
      "title",
      "Service name"
    );

    requireField(
      "text",
      "Summary"
    );
  }

  /*
  |--------------------------------------------------------------------------
  | PROJECTS
  |--------------------------------------------------------------------------
  */

  if (
    collection === "projects"
  ) {
    requireField(
      "name",
      "Project name"
    );

    requireField(
      "slug",
      "Slug"
    );

    requireField(
      "overview",
      "Overview"
    );

    requireField(
      "category",
      "Category"
    );

    if (
      data.status &&
      !statuses.includes(
        String(data.status)
      )
    ) {
      errors.push(
        "Project status is invalid."
      );
    }

    [
      "coverImage",
      "liveLink",
    ].forEach((key) => {
      if (
        !isUrl(data[key])
      ) {
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
      if (
        !arrayOfStrings(
          data[key]
        )
      ) {
        errors.push(
          `${key} must contain only text values.`
        );
      }
    });
  }

  /*
  |--------------------------------------------------------------------------
  | POSTS
  |--------------------------------------------------------------------------
  */

  if (
    collection === "posts"
  ) {
    requireField(
      "title",
      "Title"
    );

    requireField(
      "slug",
      "Slug"
    );

    requireField(
      "excerpt",
      "Excerpt"
    );

    requireField(
      "content",
      "Content"
    );

    requireField(
      "category",
      "Category"
    );

    if (
      data.status &&
      !statuses.includes(
        String(data.status)
      )
    ) {
      errors.push(
        "Post status is invalid."
      );
    }

    if (
      !arrayOfStrings(
        data.tags
      )
    ) {
      errors.push(
        "Tags must contain only text values."
      );
    }

    if (
      !isUrl(
        data.coverImage
      )
    ) {
      errors.push(
        "Cover image must be a valid URL."
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | TEAM
  |--------------------------------------------------------------------------
  */

  if (
    collection === "team"
  ) {
    requireField(
      "name",
      "Name"
    );

    requireField(
      "role",
      "Role"
    );

    if (
      !isUrl(
        data.image
      )
    ) {
      errors.push(
        "Team image is invalid."
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | TESTIMONIALS
  |--------------------------------------------------------------------------
  */

  if (
    collection ===
    "testimonials"
  ) {
    requireField(
      "clientName",
      "Client name"
    );

    requireField(
      "text",
      "Testimonial"
    );
  }

  /*
  |--------------------------------------------------------------------------
  | FAQ
  |--------------------------------------------------------------------------
  */

  if (
    collection === "faqs"
  ) {
    requireField(
      "question",
      "Question"
    );

    requireField(
      "answer",
      "Answer"
    );
  }

  /*
  |--------------------------------------------------------------------------
  | JOBS
  |--------------------------------------------------------------------------
  */

  if (
    collection === "jobs"
  ) {
    requireField(
      "title",
      "Job title"
    );

    requireField(
      "description",
      "Description"
    );

    if (
      data.status &&
      ![
        "open",
        "closed",
      ].includes(
        String(data.status)
      )
    ) {
      errors.push(
        "Job status is invalid."
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | CLIENT LOGOS
  |--------------------------------------------------------------------------
  */

  if (
    collection ===
    "clientLogos"
  ) {
    requireField(
      "name",
      "Client name"
    );

    if (
      !isUrl(data.logo)
    ) {
      errors.push(
        "Client logo is invalid."
      );
    }

    if (
      !isUrl(data.link)
    ) {
      errors.push(
        "Client website must be a valid URL."
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | SOCIAL LINKS
  |--------------------------------------------------------------------------
  */

  if (
    collection ===
      "socialLinks" &&
    !isUrl(data.url)
  ) {
    errors.push(
      "Profile URL must be valid."
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ANNOUNCEMENTS
  |--------------------------------------------------------------------------
  */

  if (
    collection ===
    "announcements"
  ) {
    requireField(
      "title",
      "Title"
    );

    requireField(
      "content",
      "Content"
    );

    if (
      !isUrl(data.image)
    ) {
      errors.push(
        "Announcement image is invalid."
      );
    }

    if (
      !isUrl(data.ctaLink)
    ) {
      errors.push(
        "CTA link must be valid."
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
    data.slug !== "" &&
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
