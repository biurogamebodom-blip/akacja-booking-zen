import { Users, Bike, DoorOpen, Sun, UtensilsCrossed, Bed, Car, Phone, CreditCard, Clock, Ban, Wifi } from "lucide-react";
import { apartment, globalSettings } from "@/lib/siteData";
import { Button } from "@/components/ui/button";
import jacuzziIcon from "@/assets/icons/jacuzzi-icon.png";

const iconMap: Record<string, React.ComponentType<{ className?: string }> | string> = {
  users: Users,
  bike: Bike,
  "door-open": DoorOpen,
  sun: Sun,
  jacuzzi: jacuzziIcon,
  utensils: UtensilsCrossed,
  bed: Bed,
  car: Car,
  wifi: Wifi,
};

const ApartmentDetails = () => {
  const phoneLink = `tel:${globalSettings.mainContactPhone.replace(/\s/g, "")}`;

  return (
    <section id="apartamenty" className="section-padding gradient-sand">
      <div className="container-wide mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full">
            O nas
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            {apartment.namePL}
          </h2>
          <div className="max-w-3xl mx-auto mb-4 px-2">
            <p className="text-foreground font-semibold text-sm sm:text-base md:text-lg">
              {apartment.addressLabel}
            </p>
            <p className="text-accent font-bold text-base sm:text-lg md:text-xl">
              {apartment.addressValue}
            </p>
          </div>
          <p className="text-muted-foreground max-w-3xl mx-auto text-sm sm:text-base md:text-lg px-2 whitespace-pre-line">
            {apartment.descriptionPL}
          </p>
        </div>

        {/* Features Grid - Tablet optimized */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-8 md:mb-12">
          {apartment.features.map((feature, index) => {
            const iconValue = iconMap[feature.icon];
            const isImageIcon = typeof iconValue === 'string';
            const IconComponent = !isImageIcon ? iconValue as React.ComponentType<{ className?: string }> : null;
            
            return (
              <div
                key={index}
                className="bg-card p-2 sm:p-4 md:p-6 rounded-lg sm:rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 text-center group touch-target min-h-[70px] sm:min-h-0 flex flex-col items-center justify-center"
              >
                {isImageIcon ? (
                  <img 
                    src={iconValue as string} 
                    alt={feature.label}
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mb-1 sm:mb-2 md:mb-3 group-hover:scale-110 transition-transform object-contain"
                  />
                ) : IconComponent && (
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mb-1 sm:mb-2 md:mb-3 text-accent group-hover:scale-110 transition-transform" />
                )}
                <span className="text-foreground font-medium text-[10px] sm:text-sm md:text-base leading-tight block break-words hyphens-auto">{feature.label}</span>
              </div>
            );
          })}
        </div>

        {/* Info Cards - Tablet optimized */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {/* Check-in Times */}
          <div className="bg-card p-4 sm:p-5 md:p-6 rounded-xl shadow-soft">
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground">
                Godziny
              </h3>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base">{apartment.checkInTimes}</p>
          </div>

          {/* Fees */}
          <div className="bg-card p-4 sm:p-5 md:p-6 rounded-xl shadow-soft">
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground">
                Opłaty
              </h3>
            </div>
            <p className="text-muted-foreground mb-2 md:mb-3 text-sm sm:text-base">{apartment.feesPL}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              <strong>Płatności:</strong> {apartment.paymentMethodsPL.join(", ")}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              <strong>Waluty:</strong> {apartment.acceptedCurrencies.join(", ")}
            </p>
          </div>

          {/* Smoking Policy */}
          <div className="bg-card p-4 sm:p-5 md:p-6 rounded-xl shadow-soft sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Ban className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground">
                Palenie
              </h3>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base">{apartment.smokingPolicyPL}</p>
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
