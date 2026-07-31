import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, Globe2, Check } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
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

const LANGS = [
  { value: "en", label: "English", native: "English" },
  { value: "ar", label: "Arabic", native: "العربية" },
  { value: "fr", label: "French", native: "Français" },
  { value: "hi", label: "Hindi", native: "हिन्दी" },
  { value: "ru", label: "Russian", native: "Русский" },
] as const;

type LangCode = (typeof LANGS)[number]["value"];

export function Header() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<LangCode>("en");
  const langRef = useRef<HTMLLIElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const currentLang = LANGS.find((l) => l.value === lang) ?? LANGS[0];

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  // Close language menu on outside click
  useEffect(() => {
    if (!langOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  const closeAll = () => {
    setOpen(false);
    setOpenMenu(null);
    setLangOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sgg-navbar w-full bg-white">
      <div className="sgg-container mx-auto flex w-full items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" aria-label="Shield Global Group home">
          <img src="/logo.png" alt="Shield Global Group" className="sgg-logo w-auto" />
        </Link>

        {/* Hamburger — visible only below lg */}
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

        {/* Nav + language */}
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
                      <Link
                        to={item.href}
                        className={`sgg-nav-link sgg-nav-toggle ${
                          active ? "sgg-nav-link-active" : ""
                        }`}
                        aria-haspopup="true"
                        aria-expanded={menuOpen}
                        onMouseEnter={() => setOpenMenu(item.label)}
                        onClick={(e) => {
                          if (window.matchMedia("(max-width: 991.98px)").matches) {
                            e.preventDefault();
                            setOpenMenu(menuOpen ? null : item.label);
                          } else {
                            setOpen(false);
                          }
                        }}
                      >
                        {item.label}
                        <ChevronDown size={15} aria-hidden className="sgg-nav-caret" />
                      </Link>
                      <ul className="sgg-dropdown" aria-label={`${item.label} menu`}>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              to={child.href}
                              className="sgg-dropdown-link"
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

            {/* Language selector — custom dropdown */}
            <li ref={langRef} className="sgg-nav-item sgg-lang-item relative">
              <button
                type="button"
                aria-label="Select language"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                onClick={() => {
                  setLangOpen((v) => !v);
                  setOpenMenu(null);
                }}
                className={`notranslate inline-flex items-center gap-1.5 rounded-lg border border-sgg-border-default bg-sgg-surface-raised px-2.5 py-1.5 text-[13px] font-medium text-sgg-ink-secondary shadow-[var(--sgg-e1)] transition-all duration-200 hover:border-[#0a8fb8]/40 hover:text-sgg-ink-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a8fb8]/40 ${
                  langOpen ? "border-[#0a8fb8]/50 text-sgg-ink-primary" : ""
                }`}
              >
                <Globe2 size={14} className="shrink-0 text-[#0a8fb8]" aria-hidden />
                <span className="min-w-[3.5rem] text-left">{currentLang.label}</span>
                <ChevronDown
                  size={13}
                  aria-hidden
                  className={`shrink-0 opacity-60 transition-transform duration-200 ${
                    langOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {langOpen && (
                <ul
                  role="listbox"
                  aria-label="Languages"
                  className="absolute right-0 top-[calc(100%+8px)] z-[70] min-w-[180px] overflow-hidden rounded-xl border border-sgg-border-default bg-white py-1.5 shadow-[0_18px_40px_-16px_rgba(15,23,42,0.28)]"
                >
                  {LANGS.map((l) => {
                    const selected = l.value === lang;
                    return (
                      <li key={l.value} role="option" aria-selected={selected}>
                        <button
                          type="button"
                          className={`notranslate flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-[13.5px] transition-colors ${
                            selected
                              ? "bg-[rgba(10,143,184,0.08)] text-[#0a8fb8]"
                              : "text-sgg-ink-secondary hover:bg-sgg-surface-tinted hover:text-sgg-ink-primary"
                          }`}
                          onClick={() => {
                            setLang(l.value);
                            setLangOpen(false);
                          }}
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block font-medium leading-tight">{l.label}</span>
                            <span className="mt-0.5 block text-[11px] font-normal opacity-60">
                              {l.native}
                            </span>
                          </span>
                          {selected && (
                            <Check size={15} className="shrink-0 text-[#0a8fb8]" aria-hidden />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
