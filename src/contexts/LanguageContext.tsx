import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "pl" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  pl: {
    // Navigation
    "nav.apartments": "Apartamenty",
    "nav.gallery": "Galeria",
    "nav.pricing": "Cennik",
    "nav.reviews": "Opinie",
    "nav.contact": "Kontakt",
    
    // Hero
    "hero.location": "Sianożęty / Ustronie Morskie",
    "hero.title": "Apartamenty",
    "hero.titleAccent": "Akacja",
    "hero.subtitle": "Komfortowe apartamenty dwupoziomowe nad Bałtykiem. Wypoczynek bez barier dla całej rodziny – przystosowane dla wózków inwalidzkich oraz osób niewidomych i niedowidzących.",
    "hero.checkAvailability": "Sprawdź Termin",
    "hero.call": "Zadzwoń",
    "hero.guests": "4-5 osób",
    "hero.bedrooms": "2 sypialnie i salon",
    "hero.terrace": "Taras",
    "hero.beach": "15 min spacerem do morza",
    
    // Apartment Details
    "apartment.badge": "O nas",
    "apartment.title": "Odkryj Swój Nadmorski Azyl: Apartamenty Akacja!",
    "apartment.addressLabel": "Adres Twojego wymarzonego wypoczynku:",
    "apartment.addressValue": "Ustronie Morskie / Sianożęty, ul. Akacjowa 4 i 6",
    "apartment.description": `Oderwij się od codzienności i poczuj prawdziwy relaks! Apartamenty Akacja to nie tylko nocleg – to Twoja przestrzeń wypoczynku, dwupoziomowy apartament stworzony z myślą o pełnym komforcie Twojej rodziny lub grupy przyjaciół (idealne dla 4-5 osób).

Na Parterze, Sercu Domu: Przywita Cię przestronny salon. W pełni wyposażony aneks kuchenny (z płytą indukcyjną jednopalnikową, ekspresem, mikrofalową i lodówką). Wieczorem czeka na Was relaks przy smart TV 32" i Wi-fi 5G.

Twój Prywatny Taras: Wyjdź na zewnątrz i poczuj morską bryzę! Czekają na Ciebie osobne wejście i taras z zestawem wypoczynkowym – idealne miejsce.

Wypoczynek na Piętrze: Na górze znajdziesz dwie przytulne sypialnie z łóżkami pojedynczymi. (lub opcja z podwójnym łóżkiem)

Nie czekaj! Zarezerwuj już teraz swój pobyt nad Bałtykiem!`,
    "apartment.checkInTimes": "Zameldowanie: 15:00 - 22:00. Wymeldowanie: do 10:00.",
    "apartment.hours": "Godziny",
    "apartment.fees": "Opłaty",
    "apartment.feesText": "Opłata klimatyczna: 2 zł/os.",
    "apartment.payments": "Płatności",
    "apartment.paymentMethods": "gotówka, płatność przelewem",
    "apartment.currencies": "Waluty",
    "apartment.smoking": "Palenie",
    "apartment.smokingPolicy": "Całkowity zakaz palenia wewnątrz. Wyznaczone miejsca na zewnątrz.",
    "apartment.call": "Zadzwoń",
    
    // Features
    "feature.guests": "4-5 osób",
    "feature.bikes": "Bezpłatne rowery",
    "feature.entrance": "Oddzielne wejście",
    "feature.terrace": "Taras",
    "feature.jacuzzi": "Jacuzzi Sezonowe",
    "feature.jacuzziSeason": "Lipiec-Sierpień",
    "feature.kitchen": "Aneks kuchenny",
    "feature.bedrooms": "2 sypialnie i salon",
    "feature.parking": "Parking",
    "feature.wifi": "Internet WiFi 5G",
    
    // Gallery
    "gallery.badge": "Galeria",
    "gallery.title": "Zobacz nasze apartamenty",
    "gallery.subtitle": "Zapoznaj się z wnętrzami i otoczeniem Apartamentów Akacja",
    "gallery.close": "Zamknij galerię",
    "gallery.prev": "Poprzednie zdjęcie",
    "gallery.next": "Następne zdjęcie",
    
    // Pricing
    "pricing.badge": "Cennik",
    "pricing.title": "Cennik na sezon 2025/2026",
    "pricing.subtitle": "Ceny orientacyjne. Dokładną wycenę uzyskasz kontaktując się telefonicznie.",
    "pricing.lowSeason": "Sezon niski",
    "pricing.lowSeasonPeriod": "Wrzesień - Maj (poza świętami)",
    "pricing.lowSeasonPrice": "od 220 zł / noc",
    "pricing.lowSeasonNote": "Minimum 2 noce",
    "pricing.midSeason": "Sezon średni",
    "pricing.midSeasonPeriod": "Czerwiec, Wrzesień",
    "pricing.midSeasonPrice": "od 300 zł / noc",
    "pricing.midSeasonNote": "Minimum 3 noce",
    "pricing.highSeason": "Sezon wysoki",
    "pricing.highSeasonPeriod": "Lipiec - Sierpień",
    "pricing.highSeasonPrice": "od 490 zł / noc",
    "pricing.highSeasonNote": "Minimum 7 nocy",
    "pricing.holidays": "Święta i długie weekendy",
    "pricing.holidaysPeriod": "Wielkanoc, Majówka, Boże Narodzenie",
    "pricing.holidaysPrice": "od 350 zł / noc",
    "pricing.holidaysNote": "Minimum 3 noce",
    "pricing.mostPopular": "Najpopularniejszy",
    "pricing.cta": "Zapytaj o dokładną cenę i dostępność terminów",
    "pricing.call": "Zadzwoń",
    
    // Reviews
    "reviews.badge": "Opinie z Nocowanie.pl",
    "reviews.title": "Co mówią nasi goście",
    "reviews.subtitle": "Poznaj opinie osób, które spędziły u nas wakacje",
    "reviews.avgRating": "Średnia ocena",
    "reviews.reviewsCount": "opinii",
    "reviews.seeAll": "Zobacz wszystkie opinie na Nocowanie.pl",
    "reviews.googleBadge": "Opinie Google",
    "reviews.googleTitle": "Sprawdź nasze opinie w Google",
    "reviews.googleSubtitle": "Cenimy zdanie naszych gości. Zobacz, co piszą o nas na Google!",
    
    // Contact
    "contact.badge": "Kontakt",
    "contact.title": "Skontaktuj się z nami",
    "contact.subtitle": "Chętnie odpowiemy na wszystkie pytania i pomożemy zarezerwować termin",
    "contact.mainPhone": "Telefon główny",
    "contact.secondaryPhone": "Telefon dodatkowy",
    "contact.address": "Adres",
    "contact.seeOnMap": "Zobacz na mapie",
    "contact.callNow": "Zadzwoń teraz",
    "contact.nearby": "Co w okolicy?",
    "contact.shops": "Sklepy",
    "contact.gastronomy": "Gastronomia",
    "contact.beach": "Plaża",
    "contact.recreation": "Rekreacja",
    
    // Footer
    "footer.description": "Komfortowe apartamenty dwupoziomowe nad Bałtykiem. Wypoczynek bez barier dla całej rodziny.",
    "footer.quickLinks": "Szybkie linki",
    "footer.contact": "Kontakt",
    "footer.rights": "Wszelkie prawa zastrzeżone.",
    "footer.madeWith": "Stworzone z",
    "footer.byBaltic": "nad Bałtykiem",
    "footer.disclaimer": "Prezentowane treści mają charakter wyłącznie informacyjny i nie stanowią oferty handlowej w rozumieniu art. 66 § 1 Kodeksu cywilnego.",
    
    // Accessibility
    "a11y.increaseFontSize": "Zwiększ tekst",
    "a11y.decreaseFontSize": "Zmniejsz tekst",
    "a11y.highContrast": "Wysoki kontrast",
    "a11y.disableContrast": "Wyłącz kontrast",
    "a11y.largerSpacing": "Większe odstępy",
    "a11y.disableSpacing": "Wyłącz odstępy",
    "a11y.options": "Opcje dostępności",
    "a11y.listenInfo": "Odsłuchaj informacje o stronie",
    "a11y.stopListening": "Zatrzymaj odsłuchiwanie strony",
    "a11y.openMenu": "Otwórz menu",
    "a11y.closeMenu": "Zamknij menu",
  },
  en: {
    // Navigation
    "nav.apartments": "Apartments",
    "nav.gallery": "Gallery",
    "nav.pricing": "Pricing",
    "nav.reviews": "Reviews",
    "nav.contact": "Contact",
    
    // Hero
    "hero.location": "Sianożęty / Ustronie Morskie",
    "hero.title": "Apartments",
    "hero.titleAccent": "Akacja",
    "hero.subtitle": "Comfortable two-story apartments by the Baltic Sea. Barrier-free vacation for the whole family – wheelchair accessible and adapted for blind and visually impaired guests.",
    "hero.checkAvailability": "Check Availability",
    "hero.call": "Call",
    "hero.guests": "4-5 guests",
    "hero.bedrooms": "2 bedrooms & living room",
    "hero.terrace": "Terrace",
    "hero.beach": "15 min walk to the beach",
    
    // Apartment Details
    "apartment.badge": "About Us",
    "apartment.title": "Discover Your Seaside Retreat: Apartments Akacja!",
    "apartment.addressLabel": "Address of your dream vacation:",
    "apartment.addressValue": "Ustronie Morskie / Sianożęty, ul. Akacjowa 4 & 6",
    "apartment.description": `Escape the everyday and experience true relaxation! Apartments Akacja is not just accommodation – it's your relaxation space, a two-story apartment designed with complete comfort for your family or group of friends (ideal for 4-5 people).

On the Ground Floor, the Heart of the Home: You'll be greeted by a spacious living room. A fully equipped kitchenette (with a single-burner induction stove, coffee maker, microwave, and refrigerator). In the evening, relax with a 32" smart TV and 5G Wi-Fi.

Your Private Terrace: Step outside and feel the sea breeze! A separate entrance and terrace with outdoor furniture await you – the perfect spot.

Upstairs Retreat: Upstairs you'll find two cozy bedrooms with single beds (or option with a double bed).

Don't wait! Book your Baltic Sea getaway now!`,
    "apartment.checkInTimes": "Check-in: 3:00 PM - 10:00 PM. Check-out: by 10:00 AM.",
    "apartment.hours": "Hours",
    "apartment.fees": "Fees",
    "apartment.feesText": "Climate fee: 2 PLN/person.",
    "apartment.payments": "Payments",
    "apartment.paymentMethods": "cash, bank transfer",
    "apartment.currencies": "Currencies",
    "apartment.smoking": "Smoking",
    "apartment.smokingPolicy": "Complete smoking ban indoors. Designated areas outside.",
    "apartment.call": "Call",
    
    // Features
    "feature.guests": "4-5 guests",
    "feature.bikes": "Free bicycles",
    "feature.entrance": "Separate entrance",
    "feature.terrace": "Terrace",
    "feature.jacuzzi": "Seasonal Jacuzzi",
    "feature.jacuzziSeason": "July-August",
    "feature.kitchen": "Kitchenette",
    "feature.bedrooms": "2 bedrooms & living room",
    "feature.parking": "Parking",
    "feature.wifi": "WiFi 5G Internet",
    
    // Gallery
    "gallery.badge": "Gallery",
    "gallery.title": "See our apartments",
    "gallery.subtitle": "Explore the interiors and surroundings of Apartments Akacja",
    "gallery.close": "Close gallery",
    "gallery.prev": "Previous photo",
    "gallery.next": "Next photo",
    
    // Pricing
    "pricing.badge": "Pricing",
    "pricing.title": "Prices for 2025/2026 season",
    "pricing.subtitle": "Approximate prices. Contact us by phone for exact quotes.",
    "pricing.lowSeason": "Low season",
    "pricing.lowSeasonPeriod": "September - May (except holidays)",
    "pricing.lowSeasonPrice": "from 220 PLN / night",
    "pricing.lowSeasonNote": "Minimum 2 nights",
    "pricing.midSeason": "Mid season",
    "pricing.midSeasonPeriod": "June, September",
    "pricing.midSeasonPrice": "from 300 PLN / night",
    "pricing.midSeasonNote": "Minimum 3 nights",
    "pricing.highSeason": "High season",
    "pricing.highSeasonPeriod": "July - August",
    "pricing.highSeasonPrice": "from 490 PLN / night",
    "pricing.highSeasonNote": "Minimum 7 nights",
    "pricing.holidays": "Holidays & long weekends",
    "pricing.holidaysPeriod": "Easter, May holidays, Christmas",
    "pricing.holidaysPrice": "from 350 PLN / night",
    "pricing.holidaysNote": "Minimum 3 nights",
    "pricing.mostPopular": "Most popular",
    "pricing.cta": "Ask about exact prices and availability",
    "pricing.call": "Call",
    
    // Reviews
    "reviews.badge": "Reviews from Nocowanie.pl",
    "reviews.title": "What our guests say",
    "reviews.subtitle": "Read reviews from people who stayed with us",
    "reviews.avgRating": "Average rating",
    "reviews.reviewsCount": "reviews",
    "reviews.seeAll": "See all reviews on Nocowanie.pl",
    "reviews.googleBadge": "Google Reviews",
    "reviews.googleTitle": "Check our Google reviews",
    "reviews.googleSubtitle": "We value our guests' opinions. See what they write about us on Google!",
    
    // Contact
    "contact.badge": "Contact",
    "contact.title": "Get in touch",
    "contact.subtitle": "We're happy to answer all questions and help you book",
    "contact.mainPhone": "Main phone",
    "contact.secondaryPhone": "Secondary phone",
    "contact.address": "Address",
    "contact.seeOnMap": "See on map",
    "contact.callNow": "Call now",
    "contact.nearby": "What's nearby?",
    "contact.shops": "Shops",
    "contact.gastronomy": "Restaurants",
    "contact.beach": "Beach",
    "contact.recreation": "Recreation",
    
    // Footer
    "footer.description": "Comfortable two-story apartments by the Baltic Sea. Barrier-free vacation for the whole family.",
    "footer.quickLinks": "Quick links",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
    "footer.madeWith": "Made with",
    "footer.byBaltic": "by the Baltic Sea",
    "footer.disclaimer": "The presented content is for informational purposes only and does not constitute a commercial offer within the meaning of art. 66 § 1 of the Civil Code.",
    
    // Accessibility
    "a11y.increaseFontSize": "Increase text",
    "a11y.decreaseFontSize": "Decrease text",
    "a11y.highContrast": "High contrast",
    "a11y.disableContrast": "Disable contrast",
    "a11y.largerSpacing": "Larger spacing",
    "a11y.disableSpacing": "Disable spacing",
    "a11y.options": "Accessibility options",
    "a11y.listenInfo": "Listen to page information",
    "a11y.stopListening": "Stop listening",
    "a11y.openMenu": "Open menu",
    "a11y.closeMenu": "Close menu",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "pl";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
