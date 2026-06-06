import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { StatusBanner } from "@/components/landing/StatusBanner";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { About } from "@/components/landing/About";
import { Reviews } from "@/components/landing/Reviews";
import { Location } from "@/components/landing/Location";
import { Footer } from "@/components/landing/Footer";
import { BookingModal } from "@/components/landing/BookingModal";

export default function LandingPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />
      <StatusBanner />
      <main className="flex-1">
        <Hero onOpenBooking={() => setBookingOpen(true)} />
        <Services />
        <About />
        <Reviews />
        <Location />
      </main>
      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
