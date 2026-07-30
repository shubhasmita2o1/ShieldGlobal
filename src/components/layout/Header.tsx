import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { SERVICES } from "@/sections/services/serviceData";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  {
    label: "Services",
    href: "/services",
    children: SERVICES.map((s) => ({ label: s.navLabel, href: s.slug })),
  },
  { label: "Group of Companies", href: "/group-of-companies" },
  { label: "Contact", href: "/contact" },
];

// ... LANGS stays the same ...

export function Header() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  const closeAll = () => {
    setOpen(false);
    setOpenMenu(null);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sgg-navbar w-full bg-white">
      <div className="sgg-container mx-auto flex w-full items-center justify-between">
        <a href="/" className="flex items-center gap-2.5" aria-label="Shield Global Group home">
          <img src="/logo.png" alt="Shield Global Group" className="sgg-logo w-auto" />
        </a>

        {/* mobile toggle + backdrop unchanged */}

        <nav aria-label="Primary" className={`sgg-menu ${open ? "sgg-menu-open" : ""}`}>
          <ul className="sgg-nav">
            {NAV_ITEMS.map((item) => {
              const menuOpen = openMenu === item.label;
              const active = isActive(item.href);

              return (
                <li
                  key={item.label}
                  className={`sgg-nav-item ${item.children ? "sgg-has-dropdown" : ""} ${
                    menuOpen ? "sgg-dropdown-open" : ""
                  }`}
                  onMouseLeave={item.children ? () => setOpenMenu(null) : undefined}
                >
                  {item.children ? (
                    <>
                      <a
                        href={item.href}
                        className={`sgg-nav-link sgg-nav-toggle ${active ? "sgg-nav-link-active" : ""}`}
                        aria-haspopup="true"
                        aria-expanded={menuOpen}
                        onMouseEnter={() => setOpenMenu(item.label)}
                        onClick={(e) => {
                          if (window.matchMedia("(max-width: 991.98px)").matches) {
                            e.preventDefault();
                            setOpenMenu(menuOpen ? null : item.label);
                          }
                        }}
                      >
                        {item.label}
                        <ChevronDown size={15} aria-hidden="true" className="sgg-nav-caret" />
                      </a>
                      <ul className="sgg-dropdown" aria-label={`${item.label} menu`}>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <a
                              href={child.href}
                              className="sgg-dropdown-link"
                              onClick={closeAll}
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={closeAll}
                      className={`sgg-nav-link ${active ? "sgg-nav-link-active" : ""}`}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
            {/* language select unchanged */}
          </ul>
        </nav>
      </div>
    </header>
  );
}