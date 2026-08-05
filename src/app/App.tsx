import { NameTile } from "./components/NameTile";
import { ResumeTile } from "./components/ResumeTile";
import { TechStackTile } from "./components/TechStackTile";
import { CompactProjectsTile } from "./components/CompactProjectsTile";
import { PlaygroundTile } from "./components/PlaygroundTile"; // Commented out for now
import { ComingSoon } from "./components/ComingSoon"; // Acting as our Playground Tile replacement
import { ContactTile } from "./components/ContactTile";
import { StoryTile } from "./components/StoryTile";
import { CurrentlyLearningTile } from "./components/CurrentlyLearningTile";
import { ClockTile } from "./components/ClockTile";
import { ThemeToggle } from "./components/ThemeToggle";
import { Helmet } from "react-helmet-async";

export default function App() {
  return (
    <>
      <Helmet>
        <title>Devdeep Saha – Portfolio | Web Developer</title>
        <meta
          name="description"
          content="This is the portfolio of Devdeep Saha — featuring projects, experiments, and things I've built."
        />
        <meta property="og:site_name" content="Devdeep Saha Portfolio" />
        <meta name="application-name" content="Devdeep Saha Portfolio" />
      </Helmet>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Skip to main content
      </a>

      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-start xl:justify-center p-4 md:p-10 font-sans transition-colors duration-500">
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>

        <header className="sr-only">
          <h1>Devdeep Saha — Designer Who Codes | Portfolio</h1>
          <p>
            Portfolio of Devdeep Saha, a designer and web developer based in
            Kolkata, India. Available for immediate joining. Sections below
            include: about, tech stack, resume, selected projects, evolution
            timeline, playground, currently learning, and contact.
          </p>
        </header>

        <main
          id="main-content"
          aria-label="Portfolio bento grid"
          className="w-full max-w-[1400px] h-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 md:gap-5">
            {/* 1. Name Tile */}
            <section
              aria-label="About"
              className="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-6 xl:col-span-4 xl:order-1 min-h-[160px] md:h-auto h-full"
            >
              <NameTile />
            </section>

            {/* 2. Clock Tile */}
            <section
              aria-label="Local time in Kolkata"
              className="col-span-1 md:col-span-6 lg:col-span-6 xl:col-span-3 xl:order-3 min-h-[160px] md:h-auto bg-card border border-border rounded-[2rem]"
            >
              <ClockTile />
            </section>

            {/* 3. Tech Stack Tile */}
            <section
              aria-label="Tech stack"
              className="col-span-1 sm:col-span-2 md:col-span-8 lg:col-span-8 xl:col-span-5 xl:order-2 min-h-[160px] md:h-auto bg-accent text-accent-foreground rounded-[2rem] shadow-xl"
            >
              <TechStackTile />
            </section>

            {/* --- ROW 2 --- */}

            {/* 4. Resume Tile */}
            <section
              aria-label="Resume"
              className="col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-3 xl:order-5 min-h-[140px] md:h-auto bg-card border border-border rounded-[2rem]"
            >
              <ResumeTile />
            </section>

            {/* 5. Projects Tile */}
            <section
              aria-label="Selected projects"
              className="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-6 xl:col-span-3 xl:row-span-2 xl:order-4 min-h-[300px] md:h-auto bg-card border border-border rounded-[2rem]"
            >
              <CompactProjectsTile />
            </section>

            {/* 6. Story Tile */}
            <section
              aria-label="Evolution timeline"
              className="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-6 xl:col-span-4 xl:row-span-2 xl:order-6 min-h-[300px] md:h-auto bg-card border border-border rounded-[2rem]"
            >
              <StoryTile />
            </section>

            {/* --- ROW 3 --- */}

            {/* 7. Playground (Coming Soon) */}
            <section
              aria-label="Playground"
              className="col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-2 xl:order-7 min-h-[140px] md:h-auto border-2 bg-card rounded-[2rem]"
            >
              <PlaygroundTile />
            </section>

            {/* 8. Currently Learning */}
            <section
              aria-label="Currently learning"
              className="col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-3 xl:order-8 min-h-[140px] md:h-auto bg-card border border-border rounded-[2rem]"
            >
              <CurrentlyLearningTile />
            </section>

            {/* 9. Contact */}
            <section
              aria-label="Contact"
              className="col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-2 xl:order-9 min-h-[140px] md:h-auto h-full"
            >
              <ContactTile />
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
