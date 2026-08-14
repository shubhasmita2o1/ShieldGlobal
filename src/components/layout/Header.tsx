import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { SERVICES } from "@/sections/services/serviceData";
import { GoogleTranslate } from "@/components/GoogleTranslate";

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

export function Header() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const closeAll = () => {
    setOpen(false);
    setOpenMenu(null);
  };

  /** Top-level nav: exact match, or prefix for section roots (e.g. /services/*). */
  const isNavActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  /** Dropdown items: exact path only so /services does not light up on every child page. */
  const isDropdownActive = (href: string) => pathname === href;

  const isMobile = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 991.98px)").matches;

  const openDropdown = (label: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMenu(label);
  };

  const scheduleCloseDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };

  return (
    <header className="sgg-navbar w-full bg-white">
      <div className="sgg-container mx-auto flex w-full items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5"
          aria-label="Shield Global Group home"
        >
          <img
            src="/logo.png"
            alt="Shield Global Group"
            className="sgg-logo w-auto"
          />
        </Link>

        {/* Hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded border-0 bg-transparent text-neutral-800 lg:hidden"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile backdrop */}
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          onClick={closeAll}
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        {/* Nav + Google Translate */}
        <nav
          aria-label="Primary"
          className={`sgg-menu ${open ? "sgg-menu-open" : ""}`}
        >
          <ul className="sgg-nav">
            {NAV_ITEMS.map((item) => {
              const menuOpen = openMenu === item.label;
              const active = isNavActive(item.href);

              return (
                <li
                  key={item.label}
                  className={`sgg-nav-item ${item.children ? "sgg-has-dropdown" : ""} ${
                    menuOpen ? "sgg-dropdown-open" : ""
                  }`}
                  onMouseEnter={
                    item.children && !isMobile()
                      ? () => openDropdown(item.label)
                      : undefined
                  }
                  onMouseLeave={
                    item.children && !isMobile()
                      ? scheduleCloseDropdown
                      : undefined
                  }
                >
                  {item.children ? (
                    <>
                      <div className="sgg-nav-toggle-wrap">
                        <Link
                          to={item.href}
                          className={`sgg-nav-link ${
                            active ? "sgg-nav-link-active" : ""
                          }`}
                          onClick={() => {
                            if (isMobile()) {
                              closeAll();
                            } else {
                              setOpen(false);
                              setOpenMenu(null);
                            }
                          }}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          className="sgg-nav-caret-btn"
                          aria-label={`${menuOpen ? "Close" : "Open"} ${item.label} menu`}
                          aria-expanded={menuOpen}
                          aria-haspopup="true"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (menuOpen) {
                              setOpenMenu(null);
                            } else {
                              openDropdown(item.label);
                            }
                          }}
                        >
                          <ChevronDown
                            size={15}
                            aria-hidden
                            className="sgg-nav-caret"
                          />
                        </button>
                      </div>
                      <ul
                        className="sgg-dropdown"
                        aria-label={`${item.label} menu`}
                        onMouseEnter={
                          !isMobile() ? () => openDropdown(item.label) : undefined
                        }
                      >
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              to={child.href}
                              className={`sgg-dropdown-link ${
                                isDropdownActive(child.href)
                                  ? "sgg-dropdown-link-active"
                                  : ""
                              }`}
                              onClick={closeAll}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={closeAll}
                      className={`sgg-nav-link ${active ? "sgg-nav-link-active" : ""}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}

            {/* Google Translate */}
            <li className="sgg-nav-item sgg-lang-item flex items-center">
              <GoogleTranslate />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
