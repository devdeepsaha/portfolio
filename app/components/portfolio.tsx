"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "../css/portfolio.css";

type Work = {
  id: number;
  title: string;
  category: string;
  image?: string;
  images?: string[];
  year: string;
};

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeImageIndex, setActiveImageIndex] = useState<
    Record<number, number>
  >({});
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [fullscreenIndex, setFullscreenIndex] = useState<number>(0);

  const categories = [
    "all",
    "Posters",
    "Magazines & Books",
    "Logos",
    "Digital",
    "3d renders",
    "T-shirts",
  ];

  const works: Work[] = [
    {
      id: 1,
      title: "ARPEGGIO",
      category: "Posters",
      images: ["posters/Arpeggio1.png", "posters/Arpeggio2.png"],
      year: "2025",
    },
    {
      id: 2,
      title: "MACHINAGE",
      category: "Magazines & Books",
      images: ["Books/MP1.PNG", "Books/MP2.PNG"],
      year: "2025",
    },
    {
      id: 3,
      title: "PROXEC and ARPEGGIO",
      category: "Posters",
      image: "posters/DualPoster1.png",
      year: "2025",
    },
    {
      id: 4,
      title: "HOLI",
      category: "Posters",
      image: "posters/Holi.jpg",
      year: "2025",
    },
    {
      id: 5,
      title: "CAR",
      category: "3d renders",
      image: "3d/CAR1.mp4",
      year: "2024",
    },
    {
      id: 6,
      title: "Book Cover",
      category: "Magazines & Books",
      image: "Books/B1.jpg",
      year: "2024",
    },
    {
      id: 7,
      title: "Quote",
      category: "Digital",
      image: "Digital/BadDec.jpg",
      year: "2024",
    },
    {
      id: 8,
      title: "Healing ",
      category: "Digital",
      image: "Digital/Heal.jpg",
      year: "2025",
    },
    {
      id: 9,
      title: "Abacus Premiere League",
      category: "Digital",
      images: ["Digital/APL1.jpg", "Digital/APL2.png"],
      year: "2024",
    },
    {
      id: 10,
      title: "Points Table",
      category: "Digital",
      image: "Digital/point.jpg",
      year: "2024",
    },
    {
      id: 11,
      title: "AIEM",
      category: "Logos",
      images: ["Logos/A1.jpg", "Logos/A2.jpg", "Logos/A3.jpg"],
      year: "2025",
    },
    {
      id: 12,
      title: "Team Logos",
      category: "Logos",
      images: [
        "Logos/Apollo 11.png",
        "Logos/BLACK KNIGHT.png",
        "Logos/ruling rangers.png",
      ],
      year: "2025",
    },
    {
      id: 13,
      title: "ARPEGGIO",
      category: "Logos",
      image: "Logos/ARPEGGIO.jpg",
      year: "2025",
    },
    {
      id: 14,
      title: "NOTEMATION",
      category: "Logos",
      images: ["Logos/N2.mp4", "Logos/N1.png"],
      year: "2024",
    },
    {
      id: 15,
      title: "LONG POSTER",
      category: "Posters",
      image: "posters/Arpeggio3.jpg",
      year: "2025",
    },
    {
      id: 16,
      title: "T-SHIRT",
      category: "T-shirts",
      image: "Tshirts/F1.jpg",
      year: "2025",
    },
    {
      id: 17,
      title: "T-SHIRT",
      category: "T-shirts",
      image: "Tshirts/F2.jpg",
      year: "2025",
    },
    {
      id: 18,
      title: "T-SHIRT",
      category: "T-shirts",
      image: "Tshirts/back.jpg",
      year: "2025",
    },
    {
      id: 19,
      title: "BOOK",
      category: "3d renders",
      images: ["3d/book.jpg", "3d/BookCloseup.jpg", "3d/booktopview.jpg"],
      year: "2024",
    },
    {
      id: 20,
      title: "BOTTLE",
      category: "3d renders",
      image: "3d/bottle1.png",
      year: "2024",
    },
    {
      id: 21,
      title: "Christmas",
      category: "3d renders",
      images: [
        "3d/CloseupChristmasTree.jpg",
        "3d/ColourfulLights.jpg",
        "3d/gift.jpg",
        "3d/snow tree.jpg",
      ],
      year: "2024",
    },
    {
      id: 22,
      title: "Vending Machine",
      category: "3d renders",
      images: ["3d/CloseupSnowVending.png", "3d/Ice.png", "3d/snowlamp.png"],
      year: "2024",
    },
    {
      id: 23,
      title: "Cube",
      category: "3d renders",
      images: [
        "3d/CUBE4.mp4",
        "3d/CUBE1.mp4",
        "3d/CUBE3.mp4",
        "3d/CUBE5.mp4",
        "3d/CUBE6.jpg",
      ],
      year: "2024",
    },
    {
      id: 24,
      title: "DICE",
      category: "3d renders",
      image: "3d/DICE.mp4",
      year: "2024",
    },
    {
      id: 25,
      title: "DONUT",
      category: "3d renders",
      image: "3d/donut.png",
      year: "2024",
    },
    {
      id: 26,
      title: "GLASS",
      category: "3d renders",
      images: ["3d/dream catcher 2.png", "3d/glass.png"],
      year: "2024",
    },
    {
      id: 27,
      title: "GUN",
      category: "3d renders",
      image: "3d/gun.mp4",
      year: "2024",
    },
    {
      id: 28,
      title: "LAMP",
      category: "3d renders",
      image: "3d/Lamp.mp4",
      year: "2024",
    },
    {
      id: 29,
      title: "NUMBERS",
      category: "3d renders",
      images: ["3d/NUM1.mp4", "3d/NUM2.mp4"],
      year: "2024",
    },
    {
      id: 30,
      title: "OBJECTS IN A ROOM",
      category: "3d renders",
      images: ["3d/photoframe.jpg", "3d/plant.jpg", "3d/plant close.jpg"],
      year: "2024",
    },
    {
      id: 31,
      title: "POKEBALL",
      category: "3d renders",
      images: ["3d/POKE.png", "3d/ROLLPOKE.png", "3d/ROLLPOKE2.png"],
      year: "2024",
    },
    {
      id: 32,
      title: "WATER",
      category: "3d renders",
      image: "3d/WATER.mp4",
      year: "2024",
    },
    {
      id: 33,
      title: "WINDOW",
      category: "3d renders",
      images: [
        "3d/W1.png",
        "3d/W2.png",
        "3d/W3.png",
        "3d/W4.png",
        "3d/W5.png",
        "3d/W6.png",
        "3d/W7.png",
      ],
      year: "2024",
    },
  ];

  const filteredWorks = works.filter((work) =>
    selectedCategory === "all"
      ? true
      : work.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  const isVideo = (src: string) => src.endsWith(".mp4") || src.includes(".mp4");

  const openFullscreen = (work: Work) => {
    const index = activeImageIndex[work.id] || 0;
    setFullscreenIndex(index);
    setSelectedWork(work);
  };

  const changeFullscreenImage = (direction: "next" | "prev") => {
    if (!selectedWork || !selectedWork.images) return;
    const total = selectedWork.images.length;
    setFullscreenIndex((prev) =>
      direction === "next" ? (prev + 1) % total : (prev - 1 + total) % total
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedWork || !selectedWork.images) return;
      if (e.key === "ArrowRight") changeFullscreenImage("next");
      else if (e.key === "ArrowLeft") changeFullscreenImage("prev");
      else if (e.key === "Escape") setSelectedWork(null);
    };

    if (selectedWork) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedWork]);

  return (
    <section className="portfolioSection">
      <div className="container">
        <div className="buttonGroup">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`button ${
                selectedCategory === category ? "active" : ""
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <motion.div layout className="grid">
          <AnimatePresence>
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="card">
                  <CardContent className="cardContent">
                    <div
                      className="cardImageWrapper"
                      onClick={() => openFullscreen(work)}
                    >
                      {work.images ? (
                        <>
                          {isVideo(
                            work.images[activeImageIndex[work.id] || 0]
                          ) ? (
                            <video
                              src={work.images[activeImageIndex[work.id] || 0]}
                              className="cardImage"
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          ) : (
                            <img
                              src={work.images[activeImageIndex[work.id] || 0]}
                              alt={work.title}
                              className="cardImage"
                            />
                          )}
                          <button
                            className="arrow left"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageIndex((prev) => ({
                                ...prev,
                                [work.id]:
                                  (prev[work.id] ?? 0) === 0
                                    ? work.images!.length - 1
                                    : (prev[work.id] ?? 0) - 1,
                              }));
                            }}
                          >
                            ‹
                          </button>
                          <button
                            className="arrow right"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageIndex((prev) => ({
                                ...prev,
                                [work.id]:
                                  (prev[work.id] ?? 0) ===
                                  work.images!.length - 1
                                    ? 0
                                    : (prev[work.id] ?? 0) + 1,
                              }));
                            }}
                          >
                            ›
                          </button>
                        </>
                      ) : isVideo(work.image || "") ? (
                        <video
                          src={work.image}
                          className="cardImage"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          src={work.image || "/placeholder.svg"}
                          alt={work.title}
                          className="cardImage"
                        />
                      )}
                      <div className="overlay">
                        <h3 className="cardTitle">{work.title}</h3>
                        <p className="cardYear">{work.year}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen View */}
      {selectedWork && (
        <div
          className="fullscreen-overlay"
          onClick={() => setSelectedWork(null)}
        >
          <div
            className="fullscreen-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setSelectedWork(null)}
            >
              ✕
            </button>
            {selectedWork.images ? (
              <>
                {isVideo(selectedWork.images[fullscreenIndex]) ? (
                  <video
                    src={selectedWork.images[fullscreenIndex]}
                    className="fullscreen-image"
                    controls
                    autoPlay
                    loop
                  />
                ) : (
                  <Zoom>
                    <img
                      src={selectedWork.images[fullscreenIndex]}
                      alt={selectedWork.title}
                      className="fullscreen-image"
                    />
                  </Zoom>
                )}
                <button
                  className="arrow left"
                  onClick={() => changeFullscreenImage("prev")}
                >
                  ‹
                </button>
                <button
                  className="arrow right"
                  onClick={() => changeFullscreenImage("next")}
                >
                  ›
                </button>
              </>
            ) : isVideo(selectedWork.image || "") ? (
              <video
                src={selectedWork.image}
                className="fullscreen-image"
                controls
                autoPlay
                loop
              />
            ) : (
              <Zoom>
                <img
                  src={selectedWork.image || "/placeholder.svg"}
                  alt={selectedWork.title}
                  className="fullscreen-image"
                />
              </Zoom>
            )}
            <div className="fullscreen-caption">
              <h2>{selectedWork.title}</h2>
              <p>{selectedWork.year}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
