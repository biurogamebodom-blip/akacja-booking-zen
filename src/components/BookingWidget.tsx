import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const CSS_HREF = "https://api.mobile-calendar.com/v1/static/css/mcbe-widget.min.css";
const JS_SRC = "https://api.mobile-calendar.com/v1/static/js/mcbe-widget.min.js";

const BookingWidget = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject CSS once
    if (!document.querySelector(`link[href="${CSS_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = CSS_HREF;
      document.head.appendChild(link);
    }

    // Inject JS once
    if (!document.querySelector(`script[src="${JS_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = JS_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="rezerwacja" className="py-16 md:py-24 bg-background">
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
            {t("booking.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("booking.title")}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("booking.subtitle")}
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-soft border border-border/50 p-4 md:p-6">
          <div
            ref={containerRef}
            className="mcbe-widget-searchbar"
            data-token="5372209f668c1c8605c3d8532655e2211676"
            data-room-id="25374,25375,25378,25379,25380"
          />
        </div>
      </div>
    </section>
  );
};

export default BookingWidget;
