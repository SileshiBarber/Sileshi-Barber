import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    author: "James M.",
    date: "2 weeks ago",
    text: "Absolute masterclass. Finding a barber who actually listens and executes with this level of precision is rare. The skin fade was flawless, and the vibe of the shop is top tier.",
  },
  {
    author: "Daniel K.",
    date: "1 month ago",
    text: "Sileshi brings serious talent to Footscray. The attention to detail on my beard trim was insane. Clean, professional, and the atmosphere makes you want to hang around after your cut.",
  },
  {
    author: "Marcus T.",
    date: "3 months ago",
    text: "Best cut I've had in Melbourne. The hot towel shave is a must-try. You're not just paying for a haircut here, you're paying for an experience. Worth every cent.",
  }
];

export function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">The Verdict</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          <div className="flex justify-center items-center gap-1 text-primary">
            <Star className="w-6 h-6 fill-current" />
            <Star className="w-6 h-6 fill-current" />
            <Star className="w-6 h-6 fill-current" />
            <Star className="w-6 h-6 fill-current" />
            <Star className="w-6 h-6 fill-current" />
          </div>
          <p className="mt-4 text-muted-foreground font-medium uppercase tracking-widest text-sm">5.0 Star Rating</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="bg-background border border-border p-8 hover:border-primary/30 transition-colors"
            >
              <div className="flex text-primary mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6">"{review.text}"</p>
              <div className="flex justify-between items-end border-t border-border pt-4">
                <span className="font-bold font-heading">{review.author}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
