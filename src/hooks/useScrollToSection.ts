import { useCallback } from "react";

/**
 * Returns a memoized callback that smoothly scrolls to a DOM element by ID.
 * Stable reference — safe to pass as a prop or use in dependency arrays.
 */
export function useScrollToSection(id: string): () => void {
  return useCallback(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, [id]);
}
