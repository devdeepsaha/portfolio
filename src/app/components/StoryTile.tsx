import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  History,
  ArrowRight,
  TrendingUp,
  ArrowDownUp,
  Calendar,
} from "lucide-react";
import { Portal } from "./ui/portal";
import { myJourney } from "../ts/story";

export function StoryTile() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isNewestFirst, setIsNewestFirst] = useState(true);

  // Get only 4 milestones for the preview
  const previewMilestones = myJourney.slice(0, 4);

  // Sort Logic for Modal
  const sortedJourney = [...myJourney].sort((a, b) => {
    return isNewestFirst
      ? parseInt(b.year) - parseInt(a.year)
      : parseInt(a.year) - parseInt(b.year);
  });

  return (
    <>
      {/* --- TILE FACE: MINIMAL GRAPH --- */}
      <motion.div
        className="bg-card border border-border rounded-[2rem] overflow-hidden cursor-pointer group h-full relative flex flex-col justify-between shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-emerald-500/20 dark:hover:border-accent/30"
        whileHover={{ scale: 1.005 }}
        onClick={() => setIsOpen(true)}
      >
        {/* 1. ANIMATED GRAPH BACKGROUND */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-500">
          <svg
            className="w-full h-full"
            viewBox="0 0 400 150"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="graphGradient" x1="0" y1="0" x2="0" y2="1">
                {/* Light Mode: Emerald | Dark Mode: Tea Green */}
                <stop
                  offset="0%"
                  stopColor="currentColor"
                  stopOpacity="0.5"
                  className="text-emerald-500 dark:text-accent"
                />
                <stop
                  offset="100%"
                  stopColor="currentColor"
                  stopOpacity="0"
                  className="text-emerald-500 dark:text-accent"
                />
              </linearGradient>
            </defs>

            {/* The "Streak" Animation */}
            <motion.path
              d="M0,150 C100,100 200,120 400,10"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-emerald-500 dark:text-accent"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{
                pathLength: [0, 1, 1], // Draw Line -> Keep Full
                pathOffset: [0, 0, 1], // Stay Put -> Move Tail to Head (Erase)
              }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            />

            {/* The Fill (Static) */}
            <path
              d="M0,150 C100,100 200,120 400,10 V150 H0 Z"
              fill="url(#graphGradient)"
            />
          </svg>
        </div>

        {/* Header */}
        <div className="p-8 relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-emerald-100 text-emerald-600 dark:bg-accent dark:text-accent-foreground p-3 rounded-2xl shadow-lg">
              <History size={24} strokeWidth={2.5} />
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:border-accent/20 dark:bg-accent/5 dark:text-accent text-[10px] font-bold uppercase tracking-widest">
              <TrendingUp size={12} />
              Growth
            </div>
          </div>
          <h3 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
            My
            <br />
            <span className="text-emerald-600 dark:text-accent">Evolution</span>
          </h3>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 pt-0 flex justify-end relative z-10 mt-auto">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-accent transition-colors bg-card/50 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50">
            Open Gallery <ArrowRight size={14} />
          </div>
        </div>
      </motion.div>

      {/* --- MODAL: SORTABLE TILES --- */}
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                className="bg-card border border-border text-card-foreground rounded-[2rem] p-6 sm:p-10 max-w-6xl w-full relative max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
                  <div>
                    <h2 className="text-4xl sm:text-6xl font-black text-foreground tracking-tighter uppercase leading-none">
                      The
                      <br />
                      <span className="text-emerald-600 dark:text-accent">
                        Archives
                      </span>
                    </h2>
                  </div>

                  <div className="flex gap-2">
                    {/* Sort Button */}
                    <button
                      onClick={() => setIsNewestFirst(!isNewestFirst)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 hover:bg-secondary text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <ArrowDownUp size={14} />
                      {isNewestFirst ? "Newest First" : "Oldest First"}
                    </button>

                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 bg-secondary hover:bg-secondary/80 rounded-full transition-colors text-foreground"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>

                {/* THE GRID (Boxy Tiles) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedJourney.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-secondary/10 border border-border rounded-xl overflow-hidden group hover:border-emerald-500/50 dark:hover:border-accent/50 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-accent/10 transition-all duration-300 flex flex-col relative h-full"
                      >
                        {/* Connector Line */}
                        {!isNewestFirst &&
                          index !== sortedJourney.length - 1 && (
                            <div className="absolute -bottom-8 left-1/2 w-0.5 h-8 bg-border border-l border-dashed border-muted-foreground/30 -translate-x-1/2 z-0 hidden lg:block" />
                          )}

                        {/* Image Section */}
                        <div className="aspect-video w-full relative overflow-hidden bg-secondary">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              // MOBILE FIX: grayscale-0 (Full Color) -> md:grayscale (B&W on Desktop) -> md:hover (Color)
                              className="w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 md:group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted/20">
                              <Icon
                                size={48}
                                className="text-muted-foreground/20 group-hover:text-emerald-500 dark:group-hover:text-accent transition-colors"
                              />
                            </div>
                          )}
                          {/* Overlay Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                          {/* Floating Year Badge */}
                          <div className="absolute bottom-4 left-4 flex items-center gap-2">
                            <div className="bg-emerald-500 dark:bg-accent w-2 h-8 rounded-sm" />
                            <span className="text-white text-3xl font-black tracking-tighter drop-shadow-md">
                              {item.year}
                            </span>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 flex-1 flex flex-col bg-card relative z-10">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`p-2 rounded-lg bg-emerald-100 dark:bg-accent/10 text-emerald-600 dark:text-accent border border-emerald-500/20 dark:border-accent/20`}
                            >
                              <Icon size={18} />
                            </div>
                            <h3 className="text-xl font-black uppercase text-foreground leading-none group-hover:text-emerald-600 dark:group-hover:text-accent transition-colors">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
