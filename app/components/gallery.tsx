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
  width?: string;
  height?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  position?: string;
};

const isVideoFile = (file: string) =>
  file.endsWith(".mp4") || file.endsWith(".webm") || file.endsWith(".mov");

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [activeIndexes, setActiveIndexes] = useState<Record<number, number>>(
    {}
  );
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});
  const [selectedItem, setSelectedItem] = useState<{
    item: GalleryItem;
    index: number;
    imageIndex: number;
  } | null>(null);

  const images: GalleryItem[] = [
    {
      images: ["Books/MP1.PNG", "Books/MP2.PNG"],
      alt: "Magazine",
      title: "MACHINAGE",
      width: "auto",
      height: "100%",
      objectFit: "contain",
      position: "center",
    },
    {
      images: ["Tshirts/F1.jpg", "Tshirts/F2.jpg"],
      alt: "T-shirt Design",
      title: "T-SHIRT DESIGN",
      width: "auto",
      height: "402px",
      objectFit: "cover",
      position: "center",
    },
    {
      src: "3d/Lamp.mp4",
      alt: "LAMP",
      title: "3D LAMP",
      width: "100%",
      height: "402px",
      objectFit: "cover",
      position: "50% 50%",
    }, 
    {
      images: ["3d/gun.mp4"],
      alt: "Gun",
      title: "PRODUCT ANIMATION",
      width: "100%",
      height: "402px",
      objectFit: "cover",
      position: "center",
    },
  ];

  const handlePrev = (i: number) => {
    setImageLoaded((prev) => ({ ...prev, [i]: false }));
    setActiveIndexes((prev) => {
      const total = images[i].images?.length || 1;
      const current = prev[i] || 0;
      return { ...prev, [i]: (current - 1 + total) % total };
    });
  };

  const handleNext = (i: number) => {
    setImageLoaded((prev) => ({ ...prev, [i]: false }));
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

  useEffect(() => {
    if (selectedItem) return;

    const interval = setInterval(() => {
      images.forEach((img, i) => {
        if (img.images && img.images.length > 1) {
          setImageLoaded((prev) => ({ ...prev, [i]: false }));
          setActiveIndexes((prev) => {
            const total = img.images!.length;
            const current = prev[i] || 0;
            return { ...prev, [i]: (current + 1) % total };
          });
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedItem]);

  // Preload images
  useEffect(() => {
    images.forEach((img) => {
      img.images?.forEach((src) => {
        const preload = new Image();
        preload.src = src;
      });
    });
  }, []);

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
              const currentMedia = img.images
                ? img.images[activeIndex]
                : img.src;
              const isVideo = currentMedia && isVideoFile(currentMedia);

              return (
                <motion.div
                  key={i}
                  className="gallery-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
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
                    {isVideo ? (
                      <motion.video
                        key={currentMedia}
                        src={currentMedia}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                          width: img.width || "100%",
                          height: img.height || "auto",
                          objectFit: img.objectFit || "cover",
                          objectPosition: img.position || "center",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    ) : (
                      <motion.img
                        key={currentMedia}
                        src={currentMedia}
                        alt={img.alt}
                        onLoad={() =>
                          setImageLoaded((prev) => ({ ...prev, [i]: true }))
                        }
                        initial={{ opacity: 0 }}
                        animate={{ opacity: imageLoaded[i] ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          width: img.width || "100%",
                          height: img.height || "auto",
                          objectFit: img.objectFit || "cover",
                          objectPosition: img.position || "center",
                        }}
                      />
                    )}
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
            {(() => {
              const media =
                selectedItem.item.images?.[selectedItem.imageIndex] ??
                selectedItem.item.src ??
                "/placeholder.svg";
              const isVideo = isVideoFile(media);

              return isVideo ? (
                <video
                  src={media}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="fullscreen-image"
                  style={{
                    objectFit: selectedItem.item.objectFit || "contain",
                    objectPosition: selectedItem.item.position || "center",
                    width: selectedItem.item.width || "80%",
                    height: selectedItem.item.height || "auto",
                    maxHeight: "90vh",
                  }}
                />
              ) : (
                <img
                  src={media}
                  alt={selectedItem.item.alt}
                  className="fullscreen-image"
                  style={{
                    objectFit: selectedItem.item.objectFit || "contain",
                    objectPosition: selectedItem.item.position || "center",
                    width: selectedItem.item.width || "80%",
                    height: selectedItem.item.height || "auto",
                    maxHeight: "90vh",
                  }}
                />
              );
            })()}
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
                                (prev.imageIndex -
                                  1 +
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
