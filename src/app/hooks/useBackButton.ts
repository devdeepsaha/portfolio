// src/hooks/useBackButton.ts
import { useEffect } from "react";

export function useBackButton(isOpen: boolean, close: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    // 1. When modal opens, push a dummy state to the browser history
    window.history.pushState({ modalOpen: true }, "", "#open");

    // 2. Listen for the back button press (popstate)
    const handleBackButton = () => {
      close(); // Close the modal instead of leaving the website
    };

    window.addEventListener("popstate", handleBackButton);

    // 3. Cleanup
    return () => {
      window.removeEventListener("popstate", handleBackButton);
      
      // If the user closed the modal manually (clicked the 'X' or backdrop),
      // we need to quietly remove the dummy history state we added.
      if (window.location.hash === "#open") {
        window.history.back();
      }
    };
  }, [isOpen, close]);
}