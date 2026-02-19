import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ExternalLink,
  Github,
  Monitor,
  Box,
  FileText,
  Image as ImageIcon,
  Layers,
  FileUp,
  Maximize2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Sparkles, 
} from "lucide-react";
import { Portal } from "./ui/portal";
import { myProjects, Category, Project, heroSlides, devChoiceIds } from "../ts/projects";

// --- SWIPER IMPORTS ---
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import {
  Navigation,
  Pagination,
  A11y,
  EffectCreative,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

const swiperStyles = `
  .inline-gallery .swiper-pagination-bullets { bottom: 20px !important; }
  .fullscreen-gallery .swiper-pagination-bullets { bottom: 100px !important; }
  .swiper-pagination-bullet { background: white; opacity: 0.4; width: 8px; height: 8px; border-radius: 999px; transition: all 0.4s ease; }
  .swiper-pagination-bullet-active { background: #d8ffc7; opacity: 1; width: 32px; border-radius: 999px; }
  .inline-gallery .swiper-button-next, .inline-gallery .swiper-button-prev { display: none !important; }
`;

const categories: Category[] = ["Dev Picks", "All", "Web", "3D", "Graphics"];

const isVideo = (url: string) => url.match(/\.(mp4|webm|ogg)$/i);

const MediaDisplay = ({
  src,
  className,
  isActive,
}: {
  src: string;
  className?: string;
  isActive: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isActive) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      videoRef.current.pause();
    }
  }, [isActive]);

  if (isVideo(src)) {
    return (
      <video
        ref={videoRef}
        src={src}
        className={className}
        muted
        loop
        playsInline
        controls={false}
      />
    );
  }
  return <img src={src} alt="Project Media" className={className} />;
};

const getCategoryIcon = (cat: Category) => {
  switch (cat) {
    case "Dev Picks":
      return <Sparkles size={14} />;
    case "Web":
      return <Monitor size={14} />;
    case "3D":
      return <Box size={14} />;
    case "Graphics":
      return <ImageIcon size={14} />;
    default:
      return <Layers size={14} />;
  }
};

export function CompactProjectsTile() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("Dev Picks"); // Changed default to Dev Picks

  const [currentSlide, setCurrentSlide] = useState(0);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const [inlineIndex, setInlineIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const fullscreenSwiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? myProjects
      : activeCategory === "Dev Picks"
      ? myProjects.filter((p) => devChoiceIds.includes(p.id))
      : myProjects.filter((p) => p.category === activeCategory);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fullscreenSwiperRef.current && fullscreenSwiperRef.current.swiper) {
      if (isPlaying) {
        fullscreenSwiperRef.current.swiper.autoplay.stop();
      } else {
        fullscreenSwiperRef.current.swiper.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setInlineIndex(0);
  };

  return (
    <>
      <style>{swiperStyles}</style>

      {/* --- TILE FACE --- */}
      <motion.div
        className="h-full w-full min-h-[300px] md:min-h-[500px] relative rounded-[2rem] overflow-hidden cursor-pointer group"
        whileHover={{ scale: 1.01 }}
        onClick={() => setIsOpen(true)}
      >
        <AnimatePresence mode="wait">
          {heroSlides.length > 0 && (
            <motion.img
              key={currentSlide}
              src={heroSlides[currentSlide]}
              alt="Featured Work"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
          <div className="flex justify-between items-start">
            <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-white">
                Featured Works
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2 leading-[0.9]">
              Selected
              <br />
              Projects
            </h3>
          </div>
        </div>
      </motion.div>

      {/* --- MAIN MODAL --- */}
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-background/90 backdrop-blur-xl z-[9999] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOpen(false);
                setSelectedProject(null);
              }}
            >
              <motion.div
                className="bg-card border border-border text-card-foreground rounded-[2.5rem] p-6 sm:p-10 max-w-7xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden relative"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedProject(null);
                  }}
                  className="absolute top-6 right-6 p-3 bg-secondary hover:bg-secondary/80 rounded-full text-foreground transition-colors z-50"
                >
                  <X size={24} />
                </button>

                {!selectedProject ? (
                  /* --- GRID VIEW --- */
                  <div className="flex flex-col h-full">
                    <div className="mb-8 shrink-0">
                      <h2 className="text-4xl sm:text-6xl font-black text-foreground tracking-tighter uppercase mb-6 pr-12">
                        Work <span className="text-green">Gallery</span>
                      </h2>
                      {/* --- FIXED: Category Navigation for Mobile --- */}
                      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all flex items-center gap-2 shrink-0
                                    ${
                                      activeCategory === cat
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-secondary text-muted-foreground border-transparent hover:border-border hover:text-foreground"
                                    }`}
                          >
                            {getCategoryIcon(cat)} {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="overflow-y-auto pr-2 pb-4 no-scrollbar">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProjects.map((project) => (
                          <motion.div
                            layout
                            key={project.id}
                            onClick={() => openProject(project)}
                            className="group cursor-pointer bg-secondary/20 rounded-[2rem] p-3 border border-border hover:border-primary/50 transition-colors"
                          >
                            <div className="aspect-video rounded-[1.5rem] overflow-hidden mb-4 relative">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-all duration-500"
                              />
                            </div>
                            <h3 className="px-2 text-2xl font-black text-foreground uppercase">
                              {project.title}
                            </h3>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* --- DETAIL VIEW --- */
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col h-full overflow-y-auto no-scrollbar pt-8"
                  >
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="mb-8 text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors shrink-0"
                    >
                      ← Back to Gallery
                    </button>

                    <div className="grid lg:grid-cols-2 gap-12 pb-12">
                      {/* --- INLINE GALLERY --- */}
                      <div className="rounded-[2.5rem] overflow-hidden border border-border aspect-square relative bg-secondary shadow-xl group/gallery">
                        <Swiper
                          modules={[
                            Pagination,
                            A11y,
                            EffectCreative,
                            Autoplay,
                          ]}
                          spaceBetween={0}
                          slidesPerView={1}
                          loop={true}
                          autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                          }}
                          pagination={{ clickable: true }}
                          effect="creative"
                          creativeEffect={{
                            prev: { shadow: true, translate: [0, 0, -400] },
                            next: { translate: ["100%", 0, 0] },
                          }}
                          onSlideChange={(swiper) =>
                            setInlineIndex(swiper.realIndex)
                          }
                          className="w-full h-full inline-gallery"
                        >
                          {(selectedProject.gallery
                            ? selectedProject.gallery
                            : [selectedProject.image]
                          ).map((src, idx) => (
                            <SwiperSlide
                              key={idx}
                              className="w-full h-full bg-black"
                            >
                              <div
                                className="w-full h-full cursor-zoom-in"
                                onClick={() => {
                                  setIsLightboxOpen(true);
                                  setLightboxIndex(idx);
                                }}
                              >
                                <MediaDisplay
                                  src={src}
                                  className="w-full h-full object-cover"
                                  isActive={idx === inlineIndex}
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white pointer-events-none z-10 opacity-0 group-hover/gallery:opacity-100 transition-opacity">
                          <Maximize2 size={20} />
                        </div>
                      </div>

                      {/* --- INFO --- */}
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6">
                          <span className="px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            {getCategoryIcon(selectedProject.category)}{" "}
                            {selectedProject.category}
                          </span>
                        </div>

                        <h2 className="text-5xl sm:text-7xl font-black text-foreground mb-8 leading-[0.9] uppercase tracking-tighter">
                          {selectedProject.title}
                        </h2>

                        <p className="text-muted-foreground text-xl mb-6 leading-relaxed font-medium whitespace-pre-line">
                          {selectedProject.description}
                        </p>

                        {/* TECH STACK */}
                        {selectedProject.tech && (
                          <div className="flex flex-wrap gap-2 mb-10">
                            {selectedProject.tech.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-xs font-bold uppercase tracking-widest text-muted-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-4 mt-auto">
                          {selectedProject.link && (
                            <a
                              href={selectedProject.link}
                              target="_blank"
                              className="flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-black text-sm uppercase tracking-widest border border-transparent hover:bg-background hover:text-foreground hover:border-foreground transition-all duration-300"
                            >
                              <ExternalLink size={18} /> View Live
                            </a>
                          )}
                          {selectedProject.pdf && (
                            <a
                              href={selectedProject.pdf}
                              target="_blank"
                              className="flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-all duration-300"
                            >
                              <FileUp size={18} /> Read Case Study
                            </a>
                          )}
                          {selectedProject.github && (
                            <a
                              href={selectedProject.github}
                              target="_blank"
                              className="flex items-center gap-2 px-8 py-4 border border-border text-foreground rounded-full font-black text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300"
                            >
                              <Github size={18} /> Source Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>

      {/* --- FULLSCREEN PRO LIGHTBOX --- */}
      <Portal>
        <AnimatePresence>
          {isLightboxOpen && selectedProject && (
            <motion.div
              className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-3xl flex flex-col justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-full p-6 flex justify-between items-center z-50 pointer-events-none h-[80px]">
                <div className="pointer-events-auto">
                  <h2 className="text-white text-xl md:text-2xl font-black uppercase tracking-tighter">
                    {selectedProject.title}
                  </h2>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-widest">
                    {selectedProject.gallery
                      ? selectedProject.gallery.length
                      : 1}{" "}
                    Media Assets
                  </p>
                </div>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="pointer-events-auto p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center">
                <Swiper
                  ref={fullscreenSwiperRef}
                  modules={[Navigation, Pagination, A11y, Autoplay]}
                  spaceBetween={40}
                  slidesPerView={1}
                  loop={true}
                  initialSlide={lightboxIndex}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  onSlideChange={(swiper) => setLightboxIndex(swiper.realIndex)}
                  className="w-full h-full fullscreen-gallery"
                >
                  {(selectedProject.gallery
                    ? selectedProject.gallery
                    : [selectedProject.image]
                  ).map((src, idx) => (
                    <SwiperSlide
                      key={idx}
                      className="!flex !items-center !justify-center w-full h-full p-4 md:p-8"
                    >
                      <MediaDisplay
                        src={src}
                        className="max-w-full max-h-full object-contain shadow-2xl rounded-md mx-auto"
                        isActive={idx === lightboxIndex}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="h-[100px] w-full flex items-center justify-center z-50 pb-8 shrink-0">
                <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/10 p-3 rounded-full shadow-2xl">
                  <button
                    onClick={() =>
                      fullscreenSwiperRef.current?.swiper.slidePrev()
                    }
                    className="p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                  >
                    <SkipBack size={20} fill="currentColor" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className={`p-4 rounded-full transition-all flex items-center gap-2 font-bold uppercase tracking-widest text-xs
                                ${
                                  isPlaying
                                    ? "bg-[#d8ffc7] text-black hover:bg-[#c5eeb2]"
                                    : "bg-white text-black hover:bg-gray-200"
                                }`}
                  >
                    {isPlaying ? (
                      <Pause size={18} fill="currentColor" />
                    ) : (
                      <Play size={18} fill="currentColor" />
                    )}
                    <span className="hidden sm:block">
                      {isPlaying ? "Auto" : "Play"}
                    </span>
                  </button>

                  <button
                    onClick={() =>
                      fullscreenSwiperRef.current?.swiper.slideNext()
                    }
                    className="p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                  >
                    <SkipForward size={20} fill="currentColor" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}