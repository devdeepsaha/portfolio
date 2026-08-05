import { useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Modal-URL router.
 *
 * `path` can be either:
 *   - a real path starting with "/" (e.g. "/blog") — pushed as a full URL
 *   - a bare string (e.g. "projects/29/lightbox") — pushed as "#projects/29/lightbox"
 *
 * We keep hash form for nested modal state (project detail, lightbox, playground
 * item) because those states don't have real routes yet. Top-level tile modals
 * push real paths so the URL bar shows /blog, /projects, /learning instead of
 * lying with #playground.
 */
export function useHashRouter(
  isOpen: boolean,
  path: string,
  onBack: () => void,
) {
  const prevIsOpen = useRef(false);
  const isRealPath = path.startsWith("/");

  const readCurrent = () =>
    isRealPath
      ? window.location.pathname + window.location.search
      : window.location.hash.replace(/^#/, "");

  const matches = (current: string) =>
    current === path || current.startsWith(path + "/");

  useEffect(() => {
    const wasOpen = prevIsOpen.current;
    prevIsOpen.current = isOpen;

    if (isOpen && !wasOpen) {
      const current = readCurrent();
      if (!matches(current)) {
        // Push directly via history API. React Router's BrowserRouter doesn't
        // observe raw pushState calls, so the app doesn't re-render — the
        // modal stays open on top of whatever was rendering before.
        window.history.pushState(null, "", path);
      }
    }
  }, [isOpen, path]);

  useEffect(() => {
    if (!isOpen) return;

    const onPopState = () => {
      const current = readCurrent();
      if (!matches(current)) {
        onBack();
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [isOpen, path, onBack]);

  const close = useCallback(() => {
    const current = readCurrent();
    if (matches(current)) {
      window.history.back();
    } else {
      onBack();
    }
  }, [path, onBack]);

  return close;
}

export function useHashInit(
  entries: Array<{
    match: RegExp;
    // Allow dynamic parent hashes based on the regex match!
    parentHashes: string[] | ((groups: RegExpMatchArray) => string[]);
    onMatch: (groups: RegExpMatchArray) => void;
  }>,
) {
  const initialized = useRef(false);

  useEffect(() => {
    const hash = window.location.hash;

    // --- 1. MOUNT LOGIC (Injects history so back button works for fresh deep links) ---
    if (!initialized.current && hash) {
      initialized.current = true;
      for (const entry of entries) {
        const m = hash.match(entry.match);
        if (m) {
          const currentHash = hash.replace(/^#/, "");
          const parents =
            typeof entry.parentHashes === "function"
              ? entry.parentHashes(m)
              : entry.parentHashes;

          if (parents.length > 0) {
            const baseUrl = window.location.pathname + window.location.search;
            window.history.replaceState(null, "", baseUrl);
            for (const p of parents) {
              window.history.pushState(null, "", `#${p}`);
            }
            window.history.pushState(null, "", `#${currentHash}`);
          }
          setTimeout(() => {
            entry.onMatch(m);

            if (window.gtag) {
              window.gtag("event", "page_view", {
                page_location: window.location.href,
                page_path: window.location.pathname + window.location.hash,
                page_title: document.title,
              });
            }
          }, 10);
          return;
        }
      }
      initialized.current = true;
    }

    // --- 2. HASHCHANGE LOGIC (Listens to manual URL edits while app is already open) ---
    const handleHashChange = () => {
      const currentHash = window.location.hash;
      if (window.gtag) {
        window.gtag("event", "page_view", {
          page_location: window.location.href,
          page_path: window.location.pathname + currentHash,
          page_title: document.title,
        });
      }
      for (const entry of entries) {
        const m = currentHash.match(entry.match);
        if (m) {
          entry.onMatch(m);
          break;
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [entries]);
}
