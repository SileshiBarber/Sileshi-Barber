import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";

export function Location() {
  return (
    <section id="location" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/3 flex flex-col space-y-10"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">Visit Us</h2>
              <div className="w-12 h-1 bg-primary mb-8"></div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-card p-3 rounded-none border border-border">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Address</h4>
                  <p className="text-muted-foreground">151 Trugo La<br />Footscray VIC 3011<br />Australia</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-card p-3 rounded-none border border-border">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Phone</h4>
                  <a href="tel:+61431552770" className="text-muted-foreground hover:text-primary transition-colors">
                    0431 552 770
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-card p-3 rounded-none border border-border">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-lg mb-2">Hours</h4>
                  <ul className="text-muted-foreground space-y-2 text-sm w-full max-w-[200px]">
                    <li className="flex justify-between border-b border-border/50 pb-1"><span>Mon - Fri</span> <span>9am - 7pm</span></li>
                    <li className="flex justify-between border-b border-border/50 pb-1"><span>Saturday</span> <span>8am - 6pm</span></li>
                    <li className="flex justify-between"><span>Sunday</span> <span>10am - 4pm</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-2/3 min-h-[400px] border border-border relative group"
          >
            <div className="absolute inset-0 bg-primary/20 pointer-events-none mix-blend-color z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
            <iframe 
              src="https://maps.google.com/maps?q=151+Trugo+La+Footscray+VIC+3011&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(100%) contrast(1.2) brightness(0.8)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
