import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async"; // ⭐ add this
import App from "./app/App.tsx";
import "./styles/index.css";
import { ThemeProvider } from "./app/components/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider> 
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);