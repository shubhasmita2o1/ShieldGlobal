import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Premium Enterprise Design System — background ladder.
 * One identity per section; no two adjacent sections should share a surface.
 * See Shield-Global-Premium-Design-System.pdf, "Surfaces".
 */
const SURFACE_CLASS = {
  hero: "bg-[image:var(--sgg-g-hero)] text-sgg-ink-inverse",
  about: "bg-sgg-surface-tinted text-sgg-ink-primary",
  services: "bg-gradient-to-b from-sgg-surface-tinted to-sgg-surface-sunken text-sgg-ink-primary",
  industries: "bg-sgg-surface-raised text-sgg-ink-primary",
  projects: "bg-sgg-surface-sunken text-sgg-ink-primary",
  statistics: "bg-[image:var(--sgg-g-charcoal)] text-sgg-ink-inverse",
  cta: "bg-[image:var(--sgg-g-hero)] text-sgg-ink-inverse",
  footer: "bg-sgg-surface-footer text-sgg-ink-inverse-2",
  canvas: "bg-sgg-surface-canvas text-sgg-ink-primary",
} as const;

type Surface = keyof typeof SURFACE_CLASS;

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: "section" | "article" | "div";
  /**
   * Assigns this section a surface from the design system's background
   * ladder. Optional — omit to keep a section fully transparent/unstyled
   * (e.g. when the section already sets its own background internally).
   */
  surface?: Surface;
}

/**
 * Vertical section wrapper providing consistent block spacing.
 * Wrap children in <Container> for horizontal constraints.
 */
export function Section({
  className,
  children,
  as: Tag = "section",
  surface,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "w-full py-12 md:py-16 lg:py-20",
        surface && SURFACE_CLASS[surface],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}