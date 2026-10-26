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
  { number: "01", title: "Website Development", text: "Fast, thoughtful websites that make your business feel unmistakably yours." },
  { number: "02", title: "Digital Marketing", text: "Clear campaigns and content that turn attention into qualified conversations." },
  { number: "03", title: "SEO", text: "Sustainable search visibility built around useful content and solid technical foundations." },
  { number: "04", title: "Website & Software Maintenance", text: "Reliable ongoing care that keeps your most important digital tools working hard." },
  { number: "05", title: "UI/UX Design", text: "Interfaces with clarity, character, and a genuinely better path for every user." },
  { number: "06", title: "Deployment & Cloud Services", text: "Confident releases, resilient infrastructure, and room to grow without friction." },
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
