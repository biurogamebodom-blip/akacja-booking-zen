import { Users, Home, DoorOpen, Sun, Tv, UtensilsCrossed, Bed, Car, Phone, CreditCard, Clock, Ban } from "lucide-react";
import { apartment, globalSettings } from "@/lib/siteData";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  home: Home,
  "door-open": DoorOpen,
  sun: Sun,
  tv: Tv,
  utensils: UtensilsCrossed,
  bed: Bed,
  car: Car,
};

const ApartmentDetails = () => {
  const phoneLink = `tel:${globalSettings.mainContactPhone.replace(/\s/g, "")}`;

  return (
    <section id="apartamenty" className="section-padding gradient-sand">
      <div className="container-wide mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent bg-accent/10 rounded-full">
            O nas
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {apartment.namePL}
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            {apartment.descriptionPL}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {apartment.features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <div
                key={index}
                className="bg-card p-6 rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 text-center group"
              >
                {IconComponent && (
                  <IconComponent className="w-8 h-8 mx-auto mb-3 text-accent group-hover:scale-110 transition-transform" />
                )}
                <span className="text-foreground font-medium">{feature.label}</span>
              </div>
            );
          })}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Check-in Times */}
          <div className="bg-card p-6 rounded-xl shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Godziny
              </h3>
            </div>
            <p className="text-muted-foreground">{apartment.checkInTimes}</p>
          </div>

          {/* Fees */}
          <div className="bg-card p-6 rounded-xl shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <CreditCard className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Opłaty
              </h3>
            </div>
            <p className="text-muted-foreground mb-3">{apartment.feesPL}</p>
            <p className="text-sm text-muted-foreground">
              <strong>Płatności:</strong> {apartment.paymentMethodsPL.join(", ")}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Waluty:</strong> {apartment.acceptedCurrencies.join(", ")}
            </p>
          </div>

          {/* Smoking Policy */}
          <div className="bg-card p-6 rounded-xl shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Ban className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Palenie
              </h3>
            </div>
            <p className="text-muted-foreground">{apartment.smokingPolicyPL}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild variant="cta" size="xl">
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

export default ApartmentDetails;
