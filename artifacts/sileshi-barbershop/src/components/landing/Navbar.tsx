import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Calendar } from "lucide-react";

interface Props {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = ["hero", "services", "about", "reviews", "location"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { name: "Services", id: "services" },
    { name: "About", id: "about" },
    { name: "Reviews", id: "reviews" },
    { name: "Location", id: "location" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B0C10]/90 backdrop-blur-md border-b border-white/5 shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Single strict-height row */}
      <div className="flex items-center justify-between h-14 px-4 md:px-6 w-full container mx-auto">

        {/* Brand — single line, scales down on mobile */}
        <button
          onClick={() => scrollTo("hero")}
          data-testid="button-nav-logo"
          className="text-[#C5A059] font-black tracking-wider uppercase z-50 text-sm md:text-xl whitespace-nowrap"
        >
          Sileshi <span className="text-white font-light">Barbershop</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              data-testid={`link-nav-${link.id}`}
              className={`text-sm font-medium transition-colors hover:text-[#C5A059] ${
                activeSection === link.id ? "text-[#C5A059]" : "text-[#C5C6C7]"
              }`}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={onOpenBooking}
            data-testid="button-nav-book"
            className="flex items-center gap-2 bg-[#C5A059] text-black font-bold px-5 py-2.5 rounded-md hover:bg-[#b38f4b] hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 text-sm shadow-lg shadow-[#C5A059]/20"
          >
            <Calendar className="w-4 h-4" />
            Book Now
          </button>
          <a
            href="tel:+61431552770"
            data-testid="link-nav-phone"
            aria-label="Call Sileshi Barbershop"
            className="flex items-center gap-2 border border-[#C5A059] text-[#C5A059] font-semibold px-4 py-2.5 rounded-md hover:bg-[#C5A059]/10 transition-all text-sm"
          >
            <Phone className="w-4 h-4" />
            0431 552 770
          </a>
        </nav>

        {/* Mobile controls — Book + Hamburger only */}
        <div className="flex items-center gap-2 md:hidden z-50">
          <button
            onClick={onOpenBooking}
            data-testid="button-nav-book-mobile"
            className="flex items-center gap-1.5 bg-[#C5A059] text-black font-bold h-9 px-4 rounded-md text-xs hover:bg-[#b38f4b] active:scale-[0.97] transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-nav-hamburger"
            aria-label="Toggle navigation menu"
            className="text-white p-1.5 rounded-md hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 right-0 bg-[#0B0C10]/97 backdrop-blur-xl border-b border-white/5 shadow-xl py-5 px-4 flex flex-col gap-1 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-base font-medium text-left py-3 border-b border-white/5 last:border-0 transition-colors ${
                  activeSection === link.id ? "text-[#C5A059]" : "text-white"
                }`}
              >
                {link.name}
              </button>
            ))}
            <a
              href="tel:+61431552770"
              className="flex items-center gap-2 text-[#C5A059] font-semibold py-3 text-sm mt-1"
            >
              <Phone className="w-4 h-4" />
              Call 0431 552 770
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
