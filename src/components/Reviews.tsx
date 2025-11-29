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
              href="https://www.nocowanie.pl/noclegi/ustronie_morskie/domki/192791/opinie,1.html"
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
              Cenimy zdanie naszych gości. Zobacz, co piszą o nas na Google!
            </p>
          </div>

          {/* Elfsight Widget Container */}
          <div className="flex justify-center mb-8">
            <div 
              className="elfsight-app-placeholder w-full max-w-4xl min-h-[300px] bg-card/50 rounded-xl flex items-center justify-center border border-dashed border-border"
            >
              {/* 
                Wklej tutaj kod Elfsight widget, np:
                <div class="elfsight-app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" data-elfsight-app-lazy></div>
              */}
              <div className="text-center p-8">
                <p className="text-muted-foreground mb-4">
                  Widget Google Reviews zostanie tutaj wyświetlony
                </p>
                <a
                  href="https://share.google/IaIgXXGGeDDwpqs7D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl shadow-soft hover:bg-accent/90 transition-all duration-300 font-semibold"
                >
                  <Star className="w-5 h-5" />
                  Zobacz opinie Google
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
