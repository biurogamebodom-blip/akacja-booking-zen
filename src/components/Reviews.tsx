import { Star, Quote } from "lucide-react";
import { reviews } from "@/lib/siteData";

const Reviews = () => {
  return (
    <section id="opinie" className="section-padding bg-background">
      <div className="container-wide mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent bg-accent/10 rounded-full">
            Opinie
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Co mówią nasi goście
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Poznaj opinie osób, które spędziły u nas wakacje
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <article
              key={index}
              className="bg-card p-6 rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 relative"
            >
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
              <blockquote className="text-foreground mb-4 leading-relaxed">
                "{review.text}"
              </blockquote>

              {/* Author */}
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-semibold">
                    {review.author.charAt(0)}
                  </span>
                </div>
                <cite className="not-italic text-muted-foreground font-medium">
                  {review.author}
                </cite>
              </footer>
            </article>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/5 rounded-full">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-foreground font-semibold">
              Średnia ocena: 9.9/10
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
