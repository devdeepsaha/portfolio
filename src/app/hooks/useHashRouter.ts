// src/hooks/useHashRouter.ts
import { useEffect } from "react";

export function useHashRouter(
  isOpen: boolean,
  hashPath: string, 
  onBack: () => void
) {
  // Push the specific hash when the state opens
  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ modalOpen: true }, "", `#${hashPath}`);
    }
  }, [isOpen, hashPath]);

  // Listen for the back button (which changes the hash)
  useEffect(() => {
    if (!isOpen) return;

    const handleHashChange = () => {
      // If the current URL hash DOES NOT contain our target hash, 
      // it means the user went back.
      if (!window.location.hash.includes(hashPath)) {
        onBack();
      }
    };

    window.addEventListener("popstate", handleHashChange);

    return () => {
      window.removeEventListener("popstate", handleHashChange);
    };
  }, [isOpen, hashPath, onBack]);

  // Provide a clean way to close programmatically (e.g. clicking the X)
  const closeProgrammatically = () => {
    if (window.location.hash.includes(hashPath)) {
      window.history.back(); // Trigger the native back to clear the hash
    } else {
      onBack(); // Fallback
    }
  };

  return closeProgrammatically;
}