"use client";

import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex flex-1 flex-col sm:pl-14">
        <AppHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
