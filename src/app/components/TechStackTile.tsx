import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Code2, ArrowUpRight } from "lucide-react";
import { Portal } from "./ui/portal";

// Import the icon component from the library
import StackIcon from "tech-stack-icons";
import { useBackButton } from "../hooks/useBackButton";

const techStack = [
  { name: "React", iconName: "react", color: "#61DAFB" }, // Fixed icon name
  { name: "Next.js", iconName: "nextjs2", color: "#FFFFFF" }, 
  { name: "Laravel", iconName: "laravel", color: "#FF2D20" },
  { name: "Flask", iconName: "flask", color: "#000000", invertDark: true },
  { name: "Tailwind", iconName: "tailwindcss", color: "#38B2AC" },
  { name: "TypeScript", iconName: "typescript", color: "#3178C6" },
  { name: "MySQL", iconName: "mysql", color: "#4479A1" },
  { name: "Android Studio", iconName: "android", color: "#3DDC84" }, 
  { name: "Flutter", iconName: "flutter", color: "#02569B" },
  { name: "HTML", iconName: "html5", color: "#E34F26" },
  { name: "CSS", iconName: "css3", color: "#1572B6" },
  { name: "JavaScript", iconName: "js", color: "#F7DF1E" },
];

export function TechStackTile() {
  const [isOpen, setIsOpen] = useState(false);
  
  // FIXED: Wrapped the close function in useCallback
  const handleCloseModal = useCallback(() => setIsOpen(false), []);
  useBackButton(isOpen, handleCloseModal);

  // Duplicate the list for a seamless infinite loop in the background marquee
  const duplicatedStack = [...techStack, ...techStack];

  return (
    <>
      <motion.div
        className="h-full w-full p-6 flex flex-col justify-between cursor-pointer group relative overflow-hidden transition-colors"
        whileHover={{ scale: 1.01 }}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex justify-between items-start z-10">
          <div className="bg-black/10 p-2.5 rounded-full text-inherit transition-all group-hover:bg-foreground group-hover:text-background">
            <Code2 size={24} />
          </div>
          <ArrowUpRight className="text-inherit opacity-40 group-hover:opacity-100 transition-colors" />
        </div>

        {/* COOL ANIMATION: The Infinite Marquee */}
        <div className="absolute inset-0 flex items-center pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
          <motion.div
            className="flex gap-4 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedStack.map((tech, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-inherit"
              >
                {tech.name} •
              </span>
            ))}
          </motion.div>
        </div>

        <div className="z-10 mt-auto">
          <h3 className="text-inherit text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-none mb-1">
            Stack
          </h3>
          <p className="text-inherit opacity-60 text-xs font-bold uppercase tracking-widest">
            Selected Toolkit
          </p>
        </div>

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </motion.div>

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
                className="bg-card border-none md:border border-border text-card-foreground rounded-none md:rounded-[2.5rem] p-6 pt-20 sm:p-12 max-w-3xl w-full relative h-[100dvh] md:h-auto md:max-h-[90vh] overflow-y-auto no-scrollbar md:shadow-2xl"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* FIXED: Absolute positioned X button with shadow-md */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-secondary hover:bg-secondary/80 rounded-full text-foreground transition-colors z-50 shadow-md"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>

                <h2 className="text-4xl sm:text-6xl font-black text-foreground mb-8 tracking-tighter leading-none uppercase pr-12">
                  Tech
                  <br />
                  <span className="text-[#22c55e]">Stack</span>
                </h2>

                {/* FIXED: Grid layout. Used grid-cols-2 but reduced gap and padding on mobile to prevent overflow */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pb-8 md:pb-0">
                  {techStack.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      className="bg-secondary/50 rounded-2xl p-3 md:p-4 flex flex-col md:flex-row items-center md:justify-start justify-center text-center md:text-left gap-2 md:gap-3 border border-border group hover:border-primary/50 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center shrink-0 transition-all duration-300 ${tech.invertDark ? "dark:invert" : ""}`}>
                        {tech.iconName ? (
                          // @ts-ignore
                          <StackIcon name={tech.iconName} className="w-full h-full object-contain" />
                        ) : (
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: tech.color,
                              boxShadow: `0 0 10px ${tech.color}40`,
                            }}
                          />
                        )}
                      </div>
                      
                      {/* FIXED: Reduced text size slightly on mobile so long names fit */}
                      <span className="text-foreground font-black text-[10px] sm:text-sm uppercase tracking-wider md:tracking-widest group-hover:text-primary transition-colors leading-tight break-words">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}