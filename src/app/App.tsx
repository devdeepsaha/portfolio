import { NameTile } from "./components/NameTile";
import { ResumeTile } from "./components/ResumeTile";
import { TechStackTile } from "./components/TechStackTile";
import { CompactProjectsTile } from "./components/CompactProjectsTile";
import { PlaygroundTile } from "./components/PlaygroundTile";
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
          {/* DOM ORDER STRATEGY: 
            We order elements for the TABLET layout (Name -> Clock -> Stack).
            We use 'xl:order-X' to swap them visually on DESKTOP (Name -> Stack -> Clock).
          */}

          {/* 1. Name Tile */}
          {/* md: 6 | lg: 6 | xl: 4 */}
          <div className="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-6 xl:col-span-4 xl:order-1 min-h-[160px] md:h-auto h-full">
            <NameTile />
          </div>

          {/* 2. Clock Tile (Placed here to fit Row 1 on Tablet) */}
          {/* md: 6 | lg: 6 | xl: 3 */}
          {/* xl:order-3 moves it to the END of Row 1 on Desktop */}
          <div className="col-span-1 md:col-span-6 lg:col-span-6 xl:col-span-3 xl:order-3 min-h-[160px] md:h-auto bg-card border border-border rounded-[2rem]">
            <ClockTile />
          </div>

          {/* 3. Tech Stack Tile */}
          {/* md: 8 | lg: 8 | xl: 5 */}
          {/* xl:order-2 moves it to the MIDDLE of Row 1 on Desktop */}
          <div className="col-span-1 sm:col-span-2 md:col-span-8 lg:col-span-8 xl:col-span-5 xl:order-2 min-h-[160px] md:h-auto bg-accent text-accent-foreground rounded-[2rem] shadow-xl">
            <TechStackTile />
          </div>

          {/* --- ROW 2 Starts Here for Tablet --- */}

          {/* 4. Resume Tile */}
          {/* md: 4 | lg: 4 | xl: 3 */}
          <div className="col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-3 xl:order-5 min-h-[140px] md:h-auto bg-card border border-border rounded-[2rem]">
            <ResumeTile />
          </div>

          {/* 5. Projects Tile */}
          {/* md: 6 | lg: 6 | xl: 3 (Tall) */}
          <div className="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-6 xl:col-span-3 xl:row-span-2 xl:order-4 min-h-[300px] md:h-auto bg-card border border-border rounded-[2rem]">
            <CompactProjectsTile />
          </div>

          {/* 6. Evolution (Story) Tile */}
          {/* md: 6 | lg: 6 | xl: 4 (Tall) */}
          <div className="col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-6 xl:col-span-4 xl:row-span-2 xl:order-6 min-h-[300px] md:h-auto bg-card border border-border rounded-[2rem]">
            <StoryTile />
          </div>

          {/* --- ROW 3 Starts Here for Tablet --- */}

          {/* 7. Playground */}
          {/* md: 4 | lg: 4 | xl: 2 */}
          <div className="col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-2 xl:order-7 min-h-[140px] md:h-auto border-2 bg-card rounded-[2rem]">
            <PlaygroundTile />
          </div>

          {/* 8. Currently Learning */}
          {/* md: 4 | lg: 4 | xl: 3 */}
          {/* On Desktop, this naturally flows under Resume (Col 2) because Resume is Span 3 and this is Span 3 */}
          <div className="col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-3 xl:order-8 min-h-[140px] md:h-auto bg-card border border-border rounded-[2rem]">
            <CurrentlyLearningTile />
          </div>

          {/* 9. Contact */}
          {/* md: 4 | lg: 4 | xl: 2 */}
          {/* On Desktop, this naturally flows under Playground (Col 4) */}
          <div className="col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-2 xl:order-9 min-h-[140px] md:h-auto h-full">
            <ContactTile />
          </div>
        </div>
      </div>
    </div>
  );
}
