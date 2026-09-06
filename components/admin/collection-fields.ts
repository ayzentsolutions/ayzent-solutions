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

  /*
  |--------------------------------------------------------------------------
  | CMS Visual Category
  |--------------------------------------------------------------------------
  */

  group?: string;
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
  | WEBSITE SETTINGS
  |--------------------------------------------------------------------------
  */

  siteSettings: [
    /*
    | Brand & Identity
    */

    {
      name: "companyName",
      label: "Company Name",
      type: "text",
      required: true,
      group:
        "Brand & Identity",
    },

    {
      name:
        "companyDescription",

      label:
        "Company Description",

      type: "textarea",

      group:
        "Brand & Identity",
    },

    /*
    | Contact Information
    */

    {
      name: "email",
      label: "Business Email",
      type: "email",
      group:
        "Contact Information",
    },

    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      group:
        "Contact Information",
    },

    {
      name: "whatsapp",

      label:
        "WhatsApp Number",

      type: "text",

      hint:
        "Numbers with country code. Example: 919876543210",

      group:
        "Contact Information",
    },

    {
      name: "location",

      label:
        "Location / Working From",

      type: "text",

      group:
        "Contact Information",
    },

    /*
    | Header
    */

    {
      name:
        "headerButtonText",

      label:
        "Header Button Text",

      type: "text",

      group:
        "Header",
    },

    {
      name:
        "headerButtonLink",

      label:
        "Header Button Link",

      type: "text",

      hint:
        "Example: /contact",

      group:
        "Header",
    },

    /*
    | Homepage CTA
    */

    {
      name:
        "homeCtaEyebrow",

      label:
        "CTA Eyebrow",

      type: "text",

      group:
        "Homepage CTA",
    },

    {
      name:
        "homeCtaTitle",

      label:
        "CTA Title",

      type: "textarea",

      group:
        "Homepage CTA",
    },

    {
      name:
        "homeCtaButtonText",

      label:
        "CTA Button Text",

      type: "text",

      group:
        "Homepage CTA",
    },

    {
      name:
        "homeCtaButtonLink",

      label:
        "CTA Button Link",

      type: "text",

      hint:
        "Example: /contact",

      group:
        "Homepage CTA",
    },

    /*
    | Footer
    */

    {
      name:
        "footerDescription",

      label:
        "Footer Description",

      type: "textarea",

      group:
        "Footer",
    },

    /*
    | Contact Page
    */

    {
      name:
        "contactEyebrow",

      label:
        "Contact Eyebrow",

      type: "text",

      group:
        "Contact Page",
    },

    {
      name:
        "contactTitle",

      label:
        "Contact Page Title",

      type: "textarea",

      group:
        "Contact Page",
    },

    {
      name:
        "contactText",

      label:
        "Contact Page Description",

      type: "textarea",

      group:
        "Contact Page",
    },
  ],

  /*
  |--------------------------------------------------------------------------
  | HERO SLIDES
  |--------------------------------------------------------------------------
  */

  heroSlides: [
    {
      name: "eyebrow",
      label: "Eyebrow",
      type: "text",
      hint:
        "Small text above the main title.",
      group:
        "Slide Content",
    },

    {
      name: "title",
      label: "Hero Title",
      type: "textarea",
      required: true,
      group:
        "Slide Content",
    },

    {
      name: "highlight",
      label: "Highlighted Text",
      type: "text",
      hint:
        "This exact part of the title will appear in gold.",
      group:
        "Slide Content",
    },

    {
      name: "text",
      label: "Description",
      type: "textarea",
      group:
        "Slide Content",
    },

    {
      name: "image",
      label:
        "Background Image",

      type: "image",

      required: true,

      hint:
        "Recommended: high-quality landscape image, minimum 1920px wide.",

      group:
        "Background",
    },

    {
      name:
        "overlayStrength",

      label:
        "Overlay Strength",

      type: "select",

      options: [
        "light",
        "medium",
        "dark",
      ],

      group:
        "Background",
    },

    {
      name:
        "primaryText",

      label:
        "Primary Button Text",

      type: "text",

      group:
        "Primary Action",
    },

    {
      name:
        "primaryLink",

      label:
        "Primary Button Link",

      type: "text",

      hint:
        "Example: /contact",

      group:
        "Primary Action",
    },

    {
      name:
        "secondaryText",

      label:
        "Secondary Button Text",

      type: "text",

      group:
        "Secondary Action",
    },

    {
      name:
        "secondaryLink",

      label:
        "Secondary Button Link",

      type: "text",

      hint:
        "Example: /projects",

      group:
        "Secondary Action",
    },

    {
      name:
        "displayOrder",

      label:
        "Display Order",

      type: "number",

      group:
        "Publishing",
    },

    {
      name: "active",

      label:
        "Active",

      type: "checkbox",

      group:
        "Publishing",
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
      group: "Hero",
    },

    {
      name: "heroTitle",
      label: "Hero Title",
      type: "textarea",
      required: true,
      group: "Hero",
    },

    {
      name: "heroText",
      label:
        "Hero Description",
      type: "textarea",
      group: "Hero",
    },

    {
      name: "storyEyebrow",
      label:
        "Story Section Eyebrow",
      type: "text",
      group: "Our Story",
    },

    {
      name:
        "storyParagraphOne",

      label:
        "Story Paragraph 1",

      type: "textarea",

      group:
        "Our Story",
    },

    {
      name:
        "storyParagraphTwo",

      label:
        "Story Paragraph 2",

      type: "textarea",

      group:
        "Our Story",
    },

    {
      name:
        "missionEyebrow",

      label:
        "Mission Eyebrow",

      type: "text",

      group:
        "Mission",
    },

    {
      name: "mission",
      label: "Mission",
      type: "textarea",
      group: "Mission",
    },

    {
      name:
        "visionEyebrow",

      label:
        "Vision Eyebrow",

      type: "text",

      group:
        "Vision",
    },

    {
      name: "vision",
      label: "Vision",
      type: "textarea",
      group: "Vision",
    },

    {
      name:
        "valuesEyebrow",

      label:
        "Values Eyebrow",

      type: "text",

      group:
        "Values",
    },

    {
      name: "values",
      label:
        "Company Values",
      type: "tags",
      hint:
        "Separate values with commas.",
      group: "Values",
    },

    {
      name:
        "teamEyebrow",

      label:
        "Team Section Eyebrow",

      type: "text",

      group:
        "Team Section",
    },

    {
      name: "teamTitle",

      label:
        "Team Section Title",

      type: "textarea",

      group:
        "Team Section",
    },

    {
      name: "teamText",

      label:
        "Team Introduction",

      type: "textarea",

      group:
        "Team Section",
    },

    {
      name: "quote",
      label: "Founder Quote",
      type: "textarea",
      group: "Quote",
    },

    {
      name: "quoteAuthor",

      label:
        "Quote Author",

      type: "text",

      group:
        "Quote",
    },

    {
      name: "ctaTitle",
      label: "CTA Title",
      type: "text",
      group: "CTA",
    },

    {
      name: "ctaText",
      label:
        "CTA Description",
      type: "textarea",
      group: "CTA",
    },

    {
      name:
        "ctaButtonText",

      label:
        "CTA Button Text",

      type: "text",

      group:
        "CTA",
    },

    {
      name:
        "ctaButtonLink",

      label:
        "CTA Button Link",

      type: "text",

      group:
        "CTA",
    },
  ],

  announcements: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
      group: "Content",
    },

    {
      name: "content",
      label: "Content",
      type: "textarea",
      required: true,
      group: "Content",
    },

    {
      name: "image",
      label:
        "Announcement Image",
      type: "image",
      group: "Media",
    },

    {
      name: "ctaText",
      label: "CTA Text",
      type: "text",
      group: "Action",
    },

    {
      name: "ctaLink",
      label: "CTA Link",
      type: "url",
      group: "Action",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
      group: "Publishing",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Publishing",
    },
  ],

  services: [
    {
      name: "title",
      label: "Service Name",
      type: "text",
      required: true,
      group: "Service",
    },

    {
      name: "text",
      label: "Summary",
      type: "textarea",
      required: true,
      group: "Service",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
      group: "Publishing",
    },

    {
      name: "published",
      label: "Published",
      type: "checkbox",
      group: "Publishing",
    },
  ],

  projects: [
    {
      name: "name",
      label: "Project Name",
      type: "text",
      required: true,
      group: "Project",
    },

    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      group: "Project",
    },

    {
      name: "overview",
      label: "Overview",
      type: "textarea",
      required: true,
      group: "Project",
    },

    {
      name: "category",
      label: "Category",
      type: "text",
      required: true,
      group: "Project",
    },

    {
      name: "client",
      label: "Client",
      type: "text",
      group: "Project",
    },

    {
      name: "coverImage",
      label: "Cover Image",
      type: "image",
      group: "Media",
    },

    {
      name: "challenge",
      label: "Challenge",
      type: "textarea",
      group: "Case Study",
    },

    {
      name: "solution",
      label: "Solution",
      type: "textarea",
      group: "Case Study",
    },

    {
      name: "features",
      label: "Features",
      type: "tags",
      group: "Case Study",
    },

    {
      name: "technologies",
      label: "Technologies",
      type: "tags",
      group: "Case Study",
    },

    {
      name: "gallery",
      label: "Gallery Images",
      type: "tags",
      group: "Media",
    },

    {
      name: "liveLink",
      label: "Live Link",
      type: "url",
      group: "Links",
    },

    {
      name: "status",
      label: "Status",
      type: "select",
      options: status,
      group: "Publishing",
    },

    {
      name: "outcomes",
      label: "Outcomes",
      type: "textarea",
      group: "Case Study",
    },

    {
      name: "featured",
      label:
        "Featured Project",
      type: "checkbox",
      group: "Publishing",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
      group: "Publishing",
    },

    {
      name: "published",
      label: "Published",
      type: "checkbox",
      group: "Publishing",
    },
  ],

  posts: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
      group: "Article",
    },

    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      group: "Article",
    },

    {
      name: "excerpt",
      label: "Excerpt",
      type: "textarea",
      required: true,
      group: "Article",
    },

    {
      name: "content",
      label:
        "Article Content",
      type: "markdown",
      required: true,
      group: "Article",
    },

    {
      name: "category",
      label: "Category",
      type: "text",
      required: true,
      group: "Classification",
    },

    {
      name: "tags",
      label: "Tags",
      type: "tags",
      group: "Classification",
    },

    {
      name: "coverImage",
      label: "Cover Image",
      type: "image",
      group: "Media",
    },

    {
      name: "seoTitle",
      label: "SEO Title",
      type: "text",
      group: "SEO",
    },

    {
      name:
        "seoDescription",

      label:
        "SEO Description",

      type:
        "textarea",

      group:
        "SEO",
    },

    {
      name: "status",
      label: "Status",
      type: "select",
      options: status,
      group: "Publishing",
    },

    {
      name:
        "displayOrder",

      label:
        "Display Order",

      type: "number",

      group:
        "Publishing",
    },

    {
      name: "published",
      label: "Published",
      type: "checkbox",
      group: "Publishing",
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
      name:
        "displayOrder",

      label:
        "Display Order",

      type:
        "number",
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
      group: "Member",
    },

    {
      name: "role",
      label: "Role",
      type: "text",
      required: true,
      group: "Member",
    },

    {
      name: "shortBio",
      label: "Short Bio",
      type: "textarea",
      group: "Member",
    },

    {
      name: "image",
      label: "Profile Image",
      type: "image",
      group: "Media",
    },

    {
      name: "socialLinks",
      label: "Social Links",
      type: "tags",
      group: "Links",
    },

    {
      name:
        "displayOrder",

      label:
        "Display Order",

      type:
        "number",

      group:
        "Publishing",
    },

    {
      name:
        "published",

      label:
        "Published",

      type:
        "checkbox",

      group:
        "Publishing",
    },
  ],

  testimonials: [
    {
      name:
        "clientName",

      label:
        "Client Name",

      type:
        "text",

      required: true,

      group:
        "Client",
    },

    {
      name:
        "roleCompany",

      label:
        "Role / Company",

      type:
        "text",

      group:
        "Client",
    },

    {
      name: "text",

      label:
        "Testimonial",

      type:
        "textarea",

      required: true,

      group:
        "Testimonial",
    },

    {
      name:
        "displayOrder",

      label:
        "Display Order",

      type:
        "number",

      group:
        "Publishing",
    },

    {
      name:
        "active",

      label:
        "Active",

      type:
        "checkbox",

      group:
        "Publishing",
    },
  ],

  clientLogos: [
    {
      name: "name",
      label: "Client Name",
      type: "text",
      required: true,
      group: "Client",
    },

    {
      name: "logo",
      label: "Client Logo",
      type: "image",
      group: "Media",
    },

    {
      name: "link",
      label: "Website URL",
      type: "url",
      group: "Links",
    },

    {
      name:
        "displayOrder",

      label:
        "Display Order",

      type:
        "number",

      group:
        "Publishing",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Publishing",
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
      name:
        "displayOrder",

      label:
        "Display Order",

      type:
        "number",
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
      group: "Position",
    },

    {
      name:
        "description",

      label:
        "Description",

      type:
        "markdown",

      required: true,

      group:
        "Position",
    },

    {
      name:
        "requirements",

      label:
        "Requirements",

      type:
        "tags",

      group:
        "Position",
    },

    {
      name:
        "location",

      label:
        "Location",

      type:
        "text",

      group:
        "Position",
    },

    {
      name: "type",

      label:
        "Employment Type",

      type:
        "text",

      group:
        "Position",
    },

    {
      name:
        "applicationInstructions",

      label:
        "Application Instructions",

      type:
        "textarea",

      group:
        "Application",
    },

    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        "open",
        "closed",
      ],
      group: "Publishing",
    },

    {
      name:
        "displayOrder",

      label:
        "Display Order",

      type:
        "number",

      group:
        "Publishing",
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
      name:
        "displayOrder",

      label:
        "Display Order",

      type:
        "number",
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

      type:
        "select",

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

      type:
        "select",

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

      type:
        "select",

      options: [
        "pending",
        "approved",
        "rejected",
      ],

      required: true,
    },
  ],
};
