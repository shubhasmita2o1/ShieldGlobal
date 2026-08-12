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

// Clear a cookie across every domain/path variant that either our own code
// or Google's widget script might have used when setting it. A single
// mismatched scope means the delete is a silent no-op and the old cookie
// survives a refresh.
function clearGoogTransCookie() {
  const host = window.location.hostname;
  const bareHost = host.replace(/^www\./, "");
  const past = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
  const domainVariants = [
    "", // no domain attribute (host-only cookie)
    `; domain=${host}`,
    `; domain=.${host}`,
    `; domain=${bareHost}`,
    `; domain=.${bareHost}`,
  ];
  const pathVariants = ["/", window.location.pathname];

  for (const domain of domainVariants) {
    for (const path of pathVariants) {
      document.cookie = `googtrans=; ${past}; path=${path}${domain};`;
    }
  }
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

  const applyingRef = useRef(false);
  const lastTriggerAtRef = useRef(0);

  const applyToSelect = (code: LangCode, attemptsLeft = 10) => {
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      if (select.value === code) {
        // Already on this language — do NOT dispatch again. Re-firing
        // "change" with an unchanged value is what was causing Google's
        // widget to toggle back to the original text and re-translate,
        // producing the English/Arabic/French flicker.
        return;
      }
      select.value = code;
      // Must bubble — Google's listener is attached above the element and
      // won't fire on a non-bubbling synthetic event.
      select.dispatchEvent(new Event("change", { bubbles: true }));
      return;
    }
    // .goog-te-combo isn't mounted yet (Google's async script/init hasn't
    // finished) — retry briefly instead of assuming it's missing.
    if (attemptsLeft > 0) {
      window.setTimeout(() => applyToSelect(code, attemptsLeft - 1), 200);
    } else {
      // Genuinely unavailable — fall back to a reload so the cookie applies.
      window.location.reload();
    }
  };

  // Every trigger of a translation goes through here. Google rewrites large
  // chunks of the DOM (wrapping text in <font> tags) as a side effect of
  // translating — those rewrites themselves look like "new content" to the
  // MutationObserver below. A translation pass over a full page can take
  // several seconds, so the guard window has to comfortably outlast it, and
  // triggers are also rate-limited so a slow first pass can't be interrupted
  // by a second one before it settles.
  const MIN_RETRIGGER_INTERVAL_MS = 6000;
  const GUARD_WINDOW_MS = 5000;

  const triggerTranslate = (code: LangCode) => {
    lastTriggerAtRef.current = Date.now();
    applyingRef.current = true;
    applyToSelect(code);
    window.setTimeout(() => {
      applyingRef.current = false;
    }, GUARD_WINDOW_MS);
  };

  const currentRef = useRef<LangCode>(current);
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  // React (Framer Motion, carousels, etc.) swaps content in and out on its
  // own timers — the hero slider being the main example. Google Translate
  // only rewrites whatever is in the DOM at the moment it's triggered, so
  // newly-rendered text (a new slide's title/subtitle) stays untranslated
  // until something tells Google to look again. Watch the page for content
  // changes and re-apply the active language when they happen.
  useEffect(() => {
    let debounceTimer: number | undefined;

    const observer = new MutationObserver(() => {
      if (currentRef.current === "en") return; // nothing to (re)translate
      if (applyingRef.current) return; // Google is mid-translation — ignore its own mutations

      window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(() => {
        if (applyingRef.current) return;
        if (Date.now() - lastTriggerAtRef.current < MIN_RETRIGGER_INTERVAL_MS) return;
        triggerTranslate(currentRef.current);
      }, 800);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      window.clearTimeout(debounceTimer);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeLanguage = (code: LangCode) => {
    setCurrent(code);
    setOpen(false);

    if (code === "en") {
      // Reset to original: clear every scope variant, then reload so no
      // stale cookie or in-memory widget state survives.
      clearGoogTransCookie();
      window.location.reload();
      return;
    }

    document.cookie = `googtrans=/en/${code}; path=/;`;
    document.cookie = `googtrans=/en/${code}; path=/; domain=.${window.location.hostname}`;

    triggerTranslate(code);
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