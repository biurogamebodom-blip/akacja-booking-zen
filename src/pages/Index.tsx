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

const Index = () => {
  useEffect(() => {
    // Update document title for SEO
    document.title = "Apartamenty Akacja Sianożęty - Komfortowe Noclegi nad Morzem";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ApartmentDetails />
        <Gallery />
        <Pricing />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <AIChatAssistant />
    </div>
  );
};

export default Index;
