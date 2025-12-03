import { Phone, MapPin, ShoppingCart, UtensilsCrossed, Waves, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { globalSettings } from "@/lib/siteData";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const phoneLink = `tel:${globalSettings.mainContactPhone.replace(/\s/g, "")}`;
  const secondaryPhoneLink = `tel:${globalSettings.secondaryContactPhone.replace(/\s/g, "")}`;

  return (
    <section id="kontakt" className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 gradient-sand">
      <div className="container-wide mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full">
            {t("contact.badge")}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-2">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Phone Cards */}
            <div className="bg-card p-4 sm:p-5 md:p-6 rounded-xl shadow-soft">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-accent/10 rounded-xl flex-shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-foreground mb-1">
                    {t("contact.mainPhone")}
                  </h3>
                  <a
                    href={phoneLink}
                    className="text-xl sm:text-2xl font-bold text-accent hover:text-accent/80 transition-colors focus-ring rounded block truncate"
                  >
                    {globalSettings.mainContactPhone}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card p-4 sm:p-5 md:p-6 rounded-xl shadow-soft">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-accent/10 rounded-xl flex-shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-foreground mb-1">
                    {t("contact.secondaryPhone")}
                  </h3>
                  <a
                    href={secondaryPhoneLink}
                    className="text-xl sm:text-2xl font-bold text-accent hover:text-accent/80 transition-colors focus-ring rounded block truncate"
                  >
                    {globalSettings.secondaryContactPhone}
                  </a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-card p-4 sm:p-5 md:p-6 rounded-xl shadow-soft">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-accent/10 rounded-xl shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-foreground mb-1">
                    {t("contact.address")}
                  </h3>
                  <p className="text-muted-foreground mb-3 text-sm sm:text-base">
                    {globalSettings.address}
                  </p>
                  <Button asChild variant="outline" size="sm" className="touch-target">
                    <a
                      href={globalSettings.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("contact.seeOnMap")}
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Button asChild variant="hero" size="xl" className="w-full touch-target">
              <a href={phoneLink}>
                <Phone className="w-5 h-5" />
                <span className="truncate">{t("contact.callNow")}: {globalSettings.mainContactPhone}</span>
              </a>
            </Button>
          </div>

          {/* Map Embed */}
          <div className="bg-card rounded-xl shadow-soft overflow-hidden h-[300px] sm:h-[350px] md:h-[400px] lg:h-auto lg:min-h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2346.5!2d15.4869!3d54.2178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47aa5e5b3d9d6b7b%3A0x8b8b8b8b8b8b8b8b!2sAkacjowa%206%2C%2078-111%20Siano%C5%BC%C4%99ty!5e0!3m2!1spl!2spl!4v1700000000000!5m2!1spl!2spl"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokalizacja Apartamenty Akacja - Sianożęty, ul. Akacjowa 6"
            />
          </div>
        </div>

        {/* Points of Interest */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-6 text-center">
            📌 {t("contact.nearby")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Sklepy */}
            <article className="bg-card p-4 sm:p-5 rounded-xl shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-accent" aria-hidden="true" />
                </div>
                <h4 className="font-serif font-semibold text-foreground">{t("contact.shops")}</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground" aria-label={t("contact.shops")}>
                <li>Lidl, Dino: <span className="font-medium text-foreground">150m</span></li>
                <li>Biedronka: <span className="font-medium text-foreground">1 km</span></li>
              </ul>
            </article>

            {/* Gastronomia */}
            <article className="bg-card p-4 sm:p-5 rounded-xl shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <UtensilsCrossed className="w-5 h-5 text-accent" aria-hidden="true" />
                </div>
                <h4 className="font-serif font-semibold text-foreground">{t("contact.gastronomy")}</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground" aria-label={t("contact.gastronomy")}>
                <li>Kabaczek Pico Bello: <span className="font-medium text-foreground">1 km</span></li>
              </ul>
            </article>

            {/* Plaża */}
            <article className="bg-card p-4 sm:p-5 rounded-xl shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Waves className="w-5 h-5 text-accent" aria-hidden="true" />
                </div>
                <h4 className="font-serif font-semibold text-foreground">{t("contact.beach")}</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground" aria-label={t("contact.beach")}>
                <li>Zejście nr 5: <span className="font-medium text-foreground">1 km</span></li>
              </ul>
            </article>

            {/* Rekreacja */}
            <article className="bg-card p-4 sm:p-5 rounded-xl shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <TreePine className="w-5 h-5 text-accent" aria-hidden="true" />
                </div>
                <h4 className="font-serif font-semibold text-foreground">{t("contact.recreation")}</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground" aria-label={t("contact.recreation")}>
                <li>Pola Golfowe: <span className="font-medium text-foreground">3 km</span></li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
