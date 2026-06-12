import { motion } from "framer-motion";

export function Storefront() {
  return (
    <section id="storefront" className="py-10 md:py-14 bg-[#0B0C10]">
      <div className="container mx-auto px-4 md:px-6 flex justify-center">
        <motion.img
          src="/images/storefront.jpg"
          alt="Sileshi Barbershop store front at 151 Trugo La, Footscray VIC 3011"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="w-full max-w-2xl rounded-xl object-cover"
          style={{ border: "1px solid rgba(255,255,255,0.18)" }}
        />
      </div>
    </section>
  );
}
