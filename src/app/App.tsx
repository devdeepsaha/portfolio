import { NameTile } from "./components/NameTile";
import { ResumeTile } from "./components/ResumeTile";
import { TechStackTile } from "./components/TechStackTile";
import { CompactProjectsTile } from "./components/CompactProjectsTile";
// import { PlaygroundTile } from "./components/PlaygroundTile"; // Commented out for now
import { ComingSoon } from "./components/ComingSoon"; // Acting as our Playground Tile replacement
import { ContactTile } from "./components/ContactTile";
import { StoryTile } from "./components/StoryTile";
import { CurrentlyLearningTile } from "./components/CurrentlyLearningTile";
import { ClockTile } from "./components/ClockTile";
import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-start xl:justify-center p-4 md:p-10 font-sans transition-colors duration-500">
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-[1400px] h-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 md:gap-5">
          {/* 1. Name Tile */}
          <div className="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-6 xl:col-span-4 xl:order-1 min-h-[160px] md:h-auto h-full">
            <NameTile />
          </div>

          {/* 2. Clock Tile */}
          <div className="col-span-1 md:col-span-6 lg:col-span-6 xl:col-span-3 xl:order-3 min-h-[160px] md:h-auto bg-card border border-border rounded-[2rem]">
            <ClockTile />
          </div>

          {/* 3. Tech Stack Tile */}
          <div className="col-span-1 sm:col-span-2 md:col-span-8 lg:col-span-8 xl:col-span-5 xl:order-2 min-h-[160px] md:h-auto bg-accent text-accent-foreground rounded-[2rem] shadow-xl">
            <TechStackTile />
          </div>

          {/* --- ROW 2 --- */}

          {/* 4. Resume Tile */}
          <div className="col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-3 xl:order-5 min-h-[140px] md:h-auto bg-card border border-border rounded-[2rem]">
            <ResumeTile />
          </div>

          {/* 5. Projects Tile */}
          <div className="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-6 xl:col-span-3 xl:row-span-2 xl:order-4 min-h-[300px] md:h-auto bg-card border border-border rounded-[2rem]">
            <CompactProjectsTile />
          </div>

          {/* 6. Story Tile */}
          <div className="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-6 xl:col-span-4 xl:row-span-2 xl:order-6 min-h-[300px] md:h-auto bg-card border border-border rounded-[2rem]">
            <StoryTile />
          </div>

          {/* --- ROW 3 --- */}

          {/* 7. Playground (Coming Soon) */}
          <div className="col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-2 xl:order-7 min-h-[140px] md:h-auto border-2 bg-card rounded-[2rem]">
            <ComingSoon />
          </div>

          {/* 8. Currently Learning */}
          <div className="col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-3 xl:order-8 min-h-[140px] md:h-auto bg-card border border-border rounded-[2rem]">
            <CurrentlyLearningTile />
          </div>

          {/* 9. Contact */}
          <div className="col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-2 xl:order-9 min-h-[140px] md:h-auto h-full">
            <ContactTile />
          </div>
        </div>
      </div>
    </div>
  );
}
