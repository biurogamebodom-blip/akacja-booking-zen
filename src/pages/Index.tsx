import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ApartmentDetails from "@/components/ApartmentDetails";

// Lazy load below-the-fold components to reduce initial JS bundle
const Gallery = lazy(() => import("@/components/Gallery"));
const Pricing = lazy(() => import("@/components/Pricing"));
const BookingWidget = lazy(() => import("@/components/BookingWidget"));
const Reviews = lazy(() => import("@/components/Reviews"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));
const AIChatAssistant = lazy(() => import("@/components/AIChatAssistant"));
const CookieConsent = lazy(() => import("@/components/CookieConsent"));

const Index = () => {

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Apartamenty Akacja Sianożęty - Komfortowe Noclegi nad Morzem</title>
        <meta name="description" content="Apartamenty Akacja w Sianożętach/Ustroniu Morskim. Sprawdź dostępność i cennik na sezon 2025/2026. Komfortowe domki dla rodzin." />
        <link rel="canonical" href="https://apartamentyakacja.pl/" />
        <meta property="og:title" content="Apartamenty Akacja Sianożęty - Komfortowe Noclegi nad Morzem" />
        <meta property="og:description" content="Apartamenty Akacja w Sianożętach/Ustroniu Morskim. Komfortowe domki nad Bałtykiem dla rodzin." />
        <meta property="og:url" content="https://apartamentyakacja.pl/" />
      </Helmet>
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
        <Suspense fallback={<div className="min-h-[200px]" />}>
          <Gallery />
          <Pricing />
          <BookingWidget />
          <Reviews />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <AIChatAssistant />
        <CookieConsent />
      </Suspense>
    </div>
  );
};

export default Index;
