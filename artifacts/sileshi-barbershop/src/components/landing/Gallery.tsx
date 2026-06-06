import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80",
    label: "Skin Fade Close-up",
  },
  {
    src: "https://images.unsplash.com/photo-1512864084360-7c0c4d0a0845?auto=format&fit=crop&w=600&q=80",
    label: "Classic Scissors Work",
  },
  {
    src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80",
    label: "Beard Detailing & Line-Up",
  },
  {
    src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=600&q=80",
    label: "Shop Atmosphere",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);

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

          {/* Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
          >
            {images.map((img, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                onClick={() => openLightbox(i)}
                data-testid={`card-gallery-${i}`}
                className="overflow-hidden rounded-xl border border-white/5 aspect-square relative group cursor-pointer shadow-lg"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gold tint overlay */}
                <div className="absolute inset-0 bg-[#C5A059]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Zoom icon + label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
                  <div className="bg-[#0B0C10]/60 backdrop-blur-sm rounded-full p-3">
                    <ZoomIn className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <span className="text-white text-xs font-semibold px-3 py-1 bg-[#0B0C10]/60 backdrop-blur-sm rounded-full">
                    {img.label}
                  </span>
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#0B0C10]/95 backdrop-blur-md z-[70] flex items-center justify-center p-4 cursor-pointer"
            onClick={closeLightbox}
            data-testid="modal-lightbox"
          >
            <motion.div
              key="lightbox-image"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-3xl w-full cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                data-testid="button-lightbox-close"
                className="absolute -top-4 -right-4 z-10 bg-[#1F2833] border border-white/10 text-white/60 hover:text-white rounded-full p-2 transition-colors shadow-xl"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={images[lightbox].src.replace("w=600", "w=1200")}
                alt={images[lightbox].label}
                className="w-full rounded-2xl border border-white/10 shadow-2xl object-cover max-h-[80vh]"
              />

              {/* Caption */}
              <div className="mt-3 flex items-center justify-between px-1">
                <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest">
                  {images[lightbox].label}
                </span>
                <span className="text-white/30 text-xs">
                  {lightbox + 1} / {images.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
