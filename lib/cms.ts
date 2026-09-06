export const cmsCollections = ["services", "projects", "posts", "categories", "tags", "comments", "team", "testimonials", "faqs", "clientLogos", "jobs", "inquiries", "newsletterSubscribers", "socialLinks", "announcements"] as const;
export type CmsCollection = (typeof cmsCollections)[number];
export const editorCollections: CmsCollection[] = ["services", "projects", "posts", "categories", "tags", "comments", "team", "testimonials", "faqs", "clientLogos", "jobs", "socialLinks", "announcements"];
export function isCmsCollection(value: string): value is CmsCollection { return cmsCollections.includes(value as CmsCollection); }
export function canEditCollection(collection: CmsCollection, role: "SUPER_ADMIN" | "EDITOR") { return role === "SUPER_ADMIN" || editorCollections.includes(collection); }
export const collectionLabels: Record<CmsCollection, string> = { services: "Services", projects: "Projects", posts: "Blog posts", categories: "Categories", tags: "Tags", comments: "Comments", team: "Team", testimonials: "Testimonials", faqs: "FAQs", clientLogos: "Client logos", jobs: "Job openings", inquiries: "Inquiries", newsletterSubscribers: "Subscribers", socialLinks: "Social links", announcements: "Announcements" };

const isText = (value: unknown, min = 1) => typeof value === "string" && value.trim().length >= min;
const isOrder = (value: unknown) => value === undefined || (typeof value === "number" && Number.isInteger(value) && value >= 0);
const isUrl = (value: unknown) => { if (value === undefined || value === "") return true; if (typeof value !== "string") return false; try { const url = new URL(value); return url.protocol === "https:" || url.protocol === "http:"; } catch { return false; } };
const arrayOfStrings = (value: unknown) => value === undefined || (Array.isArray(value) && value.every((item) => typeof item === "string" && item.length <= 500));
const statuses = ["draft", "published", "archived"];
export function validateCmsData(collection: CmsCollection, data: Record<string, unknown>) {
  const errors: string[] = [];
  const require = (key: string, label: string) => { if (!isText(data[key])) errors.push(`${label} is required.`); };
  if (["services", "projects", "posts", "jobs", "announcements"].includes(collection) && !isOrder(data.displayOrder)) errors.push("Display order must be a non-negative whole number.");
  if (collection === "services") { require("title", "Service name"); require("text", "Summary"); }
  if (collection === "projects") { require("name", "Project name"); require("slug", "Slug"); require("overview", "Overview"); require("category", "Category"); if (!statuses.includes(String(data.status))) errors.push("Project status is invalid."); ["coverImage", "liveLink"].forEach((key) => { if (!isUrl(data[key])) errors.push(`${key} must be a valid URL.`); }); ["features", "technologies", "gallery"].forEach((key) => { if (!arrayOfStrings(data[key])) errors.push(`${key} must contain only text values.`); }); }
  if (collection === "posts") { require("title", "Title"); require("slug", "Slug"); require("excerpt", "Excerpt"); require("content", "Content"); require("category", "Category"); if (!statuses.includes(String(data.status))) errors.push("Post status is invalid."); if (!arrayOfStrings(data.tags)) errors.push("Tags must contain only text values."); if (!isUrl(data.coverImage)) errors.push("Cover image must be a valid URL."); }
  if (collection === "team") { require("name", "Name"); require("role", "Role"); }
  if (collection === "testimonials") { require("clientName", "Client name"); require("text", "Testimonial"); }
  if (collection === "faqs") { require("question", "Question"); require("answer", "Answer"); }
  if (collection === "jobs") { require("title", "Job title"); require("description", "Description"); if (!["open", "closed"].includes(String(data.status))) errors.push("Job status is invalid."); }
  if (collection === "socialLinks" && !isUrl(data.url)) errors.push("Profile URL must be a valid URL.");
  if (collection === "announcements") { require("title", "Title"); require("content", "Content"); if (!isUrl(data.image) || !isUrl(data.ctaLink)) errors.push("Announcement links must be valid URLs."); }
  if (["projects", "posts", "categories", "tags"].includes(collection) && data.slug !== undefined && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(data.slug))) errors.push("Slug must use lowercase letters, numbers, and hyphens only.");
  return errors;
}
