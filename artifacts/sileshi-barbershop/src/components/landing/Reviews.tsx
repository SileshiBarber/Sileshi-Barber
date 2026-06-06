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
    text: "Needed an urgent cut for my boy and they pulled through 🙌🏽 Awsome and affordable",
  },
  {
    author: "Leilani R.",
    date: "2 months ago",
    text: "Too late to upload photos but I highly recommend this place!",
  },
  {
    author: "Marcus T.",
    date: "3 months ago",
    text: "The best zero fade in Footscray. Walked right in, sharp lines, great atmosphere. Highly recommended.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-[#1F2833]">
      <div className="container mx-auto px-4 md:px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="block text-[#C5A059] tracking-widest text-xs uppercase mb-3 font-semibold">
            Customer Testimonials
          </span>
          <div className="flex justify-center items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-7 h-7 fill-[#C5A059] text-[#C5A059]" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            4.8 Stars from 52 Local Reviews
          </h2>
        </motion.div>

        {/* Review cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              data-testid={`card-review-${index}`}
              className="bg-[#0B0C10] border border-white/5 p-6 rounded-xl relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#C5A059]/30 hover:shadow-lg hover:shadow-[#C5A059]/5"
            >
              {/* Stars */}
              <div className="flex text-[#C5A059] text-sm mb-4 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#C5C6C7] leading-relaxed italic text-sm flex-1 mb-6">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author + badge */}
              <div className="border-t border-white/5 pt-4 flex flex-col gap-1">
                <span className="text-white font-bold text-sm">{review.author}</span>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-[#C5C6C7] uppercase tracking-widest font-medium">
                    Google Reviewer &bull; Verified Local
                  </span>
                </div>
                <span className="text-[11px] text-[#C5C6C7]/50 mt-0.5">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom social anchor */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-[#C5C6C7] text-sm">
            Been to Sileshi Barbershop?
          </p>
          <a
            href="https://www.google.com/search?q=Sileshi+Barbershop+Footscray#lrd=0x0:0x0,3"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-leave-review"
            className="inline-flex items-center gap-2 bg-[#C5A059] text-black font-bold px-7 py-3 rounded-md hover:bg-[#b38f4b] transition-all duration-200 text-sm shadow-lg shadow-[#C5A059]/20"
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
