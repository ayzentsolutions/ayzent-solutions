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
};

export const services = [
  { number: "01", title: "Website Development", text: "Fast, thoughtful websites that make your business feel unmistakably yours." },
  { number: "02", title: "Digital Marketing", text: "Clear campaigns and content that turn attention into qualified conversations." },
  { number: "03", title: "SEO", text: "Sustainable search visibility built around useful content and solid technical foundations." },
  { number: "04", title: "Website & Software Maintenance", text: "Reliable ongoing care that keeps your most important digital tools working hard." },
  { number: "05", title: "UI/UX Design", text: "Interfaces with clarity, character, and a genuinely better path for every user." },
  { number: "06", title: "Deployment & Cloud Services", text: "Confident releases, resilient infrastructure, and room to grow without friction." },
];

export const projects: Project[] = [
  { slug: "northstar-finance", name: "Northstar Finance", category: "Website Development", summary: "A considered digital home for a growing advisory firm.", client: "Northstar", technologies: ["Next.js", "TypeScript", "Vercel"], accent: "bg-[#c9a227]", challenge: "Northstar needed a more credible web presence that made complex financial services feel approachable.", solution: "We paired an editorial visual system with a focused content structure that makes expertise easy to navigate.", features: ["Responsive editorial design", "Service-led information architecture", "Conversion-focused contact flow"] },
  { slug: "form-and-field", name: "Form & Field", category: "UI/UX Design", summary: "A refined commerce experience with an unmistakable point of view.", client: "Form & Field", technologies: ["Figma", "Shopify", "GA4"], accent: "bg-[#6e8b73]", challenge: "The brand had a loyal following but an online experience that did not reflect its thoughtful products.", solution: "A clear, tactile design direction brought product storytelling and purchasing closer together.", features: ["Product discovery journey", "Design system", "Editorial commerce templates"] },
  { slug: "atlas-logistics", name: "Atlas Logistics", category: "Digital Marketing", summary: "Making a complex operation feel simple, capable, and ready.", client: "Atlas Logistics", technologies: ["Next.js", "SEO", "HubSpot"], accent: "bg-[#5d7697]", challenge: "Atlas needed to explain a broad logistics offer without overwhelming prospective partners.", solution: "We developed a concise message platform and campaign-ready website centred on its people and capability.", features: ["Messaging strategy", "Lead capture pathways", "Technical SEO foundation"] },
  { slug: "morrow-studio", name: "Morrow Studio", category: "Website Development", summary: "A portfolio that lets exceptional work speak first.", technologies: ["Next.js", "Sanity", "Vercel"], accent: "bg-[#b66b54]", challenge: "Morrow's work deserved a platform with equal precision and personality.", solution: "We created an image-led portfolio with flexible case-study storytelling and simple content management.", features: ["Case study templates", "Image-first presentation", "Content management"] },
];

export const posts = [
  { slug: "a-website-should-earn-its-place", title: "A website should earn its place in your business", category: "Strategy", date: "May 16, 2025", excerpt: "The strongest websites are not digital brochures. They are useful business tools with a clear job to do." },
  { slug: "designing-for-clarity", title: "Designing for clarity in a noisy digital world", category: "Design", date: "April 28, 2025", excerpt: "Clarity is not a lack of personality. It is the discipline that gives good ideas their force." },
  { slug: "seo-is-a-long-game", title: "Why SEO is a long game worth playing", category: "Growth", date: "March 12, 2025", excerpt: "A practical look at building durable search visibility rather than chasing short-lived ranking tricks." },
];

export const faqs: [string, string][] = [
  ["What kinds of businesses do you work with?", "We work with ambitious teams of all sizes, from early-stage businesses establishing their presence to established companies ready for a sharper digital platform."],
  ["How is a project priced?", "Every engagement is scoped around its objectives, features, complexity, and timeline. We will give you a clear, tailored proposal before work begins."],
  ["Can you support us after launch?", "Yes. We provide ongoing website and software maintenance, optimisation, and strategic support when it is useful to your team."],
];
