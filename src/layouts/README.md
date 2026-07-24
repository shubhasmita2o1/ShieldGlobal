# layouts/

Page shells that compose header, footer, sidebars, and `<Outlet />` around
route content. A layout does not fetch page data — it only arranges chrome.

Example: `MainLayout.tsx` renders `<SiteHeader />`, `<Outlet />`, `<SiteFooter />`.
Wire a layout via a TanStack pathless route (e.g. `src/routes/_main.tsx`) that
renders it around `<Outlet />`.