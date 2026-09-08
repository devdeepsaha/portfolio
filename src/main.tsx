import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import App from "./app/App.tsx";
import "./styles/index.css";
import { ThemeProvider } from "./app/components/theme-provider";
import { BlogPage } from "./app/pages/BlogPage";
import { BlogIndex } from "./app/pages/BlogIndex";
import { StoryPage } from "./app/pages/StoryPage";
import { LearningPage } from "./app/pages/LearningPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            {/* /projects and /projects/:slug both open the Projects modal
                on home. CompactProjectsTile reads the pathname on cold
                load and sets isOpen + selectedProject accordingly, so
                refreshing at /projects/arova-technologies reopens the
                modal at that exact project. */}
            <Route path="/projects" element={<App />} />
            <Route path="/projects/:slug" element={<App />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/learning" element={<LearningPage />} />
            {/* Playground preserves the bento modal experience on cold load —
                the route renders App (home) and PlaygroundTile detects the
                URL and opens the modal with the right tab + item. */}
            <Route path="/playground" element={<App />} />
            <Route path="/playground/:tab" element={<App />} />
            <Route path="/playground/:tab/:item" element={<App />} />
            {/* Fallback: unknown paths (corrupted URLs, old deep links,
                typos) bounce back to the bento home so the URL bar stays
                clean and asset resolution stays sane. */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
);
