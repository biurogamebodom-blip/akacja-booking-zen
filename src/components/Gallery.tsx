import { useState, useCallback, memo } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Gallery images
import gallery01 from "@/assets/gallery/01-widok-zewnetrzny.png";
import gallery02 from "@/assets/gallery/02-salon-kuchnia.jpeg";
import gallery03 from "@/assets/gallery/03-salon-schody.jpeg";
import gallery04 from "@/assets/gallery/04-kuchnia-jadalnia.jpeg";
import gallery05 from "@/assets/gallery/05-sypialnia.jpeg";
import gallery06 from "@/assets/gallery/06-taras.png";
import gallery07 from "@/assets/gallery/07-pergola.png";
import gallery08 from "@/assets/gallery/08-plac-zabaw.png";

const galleryImages = [
  {
    id: 1,
    src: gallery01,
    alt: "Widok zewnętrzny apartamentów Akacja",
  },
  {
    id: 2,
    src: gallery02,
    alt: "Salon z aneksem kuchennym i drewnianymi belkami",
  },
  {
    id: 3,
    src: gallery03,
    alt: "Przestronny salon z drewnianymi ścianami i schodami na piętro",
  },
  {
    id: 4,
    src: gallery04,
    alt: "Kuchnia z jadalnią w drewnianym stylu",
  },
  {
    id: 5,
    src: gallery05,
    alt: "Sypialnia na poddaszu z dwoma łóżkami",
  },
  {
    id: 6,
    src: gallery06,
    alt: "Taras z meblami ogrodowymi",
  },
  {
    id: 7,
    src: gallery07,
    alt: "Pergola z ławką i widok na osiedle",
  },
  {
    id: 8,
    src: gallery08,
    alt: "Plac zabaw dla dzieci z huśtawkami i altaną",
  },
];

// Memoized gallery image component for performance
const GalleryImage = memo(({ image, index, onClick }: { 
  image: typeof galleryImages[0]; 
  index: number; 
  onClick: (index: number) => void;
}) => (
  <button
    onClick={() => onClick(index)}
    className="relative aspect-[4/3] overflow-hidden rounded-xl group focus-ring touch-target"
    aria-label={`Otwórz zdjęcie: ${image.alt}`}
  >
    <img
      src={image.src}
      alt={image.alt}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-focus:scale-105"
      loading="lazy"
      decoding="async"
      fetchPriority={index < 4 ? "high" : "low"}
    />
    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 group-focus:bg-navy/20 transition-colors duration-300" />
  </button>
));

GalleryImage.displayName = "GalleryImage";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = "";
  }, []);

  const navigateLightbox = useCallback((direction: "prev" | "next") => {
    setSelectedImage(prev => {
      if (prev === null) return null;
      if (direction === "prev") {
        return prev === 0 ? galleryImages.length - 1 : prev - 1;
      }
      return prev === galleryImages.length - 1 ? 0 : prev + 1;
    });
  }, []);

  return (
    <section id="galeria" className="section-padding bg-background content-visibility-auto">
      <div className="container-wide mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent bg-accent/10 rounded-full">
            Galeria
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Zobacz nasze apartamenty
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Zapoznaj się z wnętrzami i otoczeniem Apartamentów Akacja
          </p>
        </div>

        {/* Gallery Grid - optimized for tablets */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {galleryImages.map((image, index) => (
            <GalleryImage 
              key={image.id} 
              image={image} 
              index={index} 
              onClick={openLightbox}
            />
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Powiększone zdjęcie"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-background hover:text-accent hover:bg-background/10"
              aria-label="Zamknij galerię"
            >
              <X className="w-8 h-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateLightbox("prev")}
              className="absolute left-4 text-background hover:text-accent hover:bg-background/10"
              aria-label="Poprzednie zdjęcie"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateLightbox("next")}
              className="absolute right-4 text-background hover:text-accent hover:bg-background/10"
              aria-label="Następne zdjęcie"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-background text-sm">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
