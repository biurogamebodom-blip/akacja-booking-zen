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
            className="font-serif text-xl md:text-2xl font-bold text-primary hover:text-accent transition-colors focus-ring rounded"
            aria-label="Apartamenty Akacja - Strona główna"
          >
            Apartamenty <span className="text-accent">Akacja</span>
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
          <div className="flex items-center gap-2">
            {/* Accessibility Widget */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Opcje dostępności"
                  className="focus-ring"
                >
                  <Accessibility className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={increaseFontSize}>
                  <span className="text-lg font-bold mr-2">A+</span>
                  Zwiększ tekst
                </DropdownMenuItem>
                <DropdownMenuItem onClick={decreaseFontSize}>
                  <span className="text-sm font-bold mr-2">A-</span>
                  Zmniejsz tekst
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setHighContrast(!highContrast)}
                >
                  <span className="mr-2">◐</span>
                  {highContrast ? "Wyłącz wysoki kontrast" : "Wysoki kontrast"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Audio Welcome */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleWelcomeAudio}
              aria-label={isPlaying ? "Zatrzymaj powitanie" : "Odtwórz powitanie"}
              className="focus-ring"
            >
              {isPlaying ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
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
