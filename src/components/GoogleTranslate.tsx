import { useEffect, useRef, useState } from "react";
import { Globe2, ChevronDown, Check } from "lucide-react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const LANGS = [
  { value: "en", label: "English", native: "English" },
  { value: "ar", label: "Arabic", native: "العربية" },
  { value: "fr", label: "French", native: "Français" },
  { value: "hi", label: "Hindi", native: "हिन्दी" },
  { value: "ru", label: "Russian", native: "Русский" },
] as const;

type LangCode = (typeof LANGS)[number]["value"];

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export function GoogleTranslate() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<LangCode>("en");
  const ref = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Detect current language from Google cookie
  useEffect(() => {
    const googtrans = getCookie("googtrans");
    if (googtrans) {
      // cookie looks like: /en/ar
      const parts = googtrans.split("/");
      const lang = parts[parts.length - 1] as LangCode;
      if (LANGS.some((l) => l.value === lang)) {
        setCurrent(lang);
      }
    }
  }, []);

  // Load Google Translate script
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ar,fr,hi,ru",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const changeLanguage = (code: LangCode) => {
    setCurrent(code);
    setOpen(false);

    // Set the cookie so it persists on reload
    if (code === "en") {
      // Reset to original
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." +
        window.location.hostname;
      window.location.reload();
      return;
    }

    document.cookie = `googtrans=/en/${code}; path=/;`;
    document.cookie = `googtrans=/en/${code}; path=/; domain=.${window.location.hostname}`;

    // Trigger the select if it exists
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event("change"));
    } else {
      // Fallback: force reload so Google applies the cookie
      window.location.reload();
    }
  };

  const currentLang = LANGS.find((l) => l.value === current) ?? LANGS[0];

  return (
    <div ref={ref} className="relative notranslate">
      {/* Required hidden element */}
      <div id="google_translate_element" style={{ display: "none" }} />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-lg border border-sgg-border-default bg-sgg-surface-raised px-2.5 py-1.5 text-[13px] font-medium text-sgg-ink-secondary shadow-[var(--sgg-e1)] transition-all duration-200 hover:border-[#0a8fb8]/40 hover:text-sgg-ink-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a8fb8]/40 ${
          open ? "border-[#0a8fb8]/50 text-sgg-ink-primary" : ""
        }`}
      >
        <Globe2 size={14} className="shrink-0 text-[#0a8fb8]" />
        <span className="min-w-[3.5rem] text-start">{currentLang.label}</span>
        <ChevronDown
          size={13}
          className={`shrink-0 opacity-60 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul className="absolute end-0 top-[calc(100%+8px)] z-[70] min-w-[180px] overflow-hidden rounded-xl border border-sgg-border-default bg-white py-1.5 shadow-[0_18px_40px_-16px_rgba(15,23,42,0.28)]">
          {LANGS.map((l) => {
            const selected = l.value === current;
            return (
              <li key={l.value}>
                <button
                  type="button"
                  onClick={() => changeLanguage(l.value)}
                  className={`flex w-full items-center gap-3 px-3.5 py-2.5 text-start text-[13.5px] transition-colors ${
                    selected
                      ? "bg-[rgba(10,143,184,0.08)] text-[#0a8fb8]"
                      : "text-sgg-ink-secondary hover:bg-sgg-surface-tinted hover:text-sgg-ink-primary"
                  }`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium leading-tight">
                      {l.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] font-normal opacity-60">
                      {l.native}
                    </span>
                  </span>
                  {selected && (
                    <Check size={15} className="shrink-0 text-[#0a8fb8]" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}