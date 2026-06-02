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

        <div className="bg-card rounded-2xl shadow-soft border border-border/50 p-2 md:p-3 mcbe-themed overflow-hidden max-w-3xl mx-auto">
          <div
            ref={containerRef}
            className="mcbe-widget-searchbar"
            data-token="5372209f668c1c8605c3d8532655e2211676"
            data-room-id="25374,25375,25378,25379,25380"
          />
        </div>
        <style>{`
          .mcbe-themed .mcbe-widget-searchbar,
          .mcbe-themed .mcbe-widget-searchbar * {
            font-family: 'Lato', system-ui, sans-serif !important;
          }
          .mcbe-themed .mcbe-widget-searchbar {
            background: hsl(var(--accent)) !important;
            border-radius: calc(var(--radius) - 4px) !important;
            width: 100% !important;
            display: flex !important;
            align-items: stretch !important;
            gap: 8px !important;
            padding: 10px !important;
            min-height: 72px !important;
          }
          .mcbe-themed .mcbe-widget-searchbar > *:first-child {
            flex: 1 1 auto;
          }
          /* Date pickers — white pill */
          .mcbe-themed .mcbe-widget-searchbar [class*="date"],
          .mcbe-themed .mcbe-widget-searchbar [class*="picker"]:not(button),
          .mcbe-themed .mcbe-widget-searchbar [class*="calendar"]:not(button) {
            background: hsl(var(--card)) !important;
            border-radius: 10px !important;
          }
          /* Search button — white pill with accent text, clearly distinct */
          .mcbe-themed .mcbe-widget-searchbar button,
          .mcbe-themed .mcbe-widget-searchbar .btn,
          .mcbe-themed .mcbe-widget-searchbar [class*="search"],
          .mcbe-themed .mcbe-widget-searchbar [class*="submit"],
          .mcbe-themed .mcbe-widget-searchbar [type="submit"] {
            background: hsl(var(--card)) !important;
            background-color: hsl(var(--card)) !important;
            border: none !important;
            color: hsl(var(--accent)) !important;
            border-radius: 10px !important;
            font-weight: 700 !important;
            padding: 0 28px !important;
            min-width: 160px !important;
            flex: 0 0 auto !important;
            transition: transform 0.2s ease, box-shadow 0.2s ease !important;
          }
          .mcbe-themed .mcbe-widget-searchbar button:hover,
          .mcbe-themed .mcbe-widget-searchbar .btn:hover,
          .mcbe-themed .mcbe-widget-searchbar [type="submit"]:hover {
            background: hsl(var(--card)) !important;
            background-color: hsl(var(--card)) !important;
            color: hsl(var(--sea-turquoise-dark)) !important;
            transform: translateY(-1px);
            box-shadow: 0 6px 16px hsl(0 0% 0% / 0.15) !important;
          }
          @media (max-width: 640px) {
            .mcbe-themed .mcbe-widget-searchbar {
              flex-direction: column !important;
            }
            .mcbe-themed .mcbe-widget-searchbar button,
            .mcbe-themed .mcbe-widget-searchbar [type="submit"] {
              width: 100% !important;
              min-height: 48px !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default BookingWidget;
