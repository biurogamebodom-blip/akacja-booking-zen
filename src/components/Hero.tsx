import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { globalSettings } from "@/lib/siteData";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBackground from "@/assets/hero-beach.jpg";

const Hero = () => {
  const { t } = useLanguage();
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
        width={1920}
        height={1080}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/30 to-foreground/50" />
      
      {/* Decorative wave element at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <div className="relative z-10 container-narrow mx-auto px-4 sm:px-6 text-center pt-20 pb-24 sm:pb-20">
        <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-accent-foreground bg-accent/90 rounded-full animate-fade-in shadow-soft">
          {t("hero.location")}
        </span>
        
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 animate-slide-up drop-shadow-lg leading-tight">
          {t("hero.title")}{" "}
          <span className="text-accent">{t("hero.titleAccent")}</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 animate-slide-up drop-shadow-md px-2" style={{ animationDelay: "0.2s" }}>
          {t("hero.subtitle")}
        </p>

        <div className="flex flex-col gap-4 justify-center items-center animate-slide-up px-2" style={{ animationDelay: "0.4s" }}>
          <Button
            asChild
            variant="hero"
            size="xl"
            className="w-full max-w-xs sm:max-w-xl md:max-w-2xl px-6 sm:px-10 md:px-14"
          >
            <a href={phoneLink} aria-label={`${t("hero.call")}: ${globalSettings.mainContactPhone}`}>
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <span className="flex flex-col sm:flex-row sm:gap-2 items-center text-sm sm:text-base md:text-lg">
                <span className="font-bold">{t("hero.checkAvailability")}</span>
                <span className="hidden sm:inline text-white/70">|</span>
                <span>{t("hero.call")}: {globalSettings.mainContactPhone}</span>
              </span>
            </a>
          </Button>
        </div>

        <div className="mt-6 sm:mt-8 md:mt-12 grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 text-white/90 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-accent flex-shrink-0" />
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">{t("hero.guests")}</span>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-accent flex-shrink-0" />
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">{t("hero.bedrooms")}</span>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-accent flex-shrink-0" />
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">{t("hero.terrace")}</span>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-accent flex-shrink-0" />
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">{t("hero.beach")}</span>
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
