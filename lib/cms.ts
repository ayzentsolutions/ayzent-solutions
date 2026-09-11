
/*
|--------------------------------------------------------------------------
| CMS COLLECTIONS
|--------------------------------------------------------------------------
*/

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
  "products",

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
  | Company
  |--------------------------------------------------------------------------
  */

  "team",
  "testimonials",
  "clientLogos",
  "faqs",

  /*
  |--------------------------------------------------------------------------
  | Global Website Content
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

/*
|--------------------------------------------------------------------------
| EDITOR PERMISSIONS
|--------------------------------------------------------------------------
*/

export const editorCollections:
  CmsCollection[] = [
  "siteSettings",
  "heroSlides",

  "aboutContent",

  "services",
  "projects",
  "products",

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

/*
|--------------------------------------------------------------------------
| COLLECTION HELPERS
|--------------------------------------------------------------------------
*/

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
| SINGLETON COLLECTIONS
|--------------------------------------------------------------------------
|
| These collections should only have one primary content document.
|
| The API must also enforce this rule.
|--------------------------------------------------------------------------
*/

export const singletonCollections:
  CmsCollection[] = [
  "siteSettings",
  "aboutContent",
];

export function isSingletonCollection(
  collection: CmsCollection
) {
  return singletonCollections.includes(
    collection
  );
}

/*
|--------------------------------------------------------------------------
| CMS NAVIGATION
|--------------------------------------------------------------------------
|
| The CMS menu follows the public website structure instead of
| grouping unrelated features together.
|--------------------------------------------------------------------------
*/

export const cmsNavigation = [
  {
    title: "HOME",

    items: [
      "siteSettings",
      "heroSlides",
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
  { title: "PRODUCTS", items: ["products"] },

  {
    title: "BLOG",

    items: [
      "posts",
      "categories",
      "tags",
      "comments",
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
    title: "GLOBAL",

    items: [
      "announcements",
      "newsletterSubscribers",
    ],
  },
] as const;

/*
|--------------------------------------------------------------------------
| COLLECTION LABELS
|--------------------------------------------------------------------------
*/

export const collectionLabels:
  Record<
    CmsCollection,
    string
  > = {
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
  products: "Our Products",

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

/*
|--------------------------------------------------------------------------
| VALIDATION CONSTANTS
|--------------------------------------------------------------------------
*/

const statuses = [
  "draft",
  "published",
  "archived",
];

/*
|--------------------------------------------------------------------------
| VALIDATION HELPERS
|--------------------------------------------------------------------------
*/

const isText = (
  value: unknown,
  minimum = 1
) =>
  typeof value === "string" &&
  value.trim().length >= minimum;

const isOptionalText = (
  value: unknown
) =>
  value === undefined ||
  value === null ||
  value === "" ||
  typeof value === "string";

const isOrder = (
  value: unknown
) =>
  value === undefined ||
  value === null ||
  value === "" ||
  (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0
  );

const isUrl = (
  value: unknown
) => {
  /*
  |--------------------------------------------------------------------------
  | Empty URLs are valid.
  |
  | CMS fields are optional.
  |--------------------------------------------------------------------------
  */

  if (
    value === undefined ||
    value === null ||
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
  | Internal URLs
  |--------------------------------------------------------------------------
  */

  if (
    value.startsWith("/")
  ) {
    return true;
  }

  /*
  |--------------------------------------------------------------------------
  | Hash URLs
  |--------------------------------------------------------------------------
  */

  if (
    value.startsWith("#")
  ) {
    return true;
  }

  /*
  |--------------------------------------------------------------------------
  | External URLs
  |--------------------------------------------------------------------------
  */

  try {
    const url =
      new URL(value);

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
  value === null ||
  (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "string" &&
        item.length <= 500
    )
  );

/*
|--------------------------------------------------------------------------
| CMS VALIDATION
|--------------------------------------------------------------------------
*/

export function validateCmsData(
  collection: CmsCollection,
  data: Record<
    string,
    unknown
  >
) {
  const errors: string[] = [];

  /*
  |--------------------------------------------------------------------------
  | Helper
  |--------------------------------------------------------------------------
  */

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
  | DISPLAY ORDER
  |--------------------------------------------------------------------------
  |
  | Supports both older displayOrder data and future optional usage.
  |--------------------------------------------------------------------------
  */

  if (
    [
      "heroSlides",
      "services",
      "projects", "products",
      "posts",
      "jobs",
      "announcements",
      "team",
      "testimonials",
      "clientLogos",
      "faqs",
    ].includes(collection)
  ) {
    if (
      !isOrder(
        data.displayOrder
      )
    ) {
      errors.push(
        "Display order must be a non-negative whole number."
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | SITE SETTINGS
  |--------------------------------------------------------------------------
  |
  | IMPORTANT:
  |
  | Nothing in Site Settings is mandatory.
  |
  | Existing website defaults are allowed to continue working when
  | the database has no value.
  |
  | companyDescription has intentionally been removed.
  |
  | companyLogo is an optional Cloudinary image URL.
  |--------------------------------------------------------------------------
  */

  if (
    collection ===
    "siteSettings"
  ) {
    const optionalTextFields = [
      "companyName",

      "companyLogo",

      "email",
      "phone",
      "whatsapp",
      "location",

      "headerButtonText",
      "headerButtonLink",

      "ctaEyebrow",
      "ctaTitle",
      "ctaButtonText",
      "ctaButtonLink",

      "footerDescription",

      "contactEyebrow",
      "contactTitle",
      "contactDescription",
    ];

    optionalTextFields.forEach(
      (field) => {
        if (
          !isOptionalText(
            data[field]
          )
        ) {
          errors.push(
            `${field} must be text.`
          );
        }
      }
    );

    if (
      !isUrl(
        data.companyLogo
      )
    ) {
      errors.push(
        "Company logo must be a valid image URL."
      );
    }

    if (
      !isUrl(
        data.headerButtonLink
      )
    ) {
      errors.push(
        "Header button link must be valid."
      );
    }

    if (
      !isUrl(
        data.ctaButtonLink
      )
    ) {
      errors.push(
        "CTA button link must be valid."
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | HERO SLIDES
  |--------------------------------------------------------------------------
  |
  | Hero content remains optional.
  |
  | The public website can use the first active slide as the fixed
  | content source and rotate all available images in the background.
  |--------------------------------------------------------------------------
  */

  if (
    collection ===
    "heroSlides"
  ) {
    if (
      !isOptionalText(
        data.title
      )
    ) {
      errors.push(
        "Hero title must be text."
      );
    }

    if (
      !isUrl(
        data.image
      )
    ) {
      errors.push(
        "Hero background image is invalid."
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Support both old and new field names.
    |--------------------------------------------------------------------------
    */

    const primaryLink =
      data.primaryLink ??
      data.primaryButtonLink;

    const secondaryLink =
      data.secondaryLink ??
      data.secondaryButtonLink;

    if (
      !isUrl(
        primaryLink
      )
    ) {
      errors.push(
        "Primary button link is invalid."
      );
    }

    if (
      !isUrl(
        secondaryLink
      )
    ) {
      errors.push(
        "Secondary button link is invalid."
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | ABOUT CONTENT
  |--------------------------------------------------------------------------
  */

  if (
    collection ===
    "aboutContent"
  ) {
    /*
    |--------------------------------------------------------------------------
    | About content is intentionally optional.
    |--------------------------------------------------------------------------
    */

    if (
      !isOptionalText(
        data.heroTitle
      )
    ) {
      errors.push(
        "Hero title must be text."
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | SERVICES
  |--------------------------------------------------------------------------
  */

  if (
    collection ===
    "services"
  ) {
    requireField(
      "title",
      "Service name"
    );

    /*
    |--------------------------------------------------------------------------
    | Support old and newer content structures.
    |--------------------------------------------------------------------------
    */

    const text =
      data.text ??
      data.shortDescription ??
      data.description;

    if (
      text !== undefined &&
      text !== null &&
      typeof text !== "string"
    ) {
      errors.push(
        "Service content must be text."
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | PROJECTS
  |--------------------------------------------------------------------------
  */

  if (
    collection ===
    "projects"
  ) {
    requireField(
      "name",
      "Project name"
    );

    requireField(
      "slug",
      "Slug"
    );

    /*
    |--------------------------------------------------------------------------
    | Existing projects use overview.
    |--------------------------------------------------------------------------
    */

    if (
      data.overview !== undefined &&
      !isOptionalText(
        data.overview
      )
    ) {
      errors.push(
        "Overview must be text."
      );
    }

    if (
      data.category !== undefined &&
      !isOptionalText(
        data.category
      )
    ) {
      errors.push(
        "Category must be text."
      );
    }

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
    ].forEach(
      (key) => {
        if (
          !isUrl(
            data[key]
          )
        ) {
          errors.push(
            `${key} must be a valid URL.`
          );
        }
      }
    );

    [
      "features",
      "technologies",
      "gallery",
    ].forEach(
      (key) => {
        if (
          !arrayOfStrings(
            data[key]
          )
        ) {
          errors.push(
            `${key} must contain only text values.`
          );
        }
      }
    );
  }

  if (collection === "products") {
    requireField("name", "Product name");
    requireField("slug", "Slug");
    requireField("shortDescription", "Short description");
    requireField("content", "Full description");
    if (!isOptionalText(data.category)) errors.push("Category must be text.");
    if (!statuses.includes(String(data.status))) errors.push("Product status must be draft, published, or archived.");
    ["coverImage", "url", "ctaLink"].forEach((key) => { if (!isUrl(data[key])) errors.push(`${key} must be a valid URL.`); });
    ["gallery", "technologies", "features"].forEach((key) => { if (!arrayOfStrings(data[key])) errors.push(`${key} must contain only text values.`); });
  }

  /*
  |--------------------------------------------------------------------------
  | POSTS
  |--------------------------------------------------------------------------
  */

  if (
    collection ===
    "posts"
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
    collection ===
    "team"
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

    /*
    |--------------------------------------------------------------------------
    | Supports old "text" and newer "quote".
    |--------------------------------------------------------------------------
    */

    const testimonial =
      data.text ??
      data.quote;

    if (
      testimonial !== undefined &&
      !isText(
        testimonial
      )
    ) {
      errors.push(
        "Testimonial must contain text."
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | FAQ
  |--------------------------------------------------------------------------
  */

  if (
    collection ===
    "faqs"
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
    collection ===
    "jobs"
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
      !isUrl(
        data.logo
      )
    ) {
      errors.push(
        "Client logo is invalid."
      );
    }

    if (
      !isUrl(
        data.link
      )
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
    "socialLinks"
  ) {
    if (
      !isUrl(
        data.url
      )
    ) {
      errors.push(
        "Profile URL must be valid."
      );
    }
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

    /*
    |--------------------------------------------------------------------------
    | Support old content and newer description fields.
    |--------------------------------------------------------------------------
    */

    const content =
      data.content ??
      data.description;

    if (
      content !== undefined &&
      !isText(content)
    ) {
      errors.push(
        "Announcement content must contain text."
      );
    }

    if (
      !isUrl(
        data.image
      )
    ) {
      errors.push(
        "Announcement image is invalid."
      );
    }

    const ctaLink =
      data.ctaLink ??
      data.link;

    if (
      !isUrl(
        ctaLink
      )
    ) {
      errors.push(
        "CTA link must be valid."
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | SLUG VALIDATION
  |--------------------------------------------------------------------------
  */

  if (
    [
      "projects", "products",
      "posts",
      "categories",
      "tags",
    ].includes(collection) &&
    data.slug !== undefined &&
    data.slug !== ""
  ) {
    const slug =
      String(data.slug);

    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
        slug
      )
    ) {
      errors.push(
        "Slug must use lowercase letters, numbers, and hyphens only."
      );
    }
  }

  return errors;
}
