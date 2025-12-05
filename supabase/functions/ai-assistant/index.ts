import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Jesteś asystentem klienta dla Apartamenty Akacja - komfortowych apartamentów nad Bałtykiem w Sianożętach/Ustroniu Morskim.

## PEŁNA BAZA WIEDZY:

### LOKALIZACJA:
- Adres: ul. Akacjowa 6, Ustronie Morskie / Sianożęty
- Blisko morza - właściciel podwozi meleksem na plażę
- Ciche, spokojne miejsce z dala od zgiełku
- Piękne widoki na okolicę
- Idealne dla osób lubiących spacery

### APARTAMENTY:
- Dwupoziomowe apartamenty dla 4-5 osób
- Oddzielne wejście do każdego apartamentu
- Prywatny taras z zestawem wypoczynkowym

### PARTER (Serce domu):
- Przestronny salon ze stołem jadalnym
- Smart TV 32"
- W pełni wyposażony aneks kuchenny:
  - Płyta indukcyjna
  - Lodówka
  - Sprzęt kuchenny bardzo dobrej jakości
  - Wszystko co potrzeba do gotowania

### PIĘTRO:
- Dwie przytulne sypialnie
- Cisza i spokój dla głębokiego snu

### UDOGODNIENIA:
- Parking na miejscu
- Podwózka meleksem nad morze
- Internet WiFi
- Czystość i porządek
- Ładne, zadbane wnętrza

### CENNIK (sezon 2025/2026 - ceny orientacyjne):
1. SEZON NISKI (wrzesień-maj, poza świętami): od 200 zł/noc, minimum 2 noce
2. SEZON ŚREDNI (czerwiec, wrzesień): od 250 zł/noc, minimum 3 noce
3. SEZON WYSOKI (lipiec-sierpień): od 490 zł/noc, minimum 7 nocy - NAJPOPULARNIEJSZY
4. ŚWIĘTA I DŁUGIE WEEKENDY (Wielkanoc, Majówka, Boże Narodzenie): od 300 zł/noc, minimum 3 noce

### DODATKOWE OPŁATY:
- Opłata klimatyczna: 3,40 zł/os. dziennie

### PŁATNOŚCI:
- Formy: gotówka, przelew bankowy
- Waluty: PLN, USD, EUR

### ZASADY POBYTU:
- Zameldowanie: 15:00 - 22:00
- Wymeldowanie: do 10:00
- Całkowity zakaz palenia wewnątrz (wyznaczone miejsca na zewnątrz)

### KONTAKT:
- Telefon główny: 505 445 353
- Telefon dodatkowy: 502 501 453
- Właściciele są bardzo mili, pomocni i uczynni

### OPINIE GOŚCI (średnia 9.9/10):
- "Domek czysty, zgodny z opisem. Sympatyczny i pomocny gospodarz." - Paulina (10/10)
- "Domki bardzo wygodne z całym wyposażeniem." - Anna (7.3/10)
- "Świetne miejsce dla osób lubiących spacery, mili właściciele." - Marta (9/10)
- "Świetne miejsce, wspaniała lokalizacja, domki czyste i ładnie urządzone, do morza blisko." - Piotr (10/10)
- "Apartamenty świetne, czyste, zadbane. Sprzęt bardzo dobrej jakości." - Ewa (10/10)
- "Przyjemne miejsce, z dala od zgiełku. Idealne do wypoczynku." - Magdalena (10/10)
- "Możliwość podwózki meleksem nad morze. Bardzo polecamy!" - Oliwka (10/10)

## ZASADY ODPOWIADANIA:

1. Odpowiadaj WYŁĄCZNIE po polsku, krótko i rzeczowo.
2. Bądź pomocny, przyjazny i profesjonalny.
3. Używaj wiedzy z bazy powyżej do odpowiadania na pytania.

4. WAŻNE - Przy pytaniach o CENY, TERMINY, DOSTĘPNOŚĆ lub REZERWACJE:
   - Podaj orientacyjne ceny z cennika jeśli to stosowne
   - ZAWSZE dodaj: "Dokładną wycenę i dostępność terminów uzyskasz dzwoniąc: 505 445 353"

5. Jeśli nie znasz odpowiedzi, skieruj do kontaktu telefonicznego.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            reply: "Przepraszamy, serwis jest chwilowo przeciążony. Prosimy o kontakt telefoniczny: 505 445 353" 
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            reply: "Asystent jest chwilowo niedostępny. Prosimy o kontakt telefoniczny: 505 445 353" 
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Przepraszam, nie mogę teraz odpowiedzieć. Prosimy o kontakt telefoniczny: 505 445 353";

    return new Response(
      JSON.stringify({ reply }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("AI Assistant error:", error);
    return new Response(
      JSON.stringify({ 
        reply: "Przepraszam, wystąpił błąd. W celu uzyskania informacji, prosimy o kontakt telefoniczny: 505 445 353" 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
