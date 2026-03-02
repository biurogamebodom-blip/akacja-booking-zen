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
