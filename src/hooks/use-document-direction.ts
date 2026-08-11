import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const RTL_LANGS = new Set(["ar", "he", "fa", "ur"]);

/**
 * Keeps <html dir> and <html lang> in sync with the active i18n language.
 * Call once near the root of the app (e.g. in RootComponent).
 */
export function useDocumentDirection() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = (i18n.language || "en").split("-")[0];
    const dir = RTL_LANGS.has(lang) ? "rtl" : "ltr";

    const html = document.documentElement;
    html.setAttribute("dir", dir);
    html.setAttribute("lang", lang);

    // Optional: body class for CSS hooks
    document.body.classList.toggle("is-rtl", dir === "rtl");
    document.body.classList.toggle("is-ltr", dir === "ltr");
  }, [i18n.language]);
}