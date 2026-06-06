import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 border border-border p-2 bg-card">
              <img 
                src="/images/about-barber.png" 
                alt="Master Barber at Sileshi Barbershop" 
                className="w-full h-full object-cover grayscale-[0.2] contrast-125"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 border border-primary/30 -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-card -z-10"></div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">The Craft</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8">
              Born in Footscray. <br /> Built on precision.
            </h3>
            <div className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed">
              <p>
                Sileshi Barbershop isn't just a place to get a haircut. It's a sanctuary for men who demand better. We brought the luxury of a high-end salon into the grit and culture of the street.
              </p>
              <p>
                Every cut is an execution of intent. No rushed jobs. No corners cut. We take our time to understand your features, your style, and the statement you want to make.
              </p>
              <p className="text-foreground font-medium border-l-2 border-primary pl-4 italic">
                "We don't just shape hair. We shape confidence."
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
