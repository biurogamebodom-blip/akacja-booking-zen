import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ApartmentDetails from "@/components/ApartmentDetails";
import Gallery from "@/components/Gallery";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChatAssistant from "@/components/AIChatAssistant";
import CookieConsent from "@/components/CookieConsent";

const Index = () => {
  useEffect(() => {
    // Update document title for SEO
    document.title = "Apartamenty Akacja Sianożęty - Komfortowe Noclegi nad Morzem";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content link for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-accent focus:text-accent-foreground focus:rounded-lg focus:shadow-elevated focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:font-semibold"
      >
        Przejdź do głównej treści
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <ApartmentDetails />
        <Gallery />
        <Pricing />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <AIChatAssistant />
      <CookieConsent />
    </div>
  );
};

export default Index;
