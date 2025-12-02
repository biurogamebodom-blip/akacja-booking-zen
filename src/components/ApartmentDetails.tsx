import { Users, Bike, DoorOpen, Sun, UtensilsCrossed, Bed, Car, Phone, CreditCard, Clock, Ban, Wifi } from "lucide-react";
import { apartment, globalSettings } from "@/lib/siteData";
import { Button } from "@/components/ui/button";
import jacuzziIcon from "@/assets/icons/jacuzzi-icon.png";

const iconMap: Record<string, React.ComponentType<{ className?: string }> | string> = {
  users: Users,
  bike: Bike,
  "door-open": DoorOpen,
  sun: Sun,
  utensils: UtensilsCrossed,
  bed: Bed,
  car: Car,
  wifi: Wifi,
  jacuzzi: jacuzziIcon,
};

const ApartmentDetails = () => {
  const phoneLink = `tel:${globalSettings.mainContactPhone.replace(/\s/g, "")}`;

  return (
    <section id="apartamenty" className="section-padding gradient-sand overflow-x-hidden">
      <div className="container-wide mx-auto px-4">
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

        {/* Features Grid - Mobile optimized */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-8 md:mb-12">
          {apartment.features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            const isCustomIcon = typeof IconComponent === "string";
            return (
              <div
                key={index}
                className="bg-card p-3 sm:p-4 md:p-6 rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 text-center group touch-target min-h-[90px] sm:min-h-[100px] flex flex-col items-center justify-center"
              >
                <div className="flex items-center justify-center mb-2 sm:mb-3 h-8 sm:h-10 md:h-12">
                  {IconComponent && (
                    isCustomIcon ? (
                      <img 
                        src={IconComponent} 
                        alt={feature.label} 
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 group-hover:scale-110 transition-transform object-contain"
                      />
                    ) : (
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent group-hover:scale-110 transition-transform" />
                    )
                  )}
                </div>
                <span className="text-foreground font-medium text-xs sm:text-sm md:text-base leading-tight block">
                  {feature.label}
                  {feature.sublabel && <span className="text-muted-foreground font-normal block text-[10px] sm:text-xs md:text-sm mt-0.5">{feature.sublabel}</span>}
                </span>
              </div>
            );
          })}
        </div>

        {/* Info Cards - Mobile optimized */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-12">
          {/* Check-in Times */}
          <div className="bg-card p-3 sm:p-5 md:p-6 rounded-xl shadow-soft overflow-hidden">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
              <div className="p-1.5 sm:p-2 bg-accent/10 rounded-lg flex-shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <h3 className="font-serif text-base sm:text-lg md:text-xl font-semibold text-foreground">
                Godziny
              </h3>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base break-words">{apartment.checkInTimes}</p>
          </div>

          {/* Fees */}
          <div className="bg-card p-3 sm:p-5 md:p-6 rounded-xl shadow-soft overflow-hidden">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
              <div className="p-1.5 sm:p-2 bg-accent/10 rounded-lg flex-shrink-0">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <h3 className="font-serif text-base sm:text-lg md:text-xl font-semibold text-foreground">
                Opłaty
              </h3>
            </div>
            <p className="text-muted-foreground mb-2 md:mb-3 text-xs sm:text-sm md:text-base break-words">{apartment.feesPL}</p>
            <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground break-words">
              <strong>Płatności:</strong> {apartment.paymentMethodsPL.join(", ")}
            </p>
            <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground break-words">
              <strong>Waluty:</strong> {apartment.acceptedCurrencies.join(", ")}
            </p>
          </div>

          {/* Smoking Policy */}
          <div className="bg-card p-3 sm:p-5 md:p-6 rounded-xl shadow-soft sm:col-span-2 lg:col-span-1 overflow-hidden">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
              <div className="p-1.5 sm:p-2 bg-accent/10 rounded-lg flex-shrink-0">
                <Ban className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <h3 className="font-serif text-base sm:text-lg md:text-xl font-semibold text-foreground">
                Palenie
              </h3>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base break-words">{apartment.smokingPolicyPL}</p>
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
