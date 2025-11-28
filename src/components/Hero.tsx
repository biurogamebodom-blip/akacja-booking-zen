import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { globalSettings } from "@/lib/siteData";

const Hero = () => {
  const phoneLink = `tel:${globalSettings.mainContactPhone.replace(/\s/g, "")}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-sea/20 via-background to-sand-warm/30" />
      
      {/* Decorative wave element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-sea/10 animate-float" />
      <div className="absolute top-1/3 right-20 w-32 h-32 rounded-full bg-accent/5 animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/3 left-1/4 w-16 h-16 rounded-full bg-sea-light/20 animate-float" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 container-narrow mx-auto px-4 text-center pt-20">
        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full animate-fade-in">
          Sianożęty / Ustronie Morskie
        </span>
        
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up">
          Apartamenty{" "}
          <span className="text-gradient-ocean">Akacja</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
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

        <div className="mt-12 flex flex-wrap justify-center gap-8 text-muted-foreground animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>4-5 osób</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>2 sypialnie</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>Taras</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>Blisko morza</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-accent rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
