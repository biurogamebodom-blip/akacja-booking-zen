import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Placeholder images - in production, these would come from a CMS or database
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    alt: "Przestronny salon z widokiem na taras",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    alt: "Nowoczesna kuchnia z pełnym wyposażeniem",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    alt: "Sypialnia z wygodnym łóżkiem",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80",
    alt: "Druga sypialnia na piętrze",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    alt: "Widok na apartament z zewnątrz",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    alt: "Plaża w pobliżu apartamentów",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "";
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    
    if (direction === "prev") {
      setSelectedImage(
        selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
      );
    } else {
      setSelectedImage(
        selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1
      );
    }
  };

  return (
    <section id="galeria" className="section-padding bg-background">
      <div className="container-wide mx-auto">
        <div className="text-center mb-12">
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openLightbox(index)}
              className="relative aspect-[4/3] overflow-hidden rounded-xl group focus-ring"
              aria-label={`Otwórz zdjęcie: ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors duration-300" />
            </button>
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
