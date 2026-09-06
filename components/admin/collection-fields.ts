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

export const collectionFields:
  Record<
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
      label: "Business Email",
      type: "email",
    },

    {
      name: "phone",
      label: "Phone Number",
      type: "text",
    },

    {
      name: "whatsapp",
      label: "WhatsApp Number",
      type: "text",
      hint:
        "Enter numbers only with country code. Example: 919876543210",
    },

    {
      name: "location",
      label: "Location / Working From",
      type: "text",
    },

    {
      name: "footerDescription",
      label: "Footer Description",
      type: "textarea",
    },

    /*
    | Homepage Hero
    */

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
      name: "heroHighlight",
      label: "Homepage Hero Highlight",
      type: "text",
      hint:
        "This part will appear in gold italic styling.",
    },

    {
      name: "heroText",
      label:
        "Homepage Hero Description",
      type: "textarea",
    },

    {
      name: "heroPrimaryText",
      label:
        "Primary Button Text",
      type: "text",
    },

    {
      name: "heroPrimaryLink",
      label:
        "Primary Button Link",
      type: "text",
    },

    {
      name: "heroSecondaryText",
      label:
        "Secondary Button Text",
      type: "text",
    },

    {
      name: "heroSecondaryLink",
      label:
        "Secondary Button Link",
      type: "text",
    },

    /*
    | Homepage CTA
    */

    {
      name: "homeCtaEyebrow",
      label:
        "Homepage CTA Eyebrow",
      type: "text",
    },

    {
      name: "homeCtaTitle",
      label:
        "Homepage CTA Title",
      type: "textarea",
    },

    {
      name: "homeCtaButtonText",
      label:
        "Homepage CTA Button Text",
      type: "text",
    },

    {
      name: "homeCtaButtonLink",
      label:
        "Homepage CTA Button Link",
      type: "text",
    },

    /*
    | Header
    */

    {
      name: "headerButtonText",
      label:
        "Header Button Text",
      type: "text",
    },

    {
      name: "headerButtonLink",
      label:
        "Header Button Link",
      type: "text",
    },

    /*
    | Contact Page
    */

    {
      name: "contactEyebrow",
      label:
        "Contact Hero Eyebrow",
      type: "text",
    },

    {
      name: "contactTitle",
      label:
        "Contact Hero Title",
      type: "textarea",
    },

    {
      name: "contactText",
      label:
        "Contact Hero Description",
      type: "textarea",
    },
  ],

  /*
  |--------------------------------------------------------------------------
  | ABOUT PAGE
  |--------------------------------------------------------------------------
  */

  aboutContent: [
    {
      name: "heroEyebrow",
      label: "Hero Eyebrow",
      type: "text",
    },

    {
      name: "heroTitle",
      label: "Hero Title",
      type: "textarea",
      required: true,
    },

    {
      name: "heroText",
      label:
        "Hero Description",
      type: "textarea",
    },

    /*
    | Story
    */

    {
      name: "storyEyebrow",
      label:
        "Story Section Eyebrow",
      type: "text",
    },

    {
      name: "storyParagraphOne",
      label:
        "Story Paragraph 1",
      type: "textarea",
    },

    {
      name: "storyParagraphTwo",
      label:
        "Story Paragraph 2",
      type: "textarea",
    },

    /*
    | Mission
    */

    {
      name: "missionEyebrow",
      label:
        "Mission Eyebrow",
      type: "text",
    },

    {
      name: "mission",
      label: "Mission",
      type: "textarea",
    },

    /*
    | Vision
    */

    {
      name: "visionEyebrow",
      label:
        "Vision Eyebrow",
      type: "text",
    },

    {
      name: "vision",
      label: "Vision",
      type: "textarea",
    },

    /*
    | Values
    */

    {
      name: "valuesEyebrow",
      label:
        "Values Eyebrow",
      type: "text",
    },

    {
      name: "values",
      label: "Company Values",
      type: "tags",
      hint:
        "Separate values with commas.",
    },

    /*
    | Team
    */

    {
      name: "teamEyebrow",
      label:
        "Team Section Eyebrow",
      type: "text",
    },

    {
      name: "teamTitle",
      label:
        "Team Section Title",
      type: "textarea",
    },

    {
      name: "teamText",
      label:
        "Team Introduction",
      type: "textarea",
    },

    /*
    | Founder Quote
    */

    {
      name: "quote",
      label: "Founder Quote",
      type: "textarea",
    },

    {
      name: "quoteAuthor",
      label:
        "Quote Author",
      type: "text",
    },

    /*
    | CTA
    */

    {
      name: "ctaTitle",
      label: "CTA Title",
      type: "text",
    },

    {
      name: "ctaText",
      label: "CTA Description",
      type: "textarea",
    },

    {
      name: "ctaButtonText",
      label:
        "CTA Button Text",
      type: "text",
    },

    {
      name: "ctaButtonLink",
      label:
        "CTA Button Link",
      type: "text",
    },
  ],

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
      label:
        "Announcement Image",
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
      label:
        "Featured Project",
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
      label:
        "Article Content",
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
      label:
        "SEO Description",
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
      label:
        "Role / Company",
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
      label:
        "Employment Type",
      type: "text",
    },

    {
      name:
        "applicationInstructions",
      label:
        "Application Instructions",
      type: "textarea",
    },

    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        "open",
        "closed",
      ],
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },
  ],

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

  inquiries: [
    {
      name: "status",
      label:
        "Inquiry Status",
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
      label:
        "Subscriber Status",
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
      label:
        "Moderation Status",
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
