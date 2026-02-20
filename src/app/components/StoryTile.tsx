import { useState, useCallback } from "react"; // FIXED: Imported useCallback
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  History,
  ArrowRight,
  TrendingUp,
  ArrowDownUp,
} from "lucide-react";
import { Portal } from "./ui/portal";
import { myJourney } from "../ts/story";
import { useBackButton } from "../hooks/useBackButton";

export function StoryTile() {
  const [isOpen, setIsOpen] = useState(false);
  
  // FIXED: Wrapped the close function in useCallback so the hook doesn't glitch on state changes
  const handleCloseModal = useCallback(() => setIsOpen(false), []);
  useBackButton(isOpen, handleCloseModal);
  
  const [isNewestFirst, setIsNewestFirst] = useState(false);

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

            <motion.path
              d="M0,150 C100,100 200,120 400,10"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-emerald-500 dark:text-accent"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{
                pathLength: [0, 1, 1],
                pathOffset: [0, 0, 1], 
              }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            />

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
            Read Story <ArrowRight size={14} />
          </div>
        </div>
      </motion.div>

      {/* --- MODAL: TIMELINE --- */}
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              // FIXED: p-0 on mobile, md:p-4 on desktop
              className="fixed inset-0 bg-background/90 backdrop-blur-md z-[9999] flex items-center justify-center p-0 md:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                // FIXED: Full screen on mobile (100dvh, no border, no radius). Floating on md+.
                className="bg-card border-none md:border border-border text-card-foreground rounded-none md:rounded-[2.5rem] p-6 pt-20 sm:p-12 max-w-5xl w-full relative h-[100dvh] md:h-[90vh] overflow-y-auto no-scrollbar md:shadow-2xl"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* FIXED: Close Button is now absolutely positioned at top right so it never misaligns */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-secondary hover:bg-secondary/80 rounded-full transition-colors text-foreground shrink-0 z-50 shadow-md"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>

                {/* Modal Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 md:mb-16 gap-6 border-b border-border pb-8">
                  <div>
                    <h2 className="text-5xl sm:text-7xl font-black text-foreground tracking-tighter uppercase leading-[0.9]">
                      The
                      <br />
                      <span className="text-emerald-600 dark:text-accent">
                        Story
                      </span>
                    </h2>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsNewestFirst(!isNewestFirst)}
                      className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 rounded-full border border-border bg-secondary/50 hover:bg-secondary text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <ArrowDownUp size={14} />
                      {isNewestFirst ? "Newest First" : "Oldest First"}
                    </button>
                  </div>
                </div>

                {/* THE TIMELINE */}
                <div className="relative border-l-2 border-border/50 ml-2 md:ml-6 space-y-16 pb-12">
                  {sortedJourney.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-6 md:pl-16 group"
                      >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[9px] top-1.5 w-4 h-4 md:w-5 md:h-5 rounded-full bg-emerald-500 dark:bg-accent ring-4 ring-card transition-transform group-hover:scale-125" />

                        {/* Year Marker */}
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-4xl md:text-5xl font-black text-emerald-600/90 dark:text-accent/90 tracking-tighter">
                            {item.year}
                          </span>
                        </div>

                        {/* Content Card */}
                        <div className="bg-secondary/20 border border-border rounded-3xl p-5 md:p-8 hover:border-emerald-500/30 dark:hover:border-accent/30 transition-colors shadow-sm">
                          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                            <div className={`p-2.5 md:p-3 rounded-xl ${item.bg} ${item.color}`}>
                              <Icon size={20} className="md:w-6 md:h-6" />
                            </div>
                            <h3 className="text-xl md:text-3xl font-black uppercase text-foreground leading-none tracking-tight break-words">
                              {item.title}
                            </h3>
                          </div>

                          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                            {/* Text Container */}
                            <div className="flex-1 w-full">
                              <p className="text-muted-foreground text-sm md:text-lg leading-relaxed whitespace-pre-line font-medium break-words">
                                {item.description}
                              </p>
                            </div>

                            {/* Optional Image */}
                            {item.image && (
                              <div className="w-full md:w-1/3 aspect-video md:aspect-square shrink-0 rounded-2xl overflow-hidden border border-border">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                                />
                              </div>
                            )}
                          </div>
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