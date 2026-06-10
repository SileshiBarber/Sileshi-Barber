import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () =>
    setLightbox((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const next = () =>
    setLightbox((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <>
      <section id="gallery" className="py-24 bg-[#1F2833]">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="block text-[#C5A059] tracking-widest text-xs uppercase mb-2 font-semibold">
              Our Craft Visualized
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Fresh Fades &amp; Elite Precision
            </h2>
          </motion.div>

          {/* Grid — 2 cols mobile, 3 tablet, 4 desktop, 5 xl */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto"
          >
            {images.map((img, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                onClick={() => setLightbox(i)}
                data-testid={`card-gallery-${i}`}
                className="overflow-hidden rounded-xl border border-white/5 aspect-square relative group cursor-pointer"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gold tint on hover */}
                <div className="absolute inset-0 bg-[#C5A059]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Zoom icon overlay */}
                <div className="absolute inset-0 flex flex-col items-end justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-[#0B0C10]/70 backdrop-blur-sm rounded-lg p-1.5">
                    <ZoomIn className="w-4 h-4 text-[#C5A059]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 bg-[#0B0C10]/95 backdrop-blur-md z-[70] flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
            data-testid="modal-lightbox"
          >
            <motion.div
              key={`lightbox-${lightbox}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-w-2xl w-full cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setLightbox(null)}
                data-testid="button-lightbox-close"
                className="absolute -top-4 -right-4 z-10 bg-[#1F2833] border border-white/10 text-white/50 hover:text-white rounded-full p-2 transition-colors shadow-xl"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={images[lightbox].src}
                alt={images[lightbox].label}
                className="w-full rounded-2xl border border-white/10 shadow-2xl object-cover max-h-[78vh]"
              />

              {/* Caption + nav */}
              <div className="mt-3 flex items-center justify-between px-1">
                <button
                  onClick={prev}
                  className="text-[#C5C6C7] hover:text-[#C5A059] transition-colors text-sm font-semibold px-3 py-1 rounded-md hover:bg-white/5"
                  aria-label="Previous photo"
                >
                  ← Prev
                </button>
                <div className="text-center">
                  <p className="text-[#C5A059] text-xs font-bold uppercase tracking-widest">
                    {images[lightbox].label}
                  </p>
                  <p className="text-white/30 text-xs mt-0.5">
                    {lightbox + 1} / {images.length}
                  </p>
                </div>
                <button
                  onClick={next}
                  className="text-[#C5C6C7] hover:text-[#C5A059] transition-colors text-sm font-semibold px-3 py-1 rounded-md hover:bg-white/5"
                  aria-label="Next photo"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
