import { motion } from "framer-motion";

const services = [
  { name: "Classic Cut", price: "$35", description: "Tailored precision cut finished with styling." },
  { name: "Skin Fade", price: "$40", description: "Seamless transition, sharp edges, flawless finish." },
  { name: "Beard Trim", price: "$25", description: "Sculpted lines and even length for a powerful look." },
  { name: "Cut + Beard", price: "$55", description: "The complete package. Hair and beard perfection." },
  { name: "Kids Cut", price: "$25", description: "Fresh styles for the next generation." },
  { name: "Hot Towel Shave", price: "$45", description: "Traditional straight razor shave with hot towel treatment." },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">Our Services</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative flex flex-col p-6 bg-card border border-border hover:border-primary/50 transition-colors duration-300"
            >
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-bold font-heading text-foreground">{service.name}</h3>
                <div className="flex-1 border-b border-dashed border-muted-foreground/30 mx-4 relative top-[-6px]"></div>
                <span className="text-2xl font-black text-primary">{service.price}</span>
              </div>
              <p className="text-muted-foreground text-sm">{service.description}</p>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
