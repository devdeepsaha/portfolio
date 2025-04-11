"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import "../css/gallery.css";

type GalleryItem = {
  images?: string[];
  src?: string;
  alt: string;
  title: string;
};

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [activeIndexes, setActiveIndexes] = useState<Record<number, number>>({});
  const [selectedItem, setSelectedItem] = useState<{
    item: GalleryItem;
    index: number;
    imageIndex: number;
  } | null>(null);

  const images: GalleryItem[] = [
    { images: ["/cube.png", "/cube-alt.png"], alt: "Art piece 1", title: "Ethereal Dreams" },
    { src: "/broken.png", alt: "Art piece 2", title: "Urban Symphony" },
    { images: ["/window.png", "/windowframe2.png"], alt: "Art piece 3", title: "Digital Nostalgia" },
    { src: "/cube.png", alt: "Art piece 4", title: "Abstract Reality" },
  ];

  const handlePrev = (i: number) => {
    setActiveIndexes((prev) => {
      const total = images[i].images?.length || 1;
      const current = prev[i] || 0;
      return { ...prev, [i]: (current - 1 + total) % total };
    });
  };

  const handleNext = (i: number) => {
    setActiveIndexes((prev) => {
      const total = images[i].images?.length || 1;
      const current = prev[i] || 0;
      return { ...prev, [i]: (current + 1) % total };
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem?.item.images) return;
      if (e.key === "ArrowRight") handleNext(selectedItem.index);
      else if (e.key === "ArrowLeft") handlePrev(selectedItem.index);
      else if (e.key === "Escape") setSelectedItem(null);
    };

    if (selectedItem) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  // Autoplay carousel (but NOT in fullscreen)
  useEffect(() => {
    if (selectedItem) return; // Don't autoplay in fullscreen

    const interval = setInterval(() => {
      images.forEach((img, i) => {
        if (img.images && img.images.length > 1) {
          setActiveIndexes((prev) => {
            const total = img.images!.length;
            const current = prev[i] || 0;
            return { ...prev, [i]: (current + 1) % total };
          });
        }
      });
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, [selectedItem]);

  return (
    <>
      <section className="gallery">
        <div ref={ref} className="container">
          <motion.h2
            className="gallery-title"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            Featured Works
          </motion.h2>

          <div className="gallery-grid">
            {images.map((img, i) => {
              const activeIndex = activeIndexes[i] || 0;
              const currentImage = img.images ? img.images[activeIndex] : img.src;

              return (
                <motion.div
                  key={i}
                  className="gallery-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  onClick={() =>
                    setSelectedItem({
                      item: img,
                      index: i,
                      imageIndex: activeIndex,
                    })
                  }
                >
                  <div className="gallery-image">
                    <motion.img
                      key={currentImage}
                      src={currentImage}
                      alt={img.alt}
                      initial={{ x: 250, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                    {img.images && img.images.length > 1 && (
                      <>
                        <button
                          className="arrow left"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrev(i);
                          }}
                        >
                          ‹
                        </button>
                        <button
                          className="arrow right"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNext(i);
                          }}
                        >
                          ›
                        </button>
                      </>
                    )}
                  </div>
                  <div className="gallery-overlay">
                    <h3>{img.title}</h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fullscreen Overlay */}
      {selectedItem && (
        <div
          className="fullscreen-overlay"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="fullscreen-image-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setSelectedItem(null)}
            >
              ✖
            </button>
            <img
              src={
                selectedItem.item.images
                  ? selectedItem.item.images[selectedItem.imageIndex]
                  : selectedItem.item.src || "/placeholder.svg"
              }
              alt={selectedItem.item.alt}
              className="fullscreen-image"
            />
            {selectedItem.item.images &&
              selectedItem.item.images.length > 1 && (
                <>
                  <button
                    className="arrow left"
                    onClick={() => {
                      handlePrev(selectedItem.index);
                      setSelectedItem((prev) =>
                        prev
                          ? {
                              ...prev,
                              imageIndex:
                                (prev.imageIndex - 1 +
                                  selectedItem.item.images!.length) %
                                selectedItem.item.images!.length,
                            }
                          : null
                      );
                    }}
                  >
                    ‹
                  </button>
                  <button
                    className="arrow right"
                    onClick={() => {
                      handleNext(selectedItem.index);
                      setSelectedItem((prev) =>
                        prev
                          ? {
                              ...prev,
                              imageIndex:
                                (prev.imageIndex + 1) %
                                selectedItem.item.images!.length,
                            }
                          : null
                      );
                    }}
                  >
                    ›
                  </button>
                </>
              )}
            <h3 className="fullscreen-title">{selectedItem.item.title}</h3>
          </div>
        </div>
      )}
    </>
  );
}
