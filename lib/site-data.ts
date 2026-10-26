export type Project = {
  slug: string;
  name: string;
  category: string;
  summary?: string;
  client?: string;
  technologies?: string[];
  accent: string;
  challenge: string;
  solution: string;
  features?: string[];
  overview?: string;
  featured?: boolean;
  coverImage?: string;
  gallery?: string[];
  projectUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  displayOrder?: number;
};

export const inquiryBudgetOptions = ["Not sure yet", "To be discussed"] as const;

export const services = [
  { number: "01", title: "Website Development", text: "Responsive websites planned around your content, audience, and key user journeys." },
  { number: "02", title: "Digital Marketing", text: "Digital campaigns with defined audiences, channel choices, and measurable actions." },
  { number: "03", title: "SEO", text: "Technical and on-page improvements that help search engines understand your pages and people find relevant information." },
  { number: "04", title: "Website & Software Maintenance", text: "Routine updates, issue triage, bug fixes, and ongoing care for websites and software." },
  { number: "05", title: "UI/UX Design", text: "User journeys, information structure, interface design, and prototypes prepared for development." },
  { number: "06", title: "Deployment & Cloud Services", text: "Application environment setup, deployment configuration, hosting support, and release preparation." },
];

// Production portfolio content must come from published CMS records.
// Intentionally empty: sample client projects must never appear as real work.
export const projects: Project[] = [];

// Editorial content is CMS-managed. Do not publish excerpt-only sample articles.
export const posts: {
  slug: string; title: string; category: string; date?: string; excerpt: string;
  content?: string; tags?: string[]; coverImage?: string; image?: string;
  seoTitle?: string; seoDescription?: string; published?: boolean; displayOrder?: number;
}[] = [];

// FAQs are editorial content and are intentionally CMS-managed only.
export const faqs: [string, string][] = [];
