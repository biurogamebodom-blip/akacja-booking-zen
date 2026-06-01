# Plan

Problem nie jest w aktualnym kodzie aplikacji: w bieżącej publikacji projektu zakładka **Rezerwacja** jest widoczna. Brakuje jej tylko na `www.apartamentyakacja.pl`, więc ta domena pokazuje starszy deploy.

## Co zrobię po zatwierdzeniu

1. Ustawię właściwe źródło publikacji dla domeny `apartamentyakacja.pl`.
2. Jeśli domena ma działać przez Vercel, sprawdzę konfigurację deployu i dopnę ją do najnowszej wersji kodu.
3. Jeśli domena ma wskazywać na publikację Lovable, przygotuję właściwy kierunek publikacji zamiast starego wdrożenia.
4. Zweryfikuję końcowo na domenie, że w menu widać **Rezerwacja** i że link prowadzi do sekcji rezerwacji.

## Szczegóły techniczne

- `src/components/Header.tsx` już zawiera pozycję `#rezerwacja`.
- `src/pages/Index.tsx` już renderuje `BookingWidget`.
- `akacja-booking-zen.lovable.app` pokazuje poprawne menu z zakładką **Rezerwacja**.
- `www.apartamentyakacja.pl` pokazuje starszą wersję bez tej zakładki.

## Oczekiwany efekt

Po wdrożeniu domena `apartamentyakacja.pl` będzie wyświetlać tę samą aktualną wersję strony co najnowsza publikacja, razem z zakładką **Rezerwacja**.