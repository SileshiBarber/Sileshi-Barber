import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { src: "/images/1.jpg",  label: "Low skin fade with beard line-up" },
  { src: "/images/2.jpg",  label: "Curly top with sharp skin fade" },
  { src: "/images/3.jpg",  label: "Zero fade with line-up" },
  { src: "/images/4.jpg",  label: "Buzz cut with angled beard detail" },
  { src: "/images/5.jpg",  label: "Afro taper with full beard" },
  { src: "/images/6.jpg",  label: "Textured crop with mid fade" },
  { src: "/images/7.jpg",  label: "Classic comb-over with low fade" },
  { src: "/images/8.jpg",  label: "Curly top with zero fade" },
  { src: "/images/9.jpg",  label: "Messy textured top with skin fade" },
  { src: "/images/10.jpg", label: "High-top fade with sharp line" },
];

export function Gallery() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const go = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent((index + images.length) % images.length);
  }, []);

  const prev = () => go(current - 1, -1);
  const next = useCallback(() => go(current + 1, 1), [current, go]);

  // Auto-play
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, next]);

  // Touch / swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section id="gallery" className="py-24 bg-[#1F2833]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="block text-[#C5A059] tracking-widest text-xs uppercase mb-2 font-semibold">
            Our Craft Visualized
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Fresh Fades &amp; Elite Precision
          </h2>
        </motion.div>

        {/* Slideshow */}
        <div
          className="relative max-w-3xl mx-auto select-none"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Image frame */}
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-[#0B0C10]"
            style={{ paddingTop: "75%" }}
          >
            <AnimatePresence custom={direction} initial={false}>
              <motion.img
                key={current}
                src={images[current].src}
                alt={images[current].label}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            </AnimatePresence>

            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B0C10]/80 to-transparent px-6 py-5 pointer-events-none">
              <p className="text-[#C5A059] text-xs font-bold uppercase tracking-widest">
                {images[current].label}
              </p>
            </div>

            {/* Prev arrow */}
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#0B0C10]/70 hover:bg-[#0B0C10]/90 backdrop-blur-sm border border-white/10 text-white rounded-full p-2.5 transition-all hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next arrow */}
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0B0C10]/70 hover:bg-[#0B0C10]/90 backdrop-blur-sm border border-white/10 text-white rounded-full p-2.5 transition-all hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > current ? 1 : -1)}
                aria-label={`Go to photo ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-[#C5A059] w-6 h-2"
                    : "bg-white/20 hover:bg-white/40 w-2 h-2"
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <p className="text-center text-[#C5C6C7]/40 text-xs mt-3 tracking-widest">
            {current + 1} / {images.length}
          </p>
        </div>
      </div>

      {/* Gold divider into Services */}
      <div className="mt-16 mx-auto max-w-3xl px-4 md:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent" />
      </div>
    </section>
  );
}
