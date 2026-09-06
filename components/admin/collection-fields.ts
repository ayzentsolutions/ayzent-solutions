export type FieldType =
  | "text"
  | "textarea"
  | "markdown"
  | "number"
  | "url"
  | "email"
  | "checkbox"
  | "select"
  | "tags"
  | "image";

export type AdminField = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  hint?: string;
};

const status = [
  "draft",
  "published",
  "archived",
];

export const collectionFields: Record<
  string,
  AdminField[]
> = {
  /*
  |--------------------------------------------------------------------------
  | SITE SETTINGS
  |--------------------------------------------------------------------------
  */

  siteSettings: [
    {
      name: "companyName",
      label: "Company Name",
      type: "text",
      required: true,
    },

    {
      name: "companyDescription",
      label: "Company Description",
      type: "textarea",
    },

    {
      name: "email",
      label: "Email",
      type: "email",
    },

    {
      name: "phone",
      label: "Phone",
      type: "text",
    },

    {
      name: "whatsapp",
      label: "WhatsApp Number",
      type: "text",
    },

    {
      name: "address",
      label: "Address",
      type: "text",
    },

    {
      name: "heroEyebrow",
      label: "Homepage Hero Eyebrow",
      type: "text",
    },

    {
      name: "heroTitle",
      label: "Homepage Hero Title",
      type: "textarea",
    },

    {
      name: "heroText",
      label: "Homepage Hero Description",
      type: "textarea",
    },

    {
      name: "heroPrimaryText",
      label: "Primary CTA Text",
      type: "text",
    },

    {
      name: "heroPrimaryLink",
      label: "Primary CTA Link",
      type: "text",
    },

    {
      name: "heroSecondaryText",
      label: "Secondary CTA Text",
      type: "text",
    },

    {
      name: "heroSecondaryLink",
      label: "Secondary CTA Link",
      type: "text",
    },

    {
      name: "footerDescription",
      label: "Footer Description",
      type: "textarea",
    },
  ],

  /*
  |--------------------------------------------------------------------------
  | ANNOUNCEMENTS
  |--------------------------------------------------------------------------
  */

  announcements: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },

    {
      name: "content",
      label: "Content",
      type: "textarea",
      required: true,
    },

    {
      name: "image",
      label: "Announcement Image",
      type: "image",
    },

    {
      name: "ctaText",
      label: "CTA Text",
      type: "text",
    },

    {
      name: "ctaLink",
      label: "CTA Link",
      type: "url",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
    },
  ],

  /*
  |--------------------------------------------------------------------------
  | SERVICES
  |--------------------------------------------------------------------------
  */

  services: [
    {
      name: "title",
      label: "Service Name",
      type: "text",
      required: true,
    },

    {
      name: "text",
      label: "Summary",
      type: "textarea",
      required: true,
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },

    {
      name: "published",
      label: "Published",
      type: "checkbox",
    },
  ],

  /*
  |--------------------------------------------------------------------------
  | PROJECTS
  |--------------------------------------------------------------------------
  */

  projects: [
    {
      name: "name",
      label: "Project Name",
      type: "text",
      required: true,
    },

    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      hint:
        "Lowercase words separated by hyphens.",
    },

    {
      name: "overview",
      label: "Overview",
      type: "textarea",
      required: true,
    },

    {
      name: "category",
      label: "Category",
      type: "text",
      required: true,
    },

    {
      name: "client",
      label: "Client",
      type: "text",
    },

    {
      name: "coverImage",
      label: "Cover Image",
      type: "image",
    },

    {
      name: "challenge",
      label: "Challenge",
      type: "textarea",
    },

    {
      name: "solution",
      label: "Solution",
      type: "textarea",
    },

    {
      name: "features",
      label: "Features",
      type: "tags",
    },

    {
      name: "technologies",
      label: "Technologies",
      type: "tags",
    },

    {
      name: "gallery",
      label: "Gallery Images",
      type: "tags",
      hint:
        "Currently enter image URLs separated by commas.",
    },

    {
      name: "liveLink",
      label: "Live Link",
      type: "url",
    },

    {
      name: "status",
      label: "Status",
      type: "select",
      options: status,
    },

    {
      name: "outcomes",
      label: "Outcomes",
      type: "textarea",
    },

    {
      name: "featured",
      label: "Featured Project",
      type: "checkbox",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },

    {
      name: "published",
      label: "Published",
      type: "checkbox",
    },
  ],

  /*
  |--------------------------------------------------------------------------
  | BLOG
  |--------------------------------------------------------------------------
  */

  posts: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },

    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
    },

    {
      name: "excerpt",
      label: "Excerpt",
      type: "textarea",
      required: true,
    },

    {
      name: "content",
      label: "Article Content",
      type: "markdown",
      required: true,
    },

    {
      name: "category",
      label: "Category",
      type: "text",
      required: true,
    },

    {
      name: "tags",
      label: "Tags",
      type: "tags",
    },

    {
      name: "coverImage",
      label: "Cover Image",
      type: "image",
    },

    {
      name: "seoTitle",
      label: "SEO Title",
      type: "text",
    },

    {
      name: "seoDescription",
      label: "SEO Description",
      type: "textarea",
    },

    {
      name: "status",
      label: "Status",
      type: "select",
      options: status,
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },

    {
      name: "published",
      label: "Published",
      type: "checkbox",
    },
  ],

  categories: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },

    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },
  ],

  tags: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },

    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
    },
  ],

  /*
  |--------------------------------------------------------------------------
  | TEAM
  |--------------------------------------------------------------------------
  */

  team: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },

    {
      name: "role",
      label: "Role",
      type: "text",
      required: true,
    },

    {
      name: "shortBio",
      label: "Short Bio",
      type: "textarea",
    },

    {
      name: "image",
      label: "Profile Image",
      type: "image",
    },

    {
      name: "socialLinks",
      label: "Social Links",
      type: "tags",
      hint:
        "Enter one URL per item, separated by commas.",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },

    {
      name: "published",
      label: "Published",
      type: "checkbox",
    },
  ],

  testimonials: [
    {
      name: "clientName",
      label: "Client Name",
      type: "text",
      required: true,
    },

    {
      name: "roleCompany",
      label: "Role / Company",
      type: "text",
    },

    {
      name: "text",
      label: "Testimonial",
      type: "textarea",
      required: true,
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
    },
  ],

  clientLogos: [
    {
      name: "name",
      label: "Client Name",
      type: "text",
      required: true,
    },

    {
      name: "logo",
      label: "Client Logo",
      type: "image",
    },

    {
      name: "link",
      label: "Website URL",
      type: "url",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
    },
  ],

  faqs: [
    {
      name: "question",
      label: "Question",
      type: "text",
      required: true,
    },

    {
      name: "answer",
      label: "Answer",
      type: "textarea",
      required: true,
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
    },
  ],

  /*
  |--------------------------------------------------------------------------
  | JOBS
  |--------------------------------------------------------------------------
  */

  jobs: [
    {
      name: "title",
      label: "Job Title",
      type: "text",
      required: true,
    },

    {
      name: "description",
      label: "Description",
      type: "markdown",
      required: true,
    },

    {
      name: "requirements",
      label: "Requirements",
      type: "tags",
    },

    {
      name: "location",
      label: "Location",
      type: "text",
    },

    {
      name: "type",
      label: "Employment Type",
      type: "text",
    },

    {
      name: "applicationInstructions",
      label: "Application Instructions",
      type: "textarea",
    },

    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["open", "closed"],
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },
  ],

  /*
  |--------------------------------------------------------------------------
  | SOCIAL
  |--------------------------------------------------------------------------
  */

  socialLinks: [
    {
      name: "label",
      label: "Label",
      type: "text",
      required: true,
    },

    {
      name: "url",
      label: "Profile URL",
      type: "url",
      required: true,
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
    },
  ],

  /*
  |--------------------------------------------------------------------------
  | ADMIN ONLY
  |--------------------------------------------------------------------------
  */

  inquiries: [
    {
      name: "status",
      label: "Inquiry Status",
      type: "select",
      options: [
        "New",
        "Contacted",
        "In Progress",
        "Converted",
        "Closed",
      ],
      required: true,
    },
  ],

  newsletterSubscribers: [
    {
      name: "status",
      label: "Subscriber Status",
      type: "select",
      options: [
        "active",
        "unsubscribed",
      ],
      required: true,
    },
  ],

  comments: [
    {
      name: "status",
      label: "Moderation Status",
      type: "select",
      options: [
        "pending",
        "approved",
        "rejected",
      ],
      required: true,
    },
  ],
};
