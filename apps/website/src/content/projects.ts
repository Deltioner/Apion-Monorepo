export type Project = {
  slug: string;
  client: string;
  year: number;
  stack: string[];
  accentFrom: string;
  accentTo: string;
  liveUrl?: string;
  image?: string;
};

// Themed cover images from Unsplash (free, no auth).
const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?w=1600&q=80&auto=format&fit=crop`;

export const projects: Project[] = [
  {
    slug: "alawy-portfolio",
    client: "Alawy — Designer & Developer",
    year: 2025,
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    accentFrom: "#6366F1",
    accentTo: "#8B5CF6",
    liveUrl: "https://portfolio-psi-swart-84.vercel.app/",
    image: unsplash("photo-1707528041466-83a325f01a3c"),
  },
  {
    slug: "digital-marketplace",
    client: "Digital Marketplace",
    year: 2025,
    stack: ["Next.js", "Tailwind CSS", "Stripe", "Supabase Auth"],
    accentFrom: "#EF4444",
    accentTo: "#F97316",
    liveUrl: "https://eshop-nine-red.vercel.app/",
    image: unsplash("photo-1563013544-824ae1b704d3"),
  },
  {
    slug: "pastry",
    client: "Pastry",
    year: 2024,
    stack: ["Next.js", "Tailwind CSS", "Sanity CMS", "Resend"],
    accentFrom: "#EC4899",
    accentTo: "#F97316",
    image: unsplash("photo-1623334044303-241021148842"),
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(limit = 3): Project[] {
  return projects.slice(0, limit);
}
