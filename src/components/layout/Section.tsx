import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: "section" | "article" | "div";
}

/**
 * Vertical section wrapper providing consistent block spacing.
 * Wrap children in <Container> for horizontal constraints.
 */
export function Section({
  className,
  children,
  as: Tag = "section",
  ...props
}: SectionProps) {
  return (
    <Tag className={cn("w-full py-12 md:py-16 lg:py-20", className)} {...props}>
      {children}
    </Tag>
  );
}