import { Container } from "./Container";

/**
 * Footer placeholder — content will be implemented in a later step.
 */
export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-border bg-background">
      <Container className="flex h-16 items-center justify-between text-xs text-muted-foreground">
        <span>&copy; {new Date().getFullYear()} SGG</span>
        <span>{/* Footer links placeholder */}</span>
      </Container>
    </footer>
  );
}