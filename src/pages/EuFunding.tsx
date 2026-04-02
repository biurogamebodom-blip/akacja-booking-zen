import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import euFundingLogos from "@/assets/logos/eu-funding-logos.png";

const EuFunding = () => {
  useEffect(() => {
    document.title = "Przyjazne Apartamenty Akacja - Fundusze Europejskie";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* EU Banner - repeated from footer */}
        <section className="bg-card py-8 md:py-12">
          <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
            <img
              src={euFundingLogos}
              alt="Logotypy: Krajowy Plan Odbudowy, Unia Europejska NextGenerationEU, PARP Grupa PFR, Polska Fundacja Przedsiębiorczości"
              className="w-full max-w-3xl mx-auto h-auto"
            />
            <p className="text-gray-700 text-xs sm:text-sm text-center mt-4 leading-relaxed">
              Przedsięwzięcie MŚP sfinansowane przez Unię Europejską ze środków Krajowego Planu Odbudowy i Zwiększania Odporności.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Back link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Powrót do strony głównej
            </Link>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-center">
              PRZYJAZNE APARTAMENTY AKACJA
            </h1>
            <p className="text-lg md:text-xl text-accent font-semibold text-center mb-12">
              Także i dla osób niepełnosprawnych, starszych i dzieci
            </p>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Modernizujemy Apartamenty Akacja zgodnie z oczekiwaniami naszych gości. Inwestycje wsparte zostały funduszami europejskimi, będącymi w dyspozycji Polskiej Agencji Rozwoju Przedsiębiorczości. Dotację w wysokości 253&nbsp;660,28&nbsp;zł otrzymaliśmy dzięki udziałowi w konkursie dla branży HoReCa obejmującej między innymi sektor turystyki. Nasze przedsięwzięcie jest częścią Projektu PFP HoReCa Pomorze, który prowadzi Polska Fundacja Przedsiębiorczości w Szczecinie. Pomoc unijna umożliwi nam rozszerzenie oferty i jej unowocześnienie, pozwalając na pozyskanie grupy nowych odbiorców. Chcemy osiągnąć następujące cele: dostosować ośrodek do potrzeb osób niepełnosprawnych, starszych i dzieci, zmodernizować obiekty w taki sposób, aby można było przyjmować gości również w okresie jesienno-zimowym, a także uatrakcyjnić pobyt poprzez udostępnienie nowych, służących rekreacji sprzętów.
              </p>

              <p>
                Apartamenty Akacja przechodzą równocześnie gruntowną transformację cyfrową w sposobie rezerwacji miejsc oraz informowania gości, również niepełnosprawnych. Wdrażamy też szereg rozwiązań proekologicznych skutkujących między innymi oszczędzaniem energii.
              </p>

              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground !mt-12 !mb-6 text-center">
                JESTEŚMY DLA WAS!
              </h2>

              <p>
                Inwestycje prowadzone w Ośrodku Apartamenty Akacja w Sianożętach są efektem wieloletnich doświadczeń wynikających z oczekiwań naszych gości, deklarowanych przez nich samych. Jako firma kierująca się zasadą społecznej odpowiedzialności biznesu, staramy się reagować zwłaszcza na specjalne potrzeby osób szukających u nas wypoczynku. Należą do nich chociażby ludzie w starszym wieku, którzy wolą przyjechać nad morze poza sezonem, nie tylko zresztą z powodów finansowych, ale też ze względu na panujący wówczas spokój. To głównie z myślą o nich postanowiliśmy przystosować ośrodek do działalności całorocznej. Są to goście ze szczególnymi potrzebami, biorącymi się z niepełnosprawności lub też utrudnień w poruszaniu się. Prowadząc modernizację z myślą o nich, wdrażamy jednocześnie rozwiązania z myślą o zapewnieniu maksymalnego bezpieczeństwa dzieciom, zwłaszcza najmłodszym. Chcielibyśmy, ażeby goście, skądinąd w każdym wieku, spędzali u nas czas w rodzinnej atmosferze. Stąd wziął się pomysł na zagospodarowanie terenu w sposób ułatwiający integrację towarzyską pod gołym niebem i to w każdych warunkach pogodowych. Dlatego obszar pomiędzy obiektami nazwaliśmy „ogrodem wypoczynkowym" i tak właśnie go urządzamy.
              </p>

              <p className="font-medium text-foreground">
                Unowocześnienie oraz uatrakcyjnienie oferty Apartamentów Akacja obejmie trzy aspekty:
              </p>

              <ol className="list-decimal list-outside pl-6 space-y-4">
                <li>
                  Przystosujemy ośrodek dla potrzeb osób niepełnosprawnych i starszych mających trudności w poruszaniu się oraz dzieci. Nastąpi to dzięki likwidacji barier architektonicznych, jak również wdrożeniu systemu elektronicznej informacji i rezerwacji miejsc noclegowych dla osób niewidomych i niedowidzących, a także oznakowaniu ośrodka w sposób ułatwiający im poruszanie się.
                </li>
                <li>
                  Przygotujemy obiekty noclegowe do działalności całorocznej przy zastosowaniu efektywnego, energooszczędnego systemu grzewczego, wspieranego instalacją fotowoltaiczną.
                </li>
                <li>
                  Uatrakcyjnimy pobyt gości, udostępniając im wyposażenie stworzonego w efekcie działań projektowych ogrodu wypoczynkowego. Osoby wypoczywające u nas otrzymają do dyspozycji m.in.:
                  <ul className="list-disc list-outside pl-6 mt-3 space-y-2">
                    <li>mobilne wanny SPA, grille gazowe, pergole i markizy, stoły i krzesła jadalni ogrodowej</li>
                    <li>rowery elektryczne.</li>
                  </ul>
                </li>
              </ol>

              <p>
                Rekreacja na świeżym powietrzu możliwa będzie także po zmroku, a to dzięki zamontowaniu hybrydowych lamp solarnych.
              </p>

              <p className="text-accent font-semibold text-lg text-center !mt-8">
                Atrakcje są w trakcie realizacji i będą dostępne już wiosną. Serdecznie zapraszamy!
              </p>

              {/* Second Article */}
              <div className="!mt-16 border-t border-border pt-12">
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground !mb-4 text-center">
                  ZIELONE APARTAMENTY AKACJA
                </h2>
                <p className="text-lg md:text-xl text-accent font-semibold text-center !mb-8">
                  Więcej przyrody, więcej słońca, więcej zdrowia
                </p>

                <p>
                  Jednym z istotnych założeń projektu wdrażanego w ramach konkursu PARP HoReCa jest tzw. „zielona transformacja" naszego ośrodka. Służą temu, między innymi, inwestycje w urządzany dzięki unijnemu wsparciu Ogród Wypoczynkowy. Zagospodarowujemy teren, przestrzegając wszystkich zasad ochrony przyrody po to, ażeby nasi goście mogli spędzać pod gołym niebem jak najwięcej czasu, nawet i w mniej pogodne dni.
                </p>

                <p>
                  Staramy się, by wokół obiektów noclegowych było zielono, a przy tym kolorowo, stąd starannie utrzymany trawnik oraz nasadzenia krzewów i kwiatów, które pełnego uroku nabiorą, kiedy zrobi się wiosennie. Nasi goście będą mieli do dyspozycji doskonale wyposażone wanny SPA. Schronienia przed słońcem, a nawet i deszczem dostarczą pergole z markizami. W naszym ogrodzie wypoczynkowym do dyspozycji gości ustawione zostaną stoły i krzesła. Będzie można nie tylko posiedzieć, ale i zjeść, jako że w pobliżu ulokujemy funkcjonalne grille gazowe. Z myślą o umożliwieniu miłośnikom dwóch kółek dłuższych i dalszych wędrówek po urokliwych okolicach Sianożęt, zakupiliśmy rowery elektryczne.
                </p>

                <p>
                  Zielona transformacja Apartamentów Akacja polegała będzie także na dbałości o czyste powietrze. Wybór nowoczesnych urządzeń elektrycznych odbył się według kryteriów ich maksymalnej bezemisyjności. Mamy już gotową fotowoltaikę jako źródło zasilania pracujących w ośrodku urządzeń w słoneczne dni. Już od początku sezonu wiosenno-letniego w segmentach noclegowych pracowała będzie wydajna klimatyzacja oraz elektryczne podgrzewacze wody z technologią hybrydową. Teren ośrodka oświetlą niewymagające zasilania zewnętrznego lampy solarne z wiatrakami. Już niedługo, jeszcze zanim zrobi się ciepło, goście aktualnie szukający wypoczynku nad morzem będą mieli ciepło dzięki zainstalowaniu w domkach mat grzewczych na podczerwień.
                </p>

                <p>
                  Wykorzystywane oraz udostępniane osobom korzystającym z oferty noclegowej urządzenia elektryczne cechuje niska energooszczędność. Ponadto we wszystkich prowadzonych przez nas pracach, w tym także budowlanych, wykorzystywane są surowce oraz materiały biodegradowalne lub też poddające się recyklingowi.
                </p>

                <p className="text-accent font-semibold text-lg text-center !mt-8">
                  Z nami wypoczywa się zdrowo!
                </p>
              </div>

              {/* Third Article */}
              <div className="!mt-16 border-t border-border pt-12">
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground !mb-4 text-center">
                  APARTAMENTY AKACJA DLA KAŻDEGO
                </h2>
                <p className="text-lg md:text-xl text-accent font-semibold text-center !mb-8">
                  Traktujemy gości jak przyjaciół
                </p>

                <p>
                  Apartamenty Akacja funkcjonują zgodnie z zasadą społecznej odpowiedzialności biznesu, a więc według kanonów: szacunku, empatii oraz poszanowania wszelkiej inności. Mamy nadzieję, że właśnie z tego powodu osoby szukające u nas relaksu dobrze się w naszym ośrodku czują. Jesteśmy przekonani, że był to także ważny argument przesądzający o przyznaniu nam dotacji w konkursie HoReCa.
                </p>

                <p>
                  Modernizacja Apartamentów Akacja prowadzona jest z poszanowaniem zasady równej dostępności dla wszystkich osób, które chcą skorzystać z oferty noclegowej oraz innych atrakcji. Inwestycje ułatwiające poruszanie się w obiektach oraz na terenie ośrodka przez osoby w różnym wieku, o zróżnicowanej mobilności, jak również z niepełnosprawnością, realizujemy zgodnie z wymogami przedstawionymi w „Konwencji o prawach osób niepełnosprawnych".
                </p>

                <p>
                  W kontaktach z gośćmi przestrzegamy zasady równości kobiet i mężczyzn. Nie wykluczamy i nie dyskryminujemy nikogo ze względu na płeć, wiek, rasę, cechy genetyczne, religię, majątek, język, kolor skóry, wyznawane poglądy, pochodzenie, orientację seksualną i wszelkie inne cechy mogące być przyczyną wykluczenia. Umożliwiamy obecnie, a dzięki wdrożeniu projektu jeszcze pełniej umożliwimy wszystkim gościom równy udział w oferowanych przez nas usługach. Wykonanie zadań inwestycyjnych ułatwi dostępność ośrodka, zwłaszcza dla osób niepełnosprawnych i starszych oraz dzieci. Stanie się to dzięki likwidacji barier architektonicznych oraz poprzez udostępnienie informacji dla osób niewidomych i niedowidzących. Również zakupione środki trwałe będą mogły być używane zarówno przez wymienione osoby, jak i gości pełnosprawnych. Wszelkie produkty oraz usługi zakupione i wykonane w ramach projektu będą zgodne z unijną zasadą uniwersalnego projektowania, a więc dostępne dla ogółu wypoczywających.
                </p>

                <p>
                  Pochwalimy się przy okazji, że nasza firma od początku swej działalności, a więc od ponad 20 lat, ma charakter antydyskryminacyjny. Stosujemy elastyczny czas pracy, urlopy opiekuńcze, a także politykę równościową w procesie rekrutacji pracownic i pracowników, jak również w systemie wynagrodzeń oraz premiowania. Kierowanie się zasadą społecznej odpowiedzialności biznesu (CSR) znajduje swój wyraz nie tylko w relacjach z pracownicami i pracownikami, ale także we współpracy z otoczeniem społecznym w postaci sąsiadów, innych firm oraz samorządów w każdym z miejsc, w których prowadzimy działalność gospodarczą.
                </p>
              </div>

              {/* Fourth Article */}
              <div className="!mt-16 border-t border-border pt-12">
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground !mb-4 text-center">
                  INTELIGENTNE APARTAMENTY AKACJA
                </h2>
                <p className="text-lg md:text-xl text-accent font-semibold text-center !mb-8">
                  Nowe rozwiązania IT są wygodne i dla Was, i dla nas
                </p>

                <p>
                  „Cyfrowa transformacja" ośrodka dostarcza kolejnego kompletu usprawnień w obsłudze gości, wdrażanego dzięki dotacyjnemu wsparciu uzyskanemu w konkursie PARP HoReCa za pośrednictwem Polskiej Fundacji Przedsiębiorczości w Szczecinie.
                </p>

                <p>
                  Zaczęliśmy od udostępnienia nowego komputerowego systemu informacji o możliwościach i atrakcjach wypoczynku w Apartamentach Akacja, w Sianożętach. Nowatorska aplikacja ułatwia również rezerwowanie miejsc noclegowych. Wystarczy wejść na naszą stronę internetową: www.apartamentyakacja.pl, ażeby dowiedzieć się wszystkiego o ośrodku oraz ustalić okres i warunki pobytu. Dodatkowym usprawnieniem jest zainstalowanie modułu informacyjno-rezerwacyjnego dla osób słabowidzących. Towarzyszy temu oznakowanie ośrodka w sposób ułatwiający poruszanie się osobom mającym problemy ze wzrokiem.
                </p>

                <p>
                  Modernizacja Apartamentów Akacja wiąże się z wprowadzeniem wielu innowacji nazwanych ogólne „rozwiązaniami domu inteligentnego". Właściwie już wszystkie urządzenia o charakterze automatyki obsługiwane są w nowoczesnym standardzie cyfrowym. Elektronika pozwala na intuicyjne sterowanie nimi najczęściej bez ruszania się z fotela. Ma to związek z jednym z głównych celów naszego projektu, polegającego na umożliwieniu komfortowego pobytu osobom niepełnosprawnym i starszym, które mają trudności w poruszaniu się, a także dzieciom, również najmłodszym. Nasi goście mogą, posługując się przyciskami pilota, zmieniać temperaturę dostarczaną do pomieszczeń przez maty grzewcze na podczerwień, przełączać telewizory, regulować podgrzewacze wody w łazienkach, zwiększać lub zmniejszać natężenie oświetlenia, kontrolować parametry działania klimatyzacji wewnątrz domków.
                </p>

                <p>
                  Rozwiązania IT pozwalają kierować pracą będących do dyspozycji gości wanien SPA, ładować silniki rowerów elektrycznych z instalacji fotowoltaicznej, ustawiać system alarmowy oraz oświetlenie ogrodu wypoczynkowego pod gołym niebem.
                </p>

                <p className="text-accent font-semibold text-lg text-center !mt-8">
                  Dzięki realizacji projektu, Apartamenty Akacja stały się ośrodkiem cyfrowo inteligentnym!
                </p>
              </div>

              {/* Fifth Article */}
              <div className="!mt-16 border-t border-border pt-12">
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground !mb-4 text-center">
                  ZMODERNIZOWANE APARTAMENTY AKACJA
                </h2>
                <p className="text-lg md:text-xl text-accent font-semibold text-center !mb-8">
                  Nowe okno-drzwi, łazienki i cała reszta
                </p>

                <p>
                  Wykonywanie zadań, które wyznaczyliśmy sobie w projekcie wdrażanym dzięki wsparciu Programu HoReCa, weszło w decydującą fazę. Dzięki temu, że w ostatnich dniach temperatury, przynajmniej w dzień, są stale powyżej zera, mogliśmy rozpocząć prace budowlane. Także i te, które wymagają robót pod gołym niebem.
                </p>

                <p>
                  Jednym z priorytetów naszych przedsięwzięć jest dostosowanie apartamentów do potrzeb gości niepełnosprawnych, jak również mających trudności w poruszaniu, a także dzieci. Nową funkcjonalność pomieszczeń uzyskujemy, prowadząc inwestycje zgodnie z wymogami wskazanymi w „Ustawie z 19 lipca 2019 r. o zapewnianiu dostępności osobom ze szczególnymi potrzebami". Podjazdy dla wózków inwalidzkich zainstalowane zostały już w zeszłym roku, obecnie przyszedł czas na wymianę okno-drzwi o powiększonej szerokości, dzięki czemu wjazd do domków oraz wyjazd z nich stał się bezproblemowy. Pozwala to na pełną mobilność osób, które poruszają się z wykorzystaniem wózków.
                </p>

                <p>
                  Bliskie finiszu są także prace polegające na przebudowie oraz wymianie wyposażenia łazienek. Połączony z modernizacją remont obejmuje kompletną wymianę dotychczasowych elementów wnętrz. Zakładamy między innymi wsporniki i uchwyty, pozwalające podtrzymać się lub podeprzeć osobom z trudnościami w samodzielnym poruszaniu się.
                </p>

                <p>
                  Trwa montaż tabliczek ułatwiających gościom niewidomym i słabowidzącym korzystanie z atrakcji ośrodka, zwłaszcza z ogrodu wypoczynkowego.
                </p>

                <p>
                  Wdrażane udogodnienia należą do całego zespołu ułatwień, które czynią z Apartamentów Akacja miejsce wyjątkowo przyjazne osobom niepełnosprawnym, które mają trudności w poruszaniu się, a także dla dzieci.
                </p>

                <p>
                  Wszystko, co z myślą o Was robimy, wynika z zasady uniwersalnego projektowania. Jej priorytetowym założeniem jest tworzenie produktów i środowisk użytecznych dla wszystkich ludzi, niezależnie od ich zdolności lub ograniczeń.
                </p>

                <p>
                  Do zakończenia projektu pozostał niespełna miesiąc. Zdążymy! Składając tę obietnicę, zapraszamy wszystkich, którzy zechcą przyjechać. Apartamenty Akacja są tej wiosny nowe i nowocześniejsze, a przy tym jak zawsze gościnne i przyjazne. Gwarantujemy komfortowy i sympatyczny wypoczynek!
                </p>
              </div>

              {/* Sixth Article */}
              <div className="!mt-16 border-t border-border pt-12">
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground !mb-4 text-center">
                  NOWY SEZON W NOWEJ SCENERII
                </h2>
                <p className="text-lg md:text-xl text-accent font-semibold text-center !mb-8">
                  Wiosenne Apartamenty Akacja zapraszają
                </p>

                <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground !mt-10 !mb-4">
                  APARTAMENTY GOTOWE
                </h3>

                <p>
                  Odmieniliśmy nasz ośrodek z myślą o uatrakcyjnieniu Waszego pobytu. W ostatnim dniu marca zakończył się projekt wdrożony dzięki dotacji z unijnego programu Horeca. Przedsięwzięcie obejmowało szereg zróżnicowanych inwestycji.
                </p>

                <p className="font-medium text-foreground !mt-6">
                  1. Przystosowaliśmy ośrodek dla potrzeb osób niepełnosprawnych:
                </p>
                <ul className="list-disc list-outside pl-6 space-y-2">
                  <li>wykonaliśmy podjazdy umożliwiające wjazd wózkami inwalidzkimi do domków</li>
                  <li>wymieniliśmy okno-drzwi do obiektów, pozwalające na wjazd wózkami</li>
                  <li>przystosowaliśmy łazienki dla potrzeb osób niepełnosprawnych oraz starszych, mających trudności w poruszaniu się</li>
                  <li>zamontowaliśmy klimatyzację</li>
                  <li>uzupełniliśmy stronę internetową Apartamentów Akacja o program informacyjny dla osób niewidomych i słabowidzących</li>
                  <li>udostępniliśmy brajlowskie ulotki informacyjne dla niewidomych i słabowidzących</li>
                  <li>zamontowaliśmy na terenie ośrodka tabliczki ułatwiające osobom niewidomym i słabowidzącym znalezienie domków</li>
                </ul>

                <p className="font-medium text-foreground !mt-6">
                  2. Przygotowaliśmy ośrodek do prowadzenia działalności całorocznej dzięki:
                </p>
                <ul className="list-disc list-outside pl-6 space-y-2">
                  <li>zainstalowaniu energooszczędnych mat grzewczych na podczerwień</li>
                  <li>zamontowaniu instalacji fotowoltaicznej o mocy 6 kW zasilającej system ogrzewania, służącej grzaniu wody użytkowej, zasilaniu wanien SPA i ładowaniu rowerów elektrycznych</li>
                  <li>zastosowaniu elektrycznych podgrzewaczy wody z energooszczędną technologią hybrydową</li>
                </ul>

                <p className="font-medium text-foreground !mt-6">
                  3. Uatrakcyjniliśmy pobyt gości urządzając dla Was „ogród wypoczynkowy" pod gołym niebem. Na jego wyposażenie składają się:
                </p>
                <ul className="list-disc list-outside pl-6 space-y-2">
                  <li>wanny ogrodowe SPA</li>
                  <li>pergole ogrodowe z markizami</li>
                  <li>stoły z krzesłami będące głównym elementem jadalni ogrodowej</li>
                  <li>grille ogrodowe</li>
                  <li>wysokiej klasy rowery elektryczne</li>
                  <li>hybrydowe lampy solarne z wiatrakiem umożliwiające rekreację na świeżym powietrzu również po zapadnięciu zmroku</li>
                </ul>

                <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground !mt-12 !mb-4">
                  APARTAMENTY NOWOCZESNE
                </h3>

                <p>
                  Wykonanie założonych w projekcie zadań pozwala na przyjmowanie w Apartamentach Akacja nowych grup gości, także osób niepełnosprawnych i w wieku starszym oraz dzieci (w tym grup zorganizowanych wymienionych trzech kategorii gości). Mamy już wstępne rezerwacje części miejsc noclegowych na najbliższe wiosenne tygodnie. Mogą Państwo przyjeżdżać na wypoczynek już teraz, a to dzięki funkcjonowaniu efektywnej energooszczędnej instalacji grzewczej w domkach. Zastosowanie także i innych nowoczesnych, energooszczędnych urządzeń przyczyniło się do „zielonej" transformacji ośrodka. W efekcie wdrożenia wielu rozwiązań „domu inteligentnego", jak również wspomnianego programu komputerowego do informowania klientów niepełnosprawnych (zwłaszcza niewidomych i niedowidzących), uzyskaliśmy transformację cyfrową świadczonych przez nas usług.
                </p>

                <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground !mt-12 !mb-4">
                  APARTAMENTY EKOLOGICZNE
                </h3>

                <p>
                  Wykonanie projektu wpływa na łagodzenie zmian klimatu dzięki zamontowaniu instalacji fotowoltaicznej oraz zainstalowaniu mat grzewczych na podczerwień, elektrycznych podgrzewaczy wody z technologią hybrydową i lamp solarnych z wiatrakami (pracują bez konieczności zasilania zewnętrznego). Do dyspozycji gości oddajemy wysokiej klasy rowery elektryczne. Wszystkie te urządzenia cechuje bezemisyjność pracy, stanowią zatem dodatkowe elementy „zielonej" transformacji firmy. Dzięki zakupowi grilli gazowych zlikwidowaliśmy emisję dymów z węgla drzewnego spalanego w grillach tradycyjnych.
                </p>

                <p>
                  Realizacja projektu nie wiązała się z betonowaniem powierzchni parcel ani zajmowaniem powierzchni biologicznie czynnej. Wszystkie dostępne urządzenia i udogodnienia nie są trwale związane z gruntem, tak więc w razie potrzeby będzie je można bezproblemowo usunąć i utylizować, bądź poddać recyklingowi. Ośrodek wykorzystuje funkcjonującą w Sianożętach sieć wodociągową i kanalizacyjną, nie stwarza zatem zagrożeń dla zasobów wodnych i morskich. Powstające wskutek użytkowania przez gości odpady są na terenie ośrodka segregowane i odbierane przez służby komunalne. Odtwarzanie bioróżnorodności odbywa się dzięki rezygnacji z systematycznego koszenia otoczenia domków. Część parceli zagospodarowana jest jako łąka kwietna.
                </p>

                <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground !mt-12 !mb-4">
                  APARTAMENTY PRZYJAZNE
                </h3>

                <p>
                  Działamy zgodnie z zasadą społecznej odpowiedzialności biznesu. Wykonanie działań projektowych skutkuje efektem równościowym, ze szczególnym uwzględnieniem zasad określonych w „Konwencji o prawach osób niepełnosprawnych", gdyż inwestycje, które wykonaliśmy, są szczególnie przyjazne dla tych osób. Wszystkie poczynania prowadzimy, przestrzegając kryterium równości kobiet i mężczyzn. Nie wykluczamy i nie dyskryminujemy nikogo ze względu na płeć, wiek, rasę, cechy genetyczne, religię, majątek, język, kolor skóry, wyznawanie, pochodzenie, orientację seksualną i wszelkie inne różnice, które mogłyby skutkować społeczną ekskluzją kogokolwiek. Umożliwiamy wszystkim gościom równy udział w oferowanych przez nas usługach. Wykonanie projektu Horeca zdecydowanie usprawniło dostępność ośrodka, zwłaszcza dla osób niepełnosprawnych i starszych z trudnościami w poruszaniu się, a także dla dzieci.
                </p>

                <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground !mt-12 !mb-4">
                  APARTAMENTY OTWARTE
                </h3>

                <p>
                  Apartamenty Akacja oferują nie tylko noclegi. Postaraliśmy się, żeby w tym sezonie wypoczynek był atrakcyjny także i na terenie ośrodka. Stworzony dzięki dotacji Horeca „ogród wypoczynkowy" pozwala gościom każdej płci, w każdym wieku oraz w każdej kondycji zdrowotnej na uprawianie zróżnicowanych form rekreacji pod gołym niebem. Nowe zagospodarowanie działki jest wyjątkowo przyjazne również i dla osób niepełnosprawnych, starszych i dzieci, gdyż wykonane zostało bez żadnych barier architektonicznych. Zamontowaliśmy mobilne wanny SPA, grille gazowe, pergole i markizy, stoły i krzesła jadalni ogrodowej i hybrydowe lampy solarne do oświetlenia ogrodu po zmroku. SERDECZNIE ZAPRASZAMY!
                </p>

                <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground !mt-12 !mb-4">
                  PODZIĘKOWANIA
                </h3>

                <p>
                  Wykonanie tak wielu zróżnicowanych przedsięwzięć jest efektem naszego udziału w konkursie pod nazwą: Inwestycje w dywersyfikację sektora działalności HoReCa – oferta dla przedsiębiorców. Wydarzeniu patronowała Polska Agencja Rozwoju Przedsiębiorczości, natomiast moderatorem dla firm funkcjonujących na terenie województwa zachodniopomorskiego była Polska Fundacja Przedsiębiorczości w Szczecinie. Obu instytucjom jesteśmy wdzięczni za wsparcie zarówno finansowe, jak i organizacyjne. Szczególne podziękowania kierujemy do tych pań i panów z PFP, z którymi mieliśmy bieżący kontakt na różnych etapach prac projektowych. Wspomagali nas dobrą radą oraz pomocnymi wskazówkami, kreując jednocześnie sympatyczną atmosferę współpracy. Serdecznie pozdrawiamy!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default EuFunding;
