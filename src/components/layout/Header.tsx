import { Container } from "./Container";

/**
 * Header placeholder — nav/logo will be implemented in a later step.
 */
export function Header() {
  return (
    <header className="w-full border-b border-border bg-background">
      <Container className="flex h-16 items-center justify-between">
        <div className="text-sm font-semibold text-foreground">SGG</div>
        <nav aria-label="Primary" className="text-sm text-muted-foreground">
          {/* Navigation placeholder */}
        </nav>
      </Container>
    </header>
  );
}