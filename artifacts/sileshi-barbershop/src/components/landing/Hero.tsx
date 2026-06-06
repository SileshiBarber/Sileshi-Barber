import { motion } from "framer-motion";
import { Phone, ChevronDown, Star } from "lucide-react";

export function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center pt-28"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1920&q=80"
          alt="Sileshi Barbershop Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C10]/60 via-transparent to-[#0B0C10]/40" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Over-title */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.25em" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
            className="text-[#C5A059] font-bold tracking-widest uppercase text-xs mb-5"
            data-testid="text-hero-overtitle"
          >
            Footscray's Premium Fresh Fades
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-4 leading-[0.9]"
            data-testid="text-hero-heading"
          >
            Sileshi <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px #C5A059" }}
            >
              Barbershop
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
            className="text-lg md:text-xl text-[#C5C6C7] mb-3 font-light tracking-wide"
            data-testid="text-hero-subheadline"
          >
            Sharp Cuts. Elite Detail. No Compromises.
          </motion.p>

          {/* Social proof badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-10"
            data-testid="text-hero-social-proof"
          >
            <span className="flex text-[#C5A059]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059]" />
              ))}
            </span>
            <span className="text-white font-semibold text-sm">4.8</span>
            <span className="text-[#C5C6C7] text-xs">52 Google Reviews</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="tel:+61431552770"
              data-testid="button-call-to-book"
              className="flex items-center justify-center gap-2 bg-[#C5A059] text-black font-bold px-8 py-4 rounded-md shadow-lg shadow-[#C5A059]/20 hover:bg-[#b38f4b] transition-all w-full sm:w-auto text-base"
            >
              <Phone className="w-4 h-4 shrink-0" />
              Call to Book / Check Wait Times
            </a>
            <button
              onClick={() => scrollTo("services")}
              data-testid="button-view-services"
              className="border border-white/20 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-md hover:bg-white/10 transition-all text-center w-full sm:w-auto text-base font-semibold"
            >
              View Services &amp; Pricing
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          onClick={() => scrollTo("services")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#C5C6C7]/50 hover:text-[#C5A059] transition-colors"
          aria-label="Scroll to services"
        >
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}
