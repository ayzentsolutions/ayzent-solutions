export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "checkbox"
  | "select"
  | "image"
  | "markdown"
  | "tags"
  | "url";

export interface AdminField {
  name: string;
  label: string;
  type: FieldType;

  /*
   * All fields are optional by default.
   * Site Settings should never force the admin
   * to fill unrelated fields.
   */
  required?: boolean;

  placeholder?: string;

  hint?: string;

  group?: string;

  options?: string[];
}

/*
|--------------------------------------------------------------------------
| COLLECTION FIELDS
|--------------------------------------------------------------------------
|
| This file controls the CMS form structure.
|
| IMPORTANT:
| - Public-side ordering is reflected through logical CMS groups.
| - Site Settings is divided into clean categories.
| - companyDescription has been completely removed.
| - companyLogo is now an uploadable image field.
|--------------------------------------------------------------------------
*/

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
    ------------------------------------------------------------------------
    BRAND & IDENTITY
    ------------------------------------------------------------------------
    */

    {
      name: "companyName",
      label: "Company Name",
      type: "text",
      group: "Brand & Identity",
      placeholder: "Ayzent Solutions",
      hint:
        "The primary company name used across the website.",
    },

    {
      name: "companyLogo",
      label: "Company Logo",
      type: "image",
      group: "Brand & Identity",
      hint:
        "Upload or replace the company logo. The image is uploaded through the existing Cloudinary media API.",
    },

    {
      name: "socialImage",
      label: "Social Preview Image",
      type: "image",
      group: "Brand & Identity",
      hint: "Optional default image for Open Graph and social sharing previews.",
    },

    /*
    ------------------------------------------------------------------------
    CONTACT INFORMATION
    ------------------------------------------------------------------------
    */

    {
      name: "email",
      label: "Business Email",
      type: "text",
      group: "Contact Information",
      placeholder:
        "hello@example.com",
    },

    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      group: "Contact Information",
      placeholder:
        "+91 9876543210",
    },

    {
      name: "whatsapp",
      label: "WhatsApp Number",
      type: "text",
      group: "Contact Information",
      placeholder:
        "919876543210",
      hint:
        "Use the number with country code and without +, spaces or special characters. Example: 919876543210",
    },

    {
      name: "location",
      label: "Location / Working From",
      type: "text",
      group: "Contact Information",
      placeholder:
        "India",
    },

    /*
    ------------------------------------------------------------------------
    HEADER
    ------------------------------------------------------------------------
    */

    {
      name: "headerButtonText",
      label: "Header Button Text",
      type: "text",
      group: "Header",
      placeholder:
        "Start a Project",
    },

    {
      name: "headerButtonLink",
      label: "Header Button Link",
      type: "text",
      group: "Header",
      placeholder:
        "/contact",
      hint:
        "Example: /contact",
    },

    /*
    ------------------------------------------------------------------------
    HOMEPAGE CTA
    ------------------------------------------------------------------------
    */

    {
      name: "ctaEyebrow",
      label: "CTA Eyebrow",
      type: "text",
      group: "Homepage CTA",
      placeholder:
        "Let's Build Something",
    },

    {
      name: "ctaTitle",
      label: "CTA Title",
      type: "textarea",
      group: "Homepage CTA",
      placeholder:
        "Have an idea? Let's engineer it.",
    },

    {
      name: "ctaButtonText",
      label: "CTA Button Text",
      type: "text",
      group: "Homepage CTA",
      placeholder:
        "Start a Project",
    },

    {
      name: "ctaButtonLink",
      label: "CTA Button Link",
      type: "text",
      group: "Homepage CTA",
      placeholder:
        "/contact",
      hint:
        "Example: /contact",
    },

    /*
    ------------------------------------------------------------------------
    FOOTER
    ------------------------------------------------------------------------
    */

    {
      name: "footerDescription",
      label: "Footer Description",
      type: "textarea",
      group: "Footer",
      placeholder:
        "Ideas. Engineered.",
    },

    /*
    ------------------------------------------------------------------------
    CONTACT PAGE
    ------------------------------------------------------------------------
    */

    {
      name: "contactEyebrow",
      label: "Contact Eyebrow",
      type: "text",
      group: "Contact Page",
      placeholder:
        "Get In Touch",
    },

    {
      name: "contactTitle",
      label: "Contact Page Title",
      type: "text",
      group: "Contact Page",
      placeholder:
        "Let's build something meaningful.",
    },

    {
      name: "contactDescription",
      label:
        "Contact Page Description",
      type: "textarea",
      group: "Contact Page",
      placeholder:
        "Tell us about your idea, project or business challenge.",
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
      group: "Hero Content",
      placeholder:
        "Digital Solutions",
    },

    {
      name: "title",
      label: "Title",
      type: "textarea",
      group: "Hero Content",
      placeholder:
        "Ideas. Engineered.",
    },

    {
      name: "description",
      label: "Description",
      type: "textarea",
      group: "Hero Content",
      placeholder:
        "We build modern digital products.",
    },

    {
      name: "primaryButtonText",
      label: "Primary Button Text",
      type: "text",
      group: "Hero Content",
      placeholder:
        "Start a Project",
    },

    {
      name: "primaryButtonLink",
      label: "Primary Button Link",
      type: "text",
      group: "Hero Content",
      placeholder:
        "/contact",
    },

    {
      name: "secondaryButtonText",
      label:
        "Secondary Button Text",
      type: "text",
      group: "Hero Content",
      placeholder:
        "Explore Our Work",
    },

    {
      name: "secondaryButtonLink",
      label:
        "Secondary Button Link",
      type: "text",
      group: "Hero Content",
      placeholder:
        "/work",
    },

    {
      name: "image",
      label: "Background Image",
      type: "image",
      group: "Background",
      hint:
        "This image rotates in the hero background. Hero text remains fixed.",
    },

    {
      name: "alt",
      label: "Image Alt Text",
      type: "text",
      group: "Background",
      placeholder:
        "Digital technology",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Settings",
    },
    { name: "displayOrder", label: "Display Order", type: "number", group: "Settings" },
    { name: "status", label: "Publishing Status", type: "select", required: true, group: "Settings", options: ["draft", "published", "archived"] },

  ],

  /*
  |--------------------------------------------------------------------------
  | SERVICES
  |--------------------------------------------------------------------------
  */

  services: [
    { name: "title", label: "Service Title", type: "text", required: true, group: "Service Details" },
    { name: "slug", label: "URL Slug", type: "text", required: true, group: "Service Details", placeholder: "web-development", hint: "Used for service detail URLs." },
    { name: "text", label: "Service Summary", type: "textarea", required: true, group: "Service Details" },
    { name: "description", label: "Full Service Description", type: "markdown", group: "Service Content" },
    { name: "image", label: "Service Image", type: "image", group: "Media" },
    { name: "active", label: "Active", type: "checkbox", group: "Publishing" },
    { name: "displayOrder", label: "Display Order", type: "number", group: "Publishing" },
    { name: "status", label: "Publishing Status", type: "select", required: true, group: "Publishing", options: ["draft", "published", "archived"] },
  ],

  /*
  |--------------------------------------------------------------------------
  | PROJECTS / PORTFOLIO
  |--------------------------------------------------------------------------
  */

  products: [
    { name: "name", label: "Product Name", type: "text", group: "Product Details", required: true },
    { name: "slug", label: "Slug", type: "text", group: "Product Details", required: true, hint: "Lowercase letters, numbers and hyphens only." },
    { name: "category", label: "Category / Type", type: "text", group: "Product Details", placeholder: "SaaS, Website, Application" },
    { name: "shortDescription", label: "Short Description", type: "textarea", group: "Content", required: true },
    { name: "content", label: "Full Description", type: "markdown", group: "Content", required: true },
    { name: "coverImage", label: "Cover Image", type: "image", group: "Media" },
    { name: "gallery", label: "Gallery URLs", type: "tags", group: "Media", hint: "Comma-separated image URLs." },
    { name: "technologies", label: "Technologies", type: "tags", group: "Product Details" },
    { name: "features", label: "Features", type: "tags", group: "Product Details" },
    { name: "url", label: "Product / Website URL", type: "url", group: "Links" },
    { name: "ctaText", label: "CTA Text", type: "text", group: "Links", placeholder: "Visit product" },
    { name: "ctaLink", label: "CTA Link", type: "url", group: "Links" },
    { name: "displayOrder", label: "Display Order", type: "number", group: "Publishing" },
    { name: "status", label: "Status", type: "select", group: "Publishing", options: ["draft", "published", "archived"] },
    { name: "seoTitle", label: "SEO Title", type: "text", group: "SEO" },
    { name: "seoDescription", label: "SEO Description", type: "textarea", group: "SEO" },
  ],

  projects: [
    { name: "name", label: "Project Name", type: "text", required: true, group: "Project Details" },
    { name: "slug", label: "URL Slug", type: "text", required: true, group: "Project Details", hint: "Lowercase letters, numbers and hyphens only." },
    { name: "category", label: "Category", type: "text", group: "Project Details" },
    { name: "client", label: "Client", type: "text", group: "Project Details" },
    { name: "summary", label: "Project Summary", type: "textarea", group: "Project Content" },
    { name: "challenge", label: "The Challenge", type: "textarea", group: "Project Content" },
    { name: "solution", label: "The Approach / Solution", type: "textarea", group: "Project Content" },
    { name: "overview", label: "Full Overview", type: "markdown", group: "Project Content" },
    { name: "coverImage", label: "Featured Image", type: "image", group: "Media" },
    { name: "gallery", label: "Image Gallery URLs", type: "tags", group: "Media" },
    { name: "technologies", label: "Technologies", type: "tags", group: "Project Details" },
    { name: "features", label: "Key Features", type: "tags", group: "Project Details" },
    { name: "projectUrl", label: "Live Project URL", type: "url", group: "Links" },
    { name: "featured", label: "Feature on Homepage", type: "checkbox", group: "Publishing" },
    { name: "displayOrder", label: "Display Order", type: "number", group: "Publishing" },
    { name: "status", label: "Publishing Status", type: "select", required: true, group: "Publishing", options: ["draft", "published", "archived"] },
    { name: "seoTitle", label: "SEO Title", type: "text", group: "SEO" },
    { name: "seoDescription", label: "SEO Description", type: "textarea", group: "SEO" },
  ],

  /*
  |--------------------------------------------------------------------------
  | TEAM
  |--------------------------------------------------------------------------
  */

  team: [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      group: "Team Member",
    },

    {
      name: "role",
      label: "Role / Position",
      type: "text",
      group: "Team Member",
    },

    {
      name: "image",
      label: "Photo",
      type: "image",
      group: "Visual",
    },

    {
      name: "linkedin",
      label: "LinkedIn URL",
      type: "url",
      group: "Social Links",
    },

    {
      name: "instagram",
      label: "Instagram URL",
      type: "url",
      group: "Social Links",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Settings",
    },
    { name: "shortBio", label: "Short Bio", type: "textarea", group: "Team Member" },
    { name: "displayOrder", label: "Display Order", type: "number", group: "Settings" },
    { name: "status", label: "Publishing Status", type: "select", required: true, group: "Settings", options: ["draft", "published", "archived"] },

  ],

  /*
  |--------------------------------------------------------------------------
  | TESTIMONIALS
  |--------------------------------------------------------------------------
  */

  testimonials: [
    { name: "clientName", label: "Client Name", type: "text", required: true, group: "Client" },
    { name: "company", label: "Company", type: "text", group: "Client" },
    { name: "roleCompany", label: "Role / Company", type: "text", group: "Client" },
    { name: "image", label: "Client Photo", type: "image", group: "Visual" },
    { name: "text", label: "Testimonial Text", type: "textarea", required: true, group: "Testimonial" },
    { name: "rating", label: "Rating", type: "number", group: "Testimonial", placeholder: "5" },
    { name: "active", label: "Active", type: "checkbox", group: "Publishing" },
    { name: "displayOrder", label: "Display Order", type: "number", group: "Publishing" },
    { name: "status", label: "Publishing Status", type: "select", required: true, group: "Publishing", options: ["draft", "published", "archived"] },
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
      group: "Announcement",
    },

    {
      name: "description",
      label: "Description",
      type: "textarea",
      group: "Announcement",
    },

    {
      name: "linkText",
      label: "Button Text",
      type: "text",
      group: "Link",
    },

    {
      name: "link",
      label: "Button Link",
      type: "url",
      group: "Link",
      placeholder:
        "/contact",
    },

    {
      name: "image",
      label: "Announcement Image",
      type: "image",
      group: "Visual",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Settings",
    },
    { name: "status", label: "Publishing Status", type: "select", required: true, group: "Settings", options: ["draft", "published", "archived"] },

    { name: "displayOrder", label: "Display Order", type: "number", group: "Settings" },
  ],

  /*
  |--------------------------------------------------------------------------
  | FAQs
  |--------------------------------------------------------------------------
  */

  faqs: [
    {
      name: "question",
      label: "Question",
      type: "text",
      group: "FAQ",
    },

    {
      name: "answer",
      label: "Answer",
      type: "textarea",
      group: "FAQ",
    },

    {
      name: "category",
      label: "Category",
      type: "text",
      group: "FAQ",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Settings",
    },
    { name: "status", label: "Publishing Status", type: "select", required: true, group: "Settings", options: ["draft", "published", "archived"] },

    { name: "displayOrder", label: "Display Order", type: "number", group: "Settings" },
  ],

  /*
  |--------------------------------------------------------------------------
  | ABOUT CONTENT
  |--------------------------------------------------------------------------
  */

  aboutContent: [
    { name: "storyEyebrow", label: "Story Eyebrow", type: "text", group: "Story" },
    { name: "storyParagraphOne", label: "Story Paragraph One", type: "textarea", group: "Story" },
    { name: "storyParagraphTwo", label: "Story Paragraph Two", type: "textarea", group: "Story" },
    { name: "missionEyebrow", label: "Mission Eyebrow", type: "text", group: "Mission" },
    { name: "mission", label: "Mission", type: "textarea", group: "Mission" },
    { name: "visionEyebrow", label: "Vision Eyebrow", type: "text", group: "Vision" },
    { name: "vision", label: "Vision", type: "textarea", group: "Vision" },
    { name: "valuesEyebrow", label: "Values Eyebrow", type: "text", group: "Values" },
    { name: "values", label: "Values", type: "tags", group: "Values" },
    { name: "teamEyebrow", label: "Team Eyebrow", type: "text", group: "Team" },
    { name: "teamTitle", label: "Team Section Title", type: "text", group: "Team" },
    { name: "teamText", label: "Team Description", type: "textarea", group: "Team" },
    { name: "quote", label: "Featured Quote", type: "textarea", group: "Quote" },
    { name: "quoteAuthor", label: "Quote Author", type: "text", group: "Quote" },
    { name: "ctaTitle", label: "CTA Title", type: "text", group: "Call to Action" },
    { name: "ctaText", label: "CTA Description", type: "textarea", group: "Call to Action" },
    { name: "ctaButtonText", label: "CTA Button Text", type: "text", group: "Call to Action" },
    { name: "ctaButtonLink", label: "CTA Button Link", type: "url", group: "Call to Action" },
  ],

  /*
  |--------------------------------------------------------------------------
  | HOMEPAGE SECTION CONTROL
  |--------------------------------------------------------------------------
  */

  posts: [
    { name: "title", label: "Article Title", type: "text", required: true, group: "Article" },
    { name: "slug", label: "URL Slug", type: "text", required: true, group: "Article" },
    { name: "category", label: "Category", type: "text", required: true, group: "Article" },
    { name: "excerpt", label: "Excerpt", type: "textarea", required: true, group: "Article" },
    { name: "content", label: "Article Content", type: "markdown", required: true, group: "Article" },
    { name: "date", label: "Publication Date", type: "text", group: "Article" },
    { name: "tags", label: "Tags", type: "tags", group: "Discovery" },
    { name: "coverImage", label: "Cover Image", type: "image", group: "Media" },
    { name: "status", label: "Publishing Status", type: "select", required: true, group: "Publishing", options: ["draft", "published", "archived"] },
    { name: "displayOrder", label: "Display Order", type: "number", group: "Publishing" },
    { name: "seoTitle", label: "SEO Title", type: "text", group: "SEO" },
    { name: "seoDescription", label: "SEO Description", type: "textarea", group: "SEO" },
  ],

  categories: [
    { name: "name", label: "Category Name", type: "text", required: true, group: "Category" },
    { name: "slug", label: "URL Slug", type: "text", required: true, group: "Category" },
    { name: "displayOrder", label: "Display Order", type: "number", group: "Publishing" },
    { name: "status", label: "Publishing Status", type: "select", required: true, group: "Publishing", options: ["draft", "published", "archived"] },
  ],

  tags: [
    { name: "name", label: "Tag Name", type: "text", required: true, group: "Tag" },
    { name: "slug", label: "URL Slug", type: "text", required: true, group: "Tag" },
    { name: "displayOrder", label: "Display Order", type: "number", group: "Publishing" },
    { name: "status", label: "Publishing Status", type: "select", required: true, group: "Publishing", options: ["draft", "published", "archived"] },
  ],

  jobs: [
    { name: "title", label: "Role Title", type: "text", required: true, group: "Role" },
    { name: "description", label: "Role Description", type: "markdown", required: true, group: "Role" },
    { name: "requirements", label: "Requirements", type: "tags", group: "Role" },
    { name: "location", label: "Location", type: "text", group: "Role" },
    { name: "type", label: "Employment Type", type: "text", group: "Role" },
    { name: "applicationInstructions", label: "Application Instructions", type: "textarea", group: "Application" },
    { name: "status", label: "Role Status", type: "select", required: true, group: "Publishing", options: ["open", "closed"] },
    { name: "displayOrder", label: "Display Order", type: "number", group: "Publishing" },
  ],

  clientLogos: [
    { name: "name", label: "Client / Brand Name", type: "text", required: true, group: "Brand" },
    { name: "logo", label: "Logo Image", type: "image", group: "Brand" },
    { name: "link", label: "Website Link", type: "url", group: "Links" },
    { name: "displayOrder", label: "Display Order", type: "number", group: "Publishing" },
    { name: "active", label: "Visible", type: "checkbox", group: "Publishing" },
    { name: "status", label: "Publishing Status", type: "select", group: "Publishing", options: ["draft", "published", "archived"] },
  ],

  socialLinks: [
    { name: "label", label: "Network Name", type: "text", required: true, group: "Social Link" },
    { name: "url", label: "Profile URL", type: "url", required: true, group: "Social Link" },
    { name: "displayOrder", label: "Display Order", type: "number", group: "Publishing" },
    { name: "active", label: "Visible", type: "checkbox", group: "Publishing" },
    { name: "status", label: "Publishing Status", type: "select", group: "Publishing", options: ["draft", "published", "archived"] },
  ],

  inquiries: [
    { name: "name", label: "Contact Name", type: "text", group: "Inquiry" },
    { name: "email", label: "Email", type: "text", group: "Inquiry" },
    { name: "phone", label: "Phone", type: "text", group: "Inquiry" },
    { name: "company", label: "Company", type: "text", group: "Inquiry" },
    { name: "service", label: "Service", type: "text", group: "Inquiry" },
    { name: "budget", label: "Budget", type: "text", group: "Inquiry" },
    { name: "description", label: "Message", type: "textarea", group: "Inquiry" },
    { name: "status", label: "Status", type: "select", group: "Workflow", options: ["new", "in-progress", "responded", "closed"] },
  ],

  newsletterSubscribers: [
    { name: "email", label: "Subscriber Email", type: "text", required: true, group: "Subscriber" },
    { name: "status", label: "Subscription Status", type: "select", group: "Subscriber", options: ["subscribed", "unsubscribed"] },
  ],

  comments: [
    { name: "name", label: "Author Name", type: "text", group: "Comment" },
    { name: "message", label: "Comment", type: "textarea", group: "Comment" },
    { name: "slug", label: "Article Slug", type: "text", group: "Comment" },
    { name: "status", label: "Moderation Status", type: "select", group: "Moderation", options: ["pending", "approved", "rejected"] },
  ],

  pageSections: [
    { name: "pageKey", label: "Public Page", type: "select", required: true, group: "Section", options: ["about", "services", "products", "projects", "blog", "careers", "contact", "search"] },
    { name: "sectionKey", label: "Section", type: "select", required: true, group: "Section", options: ["hero", "story", "mission", "values", "team", "quote", "cta", "service-list", "project-list", "product-list", "article-list", "job-list", "contact-form", "search-results"] },
    { name: "title", label: "Title Override", type: "textarea", group: "Content" },
    { name: "eyebrow", label: "Eyebrow Override", type: "text", group: "Content" },
    { name: "description", label: "Description Override", type: "textarea", group: "Content" },
    { name: "image", label: "Supporting Image", type: "image", group: "Media" },
    { name: "ctaText", label: "CTA Text", type: "text", group: "CTA" },
    { name: "ctaLink", label: "CTA Link", type: "url", group: "CTA" },
    { name: "layoutVariant", label: "Layout Variant", type: "select", group: "Presentation", options: ["editorial", "compact", "full-bleed"] },
    { name: "backgroundVariant", label: "Dark Background Variant", type: "select", group: "Presentation", options: ["midnight", "navy", "elevated"] },
    { name: "displayOrder", label: "Display Order", type: "number", required: true, group: "Publishing" },
    { name: "active", label: "Visible", type: "checkbox", group: "Publishing" },
    { name: "status", label: "Publishing Status", type: "select", required: true, group: "Publishing", options: ["draft", "published", "archived"] },
  ],

  pageContent: [
    { name: "pageKey", label: "Public Page", type: "select", required: true, group: "Page", options: ["about", "services", "products", "projects", "blog", "careers", "contact", "search"] },
    { name: "eyebrow", label: "Hero Eyebrow", type: "text", group: "Hero" },
    { name: "title", label: "Hero Title", type: "textarea", group: "Hero" },
    { name: "description", label: "Hero Description", type: "textarea", group: "Hero" },
    { name: "image", label: "Hero Image", type: "image", group: "Hero" },
    { name: "ctaText", label: "Primary CTA Text", type: "text", group: "Hero CTA" },
    { name: "ctaLink", label: "Primary CTA Link", type: "url", group: "Hero CTA" },
    { name: "layoutVariant", label: "Layout Variant", type: "select", group: "Presentation", options: ["editorial", "compact", "image-led"] },
    { name: "backgroundVariant", label: "Dark Background Variant", type: "select", group: "Presentation", options: ["midnight", "navy", "elevated"] },
    { name: "seoTitle", label: "SEO Title", type: "text", group: "SEO" },
    { name: "seoDescription", label: "SEO Description", type: "textarea", group: "SEO" },
    { name: "socialImage", label: "Social Preview Image", type: "image", group: "SEO" },
    { name: "status", label: "Publishing Status", type: "select", required: true, group: "Publishing", options: ["draft", "published", "archived"] },
  ],

  navigation: [
    { name: "label", label: "Navigation Label", type: "text", required: true, group: "Link" },
    { name: "href", label: "Destination", type: "url", required: true, group: "Link", placeholder: "/services" },
    { name: "location", label: "Show In", type: "select", required: true, group: "Placement", options: ["header", "footer", "both"] },
    { name: "displayOrder", label: "Display Order", type: "number", required: true, group: "Placement" },
    { name: "active", label: "Visible", type: "checkbox", group: "Publishing" },
    { name: "status", label: "Publishing Status", type: "select", required: true, group: "Publishing", options: ["draft", "published", "archived"] },
  ],

  homeSections: [
    { name: "sectionKey", label: "Homepage Section", type: "select", required: true, group: "Section", options: ["hero", "intro", "services", "projects", "products", "process", "studio", "testimonials", "faqs", "cta"] },
    { name: "title", label: "Title Override", type: "textarea", group: "Content", hint: "Optional. Leave empty to use the current CMS page content." },
    { name: "eyebrow", label: "Eyebrow Override", type: "text", group: "Content" },
    { name: "description", label: "Description Override", type: "textarea", group: "Content" },
    { name: "image", label: "Supporting Image", type: "image", group: "Media" },
    { name: "ctaText", label: "CTA Text", type: "text", group: "CTA" },
    { name: "ctaLink", label: "CTA Link", type: "url", group: "CTA", placeholder: "/contact" },
    { name: "layoutVariant", label: "Layout Variant", type: "select", group: "Presentation", options: ["editorial", "compact", "full-bleed"] },
    { name: "backgroundVariant", label: "Dark Background Variant", type: "select", group: "Presentation", options: ["midnight", "navy", "elevated"] },
    { name: "displayOrder", label: "Display Order", type: "number", group: "Publishing", required: true },
    { name: "active", label: "Visible on Homepage", type: "checkbox", group: "Publishing" },
    { name: "status", label: "Publishing Status", type: "select", group: "Publishing", options: ["draft", "published", "archived"], required: true },
  ],

  /*
  |--------------------------------------------------------------------------
  | PROCESS
  |--------------------------------------------------------------------------
  */

  process: [
    {
      name: "step",
      label: "Step Number",
      type: "text",
      group: "Process Step",
      placeholder: "01",
    },

    {
      name: "title",
      label: "Title",
      type: "text",
      group: "Process Step",
    },

    {
      name: "description",
      label: "Description",
      type: "textarea",
      group: "Process Step",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
      group: "Settings",
      required: true,
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Settings",
    },
    {
      name: "status",
      label: "Publishing Status",
      type: "select",
      group: "Settings",
      options: ["draft", "published", "archived"],
      required: true,
    },
  ],
};
