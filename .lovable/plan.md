## Cel
Osadzić dostarczony widget Mobile Calendar Booking Engine (`mcbe-widget`) w aplikacji React jako nowa sekcja rezerwacji online.

## Dostarczony kod widgetu

````text
<link rel="stylesheet" href="https://api.mobile-calendar.com/v1/static/css/mcbe-widget.min.css">
<script src="https://api.mobile-calendar.com/v1/static/js/mcbe-widget.min.js"></script>
<div class="mcbe-widget-searchbar"
     data-token="5372209f668c1c8605c3d8532655e2211676"
     data-room-id="25374,25375,25378,25379,25380">
</div>
````

## Zmiany

### 1. Nowy komponent: `src/components/BookingWidget.tsx`
- Dynamiczne wstrzyknięcie `<link>` i `<script>` z `api.mobile-calendar.com` za pomocą `useEffect` + `document.head` / `document.body`.
- Renderowanie kontenera `<div>` z klasą `mcbe-widget-searchbar` i atrybutami `data-token` / `data-room-id`.
- Cleanup w `useEffect`: usuwanie dodanych elementów DOM po odmontowaniu komponentu.
- Kontener opakowany w sekcję ze stylem zgodnym z design systemem (Tailwind semantic tokens).

### 2. Nowa sekcja na stronie głównej (`src/pages/Index.tsx`)
- Dodanie `<BookingWidget />` jako sekcji `#rezerwacja` pomiędzy `<Pricing />` a `<Reviews />`.
- Lazy import komponentu `BookingWidget` (jak pozostałe sekcje poniżej folda).

### 3. Nawigacja (`src/components/Header.tsx` + `src/lib/siteData.ts`)
- Dodanie pozycji nawigacyjnej "Rezerwacja" / "Booking" z linkiem `#rezerwacja` do `navItems` w obu plikach.
- Uwaga: komponent `Header.tsx` ma własną tablicę `navItems`, która musi zostać zsynchronizowana.

### 4. Tłumaczenia (`src/contexts/LanguageContext.tsx`)
- Dodanie kluczy:
  - `nav.booking` → "Rezerwacja" (PL) / "Booking" (EN)
  - `booking.badge` → "Rezerwacja online"
  - `booking.title` → "Sprawdź dostępność i zarezerwuj"
  - `booking.subtitle` → krótki opis sekcji

### 5. Responsywność
- Widget z Mobile Calendar jest responsywny, ale kontener powinien mieć właściwe paddingi i max-width na desktopie (np. `container-wide`).
- Sekcja widoczna zarówno na mobile, jak i desktop (zgodnie z wcześniejszymi wymaganiami).

## Techniczne uwagi
- Nie wymaga backendu ani migracji bazy danych — wszystko odbywa się po stronie zewnętrznego widgetu.
- Nie wymaga dodatkowych paczek npm — widget ładowany z CDN.
- W przypadku problemów z inicjalizacją widgetu (np. JS z CDN nie zdąży się załadować przed renderem diva), rozważymy opóźnienie renderowania diva lub nasłuchiwanie `onload` skryptu.