"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  List,
  Handshake,
  MessageSquare,
  PlusCircle,
  Cpu,
  Tag,
  ShieldCheck,
  Leaf,
  Scan,
  Recycle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/types";
import { Separator } from "../ui/separator";

export const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard, variant: "ghost" },
  { title: "My Listings", href: "/my-listings", icon: List, variant: "ghost" },
  { title: "My Rentals", href: "/my-rentals", icon: Handshake, variant: "ghost" },
  { title: "Messages", href: "/messages", icon: MessageSquare, variant: "ghost" },
];

export const aiTools: NavItem[] = [
    { title: "AI Idle Asset Detector", href: "/idle-asset-detector", icon: Cpu, variant: "ghost" },
    { title: "AI Dynamic Pricing", href: "/pricing-tool", icon: Tag, variant: "ghost" },
    { title: "AI Risk Assessment", href: "/risk-assessment", icon: ShieldCheck, variant: "ghost" },
    { title: "Sustainability", href: "/sustainability", icon: Leaf, variant: "ghost" },
];

export function AppSidebar() {
  const pathname = usePathname();

  const renderNavItems = (items: NavItem[]) => (
    <TooltipProvider>
      {items.map((item) => (
        <Tooltip key={item.href}>
          <TooltipTrigger asChild>
            <Link
              href={item.href}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8",
                pathname === item.href
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="sr-only">{item.title}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{item.title}</TooltipContent>
        </Tooltip>
      ))}
    </TooltipProvider>
  );

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-card sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Recycle className="h-5 w-5 transition-all group-hover:scale-110" />
          <span className="sr-only">ShareCycle</span>
        </Link>
        {renderNavItems(navItems)}
        <Separator className="my-2" />
        {renderNavItems(aiTools)}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/list-item"
                        className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8",
                        pathname === "/list-item"
                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        )}
                    >
                        <PlusCircle className="h-5 w-5" />
                        <span className="sr-only">List an Item</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">List an Item</TooltipContent>
            </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
