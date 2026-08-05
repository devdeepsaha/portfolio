import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app/App.tsx";
import "./styles/index.css";
import { ThemeProvider } from "./app/components/theme-provider";
import { ProjectPage } from "./app/pages/ProjectPage";
import { ProjectsIndex } from "./app/pages/ProjectsIndex";
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
            <Route path="/projects" element={<ProjectsIndex />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/learning" element={<LearningPage />} />
            {/* Fallback: unknown paths render the bento home */}
            <Route path="*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
);
