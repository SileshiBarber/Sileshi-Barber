import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";

const reviews = [
  {
    author: "Amara D.",
    date: "3 weeks ago",
    text: "Excellent service, good price and quality.",
  },
  {
    author: "Kofi B.",
    date: "1 month ago",
    text: "Needed an urgent cut for my boy and they pulled through 🙌🏽 Awesome and affordable.",
  },
  {
    author: "Leilani R.",
    date: "2 months ago",
    text: "Too late to upload photos but I highly recommend this place!",
  },
  {
    author: "Marcus T.",
    date: "3 months ago",
    text: "The best zero fade in Footscray. Walked right in, sharp lines, great atmosphere.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } },
};

export function Reviews() {
  return (
    <section id="reviews" className="py-10 md:py-16 bg-[#0B0C10] relative overflow-hidden">
      {/* Ambient radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(197,160,89,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Section header — compact, no giant stars */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="text-center mb-8 md:mb-10"
        >
          <span className="block text-[#C5A059] tracking-widest text-[11px] uppercase mb-2 font-semibold">
            Customer Testimonials
          </span>
          <div className="flex justify-center items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
            ))}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            4.8 Stars · 52 Local Reviews
          </h2>
        </motion.div>

        {/* Glass review cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              data-testid={`card-review-${index}`}
              className="bg-white/[0.02] backdrop-blur-md border border-white/5 p-5 rounded-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#C5A059]/25 hover:bg-white/[0.04]"
            >
              {/* Inline stars */}
              <div className="flex text-[#C5A059] gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#C5C6C7] leading-relaxed italic text-sm flex-1 mb-4">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-white/5 pt-3 flex flex-col gap-0.5">
                <span className="text-white font-bold text-sm">{review.author}</span>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-[10px] text-[#C5C6C7]/60 uppercase tracking-widest">
                    Google · Verified Local
                  </span>
                </div>
                <span className="text-[11px] text-[#C5C6C7]/40 mt-0.5">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Leave a review CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="https://www.google.com/search?q=Sileshi+Barbershop+Footscray#lrd=0x0:0x0,3"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-leave-review"
            className="inline-flex items-center gap-2 bg-[#C5A059] text-black font-bold px-7 py-3.5 rounded-md hover:bg-[#b38f4b] hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 text-sm shadow-lg shadow-[#C5A059]/20"
          >
            <Star className="w-4 h-4 fill-black" />
            Leave a 5-Star Review
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
