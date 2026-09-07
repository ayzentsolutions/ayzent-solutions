
import type {
  AdminField,
} from "@/lib/content";

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

export type CmsField = AdminField & {
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
    CmsField[]
  > = {

  /*
  |--------------------------------------------------------------------------
  | WEBSITE SETTINGS
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
        "Upload your company logo. The image is uploaded to Cloudinary automatically.",
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
    },

    {
      name: "title",
      label: "Title",
      type: "text",
    },

    {
      name: "highlight",
      label: "Highlighted Text",
      type: "text",
      hint:
        "Optional. This exact text will be highlighted in the hero title.",
    },

    {
      name: "text",
      label: "Description",
      type: "textarea",
    },

    {
      name: "image",
      label: "Background Image",
      type: "image",
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
    },

    {
      name: "primaryText",
      label: "Primary Button Text",
      type: "text",
    },

    {
      name: "primaryLink",
      label: "Primary Button Link",
      type: "text",
    },

    {
      name: "secondaryText",
      label: "Secondary Button Text",
      type: "text",
    },

    {
      name: "secondaryLink",
      label: "Secondary Button Link",
      type: "text",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
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
      required: true,
    },

    {
      name: "text",
      label: "Description",
      type: "textarea",
    },

    {
      name: "slug",
      label: "Slug",
      type: "text",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },
  ],

  projects: [
    {
      name: "title",
      label: "Project Title",
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
      label: "Short Description",
      type: "textarea",
    },

    {
      name: "image",
      label: "Project Image",
      type: "image",
    },

    {
      name: "featured",
      label: "Featured",
      type: "checkbox",
    },

    {
      name: "published",
      label: "Published",
      type: "checkbox",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },
  ],

  posts: [
    {
      name: "title",
      label: "Post Title",
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
    },

    {
      name: "content",
      label: "Content",
      type: "markdown",
    },

    {
      name: "image",
      label: "Featured Image",
      type: "image",
    },

    {
      name: "published",
      label: "Published",
      type: "checkbox",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },
  ],

  testimonials: [
    {
      name: "clientName",
      label: "Client Name",
      type: "text",
    },

    {
      name: "company",
      label: "Company",
      type: "text",
    },

    {
      name: "text",
      label: "Testimonial",
      type: "textarea",
    },

    {
      name: "image",
      label: "Client Photo",
      type: "image",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },
  ],

  faqs: [
    {
      name: "question",
      label: "Question",
      type: "text",
    },

    {
      name: "answer",
      label: "Answer",
      type: "textarea",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },
  ],

  clientLogos: [
    {
      name: "name",
      label: "Client Name",
      type: "text",
    },

    {
      name: "image",
      label: "Logo",
      type: "image",
    },

    {
      name: "url",
      label: "Website URL",
      type: "url",
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
    },

    {
      name: "url",
      label: "URL",
      type: "url",
    },

    {
      name: "active",
      label: "Active",
      type: "checkbox",
    },

    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },
  ],
};
