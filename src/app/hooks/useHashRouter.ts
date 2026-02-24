import { useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function useHashRouter(
  isOpen: boolean,
  hashPath: string,
  onBack: () => void,
) {
  const prevIsOpen = useRef(false);

  useEffect(() => {
    const wasOpen = prevIsOpen.current;
    prevIsOpen.current = isOpen;

    if (isOpen && !wasOpen) {
      const current = window.location.hash.replace(/^#/, "");
      if (current !== hashPath && !current.startsWith(hashPath + "/")) {
        window.history.pushState(null, "", `#${hashPath}`);
      }
    }
  }, [isOpen, hashPath]);

  useEffect(() => {
    if (!isOpen) return;

    const onPopState = () => {
      const current = window.location.hash.replace(/^#/, "");
      if (current !== hashPath && !current.startsWith(hashPath + "/")) {
        onBack();
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [isOpen, hashPath, onBack]);

  const close = useCallback(() => {
    const current = window.location.hash.replace(/^#/, "");
    if (current === hashPath || current.startsWith(hashPath + "/")) {
      window.history.back();
    } else {
      onBack();
    }
  }, [hashPath, onBack]);

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
