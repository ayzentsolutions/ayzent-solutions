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
      name: "order",
      label: "Display Order",
      type: "number",
      group: "Settings",
      placeholder: "1",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Settings",
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
      group: "Service Details",
    },

    {
      name: "slug",
      label: "Slug",
      type: "text",
      group: "Service Details",
      placeholder:
        "web-development",
      hint:
        "Used for service URLs.",
    },

    {
      name: "shortDescription",
      label:
        "Short Description",
      type: "textarea",
      group: "Service Details",
    },

    {
      name: "description",
      label: "Full Description",
      type: "markdown",
      group: "Service Content",
    },

    {
      name: "icon",
      label: "Icon",
      type: "text",
      group: "Visual",
      placeholder:
        "Code",
    },

    {
      name: "image",
      label: "Service Image",
      type: "image",
      group: "Visual",
    },

    {
      name: "order",
      label: "Display Order",
      type: "number",
      group: "Settings",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Settings",
    },
  ],

  /*
  |--------------------------------------------------------------------------
  | PROJECTS / PORTFOLIO
  |--------------------------------------------------------------------------
  */

  projects: [
    {
      name: "title",
      label: "Project Title",
      type: "text",
      group: "Project Details",
    },

    {
      name: "slug",
      label: "Slug",
      type: "text",
      group: "Project Details",
    },

    {
      name: "category",
      label: "Category",
      type: "text",
      group: "Project Details",
      placeholder:
        "Web Development",
    },

    {
      name: "client",
      label: "Client",
      type: "text",
      group: "Project Details",
    },

    {
      name: "description",
      label: "Description",
      type: "markdown",
      group: "Project Content",
    },

    {
      name: "image",
      label: "Featured Image",
      type: "image",
      group: "Visual",
    },

    {
      name: "projectUrl",
      label: "Project URL",
      type: "url",
      group: "Links",
    },

    {
      name: "order",
      label: "Display Order",
      type: "number",
      group: "Settings",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Settings",
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
      name: "bio",
      label: "Bio",
      type: "textarea",
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
      name: "order",
      label: "Display Order",
      type: "number",
      group: "Settings",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Settings",
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
      name: "clientRole",
      label:
        "Client Role / Position",
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
      name: "image",
      label: "Client Photo",
      type: "image",
      group: "Visual",
    },

    {
      name: "quote",
      label: "Testimonial",
      type: "textarea",
      group: "Testimonial",
    },

    {
      name: "rating",
      label: "Rating",
      type: "number",
      group: "Testimonial",
      placeholder: "5",
    },

    {
      name: "order",
      label: "Display Order",
      type: "number",
      group: "Settings",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Settings",
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
      type: "text",
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
      name: "order",
      label: "Display Order",
      type: "number",
      group: "Settings",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Settings",
    },
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
      name: "order",
      label: "Display Order",
      type: "number",
      group: "Settings",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Settings",
    },
  ],

  /*
  |--------------------------------------------------------------------------
  | ABOUT CONTENT
  |--------------------------------------------------------------------------
  */

  aboutContent: [
    {
      name: "eyebrow",
      label: "Eyebrow",
      type: "text",
      group: "About Page",
    },

    {
      name: "title",
      label: "Title",
      type: "textarea",
      group: "About Page",
    },

    {
      name: "description",
      label: "Description",
      type: "markdown",
      group: "About Page",
    },

    {
      name: "image",
      label: "Featured Image",
      type: "image",
      group: "Visual",
    },

    {
      name: "missionTitle",
      label: "Mission Title",
      type: "text",
      group: "Mission",
    },

    {
      name: "missionDescription",
      label: "Mission Description",
      type: "textarea",
      group: "Mission",
    },

    {
      name: "visionTitle",
      label: "Vision Title",
      type: "text",
      group: "Vision",
    },

    {
      name: "visionDescription",
      label: "Vision Description",
      type: "textarea",
      group: "Vision",
    },
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
      name: "order",
      label: "Display Order",
      type: "number",
      group: "Settings",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
      group: "Settings",
    },
  ],
};

