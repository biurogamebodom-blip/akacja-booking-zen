import { useState, useEffect, useRef } from "react";
import { Menu, X, Volume2, VolumeX, Accessibility } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/siteData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import welcomeAudio from "@/assets/audio/welcome-message.mp3";
import logoAkacja from "@/assets/logo-akacja.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fontSize, setFontSize] = useState(130);
  const [highContrast, setHighContrast] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-effect shadow-soft border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 focus-ring rounded"
            aria-label="Apartamenty Akacja - Strona główna"
          >
            <img 
              src={logoAkacja} 
              alt="Apartamenty Akacja - Logo" 
              className="h-12 md:h-16 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-foreground hover:text-accent transition-colors font-medium focus-ring rounded"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Accessibility Widget - Large for visually impaired */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  aria-label="Opcje dostępności - powiększanie tekstu i wysoki kontrast"
                  className="focus-ring bg-accent/90 hover:bg-accent text-accent-foreground border-2 border-accent-foreground/20 shadow-soft h-12 w-12 md:h-14 md:w-14 p-0"
                >
                  <Accessibility className="h-7 w-7 md:h-8 md:w-8" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 text-lg">
                <DropdownMenuItem onClick={increaseFontSize} className="py-3 text-base">
                  <span className="text-xl font-bold mr-3">A+</span>
                  Zwiększ tekst
                </DropdownMenuItem>
                <DropdownMenuItem onClick={decreaseFontSize} className="py-3 text-base">
                  <span className="text-base font-bold mr-3">A-</span>
                  Zmniejsz tekst
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setHighContrast(!highContrast)}
                  className="py-3 text-base"
                >
                  <span className="mr-3 text-xl">◐</span>
                  {highContrast ? "Wyłącz wysoki kontrast" : "Wysoki kontrast"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Audio Welcome - Large for visually impaired */}
            <Button
              variant="outline"
              size="lg"
              onClick={toggleWelcomeAudio}
              aria-label={isPlaying ? "Zatrzymaj odsłuchiwanie strony" : "Odsłuchaj informacje o stronie"}
              className={`focus-ring border-2 shadow-soft h-12 w-12 md:h-14 md:w-14 p-0 transition-all ${
                isPlaying 
                  ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground border-destructive-foreground/20 animate-pulse" 
                  : "bg-primary hover:bg-primary/90 text-primary-foreground border-primary-foreground/20"
              }`}
            >
              {isPlaying ? (
                <VolumeX className="h-7 w-7 md:h-8 md:w-8" />
              ) : (
                <Volume2 className="h-7 w-7 md:h-8 md:w-8" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden focus-ring"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 transition-colors font-medium rounded-lg focus-ring"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
