import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * Root page layout: Header + main content + Footer.
 * Wrap page components with this in each route.
 */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}