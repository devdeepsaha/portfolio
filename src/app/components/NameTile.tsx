import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight, Sparkles, Box } from "lucide-react"; // Added 'Box' icon for the Bento section
import { Portal } from "./ui/portal";

declare global {
  interface Window {
    LeonSans: any;
  }
}

export function NameTile() {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas || typeof window.LeonSans === "undefined") return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixelRatio = window.devicePixelRatio || 2;
    let leons: any[] = [];

    const init = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      canvas.width = w * pixelRatio;
      canvas.height = h * pixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.scale(pixelRatio, pixelRatio);

      const fontSize = Math.min(w / 5, 100);

      const computedStyle = getComputedStyle(container);
      const initialColor = computedStyle.color || "#000000";

      const lines = ["DEVDEEP", "SAHA"];
      const lineHeight = fontSize * 0.85;

      leons = [];

      let totalOffsetY = (h - lines.length * lineHeight) / 2 - fontSize * 0.1;

      lines.forEach((lineText, lineIndex) => {
        let cursorX = 0;
        const chars = lineText.split("");

        chars.forEach((char, charIndex) => {
          const leon = new window.LeonSans({
            text: char,
            color: [initialColor],
            size: fontSize,
            weight: 400,
            tracking: 0,
            pathGap: 0.5,
          });

          leon.baseX = cursorX;
          leon.baseY = totalOffsetY + lineIndex * lineHeight;

          leon.position(leon.baseX, leon.baseY);

          leons.push({
            instance: leon,
            waveIndex: lineIndex * 10 + charIndex,
          });

          cursorX += leon.rect.w + fontSize * 0.05;
        });
      });

      const animateFrame = (t: number) => {
        ctx.clearRect(0, 0, w, h);

        const time = t * 0.003;

        const currentStyle = getComputedStyle(container);
        const currentColor = currentStyle.color;

        leons.forEach((item) => {
          const leon = item.instance;

          leon.color = [currentColor];

          const wave = Math.sin(time - item.waveIndex * 0.4);
          const weightMap = (wave + 1) / 2;
          const newWeight = 100 + weightMap * 700;

          leon.weight = newWeight;
          leon.position(leon.baseX, leon.baseY);
          leon.draw(ctx);
        });

        animationRef.current = requestAnimationFrame(animateFrame);
      };

      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(animateFrame);
    };

    init();

    const resizeObserver = new ResizeObserver(() => init());
    resizeObserver.observe(container);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* --- TILE FACE --- */}
      <motion.div
        className="bg-card text-card-foreground border border-border rounded-[2rem] p-6 sm:p-8 flex flex-col justify-center h-full min-h-[220px] relative overflow-hidden group transition-colors duration-300 cursor-pointer shadow-sm hover:shadow-lg hover:border-primary/50"
        whileHover={{ scale: 1.01 }}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative z-10 h-full flex flex-col justify-center">
          <div
            ref={containerRef}
            className="w-full flex-1 min-h-[140px] pointer-events-none text-card-foreground"
          >
            <canvas ref={canvasRef} />
          </div>

          <div className="flex items-center gap-3 mt-2">
            <div className="h-[2px] w-8 sm:w-12 bg-current transition-all duration-300 group-hover:w-16 opacity-80"></div>
            <p className="text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">
              Designer Who Codes
            </p>
          </div>
        </div>

        <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-current opacity-[0.05] rounded-full blur-3xl group-hover:opacity-[0.1] transition-opacity duration-500" />
        <ArrowUpRight
          className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all text-current"
          size={24}
        />
      </motion.div>

      {/* --- MODAL --- */}
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
                className="bg-card border border-border text-card-foreground rounded-[3rem] p-10 md:p-16 max-w-5xl w-full relative max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button (No Rotation) */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 md:top-12 md:right-12 p-4 bg-secondary hover:bg-secondary/80 rounded-full text-foreground transition-all z-[100] shadow-xl hover:scale-105 active:scale-95"
                >
                  <X size={28} />
                </button>

                <div className="grid md:grid-cols-2 gap-16 items-start">
                  {/* --- LEFT COLUMN: TEXT --- */}
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <p className="text-primary font-bold uppercase tracking-[0.3em] text-xs">
                        Introduction
                      </p>
                      <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none">
                        DEVDEEP
                        <br />
                        <span className="text-green">SAHA</span>
                      </h2>
                    </div>

                    <div className="space-y-6 text-xl text-muted-foreground leading-relaxed font-medium">
                      <p>
                        User, I see you have clicked the title! Intrigued by the
                        dynamic typography? ^_^
                      </p>
                      <p>
                        As you already know my name, I will keep this short.
                        <br />I build things where I express my interactive
                        ideas, experimental designs, and projects that start as
                        curiosity and slowly turn into a story.
                      </p>
                      <p>Some work. Some fail. All teach.</p>
                      <p>
                        But I am a rubber ball. The harder I fall, the harder I
                        bounce.
                      </p>

                      {/* --- NEW: ABOUT THIS WEBSITE (BENTO) --- */}
                      <div className="mt-8 pt-8 border-t border-border/50">
                        <div className="flex items-center gap-2 mb-4">
                          <Box className="text-primary" size={20} />
                          <h3 className="text-foreground font-bold uppercase tracking-widest text-xs">
                            About This Website
                          </h3>
                        </div>
                        <p className="text-lg leading-relaxed">
                          This portfolio is inspired by the Japanese{" "}
                          <span className="text-foreground font-bold">
                            "Bento Box"
                          </span>{" "}
                          philosophy (弁当). Just as a bento creates harmony by
                          compartmentalizing different flavors into a single
                          cohesive meal, this grid layout organizes the diverse
                          aspects of my work—code, design, and creativity—into a
                          unified digital experience.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* --- RIGHT COLUMN: IMAGE --- */}
                  {/* Added 'md:pt-24' to push the image down significantly */}
                  <div className="relative pt-12 md:pt-24">
                    <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-border bg-muted relative shadow-2xl">
                      <img
                        src="./pfp/dev1.jpg"
                        alt="Devdeep Saha"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-8 left-8 flex items-center gap-3 bg-background/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        <Sparkles className="text-primary" size={18} />
                        <span className="text-sm font-bold uppercase tracking-widest">
                          Kolkata, IN
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
