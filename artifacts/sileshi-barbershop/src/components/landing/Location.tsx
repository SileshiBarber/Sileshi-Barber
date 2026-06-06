import { motion } from "framer-motion";
import { MapPin, Clock, Navigation, Phone } from "lucide-react";

const hours = [
  { day: "Monday",    open: "9:00 AM", close: "9:00 PM" },
  { day: "Tuesday",   open: "9:00 AM", close: "9:00 PM" },
  { day: "Wednesday", open: "9:00 AM", close: "9:00 PM" },
  { day: "Thursday",  open: "9:00 AM", close: "9:00 PM" },
  { day: "Friday",    open: "9:00 AM", close: "9:00 PM" },
  { day: "Saturday",  open: "8:00 AM", close: "9:00 PM" },
  { day: "Sunday",    open: "10:00 AM", close: "9:00 PM" },
];

function getTodayLabel(): string {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const melbourneDay = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Australia/Melbourne" })
  ).getDay();
  return days[melbourneDay];
}

export function Location() {
  const today = getTodayLabel();

  return (
    <section
      id="location"
      className="py-24 bg-[#0B0C10] border-t border-[#C5A059]/20"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="block text-[#C5A059] tracking-widest text-xs uppercase mb-2 font-semibold">
            Find Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Location &amp; Hours
          </h2>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

          {/* Left column — access & hours card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="bg-[#1F2833] p-8 rounded-2xl border border-white/5 shadow-xl flex flex-col gap-8"
          >
            {/* Title */}
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#C5A059] shrink-0" />
              <h3 className="text-white font-bold text-xl">Visit the Shop</h3>
            </div>

            {/* Address */}
            <div>
              <p className="text-2xl font-black text-white leading-snug">
                151 Trugo La,
              </p>
              <p className="text-2xl font-black text-white leading-snug">
                Footscray VIC 3011
              </p>
              <a
                href="tel:+61431552770"
                data-testid="link-location-phone"
                className="inline-flex items-center gap-2 mt-2 text-[#C5A059] hover:text-[#d4b472] transition-colors text-sm font-medium"
              >
                <Phone className="w-3.5 h-3.5" />
                0431 552 770
              </a>
            </div>

            {/* Directions button */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=151+Trugo+La+Footscray+VIC+3011"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-get-directions"
              className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white py-3 px-6 rounded-md hover:bg-white/10 transition-all text-sm font-semibold"
            >
              <Navigation className="w-4 h-4 text-[#C5A059]" />
              Get Driving Directions
            </a>

            {/* Hours table */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                <span className="text-white font-semibold text-sm uppercase tracking-widest">
                  Trading Hours
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {hours.map((row) => {
                  const isToday = row.day === today;
                  return (
                    <div
                      key={row.day}
                      data-testid={`row-hours-${row.day.toLowerCase()}`}
                      className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-colors ${
                        isToday
                          ? "bg-[#C5A059]/10 border border-[#C5A059]/30"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`font-medium ${
                          isToday ? "text-[#C5A059]" : "text-[#C5C6C7]"
                        }`}
                      >
                        {row.day}
                        {isToday && (
                          <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                            Today
                          </span>
                        )}
                      </span>
                      <span
                        className={`font-semibold tabular-nums ${
                          isToday ? "text-white" : "text-[#C5C6C7]"
                        }`}
                      >
                        {row.open} – {row.close}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right column — map embed */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="overflow-hidden rounded-2xl border border-white/10 h-[350px] lg:h-full min-h-[350px] shadow-2xl relative"
          >
            {/* Subtle dark tint overlay that fades on hover */}
            <div className="absolute inset-0 bg-[#0B0C10]/25 pointer-events-none z-10 transition-opacity duration-500 hover:opacity-0" />
            <iframe
              src="https://maps.google.com/maps?q=151%20Trugo%20La,%20Footscray%20VIC%203011&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(80%) contrast(1.1) brightness(0.75)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sileshi Barbershop location map"
              className="absolute inset-0 w-full h-full"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
