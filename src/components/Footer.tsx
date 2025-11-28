import { Phone, MapPin, Heart } from "lucide-react";
import { globalSettings, navItems } from "@/lib/siteData";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide mx-auto section-padding pb-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">
              Apartamenty <span className="text-sea-light">Akacja</span>
            </h3>
            <p className="text-primary-foreground/80 mb-4">
              Komfortowe apartamenty dwupoziomowe nad Bałtykiem. 
              Idealne miejsce na wypoczynek dla całej rodziny.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">
              Szybkie linki
            </h4>
            <nav aria-label="Stopka - nawigacja">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-primary-foreground/80 hover:text-sea-light transition-colors focus-ring rounded"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Kontakt</h4>
            <address className="not-italic space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sea-light shrink-0" />
                <div>
                  <a
                    href={`tel:${globalSettings.mainContactPhone.replace(/\s/g, "")}`}
                    className="text-primary-foreground hover:text-sea-light transition-colors focus-ring rounded"
                  >
                    {globalSettings.mainContactPhone}
                  </a>
                  <br />
                  <a
                    href={`tel:${globalSettings.secondaryContactPhone.replace(/\s/g, "")}`}
                    className="text-primary-foreground/80 hover:text-sea-light transition-colors focus-ring rounded text-sm"
                  >
                    {globalSettings.secondaryContactPhone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sea-light shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80">
                  {globalSettings.address}
                </span>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-primary-foreground/60 text-sm">
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
