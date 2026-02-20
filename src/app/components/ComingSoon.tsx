import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ArrowLeft,
  X,
  ArrowUpRight,
  Music,
  Wrench,
} from "lucide-react";
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

  return (
    <>
      <style>{waveStyles}</style>

      {/* --- TILE FACE (Matches the original Playground Tile) --- */}
      <motion.div
        className="bg-card border border-border relative rounded-[2rem] overflow-hidden cursor-pointer group h-full min-h-[140px] flex flex-col justify-between shadow-sm transition-all hover:shadow-md hover:border-blue-500/30"
        whileHover={{ scale: 1.01 }}
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
              <div
                key={i}
                className="wave-bar"
                style={{ animationDelay: `${delay}s` }}
              />
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
              // Fullscreen backdrop
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-[9999] flex items-center justify-center p-0 md:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            >
              <motion.div
                // The Modal Container: Fullscreen on mobile, rounded on desktop
                className="bg-card border-none md:border border-border text-card-foreground rounded-none md:rounded-[2.5rem] w-full max-w-3xl h-[100dvh] md:h-auto min-h-[60vh] md:shadow-2xl relative flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-3 bg-secondary/80 hover:bg-secondary rounded-full shadow-md text-foreground transition-colors border border-border/50"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>

                {/* Background Ambient Glows */}
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-b/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-v/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 text-center space-y-8 max-w-xl w-full flex flex-col items-center justify-center">
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

                  {/* Main Heading (Humbler and cooler) */}
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
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center justify-center gap-6 pt-4 w-full"
                  >
                    <button
                      onClick={handleClose}
                      className="flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto bg-foreground text-background rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl active:scale-95"
                    >
                      <ArrowLeft size={18} /> Back to Grid
                    </button>

                    <div className="flex items-center gap-2 text-muted-foreground font-bold uppercase text-[10px] tracking-widest bg-secondary/30 px-3 py-1.5 rounded-md">
                      <Wrench size={14} className="text-o" /> Compiling Assets
                    </div>
                  </motion.div>
                </div>

                {/* Decorative Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
