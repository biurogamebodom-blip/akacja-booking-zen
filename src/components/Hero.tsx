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
      <div className="relative z-10 container-narrow mx-auto px-4 text-center pt-20">
        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-accent-foreground bg-accent/90 rounded-full animate-fade-in shadow-soft">
          Sianożęty / Ustronie Morskie
        </span>
        
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up drop-shadow-lg">
          Apartamenty{" "}
          <span className="text-accent">Akacja</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 animate-slide-up drop-shadow-md" style={{ animationDelay: "0.2s" }}>
          Komfortowe apartamenty dwupoziomowe nad Bałtykiem. 
          Idealne miejsce na wypoczynek dla całej rodziny.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Button
            asChild
            variant="hero"
            size="xl"
            className="w-full sm:w-auto"
          >
            <a href={phoneLink} aria-label={`Zadzwoń: ${globalSettings.mainContactPhone}`}>
              <Phone className="w-5 h-5" />
              Sprawdź Termin / ZADZWOŃ: {globalSettings.mainContactPhone}
            </a>
          </Button>
        </div>

        <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-white/80 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm sm:text-base">4-5 osób</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm sm:text-base">2 sypialnie</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm sm:text-base">Taras</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm sm:text-base">Blisko morza</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-accent rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
