import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Sparkles,
  ArrowUpRight,
  Music,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Mic,
  FileUp,
  ArrowLeft,
} from "lucide-react";
import { Portal } from "./ui/portal";
import { myHobbies, HobbyItem } from "../ts/hobbies";
import { useHashRouter } from "../hooks/useHashRouter";

export function PlaygroundTile() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<HobbyItem | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- HASH ROUTING ---
  const closeMain = useHashRouter(
    isOpen,
    "playground",
    useCallback(() => {
      setIsOpen(false);
      setActiveTab(null);
    }, []),
  );

  const closeCategory = useHashRouter(
    !!activeTab && !selectedItem,
    `playground/${activeTab}`,
    useCallback(() => {
      setActiveTab(null);
    }, []),
  );

  const closeLightbox = useHashRouter(
    !!selectedItem,
    `playground/${activeTab}/${selectedItem?.id}`,
    useCallback(() => {
      setSelectedItem(null);
    }, []),
  );

  const activeHobby = useMemo(
    () => myHobbies.find((h) => h.id === activeTab),
    [activeTab],
  );

  const openItem = (item: HobbyItem) => {
    setSelectedItem(item);
    setCurrentSlide(0);
  };

  // Maps the colorVar to actual Tailwind classes
  const colorMap: Record<string, string> = {
    b: "bg-b",
    v: "bg-v",
    r: "bg-r",
    o: "bg-o",
  };

  const getMenuSpan = (index: number) => {
    switch (index) {
      case 0:
        return "col-span-12 md:col-span-8 h-[220px] md:h-[300px]";
      case 1:
        return "col-span-12 md:col-span-4 h-[220px] md:h-[300px]";
      case 2:
        return "col-span-12 md:col-span-5 h-[220px] md:h-[300px]";
      case 3:
        return "col-span-12 md:col-span-7 h-[220px] md:h-[300px]";
      default:
        return "col-span-12";
    }
  };

  return (
    <>
      <motion.div
        className="bg-card border border-border relative rounded-[2rem] overflow-hidden cursor-pointer group h-full min-h-[140px] flex flex-col justify-between shadow-sm transition-all hover:shadow-md"
        whileHover={{ scale: 1.01 }}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex justify-between items-start p-6 pb-0 relative z-10">
          <div className="bg-blue-500/10 p-2 rounded-full text-blue-500 border border-blue-500/20">
            <Music size={24} />
          </div>
          <ArrowUpRight className="text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
        <div className="relative z-10 p-6 pt-0 mt-auto">
          <h3 className="text-3xl font-black uppercase tracking-tighter leading-[0.9]">
            Play
            <br />
            <span className="text-blue-500">Ground</span>
          </h3>
        </div>
      </motion.div>

      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-[9999] flex items-center justify-center p-0 md:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={activeTab ? closeCategory : closeMain}
            >
              <motion.div
                className="bg-card border-none md:border border-border text-card-foreground rounded-none md:rounded-[2.5rem] w-full max-w-6xl h-[100dvh] md:h-[90vh] md:shadow-2xl overflow-hidden relative flex flex-col"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeMain}
                  className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-3 bg-secondary/80 hover:bg-secondary rounded-full shadow-md border border-border/50"
                >
                  <X size={20} />
                </button>

                <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-12 lg:p-16">
                  <AnimatePresence mode="wait">
                    {!activeTab ? (
                      /* --- LEVEL 1: BENTO MENU WITH FIXED COLORS --- */
                      /* --- LEVEL 1: BENTO MENU WITH SMART DESIGN --- */
                      <motion.div
                        key="menu"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="h-full flex flex-col"
                      >
                        <div className="mb-12">
                          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.8] mb-4 text-foreground">
                            Play<span className="text-blue-500">Ground</span>
                          </h2>
                        </div>

                        <div className="grid grid-cols-12 gap-4">
                          {myHobbies.map((hobby, index) => (
                            <motion.button
                              key={hobby.id}
                              whileHover={{ scale: 1.01, y: -4 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setActiveTab(hobby.id)}
                              className={`relative group rounded-[2.5rem] overflow-hidden p-8 flex flex-col justify-center items-center text-center transition-all duration-500 border border-white/10 shadow-lg hover:shadow-2xl ${getMenuSpan(index)} ${colorMap[hobby.colorVar]}`}
                            >
                              {/* SMART DESIGN: Mesh Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 opacity-60 pointer-events-none" />

                              {/* SMART DESIGN: Animated Ambient Glow */}
                              <div className="absolute -inset-24 bg-white/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                              {/* Floating Icon Container */}
                              <div className="relative bg-white/10 backdrop-blur-xl p-5 rounded-3xl border border-white/20 text-white mb-6 shadow-xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">
                                <hobby.icon size={48} strokeWidth={1.5} />
                                {/* Subtle Glow behind the icon */}
                                <div className="absolute inset-0 bg-white/20 blur-xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>

                              <h3 className="relative text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-md">
                                {hobby.title}
                              </h3>

                              {/* Clean Corner Indicator */}
                              <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/10 text-white/50 group-hover:text-white group-hover:bg-white/20 transition-all">
                                <ArrowUpRight size={20} />
                              </div>

                              {/* Bottom Decorative Label */}
                              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                <span className="text-[10px] font-black tracking-[0.3em] text-white/60 uppercase whitespace-nowrap">
                                  Explore Zone
                                </span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      /* --- LEVEL 2: INTERNAL GALLERY --- */
                      <motion.div
                        key="gallery"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                      >
                        <button
                          onClick={closeCategory}
                          className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-black uppercase text-xs tracking-widest transition-colors"
                        >
                          <ArrowLeft size={16} /> Back to zones
                        </button>

                        <div className="max-w-4xl">
                          <div className="flex items-center gap-2 text-blue-500 mb-2 font-black text-xs uppercase tracking-[0.3em]">
                            <Sparkles size={14} /> {activeHobby?.subtitle}
                          </div>
                          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
                            {activeHobby?.title}
                          </h2>
                          <p className="text-muted-foreground text-lg md:text-2xl font-medium leading-relaxed">
                            {activeHobby?.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12 border-t border-border pt-12">
                          {activeHobby?.gallery.map((item, idx) => (
                            <motion.div
                              key={item.id}
                              layoutId={item.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              onClick={() => openItem(item)}
                              className="group relative aspect-[4/3] cursor-pointer rounded-[2.5rem] overflow-hidden bg-secondary border border-border shadow-sm hover:shadow-xl transition-all"
                            >
                              <img
                                src={item.cover}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                              <div className="absolute bottom-0 left-0 p-8 w-full">
                                <h4 className="text-white font-black text-2xl leading-none uppercase tracking-tighter">
                                  {item.title}
                                </h4>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- LIGHTBOX (LEVEL 3) --- */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="fixed inset-0 z-[10000] flex items-center justify-center p-0 md:p-4 bg-black/95 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.div
                layoutId={selectedItem.id}
                className="w-full max-w-6xl bg-card rounded-none md:rounded-[3rem] overflow-hidden border-none md:border border-border shadow-2xl relative flex flex-col h-[100dvh] md:h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeLightbox}
                  className="absolute top-6 right-6 z-50 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
                  {selectedItem.content.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSlide(
                            (prev) =>
                              (prev - 1 + selectedItem.content.length) %
                              selectedItem.content.length,
                          );
                        }}
                        className="absolute left-6 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white backdrop-blur-md z-20"
                      >
                        <ChevronLeft size={32} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSlide(
                            (prev) => (prev + 1) % selectedItem.content.length,
                          );
                        }}
                        className="absolute right-6 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white backdrop-blur-md z-20"
                      >
                        <ChevronRight size={32} />
                      </button>
                    </>
                  )}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full p-4 md:p-12 flex items-center justify-center"
                    >
                      {renderMediaContent(selectedItem.content[currentSlide])}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="p-8 md:p-12 bg-card border-t border-border z-10">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white">
                          {selectedItem.content[currentSlide].type}
                        </span>
                        <span className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] truncate">
                          {selectedItem.content[currentSlide].caption}
                        </span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground tracking-tighter leading-none mb-1 md:mb-2">
                        {selectedItem.title}
                      </h2>
                      <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-3xl">
                        {selectedItem.description}
                      </p>
                    </div>
                    {selectedItem.pdf && (
                      <a
                        href={selectedItem.pdf}
                        target="_blank"
                        className="flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shrink-0"
                      >
                        <FileUp size={20} /> Read Document
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );

  function renderMediaContent(current: any) {
    switch (current.type) {
      case "video":
        return (
          <video
            src={current.src}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
        );
      case "audio":
        return (
          <div className="text-center w-full h-full flex flex-col items-center justify-center gap-8">
            <div className="w-48 h-48 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
              <Mic size={80} className="text-blue-500" />
            </div>
            <audio src={current.src} controls className="w-full max-w-xl" />
          </div>
        );
      case "pdf":
        return (
          <iframe
            src={current.src}
            className="w-full h-full rounded-2xl bg-white"
            title={current.caption}
          />
        );
      default:
        return (
          <img
            src={current.src}
            alt=""
            className="w-full h-full object-contain"
          />
        );
    }
  }
}
