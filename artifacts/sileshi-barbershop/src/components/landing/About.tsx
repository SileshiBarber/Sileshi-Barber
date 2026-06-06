import { motion } from "framer-motion";
import { Scissors, Heart, Zap } from "lucide-react";

const values = [
  {
    icon: Scissors,
    title: "Master Barbers",
    desc: "Elite skill level across all modern and traditional hair profiles.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    desc: "Proudly serving the heartbeat of Melbourne's inner west.",
  },
  {
    icon: Zap,
    title: "Walk-In Ready",
    desc: "Structured for seamless appointments or fast walk-in pacing.",
  },
];

export function About() {
  return (
    <section id="about" className="bg-[#0B0C10] py-20 md:py-28 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 max-w-6xl mx-auto">

          {/* Left — image composition */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative rounded-2xl overflow-hidden border border-white/10 group h-[400px] shadow-2xl"
            data-testid="img-about-shop"
          >
            <img
              src="https://images.unsplash.com/photo-1593702295094-aea22597af65?auto=format&fit=crop&w=800&q=80"
              alt="Sileshi Barbershop interior — premium barbershop on Trugo Lane, Footscray"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Persistent bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/80 via-transparent to-transparent" />

            {/* Golden accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

            {/* Hover micro-caption */}
            <div className="absolute bottom-0 left-0 right-0 px-6 py-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
              <p className="text-[#C5A059] text-xs font-bold tracking-widest uppercase">
                Crafting Confidence Since Day One.
              </p>
            </div>
          </motion.div>

          {/* Right — narrative */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            {/* Over-title */}
            <span className="text-[#C5A059] tracking-widest text-xs uppercase font-bold block mb-3">
              The Sileshi Story
            </span>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
              Where Precision Meets<br className="hidden md:block" /> Footscray Culture
            </h2>

            {/* Copy */}
            <div className="flex flex-col gap-5 text-[#C5C6C7] text-base leading-relaxed mb-10">
              <p>
                Located right on Trugo Lane, Sileshi Barbershop is more than just a place to get a haircut — it's a local Footscray staple. We specialize in everything from razor-sharp skin fades and flawless line-ups to traditional hot towel treatments, delivering meticulous detail to every client who walks through our doors.
              </p>
              <p>
                We build our reputation on a simple framework: premium quality, welcoming street culture, and highly accessible pricing. Whether you are prepping for a weekend, locking down a professional look, or bringing your kids in for an urgent fresh cut, our team brings elite attention to detail every single time.
              </p>
            </div>

            {/* Value-prop icon row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {values.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 + i * 0.1 }}
                  data-testid={`card-value-${i}`}
                  className="flex flex-col gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/20 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm mb-1">{title}</p>
                    <p className="text-[#C5C6C7] text-xs leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
