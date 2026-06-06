import { motion } from "framer-motion";
import { Phone } from "lucide-react";

interface ServiceItem {
  name: string;
  price: string;
  note?: string;
  badge?: string;
}

interface ServiceCategory {
  title: string;
  items: ServiceItem[];
}

const categories: ServiceCategory[] = [
  {
    title: "Haircuts",
    items: [
      { name: "Standard Haircut", price: "$35" },
      { name: "Skin Fade / Zero Fade", price: "$40" },
      { name: "Buzz Cut", price: "$28" },
      { name: "Buzz Cut + Line Up", price: "$33" },
    ],
  },
  {
    title: "Beard & Detailing",
    items: [
      { name: "Beard Trim & Line Up", price: "$25" },
      { name: "Hot Towel Shave", price: "$45" },
      {
        name: "Haircut + Beard Trim Combo",
        price: "$55",
        badge: "Best Value",
      },
      {
        name: "Kids / Students Cut",
        price: "From $14.99",
        note: "Affordable rates for under 16s & students",
      },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function Services() {
  return (
    <section id="services" className="py-24 bg-[#1F2833]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="block text-[#C5A059] tracking-widest text-xs uppercase mb-2 font-semibold">
            The Menu
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Premium Cuts &amp; Grooming Services
          </h2>
        </motion.div>

        {/* Two-column grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {categories.map((cat, ci) => (
            <motion.div
              key={ci}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {/* Category label */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#C5A059] text-xs font-bold tracking-widest uppercase">
                  {cat.title}
                </span>
                <div className="flex-1 h-px bg-[#C5A059]/20" />
              </div>

              {/* Service rows */}
              <div className="flex flex-col gap-1">
                {cat.items.map((item, ii) => (
                  <motion.div
                    key={ii}
                    variants={itemVariants}
                    data-testid={`card-service-${ci}-${ii}`}
                    className={`group flex flex-col hover:bg-white/5 px-3 py-3 rounded-lg transition-all duration-200 cursor-default ${
                      item.badge
                        ? "border border-[#C5A059]/40 bg-[#0B0C10]/40"
                        : ""
                    }`}
                  >
                    <div className="flex items-baseline gap-2 w-full">
                      {/* Name */}
                      <span className="text-white font-medium text-sm md:text-base shrink-0">
                        {item.name}
                      </span>

                      {/* Dotted line */}
                      <span className="flex-1 border-b border-dotted border-white/20 relative top-[-3px]" />

                      {/* Price */}
                      <span
                        className="text-[#C5A059] font-black text-base md:text-lg shrink-0 group-hover:text-[#d4b472] transition-colors duration-200"
                        data-testid={`text-price-${ci}-${ii}`}
                      >
                        {item.price}
                      </span>

                      {/* Best Value badge */}
                      {item.badge && (
                        <span className="ml-2 text-[10px] font-bold tracking-widest uppercase text-[#C5A059] border border-[#C5A059]/50 rounded-full px-2 py-0.5 shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Optional note */}
                    {item.note && (
                      <span className="text-[#C5C6C7] text-xs mt-1 pl-0">
                        {item.note}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="tel:+61431552770"
            data-testid="button-services-cta"
            className="flex items-center gap-3 bg-[#0B0C10] border border-[#C5A059]/40 text-[#C5A059] font-semibold px-8 py-4 rounded-md hover:bg-[#C5A059] hover:text-black transition-all duration-200 text-sm tracking-wide"
          >
            <Phone className="w-4 h-4 shrink-0" />
            Need a Quick Cut? Call for Wait Times
          </a>
        </motion.div>
      </div>
    </section>
  );
}
