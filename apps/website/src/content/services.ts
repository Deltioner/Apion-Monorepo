import {
  Code2,
  LayoutDashboard,
  Wrench,
  Search,
  Database,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export type ServiceKey =
  | "web"
  | "saas"
  | "maintenance"
  | "seo"
  | "database"
  | "consulting";

export type Service = {
  key: ServiceKey;
  icon: LucideIcon;
  href: string;
};

export const services: Service[] = [
  { key: "web", icon: Code2, href: "/services#web" },
  { key: "saas", icon: LayoutDashboard, href: "/services#saas" },
  { key: "maintenance", icon: Wrench, href: "/services#maintenance" },
  { key: "seo", icon: Search, href: "/services#seo" },
  { key: "database", icon: Database, href: "/services#database" },
  { key: "consulting", icon: Lightbulb, href: "/services#consulting" },
];
