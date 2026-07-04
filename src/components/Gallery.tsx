import { useState, useCallback, memo } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// Gallery images
import gallery01 from "@/assets/gallery/01-widok-zewnetrzny-new.jpg?format=webp&w=800";
import gallery02 from "@/assets/gallery/02-salon-kuchnia-new.png?format=webp&w=800";
import gallery03 from "@/assets/gallery/03-salon-schody-new.jpeg?format=webp&w=800";
import gallery04 from "@/assets/gallery/04-kuchnia-jadalnia.jpeg?format=webp&w=800";
import gallery05 from "@/assets/gallery/05-sypialnia.jpeg?format=webp&w=800";
import gallery06 from "@/assets/gallery/06-taras.png?format=webp&w=800";
import gallery07 from "@/assets/gallery/07-pergola-new.jpg?format=webp&w=800";
import gallery08 from "@/assets/gallery/08-plac-zabaw.png?format=webp&w=800";
import gallery09 from "@/assets/gallery/09-jacuzzi.jpg?format=webp&w=800";

const galleryImages = [
  { id: 1, src: gallery01, altPL: "Widok zewnętrzny apartamentów Akacja", altEN: "Exterior view of Akacja apartments" },
  { id: 2, src: gallery02, altPL: "Salon z aneksem kuchennym i drewnianymi belkami", altEN: "Living room with kitchenette and wooden beams" },
  { id: 3, src: gallery03, altPL: "Przestronny salon z drewnianymi ścianami i schodami na piętro", altEN: "Spacious living room with wooden walls and stairs" },
  { id: 4, src: gallery04, altPL: "Kuchnia z jadalnią w drewnianym stylu", altEN: "Kitchen with dining area in wooden style" },
  { id: 5, src: gallery05, altPL: "Sypialnia na poddaszu z dwoma łóżkami", altEN: "Attic bedroom with two beds" },
  { id: 6, src: gallery06, altPL: "Taras z meblami ogrodowymi", altEN: "Terrace with garden furniture" },
  { id: 7, src: gallery07, altPL: "Pergola z ławką i widok na osiedle", altEN: "Pergola with bench and estate view" },
  { id: 8, src: gallery08, altPL: "Plac zabaw dla dzieci z huśtawkami i altaną", altEN: "Children's playground with swings and gazebo" },
  { id: 9, src: gallery09, altPL: "Jacuzzi zewnętrzne", altEN: "Outdoor jacuzzi" },
];

// Memoized gallery image component for performance
const GalleryImage = memo(({ image, index, onClick, language }: { 
  image: typeof galleryImages[0]; 
  index: number; 
  onClick: (index: number) => void;
  language: string;
}) => (
  <button
    onClick={() => onClick(index)}
    className="relative aspect-[4/3] overflow-hidden rounded-xl group focus-ring touch-target"
    aria-label={`Open photo: ${language === "pl" ? image.altPL : image.altEN}`}
  >
    <img
      src={image.src}
      alt={language === "pl" ? image.altPL : image.altEN}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-focus:scale-105"
      loading="lazy"
      decoding="async"
      width={600}
      height={450}
    />
    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 group-focus:bg-navy/20 transition-colors duration-300" />
  </button>
));

GalleryImage.displayName = "GalleryImage";

const Gallery = () => {
  const { t, language } = useLanguage();
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
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full">
            {t("gallery.badge")}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            {t("gallery.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-2">
            {t("gallery.subtitle")}
          </p>
        </div>

        {/* Gallery Grid - 3 columns layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {galleryImages.map((image, index) => (
            <GalleryImage 
              key={image.id} 
              image={image} 
              index={index} 
              onClick={openLightbox}
              language={language}
            />
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={t("gallery.badge")}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-background hover:text-accent hover:bg-background/10"
              aria-label={t("gallery.close")}
            >
              <X className="w-8 h-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateLightbox("prev")}
              className="absolute left-4 text-background hover:text-accent hover:bg-background/10"
              aria-label={t("gallery.prev")}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <img
              src={galleryImages[selectedImage].src}
              alt={language === "pl" ? galleryImages[selectedImage].altPL : galleryImages[selectedImage].altEN}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateLightbox("next")}
              className="absolute right-4 text-background hover:text-accent hover:bg-background/10"
              aria-label={t("gallery.next")}
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
