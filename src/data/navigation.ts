export const primaryNavItems = [
  { href: "/work", label: "Work" },
  { href: "/", label: "About", section: "about" },
  { href: "/", label: "Contact", section: "contact" },
] as const;

export const landingSectionNavItems = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export type PrimaryNavItem = (typeof primaryNavItems)[number];
