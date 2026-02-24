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
  BookOpen,
  Image as ImageIcon,
  Filter,
  ZoomIn,
  ZoomOut,
  Moon,
  Sun,
  Download,
  Eye,
  Volume2,
  ChevronDown,
} from "lucide-react";
import { Portal } from "./ui/portal";
import { myHobbies, HobbyItem, MediaType } from "../ts/hobbies";
import { useHashRouter } from "../hooks/useHashRouter";

// ─── Types ────────────────────────────────────────────────────────────────────
type Corner = "br" | "bl" | "tr" | "tl";

interface FloatingAudioPlayer {
  playing: boolean;
  title: string;
  src: string;
  cover: string;
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Outfit:wght@100..900&display=swap');

  @keyframes equalizer {
    0%   { height: 20%; }
    50%  { height: 100%; }
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

  .blog-title { font-family: "Outfit", sans-serif; font-optical-sizing: auto; font-weight: 513; }
  .blog-content { font-family: 'Georgia', 'Times New Roman', serif; }

  .blog-reader.blue-light-filter { background-color: #FEF8E7 !important; }
  .blog-reader.blue-light-filter .blog-content-wrapper { background-color: #FEF8E7 !important; }
  .blog-reader.blue-light-filter .blog-content { color: #2a2a2a !important; }

  .blog-reader.dark-mode { background-color: #121212 !important; }
  .blog-reader.dark-mode .blog-content-wrapper { background-color: #121212 !important; }
  .blog-reader.dark-mode .blog-content { color: #E0E0E0 !important; }
  .blog-reader.dark-mode h1,.blog-reader.dark-mode h2,.blog-reader.dark-mode h3,
  .blog-reader.dark-mode h4,.blog-reader.dark-mode h5,.blog-reader.dark-mode h6 { color: #E0E0E0 !important; }

  .blog-reader.light-mode { background-color: #FFFFFF !important; }
  .blog-reader.light-mode .blog-content-wrapper { background-color: #FFFFFF !important; }
  .blog-reader.light-mode .blog-content { color: #1a1a1a !important; }
  .blog-reader.light-mode h1,.blog-reader.light-mode h2,.blog-reader.light-mode h3,
  .blog-reader.light-mode h4,.blog-reader.light-mode h5,.blog-reader.light-mode h6 { color: #000000 !important; }

  @media (max-width: 639px) {
    .content-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.875rem; grid-auto-flow: dense; }
    .content-grid > [data-size="small"]  { grid-column: span 1; grid-row: span 1; aspect-ratio: 1; }
    .content-grid > [data-size="medium"] { grid-column: span 2; grid-row: span 1; aspect-ratio: 2/1; }
    .content-grid > [data-size="large"]  { grid-column: span 2; grid-row: span 2; aspect-ratio: 1; }
    .content-grid > [data-size="long"]   { grid-column: span 1; grid-row: span 2; aspect-ratio: 1/2.1; }
  }
  @media (min-width: 640px) and (max-width: 1023px) {
    .content-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; grid-auto-flow: dense; }
    .content-grid > [data-size="small"]  { grid-column: span 1; grid-row: span 1; aspect-ratio: 1; }
    .content-grid > [data-size="medium"] { grid-column: span 2; grid-row: span 1; aspect-ratio: 2/0.97; }
    .content-grid > [data-size="large"]  { grid-column: span 3; grid-row: span 2; aspect-ratio: 3/2; }
    .content-grid > [data-size="long"]   { grid-column: span 1; grid-row: span 2; aspect-ratio: 1/2.07; }
  }
  @media (min-width: 1024px) {
    .content-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.25rem; grid-auto-flow: dense; }
    .content-grid > [data-size="small"]  { grid-column: span 1; grid-row: span 1; aspect-ratio: 1.008; }
    .content-grid > [data-size="medium"] { grid-column: span 2; grid-row: span 1; aspect-ratio: 2/0.973; }
    .content-grid > [data-size="large"]  { grid-column: span 2; grid-row: span 2; aspect-ratio: 1; }
    .content-grid > [data-size="long"]   { grid-column: span 1; grid-row: span 2; aspect-ratio: 1/2.076; }
  }

  @media (max-width: 640px) { .mini-player { min-width: 220px; padding: 0.75rem; } }

  /* ── Marquee scroll for long mini-player titles ─────────────────────────── */
  @keyframes marquee-title {
    0%,  15% { transform: translateX(0%); }
    60%, 75% { transform: translateX(-45%); }
    100%     { transform: translateX(0%); }
  }
`;

// ─── Corner position helper ────────────────────────────────────────────────────
const GAP = 20;
function cornerStyle(c: Corner): React.CSSProperties {
  switch (c) {
    case "br":
      return { bottom: GAP, right: GAP };
    case "bl":
      return { bottom: GAP, left: GAP };
    case "tr":
      return { top: GAP, right: GAP };
    case "tl":
      return { top: GAP, left: GAP };
  }
}

// ─── Main component ───────────────────────────────────────────────────────────
export function PlaygroundTile() {
  // UI state
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(myHobbies[0].id);
  const [selectedItem, setSelectedItem] = useState<HobbyItem | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filterType, setFilterType] = useState<"all" | MediaType>("all");
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [showDescription, setShowDescription] = useState(false);

  // Blog
  const [blogFontSize, setBlogFontSize] = useState(20);
  const [blogDarkMode, setBlogDarkMode] = useState(false);
  const [blogBlueLightFilter, setBlogBlueLightFilter] = useState(false);

  // Audio
  const [floatingAudio, setFloatingAudio] =
    useState<FloatingAudioPlayer | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Mini player corner drag
  const [corner, setCorner] = useState<Corner>("br");
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);

  // Slideshow timer
  const slideshowTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Tile glow
  const tileRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // ── Hash routing ─────────────────────────────────────────────────────────────
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

  // ── Derived ──────────────────────────────────────────────────────────────────
  const activeHobby = myHobbies.find((h) => h.id === activeTab) ?? myHobbies[0];
  const filteredGallery = activeHobby.gallery.filter(
    (item) => filterType === "all" || item.type === filterType,
  );

  // ── Slideshow ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedItem || !isPlaying) {
      if (slideshowTimer.current) clearInterval(slideshowTimer.current);
      return;
    }
    if (selectedItem.content[currentSlide].type !== "image") {
      if (slideshowTimer.current) clearInterval(slideshowTimer.current);
      return;
    }
    slideshowTimer.current = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % selectedItem.content.length);
    }, 1500);
    return () => {
      if (slideshowTimer.current) clearInterval(slideshowTimer.current);
    };
  }, [selectedItem, isPlaying, currentSlide]);

  // ── Sync mini-player ↔ native audio events ────────────────────────────────
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () =>
      setFloatingAudio((p) => (p ? { ...p, playing: true } : null));
    const onPause = () =>
      setFloatingAudio((p) => (p ? { ...p, playing: false } : null));
    const onEnded = () =>
      setFloatingAudio((p) => (p ? { ...p, playing: false } : null));
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
    };
  }, []);

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tileRef.current) return;
    const r = tileRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const openItem = (item: HobbyItem) => {
    setSelectedItem(item);
    setCurrentSlide(0);
    setIsPlaying(false);
    setShowDescription(false);
  };

  const nextSlide = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (selectedItem)
      setCurrentSlide((p) => (p + 1) % selectedItem.content.length);
  };
  const prevSlide = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (selectedItem)
      setCurrentSlide(
        (p) =>
          (p - 1 + selectedItem.content.length) % selectedItem.content.length,
      );
  };

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
  };

  const togglePlayback = () => {
    if (selectedItem?.content[currentSlide]?.type === "image")
      setIsPlaying((p) => !p);
  };

  const downloadPDF = (url: string, filename: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "document.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // ── Corner snap ──────────────────────────────────────────────────────────────
  const snapToCorner = useCallback((x: number, y: number) => {
    const mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    setCorner(x < mx ? (y < my ? "tl" : "bl") : y < my ? "tr" : "br");
  }, []);

  const onMiniMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragStart.current = { x: e.clientX, y: e.clientY };
    const onMove = (me: MouseEvent) => {
      setDragPos({ x: me.clientX, y: me.clientY });
    };
    const onUp = (me: MouseEvent) => {
      snapToCorner(me.clientX, me.clientY);
      setDragPos(null);
      dragStart.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const onMiniTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    dragStart.current = { x: t.clientX, y: t.clientY };
    const onMove = (te: TouchEvent) => {
      setDragPos({ x: te.touches[0].clientX, y: te.touches[0].clientY });
    };
    const onEnd = (te: TouchEvent) => {
      const touch = te.changedTouches[0];
      snapToCorner(touch.clientX, touch.clientY);
      setDragPos(null);
      dragStart.current = null;
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd);
  };

  // ── Start audio ───────────────────────────────────────────────────────────
  const startAudio = useCallback(
    (src: string, title: string, cover: string) => {
      const el = audioRef.current;
      if (!el) return;
      if (el.src !== src) {
        el.src = src;
        el.load();
      }
      el.play().catch(() => {});
      setFloatingAudio({ playing: true, title, src, cover });
    },
    [],
  );

  // ── Render ───────────────────────────────────────────────────────────────────
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
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59,130,246,0.05), transparent 40%)`,
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

      {/* PORTAL */}
      <Portal>
        <audio ref={audioRef} style={{ display: "none" }} />

        {/* ── MODAL ─────────────────────────────────────────────────────────── */}
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

                <div className="border-b border-border px-4 lg:px-6 py-3 lg:py-4 bg-secondary/30 flex-shrink-0">
                  <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight mb-1">
                    {activeHobby.title}
                  </h2>
                  <p className="text-xs lg:text-sm text-muted-foreground line-clamp-1">
                    {activeHobby.description}
                  </p>
                </div>

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
                        activeHobby.gallery.some((i) => i.type === type);
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
                            <p className="text-white/70 text-[10px] sm:text-xs line-clamp-1">
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

        {/* ── LIGHTBOX ──────────────────────────────────────────────────────── */}
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

                {/* Blog toolbar */}
                {selectedItem.content[currentSlide].type === "blog" && (
                  <div className="absolute top-3 left-3 lg:top-4 lg:left-4 z-40 flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-lg p-2 flex-wrap max-w-xs">
                    <button
                      onClick={() =>
                        setBlogFontSize(Math.max(12, blogFontSize - 2))
                      }
                      className="p-1.5 hover:bg-white/20 rounded text-white"
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
                      className="p-1.5 hover:bg-white/20 rounded text-white"
                    >
                      <ZoomIn size={16} />
                    </button>
                    <button
                      onClick={() => setBlogDarkMode(!blogDarkMode)}
                      className={`p-1.5 rounded transition-colors ${blogDarkMode ? "bg-blue-600/50 text-yellow-300" : "hover:bg-white/20 text-white"}`}
                    >
                      {blogDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                    <button
                      onClick={() =>
                        setBlogBlueLightFilter(!blogBlueLightFilter)
                      }
                      className={`p-1.5 rounded transition-colors ${blogBlueLightFilter ? "bg-yellow-500/50 text-yellow-100" : "hover:bg-white/20 text-white"}`}
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                )}

                {/* ── Carousel area ── */}
                <div
                  className={`flex-1 relative w-full bg-black group/carousel flex items-center justify-center overflow-hidden ${
                    selectedItem?.content[currentSlide]?.type !== "audio"
                      ? "lg:pr-[320px]"
                      : ""
                  }`}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Mobile/tablet prev arrow — hidden on desktop */}
                  {selectedItem.content.length > 1 && (
                    <button
                      onClick={prevSlide}
                      className="absolute left-2 lg:hidden z-20 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white opacity-100 transition-opacity"
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
                      className={`w-full h-full flex items-center justify-center ${
                        selectedItem.content[currentSlide].type === "audio"
                          ? ""
                          : "p-2 lg:p-4"
                      }`}
                    >
                      {renderContent(
                        selectedItem.content[currentSlide],
                        selectedItem,
                        blogFontSize,
                        blogDarkMode,
                        blogBlueLightFilter,
                        audioRef,
                        floatingAudio,
                        setFloatingAudio,
                        startAudio,
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Mobile/tablet next arrow — hidden on desktop */}
                  {selectedItem.content.length > 1 && (
                    <button
                      onClick={nextSlide}
                      className="absolute right-2 lg:hidden z-20 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white opacity-100 transition-opacity"
                    >
                      <ChevronRight size={20} />
                    </button>
                  )}

                  {/* Slide dots — centered in content area (not sidebar) */}
                  {selectedItem.content.length > 1 && (
                    <div className="absolute bottom-4 lg:bottom-6 left-1/2 lg:left-1/2 -translate-x-1/2 lg:-ml-40 flex gap-1.5 z-20">
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

                {/* ── Right sidebar / bottom bar — hidden for audio ── */}
                {selectedItem.content[currentSlide].type !== "audio" && (
                  <div className="bg-black flex-shrink-0 no-scrollbar border-t border-border/30 lg:border-t-0 lg:border-l lg:border-border/30 w-full lg:w-[320px] lg:absolute lg:right-0 lg:top-0 lg:bottom-0 overflow-y-auto p-3 sm:p-4 lg:p-6 lg:flex lg:flex-col lg:justify-start lg:pt-16 max-h-[30vh] lg:max-h-none">
                    {/* Type badge + non-image caption + slide counter */}
                    <div className="flex items-center justify-between gap-2 mb-3 lg:mb-4">
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <span className="px-2 py-1 rounded text-[8px] sm:text-[9px] lg:text-xs font-bold uppercase bg-blue-600 text-white flex-shrink-0">
                          {selectedItem.content[currentSlide].type}
                        </span>
                        {/* Show inline caption for non-image types */}
                        {selectedItem.content[currentSlide].type !== "image" &&
                          selectedItem.content[currentSlide].caption && (
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

                    {/* Title */}
                    <h2 className="text-base sm:text-lg lg:text-base font-black uppercase text-white mb-2">
                      {selectedItem.title}
                    </h2>

                    {/* Per-image caption — fixed height so nav never jumps */}
                    {selectedItem.content[currentSlide].type === "image" && (
                      <div className="mb-3 h-86 overflow-y-auto [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-thumb]:rounded-full">
                        <p className="text-white/50 text-[10px] sm:text-xs lg:text-sm leading-relaxed italic">
                          {selectedItem.content[currentSlide].caption || ""}
                        </p>
                      </div>
                    )}

                    {/* Short/full description for non-image types */}
                    {selectedItem.content[currentSlide].type !== "image" && (
                      <div className="mb-1 lg:mb-2">
                        <p
                          className={`text-white/70 text-[10px] sm:text-xs lg:text-sm leading-relaxed ${
                            !showDescription ? "line-clamp-2" : ""
                          }`}
                        >
                          {selectedItem.fullDescription ||
                            selectedItem.shortDescription}
                        </p>
                        {((
                          selectedItem.fullDescription ||
                          selectedItem.shortDescription
                        )?.length ?? 0) > 100 && (
                          <button
                            onClick={() => setShowDescription(!showDescription)}
                            className="text-blue-500 hover:text-blue-400 text-[10px] sm:text-xs font-semibold mt-1 flex items-center gap-1"
                          >
                            {showDescription ? "Read less" : "Read more"}
                            <ChevronDown
                              size={12}
                              className={`transition-transform ${showDescription ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                      </div>
                    )}

                    {/* Prev / Play / Next controls */}
                    {selectedItem.content.length > 1 && (
                      <div className="flex items-center justify-center gap-3 lg:gap-6">
                        <button
                          onClick={prevSlide}
                          className="p-2 lg:p-3 hover:bg-white/10 rounded-lg text-white transition-colors"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={togglePlayback}
                          className="p-3 lg:p-4 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors shadow-lg shadow-blue-600/50"
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
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    )}

                    {selectedItem.content[currentSlide].type === "image" &&
                      selectedItem.content.length > 1 && (
                        <p className="text-center text-[9px] sm:text-[10px] lg:text-xs text-white/50 mt-2.5 lg:mt-3">
                          {isPlaying
                            ? "Auto-playing • 1.5s per image"
                            : "Click play to auto-play"}
                        </p>
                      )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MINI PLAYER ───────────────────────────────────────────────────── */}
        <AnimatePresence>
          {floatingAudio && (
            <MiniPlayer
              floatingAudio={floatingAudio}
              corner={corner}
              dragPos={dragPos}
              audioRef={audioRef}
              setFloatingAudio={setFloatingAudio}
              onMouseDown={onMiniMouseDown}
              onTouchStart={onMiniTouchStart}
            />
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}

// ─── MarqueeTitle ─────────────────────────────────────────────────────────────
function MarqueeTitle({ text, color }: { text: string; color: string }) {
  return (
    <div
      style={{
        overflow: "hidden",
        WebkitMaskImage:
          "linear-gradient(to right, black 70%, transparent 100%)",
        maskImage: "linear-gradient(to right, black 70%, transparent 100%)",
        maxWidth: "100%",
      }}
    >
      <span
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          fontSize: "1.05rem",
          fontWeight: 700,
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
          color,
          animation: "marquee-title 8s ease-in-out infinite",
        }}
      >
        {text}
      </span>
    </div>
  );
}

// ─── MiniPlayer ───────────────────────────────────────────────────────────────
function MiniPlayer({
  floatingAudio,
  corner,
  dragPos,
  audioRef,
  setFloatingAudio,
  onMouseDown,
  onTouchStart,
}: {
  floatingAudio: FloatingAudioPlayer;
  corner: Corner;
  dragPos: { x: number; y: number } | null;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  setFloatingAudio: React.Dispatch<
    React.SetStateAction<FloatingAudioPlayer | null>
  >;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
}) {
  const [localPlaying, setLocalPlaying] = useState(false);
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    setLocalPlaying(!el.paused);
    const onPlay = () => setLocalPlaying(true);
    const onPause = () => setLocalPlaying(false);
    const onEnded = () => setLocalPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
    };
  }, [audioRef]);

  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark")),
    );
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => obs.disconnect();
  }, []);

  const bg = isDark ? "#1c1c1e" : "#ffffff";
  const border = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const titleClr = isDark ? "#ffffff" : "#0a0a0a";
  const btnBg = isDark ? "#3b82f6" : "#0a0a0a";
  const btnClr = "#ffffff";
  const xClr = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)";
  const xHover = isDark ? "#ffffff" : "#000000";

  const isDragging = dragPos !== null;
  const positionStyle: React.CSSProperties = isDragging
    ? { left: dragPos.x - 140, top: dragPos.y - 60 }
    : cornerStyle(corner);

  return (
    <motion.div
      layout={!isDragging}
      initial={{ opacity: 0, scale: 0.85, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 16 }}
      transition={
        isDragging
          ? { duration: 0 }
          : {
              layout: { type: "spring", stiffness: 600, damping: 30 },
              opacity: { duration: 0.15 },
              scale: { duration: 0.15 },
            }
      }
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{
        ...positionStyle,
        position: "fixed",
        zIndex: 99999,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: "1.3rem",
        padding: "1.25rem",
        width: "280px",
        boxShadow: isDragging
          ? isDark
            ? "0 32px 80px rgba(0,0,0,0.85)"
            : "0 32px 80px rgba(0,0,0,0.22)"
          : isDark
            ? "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)"
            : "0 20px 60px rgba(0,0,0,0.15)",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none" as const,
        overflow: "hidden",
        transform: isDragging ? "scale(1.04)" : "scale(1)",
        transition: isDragging
          ? "transform 0.1s ease, box-shadow 0.1s ease"
          : undefined,
      }}
    >
      <button
        style={{
          color: xClr,
          position: "absolute",
          top: "1rem",
          right: "1rem",
          zIndex: 10,
          transition: "color 0.15s",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = xHover)}
        onMouseLeave={(e) => (e.currentTarget.style.color = xClr)}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => {
          audioRef.current?.pause();
          setFloatingAudio(null);
        }}
      >
        <X size={20} strokeWidth={1.5} />
      </button>

      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-[80px] h-[80px] rounded-2xl overflow-hidden">
          <img
            src={floatingAudio.cover}
            alt={floatingAudio.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${localPlaying ? "scale-110" : "scale-100"}`}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            height: 80,
            minWidth: 0,
            pointerEvents: "none",
          }}
        >
          <div style={{ minWidth: 0, paddingTop: 2 }}>
            <MarqueeTitle text={floatingAudio.title} color={titleClr} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 3,
                opacity: 0.3,
              }}
            >
              {(["tl", "tr", "bl", "br"] as const).map((c) => (
                <div
                  key={c}
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background:
                      corner === c
                        ? isDark
                          ? "#fff"
                          : "#000"
                        : isDark
                          ? "rgba(255,255,255,0.5)"
                          : "rgba(0,0,0,0.3)",
                    transition: "background 0.2s",
                  }}
                />
              ))}
            </div>
            <button
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: btnBg,
                color: btnClr,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                flexShrink: 0,
                position: "relative",
                top: 14,
                right: -10,
                pointerEvents: "auto",
                boxShadow: isDark
                  ? "0 4px 16px rgba(59,130,246,0.4)"
                  : "0 4px 16px rgba(0,0,0,0.2)",
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onClick={(e) => {
                e.stopPropagation();
                const el = audioRef.current;
                if (!el) return;
                el.paused ? el.play() : el.pause();
              }}
            >
              {localPlaying ? (
                <Pause size={20} fill="currentColor" />
              ) : (
                <Play size={20} fill="currentColor" style={{ marginLeft: 2 }} />
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── AudioPlayer ──────────────────────────────────────────────────────────────
function AudioPlayer({
  src,
  title,
  caption,
  cover,
  selectedItem,
  audioRef,
  setFloatingAudio,
  startAudio,
}: {
  src: string;
  title: string;
  caption?: string;
  cover: string;
  selectedItem: HobbyItem;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  floatingAudio: FloatingAudioPlayer | null;
  setFloatingAudio: React.Dispatch<
    React.SetStateAction<FloatingAudioPlayer | null>
  >;
  startAudio: (src: string, title: string, cover: string) => void;
}) {
  const [localPlaying, setLocalPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    startAudio(src, title, cover);
  }, [src]); // eslint-disable-line

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    setLocalPlaying(!el.paused);
    setCurrentTime(el.currentTime);
    setDuration(el.duration || 0);
    const onPlay = () => setLocalPlaying(true);
    const onPause = () => setLocalPlaying(false);
    const onEnded = () => setLocalPlaying(false);
    const onTimeUpdate = () => setCurrentTime(el.currentTime);
    const onDurationChange = () => setDuration(el.duration || 0);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("durationchange", onDurationChange);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("durationchange", onDurationChange);
    };
  }, [audioRef]);

  const fmt = (s: number) => {
    if (!isFinite(s) || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60),
      sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };
  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    el.paused ? el.play().catch(() => {}) : el.pause();
  };

  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark")),
    );
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  const bg = isDark ? "#000000" : "#ffffff";
  const textPri = isDark ? "#ffffff" : "#0a0a0a";
  const textSec = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
  const divider = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const trackBg = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";

  return (
    <div
      className="w-full h-full flex flex-col lg:flex-row"
      style={{ background: bg }}
    >
      <div
        className="flex flex-col items-center justify-center p-4 lg:p-6 flex-shrink-0 lg:w-[45%] overflow-y-auto"
        style={{ borderRight: `1px solid ${divider}` }}
      >
        <div
          className="w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-3xl overflow-hidden mb-3 lg:mb-4 flex-shrink-0"
          style={{
            boxShadow: isDark
              ? "0 24px 60px rgba(0,0,0,0.8)"
              : "0 24px 60px rgba(0,0,0,0.15)",
          }}
        >
          <img
            src={cover}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-700 ${localPlaying ? "scale-110" : "scale-100"}`}
          />
        </div>
        <p
          className="font-bold text-xl lg:text-2xl tracking-tight mb-1 text-center"
          style={{ color: textPri }}
        >
          {title}
        </p>
        {caption && (
          <p className="text-sm mb-6 text-center" style={{ color: textSec }}>
            {caption}
          </p>
        )}
        <div className="w-full max-w-xs mb-6">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={(e) => {
              const el = audioRef.current;
              if (!el) return;
              el.currentTime = Number(e.target.value);
              setCurrentTime(Number(e.target.value));
            }}
            className="w-full cursor-pointer"
            style={{
              height: "4px",
              borderRadius: "2px",
              outline: "none",
              border: "none",
              appearance: "none",
              background: `linear-gradient(to right, #3b82f6 ${pct}%, ${trackBg} ${pct}%)`,
              accentColor: "#3b82f6",
            }}
          />
          <div className="flex justify-between mt-2">
            <span className="text-[11px] font-mono" style={{ color: textSec }}>
              {fmt(currentTime)}
            </span>
            <span className="text-[11px] font-mono" style={{ color: textSec }}>
              {fmt(duration)}
            </span>
          </div>
        </div>
        <button
          onClick={toggle}
          className="active:scale-95 transition-transform"
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#3b82f6",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(59,130,246,0.45)",
          }}
        >
          {localPlaying ? (
            <Pause size={28} fill="currentColor" />
          ) : (
            <Play size={28} fill="currentColor" style={{ marginLeft: 3 }} />
          )}
        </button>
        <p
          className="text-[10px] mt-6"
          style={{
            color: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.25)",
          }}
        >
          Audio keeps playing after you close this window
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-8 lg:p-12 flex flex-col justify-center">
        <div className="flex items-end gap-1 h-8 mb-6">
          {[0.1, 0.4, 0.2, 0.6, 0.3, 0.5, 0.15].map((delay, i) => (
            <div
              key={i}
              className="wave-bar"
              style={{
                animationDelay: `${delay}s`,
                animationPlayState: localPlaying ? "running" : "paused",
                background: "#3b82f6",
                opacity: 0.6,
              }}
            />
          ))}
        </div>
        <h1
          className="font-black uppercase tracking-tight leading-none mb-6"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: textPri }}
        >
          {title}
        </h1>
        <p
          className="text-sm lg:text-base leading-relaxed"
          style={{ color: textSec, maxWidth: "40ch" }}
        >
          {selectedItem?.fullDescription ||
            selectedItem?.shortDescription ||
            caption ||
            ""}
        </p>
      </div>
    </div>
  );
}

// ─── renderContent ────────────────────────────────────────────────────────────
function renderContent(
  content: any,
  selectedItem: HobbyItem,
  fontSize: number,
  darkMode: boolean,
  blueLightFilter: boolean,
  audioRef: React.MutableRefObject<HTMLAudioElement | null>,
  floatingAudio: FloatingAudioPlayer | null,
  setFloatingAudio: React.Dispatch<
    React.SetStateAction<FloatingAudioPlayer | null>
  >,
  startAudio: (src: string, title: string, cover: string) => void,
) {
  switch (content.type) {
    case "video":
      return (
        <video
          src={content.src}
          controls
          preload="metadata"
          playsInline
          className="w-full h-full object-contain"
        />
      );
    case "audio":
      return (
        <AudioPlayer
          src={content.src}
          title={selectedItem.title}
          caption={content.caption}
          cover={selectedItem.cover}
          selectedItem={selectedItem}
          audioRef={audioRef}
          floatingAudio={floatingAudio}
          setFloatingAudio={setFloatingAudio}
          startAudio={startAudio}
        />
      );
    case "pdf":
      return (
        <iframe
          src={content.src}
          className="w-full h-full rounded-none lg:rounded-lg bg-white"
          title={content.caption}
        />
      );
    case "blog": {
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
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          <article
            className="blog-content-wrapper max-w-3xl mx-auto"
            style={{ fontSize: `${fontSize}px`, lineHeight: "1.8" }}
          >
            {selectedItem.blogContent?.content ? (
              renderMarkdown(selectedItem.blogContent.content)
            ) : (
              <p className="text-base">Blog content not found.</p>
            )}
          </article>
        </div>
      );
    }
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

// ─── Markdown ─────────────────────────────────────────────────────────────────
function renderMarkdown(text: string) {
  return text.split("\n").map((line, idx) => {
    if (line.startsWith("# "))
      return (
        <h1
          key={idx}
          className="text-3xl lg:text-4xl font-black mb-4 mt-6 tracking-tight blog-title"
        >
          {line.slice(2)}
        </h1>
      );
    if (line.startsWith("## "))
      return (
        <h2
          key={idx}
          className="text-2xl lg:text-3xl font-black mb-3 mt-5 tracking-tight blog-title"
        >
          {line.slice(3)}
        </h2>
      );
    if (line.startsWith("### "))
      return (
        <h3
          key={idx}
          className="text-xl lg:text-2xl font-bold mb-2 mt-4 blog-title"
        >
          {line.slice(4)}
        </h3>
      );
    if (line.trim() === "---")
      return (
        <hr key={idx} className="my-6 border-gray-300 dark:border-gray-600" />
      );
    if (line.trim() === "") return <div key={idx} className="h-2" />;
    return (
      <p key={idx} className="mb-3 leading-relaxed blog-content">
        {formatInlineText(line)}
      </p>
    );
  });
}

function formatInlineText(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex =
    /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)|([^*[\]]+)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match[1]) parts.push(<strong key={match.index}>{match[1]}</strong>);
    else if (match[2]) parts.push(<em key={match.index}>{match[2]}</em>);
    else if (match[3] && match[4])
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
    else if (match[5]) parts.push(match[5]);
  }
  return parts.length > 0 ? parts : text;
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
