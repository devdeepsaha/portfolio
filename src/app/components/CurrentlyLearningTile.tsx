import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Box,
  Brain,
  ArrowUpRight,
  Cpu,
  Layers,
  Database,
  Globe,
  Server,
} from "lucide-react";
import { Portal } from "./ui/portal";
import { myLearning, LearningItem } from "../ts/learning";

const getCategoryStyles = (category: string) => {
  switch (category) {
    case "3D":
      return {
        icon: <Box size={16} />,
        bg: "bg-purple-500/10",
        text: "text-purple-500",
        border: "border-purple-500/20",
      };
    case "AI":
      return {
        icon: <Brain size={16} />,
        bg: "bg-emerald-500/10",
        text: "text-emerald-500",
        border: "border-emerald-500/20",
      };
    case "Backend":
      return {
        icon: <Server size={16} />,
        bg: "bg-blue-500/10",
        text: "text-blue-500",
        border: "border-blue-500/20",
      };
    default:
      return {
        icon: <Layers size={16} />,
        bg: "bg-orange-500/10",
        text: "text-orange-500",
        border: "border-orange-500/20",
      };
  }
};

export function CurrentlyLearningTile() {
  const [isOpen, setIsOpen] = useState(false);
  const featuredLearning = myLearning.slice(0, 2);

  return (
    <>
      {/* --- TILE FACE --- */}
      <motion.div
        className="bg-card border border-border rounded-[2rem] overflow-hidden cursor-pointer group h-full min-h-[180px] relative p-6 flex flex-col justify-between transition-colors hover:border-primary/50"
        whileHover={{ scale: 1.01 }}
        onClick={() => setIsOpen(true)}
      >
        {/* 1. Header Row (Status + Arrow) */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
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

        {/* 2. MAIN TITLE (Added Back) */}
        <div className="mt-2 mb-4">
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter leading-[0.9] text-foreground">
            Currently
            <br />
            Learning
          </h3>
        </div>

        {/* 3. The List (Preview) */}
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

      {/* --- MODAL (Same as before) --- */}
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
                className="bg-card border border-border text-card-foreground rounded-[2.5rem] p-6 sm:p-10 max-w-2xl w-full relative shadow-2xl max-h-[85vh] overflow-y-auto no-scrollbar"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-8 right-8 p-2 bg-secondary rounded-full text-foreground transition-colors"
                >
                  <X size={24} />
                </button>

                <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-2 tracking-tighter leading-none">
                  CURRENTLY
                  <br />
                  <span className="text-green">LEARNING</span>
                </h2>
                <p className="text-muted-foreground text-xs mb-8 font-mono tracking-widest uppercase">
                  Last updated: Feb 2026
                </p>

                <div className="space-y-4">
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
                        <p className="text-muted-foreground leading-relaxed text-sm mb-4">
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
