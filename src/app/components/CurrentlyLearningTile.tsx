import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Box,
  Brain,
  ArrowUpRight,
  Server,
  PenTool,
  Video,
  MonitorPlay,
} from "lucide-react";
import { Portal } from "./ui/portal";
import { myLearning } from "../ts/learning";
// FIXED: Using the powerful deep-link hook
import { useHashRouter } from "../hooks/useHashRouter";

const getCategoryStyles = (category: string) => {
  switch (category) {
    case "3D":
      return {
        icon: <Box size={16} />,
        bg: "bg-b/10",
        text: "text-b",
        border: "border-b",
      };
    case "AI":
      return {
        icon: <Brain size={16} />,
        bg: "bg-v/10",
        text: "text-v",
        border: "border-v",
      };
    case "Backend":
      return {
        icon: <Server size={16} />,
        bg: "bg-r/10",
        text: "text-r",
        border: "border-r",
      };
    case "Design":
      return {
        icon: <PenTool size={16} />,
        bg: "bg-o/10",
        text: "text-o",
        border: "border-o",
      };
    case "Video":
      return {
        icon: <Video size={16} />,
        bg: "bg-y/10",
        text: "text-y",
        border: "border-y",
      };
    default:
      return {
        icon: <MonitorPlay size={16} />,
        bg: "bg-c/10",
        text: "text-c",
        border: "border-c",
      };
  }
};

export function CurrentlyLearningTile() {
  const [isOpen, setIsOpen] = useState(false);

  // FIXED: Deep linking URL hash: /#learning
  const closeLearning = useHashRouter(
    isOpen,
    "learning",
    useCallback(() => setIsOpen(false), []),
  );

  const featuredLearning = myLearning.slice(0, 2);

  return (
    <>
      {/* --- TILE FACE --- */}
      <motion.div
        className="bg-card border border-border rounded-[2rem] overflow-hidden cursor-pointer group h-full min-h-[180px] relative p-6 flex flex-col justify-between transition-colors hover:border-primary/50"
        whileHover={{ scale: 1.01 }}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              In Progress
            </span>
          </div>
          <ArrowUpRight
            size={18}
            className="text-muted-foreground group-hover:text-foreground transition-colors"
          />
        </div>

        <div className="mt-2 mb-4">
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter leading-[0.9] text-foreground">
            Currently
            <br />
            Learning
          </h3>
        </div>

        <div className="space-y-2 mt-auto">
          {featuredLearning.map((item) => {
            const style = getCategoryStyles(item.category);
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 bg-secondary/30 p-2 rounded-xl border border-transparent group-hover:border-border transition-colors"
              >
                <div className={`p-1.5 rounded-lg ${style.bg} ${style.text}`}>
                  {style.icon}
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-bold text-foreground text-xs leading-none truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5 font-medium truncate">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* --- MODAL --- */}
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              // FIXED: Full-screen mobile setup
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-[9999] flex items-center justify-center p-0 md:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLearning}
            >
              <motion.div
                // FIXED: Full screen height on mobile (100dvh)
                className="bg-card border-none md:border border-border text-card-foreground rounded-none md:rounded-[2.5rem] p-6 pt-20 sm:p-10 max-w-2xl w-full relative h-[100dvh] md:h-auto md:max-h-[85vh] md:shadow-2xl overflow-y-auto no-scrollbar"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* FIXED: The 'X' Button - Now with shadow and background circle visible */}
                <button
                  onClick={closeLearning}
                  className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-secondary hover:bg-secondary/80 rounded-full text-foreground transition-colors z-50 shadow-md border border-border/50"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>

                <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-2 tracking-tighter leading-none">
                  CURRENTLY
                  <br />
                  <span className="text-[#22c55e]">LEARNING</span>
                </h2>
                <p className="text-muted-foreground text-xs mb-8 font-mono tracking-widest uppercase">
                  Last updated: Feb 2026
                </p>

                <div className="space-y-4 pb-8 md:pb-0">
                  {myLearning.map((item) => {
                    const style = getCategoryStyles(item.category);
                    return (
                      <div
                        key={item.id}
                        className="bg-secondary/40 rounded-[2rem] p-6 border border-border"
                      >
                        <div
                          className={`flex items-center gap-3 mb-3 ${style.text}`}
                        >
                          {style.icon}
                          <h3 className="text-xl font-black text-foreground uppercase tracking-tight">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-sm mb-4 whitespace-pre-line">
                          {item.description}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-[10px] font-bold px-2 py-1 rounded border uppercase ${style.bg} ${style.text} ${style.border}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
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
