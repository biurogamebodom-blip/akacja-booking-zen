import { Phone, MapPin, Heart } from "lucide-react";
import { globalSettings, navItems } from "@/lib/siteData";
import logoAkacjaWhite from "@/assets/logo-akacja-white.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide mx-auto section-padding pb-6 md:pb-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand */}
          <div>
            <a href="#" aria-label="Apartamenty Akacja - Strona główna" className="inline-block mb-4">
              <img 
                src={logoAkacjaWhite} 
                alt="Apartamenty Akacja - Logo" 
                className="h-16 sm:h-18 md:h-20 lg:h-24 w-auto rounded-lg"
                loading="lazy"
              />
            </a>
            <p className="text-primary-foreground/80 mb-4 text-sm sm:text-base">
              Komfortowe apartamenty dwupoziomowe nad Bałtykiem. 
              Idealne miejsce na wypoczynek dla całej rodziny.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold mb-3 md:mb-4">
              Szybkie linki
            </h4>
            <nav aria-label="Stopka - nawigacja">
              <ul className="space-y-1 sm:space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-primary-foreground/80 hover:text-sea-light transition-colors focus-ring rounded text-sm sm:text-base inline-block py-1"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 md:col-span-1">
            <h4 className="font-serif text-base sm:text-lg font-semibold mb-3 md:mb-4">Kontakt</h4>
            <address className="not-italic space-y-2 sm:space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-sea-light shrink-0" />
                <div>
                  <a
                    href={`tel:${globalSettings.mainContactPhone.replace(/\s/g, "")}`}
                    className="text-primary-foreground hover:text-sea-light transition-colors focus-ring rounded text-sm sm:text-base"
                  >
                    {globalSettings.mainContactPhone}
                  </a>
                  <br />
                  <a
                    href={`tel:${globalSettings.secondaryContactPhone.replace(/\s/g, "")}`}
                    className="text-primary-foreground/80 hover:text-sea-light transition-colors focus-ring rounded text-xs sm:text-sm"
                  >
                    {globalSettings.secondaryContactPhone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-sea-light shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm sm:text-base">
                  {globalSettings.address}
                </span>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 md:pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-primary-foreground/60 text-xs sm:text-sm">
            © {currentYear} Apartamenty Akacja. Wszelkie prawa zastrzeżone.
          </p>
          <p className="text-primary-foreground/40 text-xs mt-2 flex items-center justify-center gap-1">
            Stworzone z <Heart className="w-3 h-3 text-sea-light" /> nad Bałtykiem
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
