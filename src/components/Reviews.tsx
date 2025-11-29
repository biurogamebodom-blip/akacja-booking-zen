import { Star, Quote, ExternalLink } from "lucide-react";
import { reviews } from "@/lib/siteData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Reviews = () => {
  // Calculate average rating
  const avgRating = (
    reviews.reduce((acc, r) => {
      const num = parseFloat(r.rating.split("/")[0]);
      return acc + num;
    }, 0) / reviews.length
  ).toFixed(1);

  return (
    <section id="opinie" className="section-padding bg-background">
      <div className="container-wide mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent bg-accent/10 rounded-full">
            Opinie z Nocowanie.pl
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Co mówią nasi goście
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Poznaj opinie osób, które spędziły u nas wakacje
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <article className="bg-card p-6 rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 relative h-full flex flex-col">
                    {/* Quote Icon */}
                    <Quote className="absolute top-4 right-4 w-8 h-8 text-accent/20" />
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-accent text-accent"
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-accent">
                        {review.rating}
                      </span>
                    </div>

                    {/* Review Text */}
                    <blockquote className="text-foreground mb-4 leading-relaxed flex-grow">
                      "{review.text}"
                    </blockquote>

                    {/* Author & Source */}
                    <footer className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                          <span className="text-accent font-semibold">
                            {review.author.charAt(0)}
                          </span>
                        </div>
                        <cite className="not-italic text-muted-foreground font-medium">
                          {review.author}
                        </cite>
                      </div>
                      <span className="text-xs text-muted-foreground/70">
                        {review.source}
                      </span>
                    </footer>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/5 rounded-full">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-foreground font-semibold">
              Średnia ocena: {avgRating}/10 ({reviews.length} opinii)
            </span>
          </div>
          
          {/* Link to Nocowanie.pl */}
          <div>
            <a
              href="https://www.nocowanie.pl/noclegi/ustronie_morskie/apartamenty/215444/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
            >
              Zobacz wszystkie opinie na Nocowanie.pl
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Google Reviews Section */}
        <div className="mt-16 pt-12 border-t border-border/30">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Opinie Google
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Sprawdź nasze opinie w Google
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Cenimy zdanie naszych gości. Zobacz, co piszą o nas na Google i podziel się swoją opinią po wizycie!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.google.com/search?q=Domki+Apartamenty+Akacja+-+Wynajem+domk%C3%B3w+letniskowych+Opinie&rflfq=1&rldimm=3724815992459303274&tbm=lcl&hl=pl-PL#lkt=LocalPoiReviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 bg-card rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <div className="text-left">
                <span className="block text-foreground font-semibold">Zobacz opinie Google</span>
                <span className="block text-sm text-muted-foreground">Apartamenty Akacja</span>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>

            <a
              href="https://www.google.com/search?q=Domki+Apartamenty+Akacja+-+Wynajem+domk%C3%B3w+letniskowych+Opinie&rflfq=1&rldimm=3724815992459303274&tbm=lcl&hl=pl-PL#lkt=LocalPoiReviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 bg-accent text-accent-foreground rounded-xl shadow-soft hover:bg-accent/90 transition-all duration-300 font-semibold"
            >
              <Star className="w-5 h-5" />
              Zostaw opinię
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
