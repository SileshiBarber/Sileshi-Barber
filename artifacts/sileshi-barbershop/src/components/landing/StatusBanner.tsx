import { useState, useEffect } from "react";
import { MapPin, Phone } from "lucide-react";

function getMelbourneStatus(): { isOpen: boolean; label: string } {
  const now = new Date();
  const melbourneTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Australia/Melbourne" })
  );
  const hour = melbourneTime.getHours();
  const isOpen = hour >= 9 && hour < 21;
  return {
    isOpen,
    label: isOpen ? "OPEN NOW  ·  Closes 9 PM" : "CLOSED NOW  ·  Opens 9 AM",
  };
}

export function StatusBanner() {
  const [status, setStatus] = useState(getMelbourneStatus);

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(getMelbourneStatus());
    }, 30_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      id="status-banner"
      className="fixed top-14 left-0 right-0 z-40 bg-[#0B0C10] border-b border-[#C5A059]/20"
    >
      <div className="container mx-auto px-4 md:px-6 py-1.5 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 text-xs">
        {/* Address + phone — hidden on mobile, shown sm+ */}
        <div className="hidden sm:flex items-center gap-4 text-[#C5C6C7]">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-[#C5A059] shrink-0" />
            151 Trugo La, Footscray VIC 3011
          </span>
          <a
            href="tel:+61431552770"
            className="flex items-center gap-1.5 hover:text-[#C5A059] transition-colors"
          >
            <Phone className="w-3 h-3 text-[#C5A059] shrink-0" />
            0431 552 770
          </a>
        </div>

        {/* Status indicator — always visible, centred on mobile */}
        <div
          id="live-status"
          className="flex items-center gap-2 font-semibold tracking-wider uppercase w-full sm:w-auto justify-center sm:justify-end"
        >
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
            }`}
          />
          <span className={status.isOpen ? "text-emerald-400" : "text-rose-400"}>
            {status.label}
          </span>
        </div>
      </div>
    </div>
  );
}
