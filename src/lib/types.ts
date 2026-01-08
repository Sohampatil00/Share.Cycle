import type { LucideIcon } from "lucide-react";

export type RentalItem = {
  id: string;
  title: string;
  description: string;
  pricePerDay: number;
  category: string;
  imageUrl: string;
  imageHint: string;
  lat: number;
  lng: number;
};

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  variant: "default" | "ghost";
};
