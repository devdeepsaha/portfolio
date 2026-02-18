import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Sparkles,
  ArrowUpRight,
  Music,
  Play,
  Maximize2,
  Filter,
  Video,
  Image as ImageIcon,
  Mic,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Portal } from "./ui/portal";
import { myHobbies, HobbyItem, MediaType } from "../ts/hobbies";

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
  /* Hide Scrollbar for Horizontal Nav */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export function PlaygroundTile() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(myHobbies[0].id);

  const [selectedItem, setSelectedItem] = useState<HobbyItem | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filterType, setFilterType] = useState<"all" | MediaType>("all");

  const tileRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const activeHobby = myHobbies.find((h) => h.id === activeTab) || myHobbies[0];

  const filteredGallery = useMemo(() => {
    let items = activeHobby.gallery;
    if (filterType !== "all") {
      items = items.filter((item) => item.type === filterType);
    }
    return items;
  }, [activeHobby, filterType]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tileRef.current) return;
    const rect = tileRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const openItem = (item: HobbyItem) => {
    setSelectedItem(item);
    setCurrentSlide(0);
  };

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedItem) {
      setCurrentSlide((prev) => (prev + 1) % selectedItem.content.length);
    }
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedItem) {
      setCurrentSlide(
        (prev) =>
          (prev - 1 + selectedItem.content.length) %
          selectedItem.content.length,
      );
    }
  };

  return (
    <>
      <style>{waveStyles}</style>

      {/* --- TILE FACE --- */}
      <motion.div
        ref={tileRef}
        onMouseMove={handleMouseMove}
        className="bg-card border border-border relative rounded-[2rem] overflow-hidden cursor-pointer group h-full min-h-[140px] flex flex-col justify-between shadow-sm transition-all hover:shadow-md hover:border-blue-500/30"
        whileHover={{ scale: 1.01 }}
        onClick={() => setIsOpen(true)}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.05), transparent 40%)`,
          }}
        />

        <div className="flex justify-between items-start mb-2 relative z-10 p-6 pb-0">
          <div className="bg-blue-500/10 p-2 rounded-full text-blue-500 border border-blue-500/20">
            <Music size={24} />
          </div>
          <ArrowUpRight className="text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none text-foreground">
          <div className="flex items-center gap-1.5 h-16">
            {[0.1, 0.5, 0.2, 0.7, 0.3, 0.6, 0.4, 0.8].map((delay, i) => (
              <div
                key={i}
                className="wave-bar"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-auto p-6 pt-0">
          <h3 className="text-card-foreground text-3xl sm:text-[2rem] font-black uppercase tracking-tighter break-words leading-[0.9]">
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
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                className="bg-card border border-border text-card-foreground rounded-[2.5rem] w-full max-w-6xl h-[85vh] shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 md:p-3 bg-secondary hover:bg-secondary/80 rounded-full text-foreground transition-colors"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>

                {/* --- NAVIGATION SIDEBAR (Vertical on Desktop, Horizontal Scroll on Mobile) --- */}
                <div className="w-full md:w-80 bg-secondary/20 border-b md:border-b-0 md:border-r border-border flex flex-col p-6 md:p-8 flex-shrink-0">
                  <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4 md:mb-8">
                    Play<span className="text-blue-500">Ground</span>
                  </h2>

                  {/* The Nav Container: Flex Row on Mobile, Flex Col on Desktop */}
                  <div className="flex flex-row md:flex-col gap-3 overflow-x-auto no-scrollbar md:overflow-visible pb-2 md:pb-0">
                    {myHobbies.map((hobby) => {
                      const Icon = hobby.icon;
                      const isActive = activeTab === hobby.id;
                      return (
                        <button
                          key={hobby.id}
                          onClick={() => {
                            setActiveTab(hobby.id);
                            setFilterType("all");
                          }}
                          className={`
                                        flex-shrink-0 flex items-center gap-3 p-3 md:p-4 rounded-xl transition-all duration-300
                                        ${isActive ? "bg-blue-600 text-white shadow-md" : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"}
                                        md:w-full text-left
                                    `}
                        >
                          <Icon className="w-5 h-5 md:w-6 md:h-6" />
                          <span className="font-black uppercase text-xs md:text-base tracking-wide whitespace-nowrap">
                            {hobby.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* --- RIGHT: Content Grid --- */}
                <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-card">
                  <div className="mb-8 md:mb-10 flex flex-col xl:flex-row xl:items-end justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-blue-500 mb-2">
                        <Sparkles size={18} />
                        <span className="text-xs md:text-sm font-bold uppercase tracking-widest">
                          {activeHobby.subtitle}
                        </span>
                      </div>
                      <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none mb-3 md:mb-4">
                        {activeHobby.title}
                      </h2>
                      <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
                        {activeHobby.description}
                      </p>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex-shrink-0 flex items-center gap-1 bg-secondary p-1.5 rounded-full border border-border flex-wrap">
                      {[
                        { id: "all", icon: Filter, label: "All" },
                        { id: "audio", icon: Mic, label: "Audio" },
                        { id: "video", icon: Video, label: "Video" },
                        { id: "image", icon: ImageIcon, label: "Photos" },
                      ].map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setFilterType(type.id as any)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                            filterType === type.id
                              ? "bg-card text-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <type.icon size={12} />
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            {type.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                      {filteredGallery.map((item) => (
                        <motion.div
                          key={item.id}
                          layoutId={item.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={() => openItem(item)}
                          className="group relative cursor-pointer rounded-2xl overflow-hidden bg-secondary border border-border shadow-sm hover:shadow-lg hover:border-blue-500/50 transition-all aspect-[4/3]"
                        >
                          <img
                            src={item.cover}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                          {item.content.length > 1 && (
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-md text-xs font-bold text-white flex items-center gap-1.5">
                              <Layers size={12} />
                              {item.content.length}
                            </div>
                          )}

                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-blue-600 p-4 rounded-full text-white shadow-xl backdrop-blur-md transform scale-90 group-hover:scale-100 transition-transform">
                              {item.type === "video" ? (
                                <Play size={28} fill="currentColor" />
                              ) : item.type === "audio" ? (
                                <Music size={28} />
                              ) : (
                                <Maximize2 size={28} />
                              )}
                            </div>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <h4 className="text-white font-black text-xl md:text-2xl leading-tight mb-2">
                              {item.title}
                            </h4>
                            <p className="text-white/80 text-xs md:text-sm font-medium line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- CAROUSEL MODAL --- */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                layoutId={selectedItem.id}
                className="w-full max-w-6xl bg-card rounded-[2rem] overflow-hidden border border-border shadow-2xl relative flex flex-col h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-50 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-md transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="flex-1 relative w-full bg-black group/carousel overflow-hidden flex items-center justify-center">
                  {/* Prev */}
                  {selectedItem.content.length > 1 && (
                    <button
                      onClick={prevSlide}
                      className="absolute left-6 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20"
                    >
                      <ChevronLeft size={32} />
                    </button>
                  )}

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full flex items-center justify-center p-4"
                    >
                      {selectedItem.content[currentSlide].type === "video" ? (
                        <video
                          src={selectedItem.content[currentSlide].src}
                          controls
                          autoPlay
                          className="w-full h-full object-contain max-h-full"
                        />
                      ) : selectedItem.content[currentSlide].type ===
                        "audio" ? (
                        <div className="text-center w-full">
                          <div className="w-40 h-40 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-8 animate-pulse">
                            <Music size={80} className="text-blue-500" />
                          </div>
                          <audio
                            src={selectedItem.content[currentSlide].src}
                            controls
                            className="w-full max-w-xl mx-auto"
                          />
                        </div>
                      ) : (
                        <img
                          src={selectedItem.content[currentSlide].src}
                          alt={selectedItem.title}
                          className="w-full h-full object-contain max-h-full"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Next */}
                  {selectedItem.content.length > 1 && (
                    <button
                      onClick={nextSlide}
                      className="absolute right-6 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20"
                    >
                      <ChevronRight size={32} />
                    </button>
                  )}

                  {/* Dots */}
                  {selectedItem.content.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                      {selectedItem.content.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? "bg-blue-500 w-4" : "bg-white/50"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-6 md:p-8 bg-card border-t border-border z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded text-xs font-bold uppercase bg-blue-600 text-white">
                        {selectedItem.content[currentSlide].type}
                      </span>
                      <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                        {selectedItem.content[currentSlide].caption}
                      </span>
                    </div>
                    {selectedItem.content.length > 1 && (
                      <span className="text-xs font-mono text-muted-foreground">
                        {currentSlide + 1} / {selectedItem.content.length}
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black uppercase text-card-foreground mb-2">
                    {selectedItem.title}
                  </h2>
                  <p className="text-muted-foreground text-lg md:text-xl">
                    {selectedItem.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
