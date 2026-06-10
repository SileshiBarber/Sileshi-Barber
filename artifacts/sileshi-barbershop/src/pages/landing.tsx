import { Navbar } from "@/components/landing/Navbar";
import { StatusBanner } from "@/components/landing/StatusBanner";
import { Hero } from "@/components/landing/Hero";
import { Gallery } from "@/components/landing/Gallery";
import { Services } from "@/components/landing/Services";
import { Reviews } from "@/components/landing/Reviews";
import { Location } from "@/components/landing/Location";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <StatusBanner />
      <main className="flex-1">
        <Hero />
        <Gallery />
        <Services />
        <Reviews />
        <Location />
      </main>
      <Footer />
    </div>
  );
}
