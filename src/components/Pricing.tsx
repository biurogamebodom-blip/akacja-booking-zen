import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { globalSettings } from "@/lib/siteData";
import { useLanguage } from "@/contexts/LanguageContext";

const Pricing = () => {
  const { t } = useLanguage();
  const phoneLink = `tel:${globalSettings.mainContactPhone.replace(/\s/g, "")}`;

  const pricingSeasons = [
    {
      name: t("pricing.lowSeason"),
      period: t("pricing.lowSeasonPeriod"),
      priceRange: t("pricing.lowSeasonPrice"),
      note: t("pricing.lowSeasonNote"),
    },
    {
      name: t("pricing.midSeason"),
      period: t("pricing.midSeasonPeriod"),
      priceRange: t("pricing.midSeasonPrice"),
      note: t("pricing.midSeasonNote"),
    },
    {
      name: t("pricing.highSeason"),
      period: t("pricing.highSeasonPeriod"),
      priceRange: t("pricing.highSeasonPrice"),
      note: t("pricing.highSeasonNote"),
      featured: true,
    },
    {
      name: t("pricing.holidays"),
      period: t("pricing.holidaysPeriod"),
      priceRange: t("pricing.holidaysPrice"),
      note: t("pricing.holidaysNote"),
    },
  ];

  return (
    <section id="cennik" className="section-padding gradient-sand">
      <div className="container-wide mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full">
            {t("pricing.badge")}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            {t("pricing.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-2">
            {t("pricing.subtitle")}
          </p>
        </div>

        {/* Pricing Cards - Tablet optimized */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
          {pricingSeasons.map((season, index) => (
            <div
              key={index}
              className={`relative bg-card p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 ${
                season.featured
                  ? "border-2 border-accent ring-2 ring-accent/20"
                  : ""
              }`}
            >
              {season.featured && (
                <span className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-0.5 sm:py-1 bg-accent text-accent-foreground text-[10px] sm:text-xs font-semibold rounded-full whitespace-nowrap">
                  {t("pricing.mostPopular")}
                </span>
              )}
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 md:mb-3">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-accent flex-shrink-0" />
                <h3 className="font-serif text-xs sm:text-sm md:text-lg font-semibold text-foreground leading-tight">
                  {season.name}
                </h3>
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-2 sm:mb-3 md:mb-4 leading-tight">
                {season.period}
              </p>
              <p className="text-base sm:text-lg md:text-2xl font-bold text-accent mb-0.5 sm:mb-1 md:mb-2">
                {season.priceRange}
              </p>
              <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">{season.note}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-sm sm:text-base md:text-lg text-foreground mb-4 sm:mb-6">
            {t("pricing.cta")}
          </p>
          <Button asChild variant="hero" size="xl">
            <a href={phoneLink}>
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{t("pricing.call")}: {globalSettings.mainContactPhone}</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
