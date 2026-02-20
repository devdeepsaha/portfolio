import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowLeft, X, ArrowUpRight, Music, Wrench } from "lucide-react";
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
`;

export function ComingSoon() {
  const [isOpen, setIsOpen] = useState(false);

  // Hook to handle physical back button on mobile devices
  const handleClose = useCallback(() => setIsOpen(false), []);
  useBackButton(isOpen, handleClose);

  // We use a unique layoutId to tell Framer Motion to morph between the Tile and the Modal
  const layoutId = "coming-soon-tile";

  return (
    <>
      <style>{waveStyles}</style>

      {/* --- TILE FACE (Matches the original Playground Tile) --- */}
      <motion.div
        layoutId={layoutId} // 1. Added layoutId here
        className="bg-card border border-border relative rounded-[2rem] overflow-hidden cursor-pointer group h-full min-h-[140px] flex flex-col justify-between shadow-sm transition-shadow hover:shadow-md hover:border-blue-500/30"
        whileHover={{ scale: 1.01 }}
        onClick={() => setIsOpen(true)}
      >
        {/* We fade this content out slightly when modal is open to avoid double-rendering glitches */}
        <motion.div className="h-full flex flex-col justify-between" animate={{ opacity: isOpen ? 0 : 1 }}>
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
      </motion.div>

      {/* --- MODAL --- */}
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              // Fullscreen backdrop (Fades in)
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-[9999] flex items-center justify-center p-0 md:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            >
              <motion.div
                layoutId={layoutId} // 2. Shared layoutId here forces the box to grow from the original tile
                className="bg-card border-none md:border border-border text-card-foreground rounded-none md:rounded-[2.5rem] w-full max-w-3xl h-[100dvh] md:h-auto min-h-[60vh] md:shadow-2xl relative flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden origin-center"
                // Removed the standard initial/animate/exit scale and Y animations, letting layoutId handle it
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} // Smooth spring animation
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* 3. We wrap the INNER content in its own AnimatePresence so it fades in AFTER the box expands */}
                <motion.div
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="w-full flex flex-col items-center justify-center relative z-10 h-full"
                >
                  {/* Close Button */}
                  <button
                    onClick={handleClose}
                    className="absolute top-0 right-0 z-50 p-3 bg-secondary/80 hover:bg-secondary rounded-full shadow-md text-foreground transition-colors border border-border/50"
                  >
                    <X size={20} className="md:w-6 md:h-6" />
                  </button>

                  {/* Background Ambient Glows */}
                  <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-b/10 blur-[100px] rounded-full pointer-events-none" />
                  <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-v/10 blur-[100px] rounded-full pointer-events-none" />

                  <div className="relative z-10 text-center space-y-8 max-w-xl w-full flex flex-col items-center justify-center pt-8">
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-b opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-b"></span>
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                        Under Active Development
                      </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.8] uppercase text-foreground">
                      Work
                      <br />
                      <span className="text-b">In</span>
                      <br />
                      <span className="text-v">Progress</span>
                    </h1>

                    <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-md mx-auto leading-relaxed">
                      I'm currently crafting something special in the Playground tile. Can't wait to share it with you all soon!
                    </p>

                    {/* Call to Action */}
                    <div className="flex flex-col items-center justify-center gap-6 pt-4 w-full">
                      <button
                        onClick={handleClose}
                        className="flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto bg-foreground text-background rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl active:scale-95"
                      >
                        <ArrowLeft size={18} /> Back to Grid
                      </button>

                      <div className="flex items-center gap-2 text-muted-foreground font-bold uppercase text-[10px] tracking-widest bg-secondary/30 px-3 py-1.5 rounded-md">
                        <Wrench size={14} className="text-o" /> Compiling Assets
                      </div>
                    </div>
                  </div>

                  {/* Decorative Grain Overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}