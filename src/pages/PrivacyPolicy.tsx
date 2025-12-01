import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Polityka Prywatności
        </h1>
        
        <div className="prose prose-lg max-w-none text-foreground/80 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              1. Informacje ogólne
            </h2>
            <p>
              Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod adresem: 
              apartamenty-akacja.pl. Operatorem serwisu oraz Administratorem danych 
              osobowych jest: Apartamenty Akacja, Sianożęty.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              2. Pliki cookies
            </h2>
            <p>
              Serwis wykorzystuje pliki cookies (ciasteczka), czyli niewielkie informacje 
              tekstowe, przechowywane na urządzeniu końcowym Użytkownika. Cookies mogą 
              być odczytywane przez system teleinformatyczny Operatora.
            </p>
            <p>
              Operator przechowuje pliki cookies na urządzeniu końcowym Użytkownika, 
              a następnie uzyskuje dostęp do informacji w nich zawartych w celach:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Statystycznych – zbieranie anonimowych danych o ruchu na stronie</li>
              <li>Funkcjonalnych – zapamiętywanie preferencji użytkownika</li>
              <li>Marketingowych – dostosowanie treści reklamowych</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              3. Zarządzanie cookies
            </h2>
            <p>
              Użytkownik może samodzielnie i w każdym czasie zmienić ustawienia 
              dotyczące plików cookies, określając warunki ich przechowywania i 
              uzyskiwania dostępu przez pliki cookies do urządzenia Użytkownika. 
              Zmiany ustawień można dokonać za pomocą ustawień przeglądarki internetowej.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              4. Dane osobowe
            </h2>
            <p>
              Administrator dokłada szczególnej staranności w celu ochrony interesów 
              osób, których dane dotyczą. Dane osobowe przetwarzane są zgodnie z 
              Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              5. Kontakt
            </h2>
            <p>
              W sprawach związanych z ochroną danych osobowych oraz niniejszą 
              polityką prywatności można kontaktować się pod adresem e-mail: 
              kontakt@apartamenty-akacja.pl lub telefonicznie.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
