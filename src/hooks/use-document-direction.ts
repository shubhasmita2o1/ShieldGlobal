import { useEffect } from "react";

export function useDocumentDirection() {
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", "ltr");
    html.setAttribute("lang", "en");
    document.body.classList.add("is-ltr");
    document.body.classList.remove("is-rtl");
  }, []);
}