import { useState, useEffect, useRef } from "react";
import { Menu, X, Volume2, VolumeX, Accessibility, Home, Images, CreditCard, MessageSquare, Phone, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { globalSettings } from "@/lib/siteData";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import welcomeAudio from "@/assets/audio/welcome-message.mp3";
import logoAkacja from "@/assets/logo-akacja.png";

// Icon mapping for nav items
const navIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "#apartamenty": Home,
  "#galeria": Images,
  "#cennik": CreditCard,
  "#opinie": MessageSquare,
  "#kontakt": MapPin,
};

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  // Default: 130% for all devices (like 3x A+)
  const [fontSize, setFontSize] = useState(130);
  const [highContrast, setHighContrast] = useState(false);
  const [textSpacing, setTextSpacing] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const navItems = [
    { href: "#apartamenty", label: t("nav.apartments") },
    { href: "#galeria", label: t("nav.gallery") },
    { href: "#cennik", label: t("nav.pricing") },
    { href: "#opinie", label: t("nav.reviews") },
    { href: "#kontakt", label: t("nav.contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [highContrast]);

  useEffect(() => {
    if (textSpacing) {
      document.documentElement.classList.add("text-spacing-enhanced");
    } else {
      document.documentElement.classList.remove("text-spacing-enhanced");
    }
  }, [textSpacing]);

  const toggleWelcomeAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(welcomeAudio);
      audioRef.current.loop = false;
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 10, 150));
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 10, 80));
  };

  const toggleLanguage = () => {
    setLanguage(language === "pl" ? "en" : "pl");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-effect shadow-soft border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="container-wide mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 focus-ring rounded flex-shrink-0"
            aria-label="Apartamenty Akacja - Strona główna"
          >
            <img 
              src={logoAkacja} 
              alt="Apartamenty Akacja - Logo" 
              className="h-12 md:h-16 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 xl:px-4 py-2 text-foreground hover:text-accent transition-colors font-medium focus-ring rounded text-sm xl:text-base whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <Button
              variant="outline"
              size="lg"
              onClick={toggleLanguage}
              aria-label={`Change language to ${language === "pl" ? "English" : "Polish"}`}
              className="focus-ring bg-card/90 hover:bg-card text-foreground border-2 border-border/50 shadow-soft h-10 w-auto sm:h-12 md:h-14 px-3 sm:px-4 gap-2"
            >
              <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-bold text-sm sm:text-base">{language.toUpperCase()}</span>
            </Button>

            {/* Accessibility Widget - Large for visually impaired */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  aria-label={t("a11y.options")}
                  className="focus-ring bg-accent/90 hover:bg-accent text-accent-foreground border-2 border-accent-foreground/20 shadow-soft h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 p-0"
                >
                  <Accessibility className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 sm:w-64 text-base sm:text-lg">
                <DropdownMenuItem onClick={increaseFontSize} className="py-2 sm:py-3 text-sm sm:text-base">
                  <span className="text-lg sm:text-xl font-bold mr-2 sm:mr-3">A+</span>
                  {t("a11y.increaseFontSize")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={decreaseFontSize} className="py-2 sm:py-3 text-sm sm:text-base">
                  <span className="text-sm sm:text-base font-bold mr-2 sm:mr-3">A-</span>
                  {t("a11y.decreaseFontSize")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setHighContrast(!highContrast)}
                  className="py-2 sm:py-3 text-sm sm:text-base"
                >
                  <span className="mr-2 sm:mr-3 text-lg sm:text-xl">◐</span>
                  {highContrast ? t("a11y.disableContrast") : t("a11y.highContrast")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTextSpacing(!textSpacing)}
                  className="py-2 sm:py-3 text-sm sm:text-base"
                >
                  <span className="mr-2 sm:mr-3 text-lg sm:text-xl">⋮⋮</span>
                  {textSpacing ? t("a11y.disableSpacing") : t("a11y.largerSpacing")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Audio Welcome - Large for visually impaired */}
            <Button
              variant="outline"
              size="lg"
              onClick={toggleWelcomeAudio}
              aria-label={isPlaying ? t("a11y.stopListening") : t("a11y.listenInfo")}
              className={`focus-ring border-2 shadow-soft h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 p-0 transition-all ${
                isPlaying 
                  ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground border-destructive-foreground/20 animate-pulse" 
                  : "bg-primary hover:bg-primary/90 text-primary-foreground border-primary-foreground/20"
              }`}
            >
              {isPlaying ? (
                <VolumeX className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
              ) : (
                <Volume2 className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden focus-ring h-10 w-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? t("a11y.closeMenu") : t("a11y.openMenu")}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-full bg-card/70 backdrop-blur-xl border-b border-border/50 shadow-elevated animate-fade-in">
            <div className="container-wide mx-auto px-4 py-4">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const IconComponent = navIcons[item.href];
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-4 text-foreground hover:text-accent hover:bg-accent/20 active:bg-accent/30 transition-all font-medium rounded-xl focus-ring touch-target"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {IconComponent && <IconComponent className="w-5 h-5 text-accent flex-shrink-0" />}
                      <span className="text-base">{item.label}</span>
                    </a>
                  );
                })}
              </nav>
              
              {/* Mobile CTA */}
              <div className="mt-4 pt-4 border-t border-border/30">
                <a
                  href={`tel:${globalSettings.mainContactPhone.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-3 w-full px-4 py-4 bg-accent/90 text-accent-foreground font-bold rounded-xl shadow-soft hover:bg-accent active:scale-[0.98] transition-all touch-target"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Phone className="w-5 h-5" />
                  <span>{t("hero.call")}: {globalSettings.mainContactPhone}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
