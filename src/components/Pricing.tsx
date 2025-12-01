import { Phone, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { globalSettings, apartment } from "@/lib/siteData";

const pricingSeasons = [
  {
    name: "Sezon niski",
    period: "Wrzesień - Maj (poza świętami)",
    priceRange: "od 200 zł / noc",
    note: "Minimum 2 noce",
  },
  {
    name: "Sezon średni",
    period: "Czerwiec, Wrzesień",
    priceRange: "od 250 zł / noc",
    note: "Minimum 3 noce",
  },
  {
    name: "Sezon wysoki",
    period: "Lipiec - Sierpień",
    priceRange: "od 490 zł / noc",
    note: "Minimum 7 nocy",
    featured: true,
  },
  {
    name: "Święta i długie weekendy",
    period: "Wielkanoc, Majówka, Boże Narodzenie",
    priceRange: "od 300 zł / noc",
    note: "Minimum 3 noce",
  },
];

const Pricing = () => {
  const phoneLink = `tel:${globalSettings.mainContactPhone.replace(/\s/g, "")}`;

  return (
    <section id="cennik" className="section-padding gradient-sand">
      <div className="container-wide mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full">
            Cennik
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Cennik na sezon 2025/2026
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-2">
            Ceny orientacyjne. Dokładną wycenę uzyskasz kontaktując się telefonicznie.
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
                  Najpopularniejszy
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
            Zapytaj o dokładną cenę i dostępność terminów
          </p>
          <Button asChild variant="hero" size="xl">
            <a href={phoneLink}>
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Zadzwoń: {globalSettings.mainContactPhone}</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
