export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Services", id: "services" },
    { label: "About", id: "about" },
    { label: "Reviews", id: "reviews" },
    { label: "Location", id: "location" },
  ];

  return (
    <footer className="bg-[#0B0C10] border-t border-[#C5A059]/20 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">

          {/* Brand block */}
          <div className="flex flex-col gap-3 max-w-xs">
            <button
              onClick={() => scrollTo("hero")}
              className="text-left text-2xl font-black uppercase tracking-tighter"
            >
              <span className="text-[#C5A059]">Sileshi</span>{" "}
              <span className="text-white font-light">Barbershop</span>
            </button>
            <p className="text-[#C5C6C7] text-sm leading-relaxed">
              Premium precision cuts in the heart of Footscray. Experience the craft.
            </p>
            <a
              href="tel:+61431552770"
              aria-label="Call Sileshi Barbershop directly to check wait times"
              className="inline-flex items-center gap-1.5 text-[#C5A059] hover:text-[#d4b472] transition-colors text-sm font-medium mt-1 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
            >
              0431 552 770
            </a>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-1">
            <p className="text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-3">
              Quick Links
            </p>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                data-testid={`link-footer-${link.id}`}
                className="text-sm text-[#C5C6C7] hover:text-[#C5A059] transition-colors text-left link-underline w-fit"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Address block */}
          <div className="flex flex-col gap-1">
            <p className="text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-3">
              Find Us
            </p>
            <p className="text-[#C5C6C7] text-sm">151 Trugo La</p>
            <p className="text-[#C5C6C7] text-sm">Footscray VIC 3011</p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=151+Trugo+La+Footscray+VIC+3011"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C5A059] text-xs hover:text-[#d4b472] transition-colors mt-2 link-underline w-fit"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[#C5C6C7]/50">
          <p>&copy; {currentYear} Sileshi Barbershop. All rights reserved.</p>
          <p>151 Trugo La, Footscray VIC 3011 &middot; ABN: AU Business</p>
        </div>
      </div>
    </footer>
  );
}
