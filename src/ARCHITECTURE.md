# Project Architecture

Stack: TanStack Start (React 19) + TypeScript + Tailwind v4 + shadcn/ui.
File-based routing lives in `src/routes/` and is owned by the TanStack
Router Vite plugin — never edit `routeTree.gen.ts` by hand.

## Folder map

    src/
      routes/       Route files (thin: path + loader + head + <Page />)
      pages/        Page components imported by route files
      layouts/      Header/Footer/Sidebar shells that wrap <Outlet />
      sections/     Large page blocks (Hero, Features, CTA, ...)
      components/   Reusable UI
        ui/         shadcn primitives
      hooks/        Reusable React hooks (use-*)
      utils/        Pure helper functions
      lib/          Framework/integration wiring (clients, error reporting)
      assets/       Imported static assets (images, icons)
      styles/       CSS modules (global tokens live in src/styles.css)

## Conventions

- Routing: add a file under `src/routes/` (dot-separated). See `src/routes/README.md`.
- Design tokens: extend `src/styles.css` — never hardcode hex colors in components.
- Imports: use the `@/` alias (`@/components/...`, `@/pages/...`).
- File naming: components PascalCase.tsx, hooks use-kebab.ts, utils kebab-case.ts.

## Adding a new page

1. Create `src/pages/FooPage.tsx` — the visual page component.
2. Create `src/routes/foo.tsx` with `createFileRoute("/foo")({ component: FooPage, head: () => ({ meta: [...] }) })`.
3. Break the page into `sections/` if it's large; reuse `components/`.
4. Add a `<Link to="/foo">` from wherever it should be reachable.
