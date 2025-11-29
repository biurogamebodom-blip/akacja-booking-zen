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
    author: "Paulina S.M.",
    source: "Nocowanie.pl",
  },
  {
    rating: "7.3/10",
    text: "Domki bardzo wygodne z całym wyposażeniem. Byliśmy tam rodzinnie i miło wspominamy ten pobyt. Właściciel bardzo miły i uczynny.",
    author: "Anna Piotrowska",
    source: "Nocowanie.pl",
  },
  {
    rating: "9/10",
    text: "Domki ładne i czyste. Świetne miejsce dla osób lubiących spacery, mili i pomocni właściciele.",
    author: "Marta",
    source: "Nocowanie.pl",
  },
  {
    rating: "9.6/10",
    text: "Dobra miejscówka, dla osób lubiących spacery w sam raz. Przewiewne ustronne miejsce z ładnymi widokami na okolicę.",
    author: "Bogusia",
    source: "Nocowanie.pl",
  },
  {
    rating: "10/10",
    text: "Świetne miejsce, wspaniała lokalizacja (z dala od zgiełku - na ogródkach cisza i spokój), domki czyste i ładnie urządzone, do morza blisko (właściciel podwozi meleksem).",
    author: "Piotr",
    source: "Nocowanie.pl",
  },
  {
    rating: "10/10",
    text: "W apartamentach Akacja spędziliśmy długi weekend. Apartamenty świetne, czyste, zadbane. W kuchni sprzęt bardzo dobrej jakości, wszystko co potrzeba.",
    author: "Ewa Czajka",
    source: "Nocowanie.pl",
  },
  {
    rating: "10/10",
    text: "Polecam bardzo!!!!",
    author: "Daniel",
    source: "Nocowanie.pl",
  },
  {
    rating: "10/10",
    text: "Bardzo przyjemne miejsce, z dala od zgiełku. Domki dobrze wyposażone, czyściutkie. Idealne miejsce do wypoczynku.",
    author: "Magdalena",
    source: "Nocowanie.pl",
  },
  {
    rating: "10/10",
    text: "Ładnie urządzone wnętrze, przyjemna atmosfera, możliwość podwózki meleksem nad morze. Wszystko zgodne z ofertą, jesteśmy bardzo zadowoleni i bardzo polecamy!!",
    author: "Oliwka",
    source: "Nocowanie.pl",
  },
];

export const navItems = [
  { href: "#apartamenty", label: "Apartamenty" },
  { href: "#galeria", label: "Galeria" },
  { href: "#cennik", label: "Cennik" },
  { href: "#opinie", label: "Opinie" },
  { href: "#kontakt", label: "Kontakt" },
];
