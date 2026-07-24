import { Container } from "./Container";
import logo from "@/assets/logos/shield-global-group-logo.png.asset.json";

/**
 * Header placeholder — nav/logo will be implemented in a later step.
 */
export function Header() {
  return (
    <header className="w-full border-b border-border bg-background">
      <Container className="flex h-16 items-center justify-between">
        <a href="/" className="flex items-center" aria-label="Shield Global Group home">
          <img
            src={logo.url}
            alt="Shield Global Group"
            className="h-8 w-auto"
          />
        </a>
        <nav aria-label="Primary" className="text-sm text-muted-foreground">
          {/* Navigation placeholder */}
        </nav>
      </Container>
    </header>
  );
}