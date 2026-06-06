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

    window.addEventListener("scroll", handleScroll);
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
          ? "bg-[#0B0C10]/90 backdrop-blur-md border-b border-white/5 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="text-[#C5A059] font-black text-xl tracking-tighter uppercase z-50"
          data-testid="button-nav-logo"
        >
          Sileshi <span className="text-white font-light">Barbershop</span>
        </button>

        {/* Desktop Nav */}
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
            className="flex items-center gap-2 bg-[#C5A059] text-black font-bold px-5 py-2.5 rounded-md hover:bg-[#b38f4b] transition-all text-sm shadow-lg shadow-[#C5A059]/20"
          >
            <Calendar className="w-4 h-4" />
            Book Now
          </button>

          <a
            href="tel:+61431552770"
            data-testid="link-nav-phone"
            className="flex items-center gap-2 border border-[#C5A059] text-[#C5A059] font-semibold px-4 py-2.5 rounded-md hover:bg-[#C5A059]/10 transition-all text-sm"
          >
            <Phone className="w-4 h-4" />
            0431 552 770
          </a>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden z-50">
          <button
            onClick={onOpenBooking}
            data-testid="button-nav-book-mobile"
            className="flex items-center gap-1.5 bg-[#C5A059] text-black font-bold h-9 px-3 rounded-md text-xs hover:bg-[#b38f4b] transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book
          </button>
          <a
            href="tel:+61431552770"
            data-testid="link-nav-phone-mobile"
            className="flex items-center gap-1.5 border border-[#C5A059]/60 text-[#C5A059] font-semibold h-9 px-3 rounded-md text-xs hover:bg-[#C5A059]/10 transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            Call
          </a>
          <button
            className="text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-nav-hamburger"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-[#0B0C10]/95 backdrop-blur-xl border-b border-white/5 shadow-xl py-6 px-4 flex flex-col gap-5 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-lg font-medium text-left transition-colors ${
                  activeSection === link.id ? "text-[#C5A059]" : "text-white"
                }`}
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
