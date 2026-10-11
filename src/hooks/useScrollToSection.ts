import { useCallback } from "react";

/**
 * Returns a memoized callback that smoothly scrolls to a DOM element by ID
 * and synchronizes the URL hash for SEO and navigation history.
 */
export function useScrollToSection(id: string): (e?: React.MouseEvent) => void {
  return useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  }, [id]);
}
