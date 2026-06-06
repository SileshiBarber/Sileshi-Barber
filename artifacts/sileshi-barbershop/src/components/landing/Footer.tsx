export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-foreground mb-2">
              Sileshi <span className="text-primary">Barbershop</span>
            </h2>
            <p className="text-muted-foreground text-sm text-center md:text-left max-w-xs">
              Premium precision cuts in the heart of Footscray. Experience the craft.
            </p>
          </div>

          <div className="flex gap-6">
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Services</a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="#reviews" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Reviews</a>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {currentYear} Sileshi Barbershop. All rights reserved.</p>
          <div className="flex gap-4">
            <span>151 Trugo La, Footscray</span>
            <span className="hidden md:inline">|</span>
            <a href="tel:+61431552770" className="hover:text-primary transition-colors">0431 552 770</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
