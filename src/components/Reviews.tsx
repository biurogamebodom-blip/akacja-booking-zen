import { Star, Quote, ExternalLink } from "lucide-react";
import { reviews } from "@/lib/siteData";
import { useEffect } from "react";
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

  // Load Trustindex widget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?4abc86a59cf05165442637645a5';
    script.defer = true;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="opinie" className="section-padding bg-background">
      <div className="container-wide mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full">
            Opinie z Nocowanie.pl
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Co mówią nasi goście
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-2">
            Poznaj opinie osób, które spędziły u nas wakacje
          </p>
        </div>

        {/* Reviews Carousel - Tablet optimized */}
        <div className="px-2 sm:px-8 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 sm:-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="pl-3 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <article className="bg-card p-4 sm:p-5 md:p-6 rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 relative h-full flex flex-col">
                    {/* Quote Icon */}
                    <Quote className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 text-accent/20" />
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 sm:w-4 sm:h-4 fill-accent text-accent"
                          />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-accent">
                        {review.rating}
                      </span>
                    </div>

                    {/* Review Text */}
                    <blockquote className="text-foreground mb-3 sm:mb-4 leading-relaxed flex-grow text-sm sm:text-base">
                      "{review.text}"
                    </blockquote>

                    {/* Author & Source */}
                    <footer className="flex items-center justify-between gap-2 sm:gap-3 mt-auto pt-3 sm:pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-accent font-semibold text-sm sm:text-base">
                            {review.author.charAt(0)}
                          </span>
                        </div>
                        <cite className="not-italic text-muted-foreground font-medium text-sm sm:text-base truncate">
                          {review.author}
                        </cite>
                      </div>
                      <span className="text-xs text-muted-foreground/70 flex-shrink-0">
                        {review.source}
                      </span>
                    </footer>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Mobile: arrows below carousel, Desktop: arrows on sides */}
            <div className="flex sm:hidden justify-center gap-4 mt-4">
              <CarouselPrevious className="static translate-x-0 translate-y-0 h-10 w-10" />
              <CarouselNext className="static translate-x-0 translate-y-0 h-10 w-10" />
            </div>
            <CarouselPrevious className="hidden sm:flex -left-4 md:-left-6 h-10 w-10 sm:h-12 sm:w-12" />
            <CarouselNext className="hidden sm:flex -right-4 md:-right-6 h-10 w-10 sm:h-12 sm:w-12" />
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
        <div className="mt-6 pt-5 border-t border-border/30">
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

          {/* Trustindex Widget Container */}
          <div className="flex justify-center mb-1">
            <div className="w-full max-w-4xl">
              {/* Trustindex widget will be automatically loaded here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
