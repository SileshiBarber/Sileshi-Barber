import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.png"
          alt="Sileshi Barbershop Interior"
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient for dark mood and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm md:text-base mb-4">
            Footscray, Melbourne
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground uppercase tracking-tighter mb-6 leading-[0.9]">
            Precision <br />
            <span className="text-transparent stroke-text" style={{ WebkitTextStroke: "1px hsl(var(--primary))" }}>Craft</span> <br />
            & Culture
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light">
            A luxury barbershop built on the street. Sharp cuts, master craftsmanship, and undeniable atmosphere. 
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-none w-full sm:w-auto text-lg h-14 px-8"
            >
              <a href="#location">
                Book Now
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary/50 text-foreground hover:bg-primary/10 font-bold rounded-none w-full sm:w-auto text-lg h-14 px-8"
            >
              <a href="tel:+61431552770">
                Call 0431 552 770
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
