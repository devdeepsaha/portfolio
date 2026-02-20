import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Music,
  Play,
  Pause,
  FileText,
  ChevronLeft,
  ChevronRight,
  Film,
  BookOpen,
  Image as ImageIcon,
  Filter,
  ZoomIn,
  ZoomOut,
  Moon,
  Sun,
  Download,
  Eye,
} from "lucide-react";
import { Portal } from "./ui/portal";
import { myHobbies, HobbyItem, MediaType, BlogContent } from "../ts/hobbies";
import { useHashRouter } from "../hooks/useHashRouter";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Outfit:wght@100..900&display=swap');
  
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
  
  /* Blog fonts */
  .blog-title {
    font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-weight: 513;
  font-style: normal;
  }
  
  .blog-content {
    font-family: 'Georgia', 'Times New Roman', serif;
  }
  
  /* Blue light filter - warm yellow background */
  .blog-reader.blue-light-filter {
    background-color: #FEF8E7 !important;
  }
  
  .blog-reader.blue-light-filter .blog-content-wrapper {
    background-color: #FEF8E7 !important;
  }
  
  .blog-reader.blue-light-filter .blog-content {
    color: #2a2a2a !important;
  }
  
  .blog-reader.dark-mode {
    background-color: #121212 !important;
  }
  
  .blog-reader.dark-mode .blog-content-wrapper {
    background-color: #121212 !important;
  }
  
  .blog-reader.dark-mode .blog-content {
    color: #E0E0E0 !important;
  }
  
  .blog-reader.dark-mode h1,
  .blog-reader.dark-mode h2,
  .blog-reader.dark-mode h3,
  .blog-reader.dark-mode h4,
  .blog-reader.dark-mode h5,
  .blog-reader.dark-mode h6 {
    color: #E0E0E0 !important;
  }
  
  .blog-reader.light-mode {
    background-color: #FFFFFF !important;
  }
  
  .blog-reader.light-mode .blog-content-wrapper {
    background-color: #FFFFFF !important;
  }
  
  .blog-reader.light-mode .blog-content {
    color: #1a1a1a !important;
  }
  
  .blog-reader.light-mode h1,
  .blog-reader.light-mode h2,
  .blog-reader.light-mode h3,
  .blog-reader.light-mode h4,
  .blog-reader.light-mode h5,
  .blog-reader.light-mode h6 {
    color: #000000 !important;
  }
  
  /* Mobile: 2 column masonry */
  @media (max-width: 639px) {
    .content-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.875rem;
      grid-auto-flow: dense;
    }
    
    .content-grid > [data-size="small"] {
      grid-column: span 1;
      grid-row: span 1;
      aspect-ratio: 1;
    }
    
    .content-grid > [data-size="medium"] {
      grid-column: span 2;
      grid-row: span 1;
      aspect-ratio: 2/1;
    }
    
    .content-grid > [data-size="large"] {
      grid-column: span 2;
      grid-row: span 2;
      aspect-ratio: 1;
    }
  }
  
  /* Tablet: 3 column masonry */
  @media (min-width: 640px) and (max-width: 1023px) {
    .content-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      grid-auto-flow: dense;
    }
    
    .content-grid > [data-size="small"] {
      grid-column: span 1;
      grid-row: span 1;
      aspect-ratio: 1;
    }
    
    .content-grid > [data-size="medium"] {
      grid-column: span 2;
      grid-row: span 1;
      aspect-ratio: 2/1;
    }
    
    .content-grid > [data-size="large"] {
      grid-column: span 3;
      grid-row: span 2;
      aspect-ratio: 3/2;
    }
  }
  
  /* Desktop: 4 column masonry */
  @media (min-width: 1024px) {
    .content-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
      grid-auto-flow: dense;
    }
    
    .content-grid > [data-size="small"] {
      grid-column: span 1;
      grid-row: span 1;
      aspect-ratio: 1;
    }
    
    .content-grid > [data-size="medium"] {
      grid-column: span 2;
      grid-row: span 1;
      aspect-ratio: 2/1;
    }
    
    .content-grid > [data-size="large"] {
      grid-column: span 2;
      grid-row: span 2;
      aspect-ratio: 1;
    }
  }
`;

export function PlaygroundTile() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(myHobbies[0].id);
  const [selectedItem, setSelectedItem] = useState<HobbyItem | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filterType, setFilterType] = useState<"all" | MediaType>("all");
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const [blogFontSize, setBlogFontSize] = useState(16);
  const [blogDarkMode, setBlogDarkMode] = useState(true);
  const [blogBlueLightFilter, setBlogBlueLightFilter] = useState(false);

  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const closeMain = useHashRouter(
    isOpen,
    "playground",
    useCallback(() => setIsOpen(false), []),
  );

  const closeLightbox = useHashRouter(
    !!selectedItem,
    `playground/${activeTab}/${selectedItem?.id}`,
    useCallback(() => setSelectedItem(null), []),
  );

  const tileRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const activeHobby = myHobbies.find((h) => h.id === activeTab) || myHobbies[0];

  const filteredGallery = activeHobby.gallery.filter(
    (item) => filterType === "all" || item.type === filterType,
  );

  useEffect(() => {
    if (!selectedItem || !isPlaying) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    const currentContent = selectedItem.content[currentSlide];
    if (currentContent.type !== "image") {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % selectedItem.content.length);
    }, 1500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [selectedItem, isPlaying, currentSlide]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tileRef.current) return;
    const rect = tileRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const openItem = (item: HobbyItem) => {
    setSelectedItem(item);
    setCurrentSlide(0);
    setIsPlaying(false);
  };

  const nextSlide = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (selectedItem) {
      setCurrentSlide((prev) => (prev + 1) % selectedItem.content.length);
    }
  };

  const prevSlide = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (selectedItem) {
      setCurrentSlide(
        (prev) =>
          (prev - 1 + selectedItem.content.length) %
          selectedItem.content.length,
      );
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const togglePlayback = () => {
    const currentContent = selectedItem?.content[currentSlide];
    if (currentContent?.type === "image") {
      setIsPlaying(!isPlaying);
    }
  };

  const downloadPDF = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <style>{styles}</style>

      {/* TILE */}
      <motion.div
        ref={tileRef}
        onMouseMove={handleMouseMove}
        className="bg-card border border-border relative rounded-2xl overflow-hidden cursor-pointer group h-full min-h-[120px] flex flex-col justify-between shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all"
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsOpen(true)}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.05), transparent 40%)`,
          }}
        />

        <div className="flex justify-between items-start p-4 relative z-10">
          <div className="bg-blue-500/10 p-1.5 rounded-full text-blue-500 border border-blue-500/20">
            <Music size={18} />
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none text-foreground">
          <div className="flex items-center gap-1 h-12">
            {[0.1, 0.5, 0.2, 0.7, 0.3, 0.6, 0.4, 0.8].map((delay, i) => (
              <div
                key={i}
                className="wave-bar"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 p-4 pt-0">
          <h3 className="text-foreground text-xl sm:text-2xl font-bold uppercase tracking-tight leading-tight">
            Play
            <br />
            <span className="text-blue-500">Ground</span>
          </h3>
        </div>
      </motion.div>

      {/* MODAL */}
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] flex items-center justify-center p-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMain}
            >
              <motion.div
                className="bg-card text-card-foreground rounded-none w-screen h-screen lg:h-[98vh] lg:w-[98vw] lg:rounded-xl flex flex-col relative overflow-hidden"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeMain}
                  className="absolute top-3 right-3 lg:top-4 lg:right-4 z-50 p-2 bg-secondary hover:bg-secondary/80 rounded-lg text-foreground transition-colors"
                >
                  <X size={20} />
                </button>

                {/* HEADER */}
                <div className="border-b border-border px-4 lg:px-6 py-3 lg:py-4 bg-secondary/30 flex-shrink-0">
                  <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight mb-1">
                    {activeHobby.title}
                  </h2>
                  <p className="text-xs lg:text-sm text-muted-foreground line-clamp-1">
                    {activeHobby.description}
                  </p>
                </div>

                {/* TABS & FILTERS */}
                <div className="border-b border-border bg-card flex-shrink-0">
                  <div className="flex border-b border-border px-4 lg:px-6 overflow-x-auto no-scrollbar">
                    {myHobbies.map((hobby) => {
                      const Icon = hobby.icon;
                      return (
                        <button
                          key={hobby.id}
                          onClick={() => {
                            setActiveTab(hobby.id);
                            setSelectedItem(null);
                            setFilterType("all");
                          }}
                          className={`flex items-center gap-1.5 px-3 lg:px-4 py-2 lg:py-3 border-b-2 transition-colors whitespace-nowrap text-xs lg:text-sm font-bold uppercase ${
                            activeTab === hobby.id
                              ? "border-blue-500 text-blue-500"
                              : "border-transparent text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Icon size={16} />
                          {hobby.title}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-1.5 px-4 lg:px-6 py-2.5 overflow-x-auto no-scrollbar border-t border-border/50">
                    <Filter
                      size={14}
                      className="text-muted-foreground flex-shrink-0"
                    />
                    {(
                      ["all", "audio", "video", "image", "pdf", "blog"] as const
                    ).map((type) => {
                      const hasType =
                        type === "all" ||
                        activeHobby.gallery.some((item) => item.type === type);

                      if (!hasType) return null;

                      return (
                        <button
                          key={type}
                          onClick={() => setFilterType(type)}
                          className={`px-2.5 lg:px-3 py-1 rounded-full text-[10px] lg:text-xs font-bold uppercase transition-all whitespace-nowrap flex-shrink-0 ${
                            filterType === type
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                              : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                          }`}
                        >
                          {type === "all" ? "All" : type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* MASONRY GRID */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6 bg-card">
                  <div className="content-grid">
                    <AnimatePresence mode="popLayout">
                      {filteredGallery.map((item) => (
                        <motion.button
                          key={item.id}
                          data-size={item.size || "small"}
                          layoutId={item.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={() => openItem(item)}
                          className="group relative rounded-xl overflow-hidden bg-secondary border border-border shadow-sm hover:shadow-lg hover:border-blue-500/50 transition-all text-left"
                        >
                          <img
                            src={item.cover}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                          <div className="absolute top-2 right-2 px-2 py-1 rounded-lg text-[8px] sm:text-[9px] lg:text-[10px] font-bold uppercase bg-blue-600 text-white flex items-center gap-1 shadow-lg">
                            {getIcon(item.type, 9)}
                            <span>{item.type}</span>
                          </div>

                          {item.content.length > 1 && (
                            <div className="absolute top-2 left-2 px-2 py-1 rounded-lg text-[8px] sm:text-[9px] lg:text-[10px] font-bold bg-black/60 text-white">
                              {item.content.length}
                            </div>
                          )}

                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-blue-600 p-2.5 lg:p-3 rounded-full text-white transform scale-75 group-hover:scale-90 transition-transform shadow-xl">
                              {getIcon(item.type, 16)}
                            </div>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 lg:p-3.5">
                            <h4 className="text-white font-bold text-xs sm:text-sm lg:text-base leading-tight mb-0.5 line-clamp-1">
                              {item.title}
                            </h4>
                            <p className="text-white/70 text-[10px] sm:text-xs lg:text-xs line-clamp-1">
                              {item.shortDescription}
                            </p>
                          </div>
                        </motion.button>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LIGHTBOX */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="fixed inset-0 z-[10000] flex items-center justify-center p-0 bg-black/98 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.div
                layoutId={selectedItem.id}
                className="w-screen h-screen lg:h-[95vh] lg:w-[95vw] lg:rounded-xl bg-card overflow-hidden relative flex flex-col border-none lg:border border-border"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeLightbox}
                  className="absolute top-3 right-3 lg:top-4 lg:right-4 z-50 p-2 bg-black/60 hover:bg-black/80 rounded-lg text-white transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Blog Reader Controls - Only for Blog */}
                {selectedItem.content[currentSlide].type === "blog" && (
                  <div className="absolute top-3 left-3 lg:top-4 lg:left-4 z-40 flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-lg p-2 flex-wrap justify-start max-w-xs">
                    <button
                      onClick={() =>
                        setBlogFontSize(Math.max(12, blogFontSize - 2))
                      }
                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                      title="Decrease font size"
                    >
                      <ZoomOut size={16} />
                    </button>
                    <span className="text-xs text-white/70 px-1 font-mono min-w-max">
                      {blogFontSize}px
                    </span>
                    <button
                      onClick={() =>
                        setBlogFontSize(Math.min(24, blogFontSize + 2))
                      }
                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                      title="Increase font size"
                    >
                      <ZoomIn size={16} />
                    </button>

                    <button
                      onClick={() => setBlogDarkMode(!blogDarkMode)}
                      className={`p-1.5 rounded transition-colors ${
                        blogDarkMode
                          ? "bg-blue-600/50 text-yellow-300"
                          : "hover:bg-white/20 text-white"
                      }`}
                      title={blogDarkMode ? "Light mode" : "Dark mode"}
                    >
                      {blogDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                    </button>

                    <button
                      onClick={() =>
                        setBlogBlueLightFilter(!blogBlueLightFilter)
                      }
                      className={`p-1.5 rounded transition-colors ${
                        blogBlueLightFilter
                          ? "bg-yellow-500/50 text-yellow-100"
                          : "hover:bg-white/20 text-white"
                      }`}
                      title="Toggle blue light filter"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                )}

                {/* PDF Download Button */}
                {selectedItem.content[currentSlide].type === "pdf" &&
                  selectedItem.content[currentSlide].src && (
                    <button
                      onClick={() =>
                        downloadPDF(
                          selectedItem.content[currentSlide].src,
                          `${selectedItem.title}.pdf`,
                        )
                      }
                      className="absolute top-3 left-3 lg:top-4 lg:left-4 z-40 p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors flex items-center gap-2"
                      title="Download PDF"
                    >
                      <Download size={18} />
                      <span className="text-xs font-bold hidden sm:inline">
                        Download
                      </span>
                    </button>
                  )}

                {/* Content Area - Swipe enabled */}
                <div
                  className="flex-1 relative w-full bg-black group/carousel flex items-center justify-center overflow-hidden"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {selectedItem.content.length > 1 && (
                    <button
                      onClick={prevSlide}
                      className="absolute left-2 lg:left-4 z-20 p-2 lg:p-3 bg-white/10 hover:bg-white/20 rounded-lg text-white opacity-100 lg:opacity-0 lg:group-hover/carousel:opacity-100 transition-opacity"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full flex items-center justify-center p-2 lg:p-4"
                    >
                      {renderContent(
                        selectedItem.content[currentSlide],
                        selectedItem,
                        blogFontSize,
                        blogDarkMode,
                        blogBlueLightFilter,
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {selectedItem.content.length > 1 && (
                    <button
                      onClick={nextSlide}
                      className="absolute right-2 lg:right-4 z-20 p-2 lg:p-3 bg-white/10 hover:bg-white/20 rounded-lg text-white opacity-100 lg:opacity-0 lg:group-hover/carousel:opacity-100 transition-opacity"
                    >
                      <ChevronRight size={20} />
                    </button>
                  )}

                  {selectedItem.content.length > 1 && (
                    <div className="absolute bottom-28 sm:bottom-32 lg:bottom-40 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                      {selectedItem.content.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === currentSlide
                              ? "bg-blue-500 w-3 lg:w-4"
                              : "bg-white/40 w-1.5"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Master Controls - Bottom */}
                <div className="bg-black border-t border-border/30 p-3 sm:p-4 lg:p-6 flex-shrink-0">
                  <div className="flex items-center justify-between gap-2 mb-3 lg:mb-4">
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      <span className="px-2 py-1 rounded text-[8px] sm:text-[9px] lg:text-xs font-bold uppercase bg-blue-600 text-white flex-shrink-0">
                        {selectedItem.content[currentSlide].type}
                      </span>
                      {selectedItem.content[currentSlide].caption && (
                        <span className="text-[9px] sm:text-[10px] lg:text-xs text-white/80 font-medium uppercase truncate">
                          {selectedItem.content[currentSlide].caption}
                        </span>
                      )}
                    </div>
                    {selectedItem.content.length > 1 && (
                      <span className="text-[8px] sm:text-[9px] lg:text-xs font-mono text-white/60 flex-shrink-0">
                        {currentSlide + 1}/{selectedItem.content.length}
                      </span>
                    )}
                  </div>

                  <h2 className="text-base sm:text-lg lg:text-2xl font-black uppercase text-white mb-1">
                    {selectedItem.title}
                  </h2>
                  <p className="text-white/70 text-[10px] sm:text-xs lg:text-sm line-clamp-2 mb-3 lg:mb-4">
                    {selectedItem.fullDescription ||
                      selectedItem.shortDescription}
                  </p>

                  {selectedItem.content.length > 1 && (
                    <div className="flex items-center justify-center gap-3 lg:gap-6">
                      <button
                        onClick={prevSlide}
                        className="p-2 lg:p-3 hover:bg-white/10 rounded-lg text-white transition-colors"
                        title="Previous"
                      >
                        <ChevronLeft size={20} className="lg:w-6 lg:h-6" />
                      </button>

                      <button
                        onClick={togglePlayback}
                        className="p-3 lg:p-4 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors shadow-lg shadow-blue-600/50"
                        title={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? (
                          <Pause size={20} fill="currentColor" />
                        ) : (
                          <Play size={20} fill="currentColor" />
                        )}
                      </button>

                      <button
                        onClick={nextSlide}
                        className="p-2 lg:p-3 hover:bg-white/10 rounded-lg text-white transition-colors"
                        title="Next"
                      >
                        <ChevronRight size={20} className="lg:w-6 lg:h-6" />
                      </button>
                    </div>
                  )}

                  {selectedItem.content[currentSlide].type === "image" &&
                    selectedItem.content.length > 1 && (
                      <p className="text-center text-[9px] sm:text-[10px] lg:text-xs text-white/50 mt-2.5 lg:mt-3">
                        {isPlaying
                          ? "🎬 Auto-playing • 1.5s per image"
                          : "Click play to auto-play"}
                      </p>
                    )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}

function renderMarkdown(text: string | undefined) {
  if (!text) {
    return <p className="text-sm lg:text-base">No content available.</p>;
  }

  return text.split("\n").map((line, idx) => {
    if (line.startsWith("# ")) {
      return (
        <h1
          key={idx}
          className="text-3xl lg:text-4xl font-black mb-4 mt-6 tracking-tight blog-title"
        >
          {line.slice(2)}
        </h1>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h2
          key={idx}
          className="text-2xl lg:text-3xl font-black mb-3 mt-5 tracking-tight blog-title"
        >
          {line.slice(3)}
        </h2>
      );
    }
    if (line.startsWith("### ")) {
      return (
        <h3
          key={idx}
          className="text-xl lg:text-2xl font-bold mb-2 mt-4 blog-title"
        >
          {line.slice(4)}
        </h3>
      );
    }

    if (line.trim() === "---") {
      return (
        <hr key={idx} className="my-6 border-gray-300 dark:border-gray-600" />
      );
    }

    if (line.trim() === "") {
      return <div key={idx} className="h-2" />;
    }

    return (
      <p key={idx} className="mb-3 leading-relaxed blog-content">
        {formatInlineText(line)}
      </p>
    );
  });
}

function formatInlineText(text: string) {
  const parts: React.ReactNode[] = [];
  let currentIdx = 0;

  const regex =
    /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)|([^*[\]]+)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match[1]) {
      parts.push(<strong key={match.index}>{match[1]}</strong>);
    } else if (match[2]) {
      parts.push(<em key={match.index}>{match[2]}</em>);
    } else if (match[3] && match[4]) {
      parts.push(
        <a
          key={match.index}
          href={match[4]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {match[3]}
        </a>,
      );
    } else if (match[5]) {
      parts.push(match[5]);
    }
  }

  return parts.length > 0 ? parts : text;
}

function renderContent(
  content: any,
  selectedItem?: HobbyItem,
  fontSize: number = 16,
  darkMode: boolean = true,
  blueLightFilter: boolean = false,
) {
  switch (content.type) {
    case "video":
      return (
        <video
          src={content.src}
          controls
          autoPlay
          className="w-full h-full object-contain"
        />
      );
    case "audio":
      return (
        <div className="text-center w-full px-4 py-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-4 lg:mb-8 animate-pulse">
            <Music
              size={40}
              className="text-blue-500 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
            />
          </div>
          <audio
            src={content.src}
            controls
            autoPlay
            className="w-full max-w-sm mx-auto"
          />
        </div>
      );
    case "pdf":
      return (
        <iframe
          src={content.src}
          className="w-full h-full rounded-none lg:rounded-lg bg-white"
          title={content.caption}
        />
      );
    case "blog":
      const modeClass = blueLightFilter
        ? "blue-light-filter"
        : darkMode
          ? "dark-mode"
          : "light-mode";
      const bgColor = blueLightFilter
        ? "#FEF8E7"
        : darkMode
          ? "#121212"
          : "#FFFFFF";
      const textColor = blueLightFilter
        ? "#2a2a2a"
        : darkMode
          ? "#E0E0E0"
          : "#1a1a1a";

      return (
        <div
          className={`blog-reader ${modeClass} w-full h-full overflow-y-auto p-4 sm:p-6 lg:p-8 transition-colors duration-300`}
          style={{
            backgroundColor: bgColor,
            color: textColor,
          }}
        >
          <article
            className="blog-content-wrapper max-w-3xl mx-auto"
            style={{ fontSize: `${fontSize}px`, lineHeight: "1.8" }}
          >
            {selectedItem?.blogContent?.content ? (
              renderMarkdown(selectedItem.blogContent.content)
            ) : (
              <p className="text-base">Blog content not found.</p>
            )}
          </article>
        </div>
      );
    default:
      return (
        <img
          src={content.src}
          alt="Content"
          className="w-full h-full object-contain"
        />
      );
  }
}

function getIcon(type: string, size: number) {
  switch (type) {
    case "video":
      return <Play size={size} fill="currentColor" />;
    case "audio":
      return <Music size={size} />;
    case "pdf":
      return <FileText size={size} />;
    case "blog":
      return <BookOpen size={size} />;
    default:
      return <ImageIcon size={size} />;
  }
}
