import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, X, ArrowUpRight, Music, Wrench, Sparkles } from "lucide-react";
import { Portal } from "./ui/portal";
import { useBackButton } from "../hooks/useBackButton";

// --- CSS for Waveforms & Gradients ---
const styles = `
  @keyframes equalizer {
    0% { height: 20%; }
    50% { height: 100%; }
    100% { height: 20%; }
  }
  .wave-bar {
    width: 6px;
    background-color: currentColor;
    border-radius: 99px;
    animation: equalizer 1s ease-in-out infinite;
  }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  
  /* Clean gradient text class */
  .gradient-text {
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(to right bottom, rgb(var(--b)), rgb(var(--v)));
  }
`;

export function ComingSoon() {
  const [isOpen, setIsOpen] = useState(false);

  // Hook to handle physical back button on mobile devices
  const handleClose = useCallback(() => setIsOpen(false), []);
  useBackButton(isOpen, handleClose);

  return (
    <>
      <style>{styles}</style>

      {/* --- TILE FACE --- */}
      <motion.div
        className="bg-card border border-border relative rounded-[2rem] overflow-hidden cursor-pointer group h-full min-h-[140px] flex flex-col justify-between shadow-sm transition-all hover:shadow-md hover:border-blue-500/30"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex justify-between items-start p-6 pb-0 relative z-10">
          <div className="bg-blue-500/10 p-2 rounded-full text-blue-500 border border-blue-500/20">
            <Music size={24} />
          </div>
          <ArrowUpRight className="text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>

        {/* The Animated Waveform */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none text-foreground">
          <div className="flex items-center gap-1.5 h-16">
            {[0.1, 0.5, 0.2, 0.7, 0.3, 0.6].map((delay, i) => (
              <div key={i} className="wave-bar" style={{ animationDelay: `${delay}s` }} />
            ))}
          </div>
        </div>

        <div className="relative z-10 p-6 pt-0 mt-auto">
          <h3 className="text-3xl sm:text-[2rem] font-black uppercase tracking-tighter break-words leading-[0.9]">
            Play
            <br />
            <span className="text-blue-500 dark:text-blue-400">Ground</span>
          </h3>
        </div>
      </motion.div>

      {/* --- MODAL --- */}
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              // Base backdrop (Using standard bg-color, no heavy backdrop-blur to ensure max performance)
              className="fixed inset-0 bg-background/95 z-[9999] flex items-center justify-center p-0 md:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            >
              <motion.div
                // Container structure - exactly matches your request
                className="bg-card border-none md:border border-border text-card-foreground rounded-none md:rounded-[3rem] p-6 pt-20 sm:p-12 max-w-2xl w-full relative h-[100dvh] md:h-auto md:max-h-[85vh] md:shadow-2xl overflow-y-auto no-scrollbar flex flex-col items-center justify-center"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* --- DESIGN: LIGHTWEIGHT BACKGROUND GRAPHICS --- */}
                
                {/* 1. Subtle Blueprint Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                
                {/* 2. Tech Corner Markers (+) */}
                <div className="absolute top-8 left-8 text-border hidden md:block"><X size={12} className="rotate-45" /></div>
                <div className="absolute top-8 right-8 text-border hidden md:block"><X size={12} className="rotate-45" /></div>
                <div className="absolute bottom-8 left-8 text-border hidden md:block"><X size={12} className="rotate-45" /></div>
                <div className="absolute bottom-8 right-8 text-border hidden md:block"><X size={12} className="rotate-45" /></div>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-secondary hover:bg-secondary/80 rounded-full text-foreground transition-colors z-50 shadow-sm border border-border"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>

                {/* --- CONTENT --- */}
                <div className="relative z-10 text-center space-y-8 w-full flex flex-col items-center justify-center mt-[-40px] md:mt-0">
                  
                  {/* Icon Feature with Spinning Tech Ring */}
                  <div className="relative flex items-center justify-center mb-4">
                    {/* Rotating Dashed Ring (Super lightweight CSS animation) */}
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                      className="absolute inset-[-16px] border border-dashed border-b/40 rounded-full"
                    />
                    <div className="p-5 bg-card border border-border text-b rounded-full relative z-10 shadow-sm">
                       <Wrench size={32} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Badges & Headers */}
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-secondary/50 border border-border rounded-full text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-v opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-v"></span>
                        </span>
                        Status: Compiling
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-foreground">
                        Work
                        <br />
                        <span className="text-green">In Progress</span>
                    </h1>
                  </div>

                  <p className="text-muted-foreground text-base md:text-lg font-medium max-w-sm mx-auto leading-relaxed border-l-2 border-border pl-4 text-left">
                   All my side projects, experiments, and fun ideas that don’t fit into the main categories will go here. It’s a space for me to share the random stuff I’m tinkering with — whether it’s a weird music track, a 3D render, or just some code snippets. Stay tuned for the chaos!
                  </p>

                  <div className="pt-6">
                    <button
                      onClick={handleClose}
                      className="group flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-black text-xs md:text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl active:scale-95"
                    >
                      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                      Return to Grid
                    </button>
                  </div>
                </div>

                {/* Subtle Top/Bottom Fade out for the grid pattern */}
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-card to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                {/* Grain Texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}