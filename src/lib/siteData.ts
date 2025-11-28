// Static site data for Apartamenty Akacja

export const globalSettings = {
  mainContactPhone: "505 445 353",
  secondaryContactPhone: "502 501 453",
  mapsLink: "https://goo.gl/maps/JMdRH2C6rQWjs8oM7",
  audioWelcomeUrl: "", // Placeholder for Eleven Labs MP3
  siteName: "Apartamenty Akacja",
  siteDescription: "Apartamenty Akacja w Sianożętach/Ustroniu Morskim. Sprawdź dostępność i cennik na sezon 2024/2025. Komfortowe domki dla rodzin.",
  address: "ul. Akacjowa 4 i 6, Ustronie Morskie / Sianożęty",
};

export const apartment = {
  namePL: "Apartamenty Akacja",
  descriptionPL: `Odkryj spokój i komfort w Apartamentach Akacja! Apartamenty są dwupoziomowe, oferując komfortowy pobyt dla 4-5 osób. Posiadają oddzielne wejście oraz taras. Na parterze: przestronny salon, TV 32", aneks kuchenny (indukcja, lodówka). Na piętrze: dwie sypialnie. Adres: Ustronie Morskie / Sianożęty, ul. Akacjowa 4 i 6.`,
  checkInTimes: "Zameldowanie: 15:00 - 22:00. Wymeldowanie: do 10:00.",
  feesPL: "Opłata serwisowa: 200 zł. Opłata klimatyczna: 2 zł/os. Kaucja za brak porządku: 100 zł.",
  paymentMethodsPL: ["gotówka", "płatność przelewem"],
  acceptedCurrencies: ["PLN", "USD", "EUR"],
  smokingPolicyPL: "Całkowity zakaz palenia wewnątrz. Wyznaczone miejsca na zewnątrz.",
  features: [
    { icon: "users", label: "4-5 osób" },
    { icon: "home", label: "Dwupoziomowy" },
    { icon: "door-open", label: "Oddzielne wejście" },
    { icon: "sun", label: "Taras" },
    { icon: "tv", label: 'TV 32"' },
    { icon: "utensils", label: "Aneks kuchenny" },
    { icon: "bed", label: "2 sypialnie" },
    { icon: "car", label: "Parking" },
  ],
};

export const reviews = [
  {
    rating: "10/10",
    text: "Bardzo polecam. Domek czysty, zgodny z opisem. Sympatyczny i pomocny gospodarz.",
    author: "Paulina SKONIECZNA-MASTERNAK",
  },
  {
    rating: "10/10",
    text: "Świetne miejsce, wspaniała lokalizacja (z dala od zgiełku), domki czyste i ładnie urządzone, do morza blisko.",
    author: "Piotr",
  },
  {
    rating: "10/10",
    text: "W apartamentach Akacja spędziliśmy długi weekend wraz z dziećmi. Apartamenty świetne, czyste, zadbane. W kuchni sprzęt bardzo dobrej jakości.",
    author: "Ewa Czajka",
  },
  {
    rating: "10/10",
    text: "Bardzo przyjemne miejsce, z dala od zgiełku. Domki dobrze wyposażone, czyściutkie. Idealne miejsce do wypoczynku.",
    author: "Magdalena",
  },
  {
    rating: "9.6/10",
    text: "Dobra miejscówka, dla osób lubiących spacery w sam raz. Przewiewne ustronne miejsce z ładnymi widokami na okolice.",
    author: "Bogusia",
  },
];

export const navItems = [
  { href: "#apartamenty", label: "Apartamenty" },
  { href: "#galeria", label: "Galeria" },
  { href: "#cennik", label: "Cennik" },
  { href: "#opinie", label: "Opinie" },
  { href: "#kontakt", label: "Kontakt" },
];
