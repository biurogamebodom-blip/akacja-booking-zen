import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { globalSettings } from "@/lib/siteData";
import heroBackground from "@/assets/hero-beach.jpg";

const Hero = () => {
  const phoneLink = `tel:${globalSettings.mainContactPhone.replace(/\s/g, "")}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Optimized for LCP */}
      <img 
        src={heroBackground}
        alt=""
        role="presentation"
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
        decoding="async"
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/30 to-foreground/50" />
      
      {/* Decorative wave element at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <div className="relative z-10 container-narrow mx-auto px-4 sm:px-6 text-center pt-20 pb-24 sm:pb-20">
        <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-accent-foreground bg-accent/90 rounded-full animate-fade-in shadow-soft">
          Sianożęty / Ustronie Morskie
        </span>
        
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 animate-slide-up drop-shadow-lg leading-tight">
          Apartamenty{" "}
          <span className="text-accent">Akacja</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 animate-slide-up drop-shadow-md px-2" style={{ animationDelay: "0.2s" }}>
          Komfortowe apartamenty dwupoziomowe nad Bałtykiem. 
          Idealne miejsce na wypoczynek dla całej rodziny.
        </p>

        <div className="flex flex-col gap-4 justify-center items-center animate-slide-up px-2" style={{ animationDelay: "0.4s" }}>
          <Button
            asChild
            variant="hero"
            size="xl"
            className="w-full max-w-md"
          >
            <a href={phoneLink} aria-label={`Zadzwoń: ${globalSettings.mainContactPhone}`}>
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="flex flex-col sm:flex-row sm:gap-1 items-center">
                <span>Sprawdź Termin</span>
                <span className="hidden sm:inline">/</span>
                <span>ZADZWOŃ: {globalSettings.mainContactPhone}</span>
              </span>
            </a>
          </Button>
        </div>

        <div className="mt-6 sm:mt-8 md:mt-12 grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-white/80 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent flex-shrink-0" />
            <span className="text-xs sm:text-sm md:text-base">4-5 osób</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent flex-shrink-0" />
            <span className="text-xs sm:text-sm md:text-base">2 sypialnie</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent flex-shrink-0" />
            <span className="text-xs sm:text-sm md:text-base">Taras</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent flex-shrink-0" />
            <span className="text-xs sm:text-sm md:text-base">Blisko morza</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator - positioned to not overlap content */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center pt-1.5 sm:pt-2">
          <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-accent rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
