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
      { name: "Normal Haircut", price: "$30" },
      { name: "Skin Fade / Zero Fade", price: "$35" },
      { name: "Buzz Cut", price: "$25" },
      { name: "Buzz Cut + Line Up", price: "$30" },
    ],
  },
  {
    title: "Beard & Detailing",
    items: [
      { name: "Beard Trim & Line Up", price: "$20" },
      { name: "Hot Towel Shave", price: "$40" },
      { name: "Haircut + Beard Combo", price: "$35", badge: "Best Value" },
      { name: "Kids Cut", price: "$25", note: "Under 12s & students" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
};

export function Services() {
  return (
    <section
      id="services"
      className="py-10 md:py-16 bg-[#0B0C10] relative overflow-hidden"
    >
      {/* Ambient radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(197,160,89,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="text-center mb-8 md:mb-10"
        >
          <span className="block text-[#C5A059] tracking-widest text-[11px] uppercase mb-2 font-semibold">
            The Menu
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Premium Cuts &amp; Grooming Services
          </h2>
        </motion.div>

        {/* Two-column grid — tight gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {categories.map((cat, ci) => (
            <motion.div
              key={ci}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#C5A059] text-[10px] font-bold tracking-widest uppercase">
                  {cat.title}
                </span>
                <div className="flex-1 h-px bg-[#C5A059]/15" />
              </div>

              <div className="flex flex-col gap-0.5">
                {cat.items.map((item, ii) => (
                  <motion.div
                    key={ii}
                    variants={itemVariants}
                    data-testid={`card-service-${ci}-${ii}`}
                    className={`group flex flex-col hover:bg-white/[0.04] px-3 py-2.5 rounded-lg transition-all duration-200 cursor-default ${
                      item.badge ? "border border-[#C5A059]/30 bg-[#C5A059]/[0.03]" : ""
                    }`}
                  >
                    <div className="flex items-baseline gap-1.5 w-full">
                      <span className="text-white font-medium text-sm shrink-0">
                        {item.name}
                      </span>
                      <span className="flex-1 border-b border-dotted border-white/10 relative top-[-3px]" />
                      <span
                        className="text-[#C5A059] font-black text-sm md:text-base shrink-0 group-hover:text-[#d4b472] transition-colors"
                        data-testid={`text-price-${ci}-${ii}`}
                      >
                        {item.price}
                      </span>
                      {item.badge && (
                        <span className="ml-1 text-[9px] font-bold tracking-widest uppercase text-[#C5A059] border border-[#C5A059]/50 rounded-full px-1.5 py-0.5 shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.note && (
                      <span className="text-[#C5C6C7]/60 text-[11px] mt-0.5">{item.note}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="tel:+61431552770"
            data-testid="button-services-cta"
            className="flex items-center gap-2.5 bg-[#C5A059] text-black font-bold px-7 py-3.5 rounded-md hover:bg-[#b38f4b] hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 text-sm tracking-wide shadow-lg shadow-[#C5A059]/20"
          >
            <Phone className="w-4 h-4 shrink-0" />
            Check Wait Times — 0431 552 770
          </a>
        </motion.div>
      </div>
    </section>
  );
}
