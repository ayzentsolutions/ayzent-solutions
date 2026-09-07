
export type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "number"
  | "url"
  | "date"
  | "image"
  | "checkbox"
  | "select"
  | "tags"
  | "markdown";

export type AdminField = {
  name: string;
  label: string;
  type: FieldType;

  required?: boolean;

  hint?: string;

  group?: string;

  options?: string[];
};

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
    /*
    |--------------------------------------------------------------------------
    | Brand & Identity
    |--------------------------------------------------------------------------
    */

    {
      name: "companyName",
      label: "Company Name",
      type: "text",
      group: "Brand & Identity",
    },

    {
      name: "companyLogo",
      label: "Company Logo",
      type: "image",
      hint:
        "Upload your company logo. PNG or WebP with a transparent background is recommended.",
      group: "Brand & Identity",
    },

    /*
    |--------------------------------------------------------------------------
    | Contact Information
    |--------------------------------------------------------------------------
    */

    {
      name: "email",
      label: "Business Email",
      type: "email",
      group: "Contact Information",
    },

    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      group: "Contact Information",
    },

    {
      name: "whatsapp",
      label: "WhatsApp Number",
      type: "text",
      hint:
        "Numbers with country code. Example: 919876543210",
      group: "Contact Information",
    },

    {
      name: "location",
      label: "Location / Working From",
      type: "text",
      group: "Contact Information",
    },

    /*
    |--------------------------------------------------------------------------
    | Header
    |--------------------------------------------------------------------------
    */

    {
      name: "headerButtonText",
      label: "Header Button Text",
      type: "text",
      group: "Header",
    },

    {
      name: "headerButtonLink",
      label: "Header Button Link",
      type: "text",
      hint: "Example: /contact",
      group: "Header",
    },

    /*
    |--------------------------------------------------------------------------
    | Homepage CTA
    |--------------------------------------------------------------------------
    */

    {
      name: "homeCtaEyebrow",
      label: "CTA Eyebrow",
      type: "text",
      group: "Homepage CTA",
    },

    {
      name: "homeCtaTitle",
      label: "CTA Title",
      type: "textarea",
      group: "Homepage CTA",
    },

    {
      name: "homeCtaButtonText",
      label: "CTA Button Text",
      type: "text",
      group: "Homepage CTA",
    },

    {
      name: "homeCtaButtonLink",
      label: "CTA Button Link",
      type: "text",
      hint: "Example: /contact",
      group: "Homepage CTA",
    },

    /*
    |--------------------------------------------------------------------------
    | Footer
    |--------------------------------------------------------------------------
    */

    {
      name: "footerDescription",
      label: "Footer Description",
      type: "textarea",
      group: "Footer",
    },

    /*
    |--------------------------------------------------------------------------
    | Contact Page
    |--------------------------------------------------------------------------
    */

    {
      name: "contactEyebrow",
      label: "Contact Eyebrow",
      type: "text",
      group: "Contact Page",
    },

    {
      name: "contactTitle",
      label: "Contact Page Title",
      type: "textarea",
      group: "Contact Page",
    },

    {
      name: "contactText",
      label: "Contact Page Description",
      type: "textarea",
      group: "Contact Page",
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
      group: "Content",
    },

    {
      name: "title",
      label: "Hero Title",
      type: "textarea",
      group: "Content",
    },

    {
      name: "highlight",
      label: "Highlighted Text",
      type: "text",
      hint:
        "Optional text from the title to visually highlight.",
      group: "Content",
    },

    {
      name: "text",
      label: "Hero Description",
      type: "textarea",
      group: "Content",
    },

    {
      name: "primaryText",
      label: "Primary Button Text",
      type: "text",
      group: "Buttons",
    },

    {
      name: "primaryLink",
      label: "Primary Button Link",
      type: "text",
      hint: "Example: /contact",
      group: "Buttons",
    },

    {
      name: "secondaryText",
      label: "Secondary Button Text",
      type: "text",
      group: "Buttons",
    },

    {
      name: "secondaryLink",
      label: "Secondary Button Link",
      type: "text",
      hint: "Example: /projects",
      group: "Buttons",
    },

    {
      name: "image",
      label: "Background Image",
      type: "image",
      hint:
        "This image is used in the homepage background carousel.",
      group: "Background",
    },

    {
      name: "overlayStrength",
      label: "Overlay Strength",
      type: "select",
      options: [
        "light",
        "medium",
        "dark",
      ],
      group: "Background",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Publishing",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
      group: "Publishing",
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
      label: "Service Title",
      type: "text",
      group: "Content",
    },

    {
      name: "slug",
      label: "Slug",
      type: "text",
      hint:
        "Example: web-development",
      group: "Content",
    },

    {
      name: "text",
      label: "Description",
      type: "textarea",
      group: "Content",
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

  /*
  |--------------------------------------------------------------------------
  | PROJECTS
  |--------------------------------------------------------------------------
  */

  projects: [
    {
      name: "title",
      label: "Project Title",
      type: "text",
      group: "Content",
    },

    {
      name: "slug",
      label: "Slug",
      type: "text",
      group: "Content",
    },

    {
      name: "category",
      label: "Category",
      type: "text",
      group: "Content",
    },

    {
      name: "excerpt",
      label: "Short Description",
      type: "textarea",
      group: "Content",
    },

    {
      name: "content",
      label: "Project Content",
      type: "markdown",
      group: "Content",
    },

    {
      name: "image",
      label: "Project Image",
      type: "image",
      group: "Media",
    },

    {
      name: "coverImage",
      label: "Cover Image",
      type: "image",
      group: "Media",
    },

    {
      name: "url",
      label: "Project URL",
      type: "url",
      group: "Links",
    },

    {
      name: "seoTitle",
      label: "SEO Title",
      type: "text",
      group: "SEO",
    },

    {
      name: "seoDescription",
      label: "SEO Description",
      type: "textarea",
      group: "SEO",
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

  /*
  |--------------------------------------------------------------------------
  | POSTS
  |--------------------------------------------------------------------------
  */

  posts: [
    {
      name: "title",
      label: "Post Title",
      type: "text",
      group: "Content",
    },

    {
      name: "slug",
      label: "Slug",
      type: "text",
      group: "Content",
    },

    {
      name: "category",
      label: "Category",
      type: "text",
      group: "Content",
    },

    {
      name: "date",
      label: "Publication Date",
      type: "date",
      group: "Content",
    },

    {
      name: "excerpt",
      label: "Excerpt",
      type: "textarea",
      group: "Content",
    },

    {
      name: "content",
      label: "Article Content",
      type: "markdown",
      group: "Content",
    },

    {
      name: "tags",
      label: "Tags",
      type: "tags",
      hint:
        "Separate tags with commas.",
      group: "Content",
    },

    {
      name: "coverImage",
      label: "Cover Image",
      type: "image",
      group: "Media",
    },

    {
      name: "image",
      label: "Article Image",
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
      name: "seoDescription",
      label: "SEO Description",
      type: "textarea",
      group: "SEO",
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

  /*
  |--------------------------------------------------------------------------
  | CATEGORIES
  |--------------------------------------------------------------------------
  */

  categories: [
    {
      name: "name",
      label: "Category Name",
      type: "text",
      group: "Content",
    },

    {
      name: "slug",
      label: "Slug",
      type: "text",
      group: "Content",
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

  /*
  |--------------------------------------------------------------------------
  | TAGS
  |--------------------------------------------------------------------------
  */

  tags: [
    {
      name: "name",
      label: "Tag Name",
      type: "text",
      group: "Content",
    },

    {
      name: "slug",
      label: "Slug",
      type: "text",
      group: "Content",
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
      group: "Profile",
    },

    {
      name: "role",
      label: "Role / Position",
      type: "text",
      group: "Profile",
    },

    {
      name: "shortBio",
      label: "Short Bio",
      type: "textarea",
      group: "Profile",
    },

    {
      name: "image",
      label: "Profile Photo",
      type: "image",
      group: "Media",
    },

    {
      name: "socialLinks",
      label: "Social Links",
      type: "tags",
      hint:
        "Separate URLs with commas.",
      group: "Links",
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

  /*
  |--------------------------------------------------------------------------
  | TESTIMONIALS
  |--------------------------------------------------------------------------
  */

  testimonials: [
    {
      name: "clientName",
      label: "Client Name",
      type: "text",
      group: "Client",
    },

    {
      name: "roleCompany",
      label: "Role / Company",
      type: "text",
      group: "Client",
    },

    {
      name: "role",
      label: "Role",
      type: "text",
      group: "Client",
    },

    {
      name: "company",
      label: "Company",
      type: "text",
      group: "Client",
    },

    {
      name: "text",
      label: "Testimonial",
      type: "textarea",
      group: "Content",
    },

    {
      name: "image",
      label: "Client Photo",
      type: "image",
      group: "Media",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Publishing",
    },

    {
      name: "published",
      label: "Published",
      type: "checkbox",
      group: "Publishing",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
      group: "Publishing",
    },
  ],

  /*
  |--------------------------------------------------------------------------
  | CLIENT LOGOS
  |--------------------------------------------------------------------------
  */

  clientLogos: [
    {
      name: "name",
      label: "Client Name",
      type: "text",
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
      label: "Website Link",
      type: "url",
      group: "Links",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Publishing",
    },

    {
      name: "published",
      label: "Published",
      type: "checkbox",
      group: "Publishing",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
      group: "Publishing",
    },
  ],

  /*
  |--------------------------------------------------------------------------
  | FAQS
  |--------------------------------------------------------------------------
  */

  faqs: [
    {
      name: "question",
      label: "Question",
      type: "text",
      group: "Content",
    },

    {
      name: "answer",
      label: "Answer",
      type: "textarea",
      group: "Content",
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

  /*
  |--------------------------------------------------------------------------
  | ANNOUNCEMENTS
  |--------------------------------------------------------------------------
  */

  announcements: [
    {
      name: "title",
      label: "Announcement Title",
      type: "text",
      group: "Content",
    },

    {
      name: "content",
      label: "Announcement Content",
      type: "textarea",
      group: "Content",
    },

    {
      name: "image",
      label: "Announcement Image",
      type: "image",
      group: "Media",
    },

    {
      name: "ctaText",
      label: "CTA Button Text",
      type: "text",
      group: "Call To Action",
    },

    {
      name: "ctaLink",
      label: "CTA Button Link",
      type: "text",
      hint:
        "Example: /contact or https://example.com",
      group: "Call To Action",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Publishing",
    },

    {
      name: "published",
      label: "Published",
      type: "checkbox",
      group: "Publishing",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
      group: "Publishing",
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
      group: "Position",
    },

    {
      name: "location",
      label: "Location",
      type: "text",
      group: "Position",
    },

    {
      name: "type",
      label: "Employment Type",
      type: "select",
      options: [
        "Full-time",
        "Part-time",
        "Contract",
        "Internship",
        "Remote",
      ],
      group: "Position",
    },

    {
      name: "description",
      label: "Job Description",
      type: "markdown",
      group: "Content",
    },

    {
      name: "requirements",
      label: "Requirements",
      type: "tags",
      hint:
        "Separate requirements with commas.",
      group: "Content",
    },

    {
      name: "applicationInstructions",
      label: "Application Instructions",
      type: "textarea",
      group: "Application",
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
      name: "published",
      label: "Published",
      type: "checkbox",
      group: "Publishing",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
      group: "Publishing",
    },
  ],

  /*
  |--------------------------------------------------------------------------
  | SOCIAL LINKS
  |--------------------------------------------------------------------------
  */

  socialLinks: [
    {
      name: "label",
      label: "Platform / Label",
      type: "text",
      hint:
        "Example: Instagram, LinkedIn, Facebook",
      group: "Social Link",
    },

    {
      name: "url",
      label: "Profile URL",
      type: "url",
      group: "Social Link",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Publishing",
    },

    {
      name: "published",
      label: "Published",
      type: "checkbox",
      group: "Publishing",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
      group: "Publishing",
    },
  ],

  /*
  |--------------------------------------------------------------------------
  | ABOUT PAGE CONTENT
  |--------------------------------------------------------------------------
  */

  aboutContent: [
    /*
    |--------------------------------------------------------------------------
    | Hero
    |--------------------------------------------------------------------------
    */

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
      group: "Hero",
    },

    {
      name: "heroText",
      label: "Hero Description",
      type: "textarea",
      group: "Hero",
    },

    /*
    |--------------------------------------------------------------------------
    | Story
    |--------------------------------------------------------------------------
    */

    {
      name: "storyEyebrow",
      label: "Story Eyebrow",
      type: "text",
      group: "Our Story",
    },

    {
      name: "storyParagraphOne",
      label: "Story Paragraph One",
      type: "textarea",
      group: "Our Story",
    },

    {
      name: "storyParagraphTwo",
      label: "Story Paragraph Two",
      type: "textarea",
      group: "Our Story",
    },

    /*
    |--------------------------------------------------------------------------
    | Mission
    |--------------------------------------------------------------------------
    */

    {
      name: "missionEyebrow",
      label: "Mission Eyebrow",
      type: "text",
      group: "Mission",
    },

    {
      name: "mission",
      label: "Mission",
      type: "textarea",
      group: "Mission",
    },

    /*
    |--------------------------------------------------------------------------
    | Vision
    |--------------------------------------------------------------------------
    */

    {
      name: "visionEyebrow",
      label: "Vision Eyebrow",
      type: "text",
      group: "Vision",
    },

    {
      name: "vision",
      label: "Vision",
      type: "textarea",
      group: "Vision",
    },

    /*
    |--------------------------------------------------------------------------
    | Values
    |--------------------------------------------------------------------------
    */

    {
      name: "valuesEyebrow",
      label: "Values Eyebrow",
      type: "text",
      group: "Values",
    },

    {
      name: "values",
      label: "Values",
      type: "tags",
      hint:
        "Separate values with commas.",
      group: "Values",
    },

    /*
    |--------------------------------------------------------------------------
    | Team
    |--------------------------------------------------------------------------
    */

    {
      name: "teamEyebrow",
      label: "Team Eyebrow",
      type: "text",
      group: "Team",
    },

    {
      name: "teamTitle",
      label: "Team Title",
      type: "textarea",
      group: "Team",
    },

    {
      name: "teamText",
      label: "Team Description",
      type: "textarea",
      group: "Team",
    },

    /*
    |--------------------------------------------------------------------------
    | Quote
    |--------------------------------------------------------------------------
    */

    {
      name: "quote",
      label: "Quote",
      type: "textarea",
      group: "Quote",
    },

    {
      name: "quoteAuthor",
      label: "Quote Author",
      type: "text",
      group: "Quote",
    },

    /*
    |--------------------------------------------------------------------------
    | CTA
    |--------------------------------------------------------------------------
    */

    {
      name: "ctaTitle",
      label: "CTA Title",
      type: "textarea",
      group: "Call To Action",
    },

    {
      name: "ctaText",
      label: "CTA Description",
      type: "textarea",
      group: "Call To Action",
    },

    {
      name: "ctaButtonText",
      label: "CTA Button Text",
      type: "text",
      group: "Call To Action",
    },

    {
      name: "ctaButtonLink",
      label: "CTA Button Link",
      type: "text",
      hint: "Example: /contact",
      group: "Call To Action",
    },
  ],
};
