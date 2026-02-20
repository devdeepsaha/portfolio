import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, X, ArrowUpRight, Music, Wrench, Sparkles } from "lucide-react";
import { Portal } from "./ui/portal";
import { useBackButton } from "../hooks/useBackButton";

// --- CSS for Waveforms ---
const waveStyles = `
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
      <style>{waveStyles}</style>

      {/* --- TILE FACE (Untouched) --- */}
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
              // Backdrop - matches CurrentlyLearningTile
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-[9999] flex items-center justify-center p-0 md:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            >
              <motion.div
                // Container structure - matches CurrentlyLearningTile for smooth performance
                className="bg-card border-none md:border border-border text-card-foreground rounded-none md:rounded-[3rem] p-6 pt-20 sm:p-12 max-w-2xl w-full relative h-[100dvh] md:h-auto md:max-h-[85vh] md:shadow-2xl overflow-hidden flex flex-col items-center justify-center"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-secondary hover:bg-secondary/80 rounded-full text-foreground transition-colors z-50 shadow-sm border border-border/50"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>

                {/* --- DESIGNED CONTENT (No heavy blurs) --- */}
                <div className="relative z-10 text-center space-y-8 w-full flex flex-col items-center justify-center">
                  
                  {/* Icon Feature */}
                  <div className="relative">
                    <div className="p-5 bg-gradient-to-br from-b/20 to-v/20 text-foreground rounded-[2rem] mb-2 border border-b/20 shadow-sm relative z-10">
                       <Wrench size={40} strokeWidth={1.5} className="text-b" />
                    </div>
                    {/* Subtle non-blurred glow behind icon */}
                    <div className="absolute inset-0 bg-gradient-to-br from-b/10 to-v/10 rounded-[2rem] scale-110 -z-10" />
                  </div>

                  {/* Main Heading with Gradient Text */}
                  <div>
                    <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                        <Sparkles size={14} className="text-b" /> Laboratory
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-foreground drop-shadow-sm">
                        Work
                        <br />
                        <span className="gradient-text">In Progress</span>
                    </h1>
                  </div>

                  <p className="text-muted-foreground text-base md:text-lg font-medium max-w-sm mx-auto leading-relaxed">
                      I'm currently crafting something special in the Playground tile. Can't wait to share it with you all soon!
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={handleClose}
                      className="flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl active:scale-95"
                    >
                      <ArrowLeft size={16} /> Back to Grid
                    </button>
                  </div>
                </div>

                 {/* Subtle Grain Texture (Lightweight) */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                 {/* Subtle corner gradients (Lightweight) */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-b/5 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-v/5 to-transparent pointer-events-none" />

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}