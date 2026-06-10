import { motion } from "framer-motion";
import { MapPin, Clock, Navigation, Phone } from "lucide-react";

const hours = [
  { day: "Monday",    open: "9:00 AM", close: "8:00 PM" },
  { day: "Tuesday",   open: "9:00 AM", close: "8:00 PM" },
  { day: "Wednesday", open: "9:00 AM", close: "8:00 PM" },
  { day: "Thursday",  open: "9:00 AM", close: "8:00 PM" },
  { day: "Friday",    open: "9:00 AM", close: "8:00 PM" },
  { day: "Saturday",  open: "9:00 AM", close: "8:00 PM" },
  { day: "Sunday",    open: "11:00 AM", close: "7:00 PM" },
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
      className="pt-10 md:pt-16 pb-0 bg-[#0B0C10] relative overflow-hidden"
    >
      {/* Ambient radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(197,160,89,0.05) 0%, transparent 70%)",
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
            Find Us
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Location &amp; Hours
          </h2>
        </motion.div>

        {/* Mobile: Map first, then hours below */}
        {/* Desktop: two columns side-by-side */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">

          {/* Map — shown first on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-1 lg:order-2 overflow-hidden rounded-xl border border-white/10 h-48 md:h-64 lg:h-full lg:min-h-[360px] shadow-xl relative"
          >
            <div className="absolute inset-0 bg-[#0B0C10]/20 pointer-events-none z-10 transition-opacity duration-500 hover:opacity-0" />
            <iframe
              src="https://maps.google.com/maps?q=151%20Trugo%20La,%20Footscray%20VIC%203011&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(80%) contrast(1.1) brightness(0.7)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sileshi Barbershop location map"
              className="absolute inset-0 w-full h-full"
            />
          </motion.div>

          {/* Info card — shown below map on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1 bg-white/[0.02] backdrop-blur-md border border-white/5 p-6 rounded-xl flex flex-col gap-5"
          >
            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-black text-xl leading-snug">
                  151 Trugo La,<br />Footscray VIC 3011
                </p>
                <a
                  href="tel:+61431552770"
                  data-testid="link-location-phone"
                  className="inline-flex items-center gap-1.5 mt-1.5 text-[#C5A059] hover:text-[#d4b472] transition-colors text-sm font-medium"
                >
                  <Phone className="w-3.5 h-3.5" />
                  0431 552 770
                </a>
              </div>
            </div>

            {/* Directions */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=151+Trugo+La+Footscray+VIC+3011"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-get-directions"
              className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white py-2.5 px-5 rounded-md hover:bg-white/10 transition-all text-sm font-semibold"
            >
              <Navigation className="w-4 h-4 text-[#C5A059]" />
              Get Driving Directions
            </a>

            {/* Compact hours table */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="text-white/60 font-semibold text-[10px] uppercase tracking-widest">
                  Trading Hours
                </span>
              </div>
              <div className="flex flex-col divide-y divide-white/5">
                {hours.map((row) => {
                  const isToday = row.day === today;
                  return (
                    <div
                      key={row.day}
                      data-testid={`row-hours-${row.day.toLowerCase()}`}
                      className={`flex items-center justify-between py-1.5 px-2 text-sm rounded-md transition-colors ${
                        isToday
                          ? "bg-[#C5A059]/8 text-[#C5A059]"
                          : "text-[#C5C6C7]/70"
                      }`}
                    >
                      <span className={`font-medium text-xs ${isToday ? "text-[#C5A059]" : ""}`}>
                        {row.day}
                        {isToday && (
                          <span className="ml-2 text-[9px] font-bold uppercase tracking-widest opacity-80">
                            Today
                          </span>
                        )}
                      </span>
                      <span className={`font-semibold tabular-nums text-xs ${isToday ? "text-white" : ""}`}>
                        {row.open} – {row.close}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
