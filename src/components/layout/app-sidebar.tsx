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
  Droplets,
  PlusCircle,
  Cpu,
  ShieldCheck,
  Tag,
  Sparkles,
  Leaf,
  Scan,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/types";

export const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard, variant: "ghost" },
  { title: "My Listings", href: "/my-listings", icon: List, variant: "ghost" },
  { title: "My Rentals", href: "/my-rentals", icon: Handshake, variant: "ghost" },
  { title: "Messages", href: "/messages", icon: MessageSquare, variant: "ghost" },
  { title: "List an Item", href: "/list-item", icon: PlusCircle, variant: "ghost" },
];

export const aiTools: NavItem[] = [
  { title: "Intelligent Matchmaking", href: "/dashboard", icon: Sparkles, variant: "ghost", label:"AI"},
  { title: "Dynamic Pricing", href: "/pricing-tool", icon: Tag, variant: "ghost", label:"AI" },
  { title: "Risk Assessment", href: "/risk-assessment", icon: ShieldCheck, variant: "ghost", label:"AI" },
  { title: "Idle Asset Detector", href: "/idle-asset-detector", icon: Cpu, variant: "ghost", label:"AI" },
  { title: "Damage Detection", href: "/damage-detection", icon: Scan, variant: "ghost", label:"AI" },
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-all group-hover:scale-110"><path d="M12 2a10 10 0 0 0-10 10c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10z"/><path d="M12 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>
          <span className="sr-only">ShareCycle</span>
        </Link>
        {renderNavItems(navItems)}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        {renderNavItems(aiTools)}
      </nav>
    </aside>
  );
}
