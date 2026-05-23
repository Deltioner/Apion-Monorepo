import {
  Code2,
  LayoutDashboard,
  Smartphone,
  Sparkles,
  Wrench,
  Search,
  Database,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export type ServiceKey =
  | "web"
  | "saas"
  | "android"
  | "ai"
  | "maintenance"
  | "seo"
  | "database"
  | "consulting";

export type Service = {
  key: ServiceKey;
  icon: LucideIcon;
  href: string;
  // Pre-baked Tailwind classes so JIT picks them up at build time.
  bg: string;
  text: string;
};

export const services: Service[] = [
  {
    key: "web",
    icon: Code2,
    href: "/services#web",
    bg: "bg-blue-500/10",
    text: "text-blue-500",
  },
  {
    key: "saas",
    icon: LayoutDashboard,
    href: "/services#saas",
    bg: "bg-violet-500/10",
    text: "text-violet-500",
  },
  {
    key: "android",
    icon: Smartphone,
    href: "/services#android",
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
  },
  {
    key: "ai",
    icon: Sparkles,
    href: "/services#ai",
    bg: "bg-fuchsia-500/10",
    text: "text-fuchsia-500",
  },
  {
    key: "seo",
    icon: Search,
    href: "/services#seo",
    bg: "bg-orange-500/10",
    text: "text-orange-500",
  },
  {
    key: "database",
    icon: Database,
    href: "/services#database",
    bg: "bg-teal-500/10",
    text: "text-teal-500",
  },
  {
    key: "maintenance",
    icon: Wrench,
    href: "/services#maintenance",
    bg: "bg-amber-500/10",
    text: "text-amber-500",
  },
  {
    key: "consulting",
    icon: Lightbulb,
    href: "/services#consulting",
    bg: "bg-indigo-500/10",
    text: "text-indigo-500",
  },
];
