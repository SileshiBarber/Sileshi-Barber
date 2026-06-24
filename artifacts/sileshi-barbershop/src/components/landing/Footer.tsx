export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Gallery", id: "gallery" },
    { label: "Services", id: "services" },
    { label: "Reviews", id: "reviews" },
    { label: "Location", id: "location" },
  ];

  return (
    <footer className="bg-[#0B0C10] pt-10 pb-8">
      {/* Gold divider */}
      <div className="container mx-auto px-4 md:px-6 mb-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">

          {/* Brand block */}
          <div className="flex flex-col gap-2.5 max-w-xs">
            <button
              onClick={() => scrollTo("hero")}
              className="text-left text-xl font-black uppercase tracking-tighter"
            >
              <span className="text-[#C5A059]">Sileshi</span>{" "}
              <span className="text-white font-light">Barbershop</span>
            </button>
            <p className="text-[#C5C6C7]/60 text-sm leading-relaxed">
              Premium precision cuts in the heart of Footscray. Walk in anytime.
            </p>
            <a
              href="tel:+61431552770"
              aria-label="Call Sileshi Barbershop"
              className="inline-flex items-center gap-1.5 text-[#C5A059] hover:text-[#d4b472] transition-colors text-sm font-medium"
            >
              0431 552 770
            </a>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-1">
            <p className="text-[#C5A059] text-[10px] font-bold uppercase tracking-widest mb-2">
              Quick Links
            </p>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                data-testid={`link-footer-${link.id}`}
                className="text-sm text-[#C5C6C7]/60 hover:text-[#C5A059] transition-colors text-left w-fit"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Address block */}
          <div className="flex flex-col gap-1">
            <p className="text-[#C5A059] text-[10px] font-bold uppercase tracking-widest mb-2">
              Find Us
            </p>
            <p className="text-[#C5C6C7]/60 text-sm">151 Trugo La</p>
            <p className="text-[#C5C6C7]/60 text-sm">Footscray VIC 3011</p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=151+Trugo+La+Footscray+VIC+3011"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C5A059] text-xs hover:text-[#d4b472] transition-colors mt-1.5"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-2 text-[11px] text-[#C5C6C7]/30">
          <p>&copy; {currentYear} Sileshi Barbershop. All rights reserved.</p>
          <p>151 Trugo La, Footscray VIC 3011</p>
        </div>
        <p className="mt-2 text-center text-[11px] font-light tracking-wider text-[#C5C6C7]/20">
          <a
            href="https://www.tykieautomation.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none", cursor: "default" }}
          >
            Powered by TykieAutomation
          </a>
        </p>
      </div>
    </footer>
  );
}
