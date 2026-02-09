import { Phone, MapPin, Heart } from "lucide-react";
import { globalSettings } from "@/lib/siteData";
import { useLanguage } from "@/contexts/LanguageContext";
import logoAkacjaWhite from "@/assets/logo-akacja-white.jpg";
import euFundingLogos from "@/assets/logos/eu-funding-logos.png";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const navItems = [
    { href: "#apartamenty", label: t("nav.apartments") },
    { href: "#galeria", label: t("nav.gallery") },
    { href: "#cennik", label: t("nav.pricing") },
    { href: "#opinie", label: t("nav.reviews") },
    { href: "#kontakt", label: t("nav.contact") },
  ];

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
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold mb-3 md:mb-4">
              {t("footer.quickLinks")}
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
            <h4 className="font-serif text-base sm:text-lg font-semibold mb-3 md:mb-4">{t("footer.contact")}</h4>
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

        {/* EU Funding Section */}
        <div className="pt-6 md:pt-8 border-t border-primary-foreground/20">
          <a href="/fundusze-europejskie" className="block bg-white rounded-lg p-4 md:p-6 mb-6 hover:shadow-elevated transition-shadow cursor-pointer">
            <img 
              src={euFundingLogos} 
              alt="Logotypy: Krajowy Plan Odbudowy, Unia Europejska NextGenerationEU, PARP Grupa PFR, Polska Fundacja Przedsiębiorczości" 
              className="w-full max-w-3xl mx-auto h-auto"
              loading="lazy"
            />
            <p className="text-gray-700 text-xs sm:text-sm text-center mt-4 leading-relaxed">
              Przedsięwzięcie MŚP sfinansowane przez Unię Europejską ze środków Krajowego Planu Odbudowy i Zwiększania Odporności.
            </p>
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 md:pt-6 border-t border-primary-foreground/20 text-center">
          <p className="text-primary-foreground/60 text-xs sm:text-sm">
            © {currentYear} Apartamenty Akacja. {t("footer.rights")}
          </p>
          <p className="text-primary-foreground/40 text-xs mt-2 flex items-center justify-center gap-1">
            {t("footer.madeWith")} <Heart className="w-3 h-3 text-sea-light" /> {t("footer.byBaltic")}
          </p>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-4 md:pt-6 mt-4 border-t border-primary-foreground/10 text-center">
          <p className="text-primary-foreground/40 text-[10px] sm:text-xs leading-relaxed max-w-3xl mx-auto">
            {t("footer.disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
