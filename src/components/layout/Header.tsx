import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logos/shield-global-group-logo.png.asset.json";
import { SERVICES } from "@/sections/services/serviceData";

type NavItem = {
  label: string;
  href: string;
  active?: boolean;
  children?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", active: true },
  { label: "About Us", href: "/about-us" },
  {
    label: "Services",
    href: "/services",
    children: SERVICES.map((s) => ({ label: s.navLabel, href: s.slug })),
  },
  { label: "Group of Companies", href: "/group-of-companies" },
  { label: "Contact", href: "/contact" },
];

const LANGS: { value: string; label: string }[] = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
  { value: "fr", label: "French" },
  { value: "hi", label: "Hindi" },
  { value: "ru", label: "Russian" },
];

/**
 * Site header — recreates the original Shield Global Group navbar.
 * White bar, left logo, right-aligned nav with cyan underline hover,
 * language select, and a mobile right-drawer with hamburger toggle.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  const closeAll = () => {
    setOpen(false);
    setOpenMenu(null);
  };

  return (
    <header className="sgg-navbar w-full bg-white">
      <div className="sgg-container mx-auto flex w-full items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5" aria-label="Shield Global Group home">
          <img
            src={logo.url}
            alt="Shield Global Group"
            className="sgg-logo w-auto"
          />
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded border-0 bg-transparent text-neutral-800 lg:hidden"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Backdrop (mobile only) */}
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          onClick={closeAll}
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        {/* Menu */}
        <nav
          aria-label="Primary"
          className={`sgg-menu ${open ? "sgg-menu-open" : ""}`}
        >
          <ul className="sgg-nav">
            {NAV_ITEMS.map((item) => {
              const isOpen = openMenu === item.label;
              return (
                <li
                  key={item.label}
                  className={`sgg-nav-item ${
                    item.children ? "sgg-has-dropdown" : ""
                  } ${isOpen ? "sgg-dropdown-open" : ""}`}
                  onMouseLeave={
                    item.children ? () => setOpenMenu(null) : undefined
                  }
                >
                  {item.children ? (
                    <>
                      <a
                        href={item.href}
                        className={`sgg-nav-link sgg-nav-toggle ${
                          item.active ? "sgg-nav-link-active" : ""
                        }`}
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        onMouseEnter={() => setOpenMenu(item.label)}
                        onClick={(e) => {
                          // On touch/mobile the first tap opens the submenu.
                          if (window.matchMedia("(max-width: 991.98px)").matches) {
                            e.preventDefault();
                            setOpenMenu(isOpen ? null : item.label);
                          }
                        }}
                      >
                        {item.label}
                        <ChevronDown
                          size={15}
                          aria-hidden="true"
                          className="sgg-nav-caret"
                        />
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
                      className={`sgg-nav-link ${item.active ? "sgg-nav-link-active" : ""}`}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
            <li className="sgg-nav-item sgg-lang-item">
              <select
                aria-label="Language"
                className="sgg-lang notranslate"
                translate="no"
                defaultValue="en"
              >
                {LANGS.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
