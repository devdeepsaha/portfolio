import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { ThemeProvider } from "./app/components/theme-provider"; // Ensure this path is correct

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* attribute="class" is required to make your CSS .dark variables work */}
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
