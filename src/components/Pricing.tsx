import { Phone, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { globalSettings, apartment } from "@/lib/siteData";

const pricingSeasons = [
  {
    name: "Sezon niski",
    period: "Wrzesień - Maj (poza świętami)",
    priceRange: "od 180 zł / noc",
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
    priceRange: "od 350 zł / noc",
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
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent bg-accent/10 rounded-full">
            Cennik
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Cennik na sezon 2024/2025
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ceny orientacyjne. Dokładną wycenę uzyskasz kontaktując się telefonicznie.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricingSeasons.map((season, index) => (
            <div
              key={index}
              className={`relative bg-card p-6 rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 ${
                season.featured
                  ? "border-2 border-accent ring-2 ring-accent/20"
                  : ""
              }`}
            >
              {season.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                  Najpopularniejszy
                </span>
              )}
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-accent" />
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {season.name}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {season.period}
              </p>
              <p className="text-2xl font-bold text-accent mb-2">
                {season.priceRange}
              </p>
              <p className="text-sm text-muted-foreground">{season.note}</p>
            </div>
          ))}
        </div>

        {/* Additional Fees Info */}
        <div className="bg-card p-6 md:p-8 rounded-xl shadow-soft mb-12">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-accent/10 rounded-lg shrink-0">
              <Info className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                Dodatkowe opłaty
              </h3>
              <p className="text-muted-foreground mb-4">{apartment.feesPL}</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Akceptowane formy płatności: {apartment.paymentMethodsPL.join(", ")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Akceptowane waluty: {apartment.acceptedCurrencies.join(", ")}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-lg text-foreground mb-6">
            Zapytaj o dokładną cenę i dostępność terminów
          </p>
          <Button asChild variant="hero" size="xl">
            <a href={phoneLink}>
              <Phone className="w-5 h-5" />
              Zadzwoń: {globalSettings.mainContactPhone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
