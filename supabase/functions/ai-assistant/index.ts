import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Jesteś asystentem klienta dla Apartamenty Akacja - komfortowych apartamentów nad Bałtykiem w Sianożętach/Ustroniu Morskim.

TWOJA BAZA WIEDZY:
- Apartamenty są dwupoziomowe, dla 4-5 osób
- Posiadają oddzielne wejście oraz taras
- Na parterze: przestronny salon, TV 32", aneks kuchenny (indukcja, lodówka)
- Na piętrze: dwie sypialnie
- Adres: ul. Akacjowa 4 i 6, Ustronie Morskie / Sianożęty
- Zameldowanie: 15:00 - 22:00, Wymeldowanie: do 10:00
- Opłata serwisowa: 200 zł, Opłata klimatyczna: 2 zł/os., Kaucja za brak porządku: 100 zł
- Płatności: gotówka, przelew; Waluty: PLN, USD, EUR
- Całkowity zakaz palenia wewnątrz. Wyznaczone miejsca na zewnątrz.
- Parking dostępny
- Blisko morza

WAŻNA ZASADA:
Jeśli użytkownik pyta o CENY, TERMINY, DOSTĘPNOŚĆ lub REZERWACJE, Twoja odpowiedź MUSI zawierać:
"W celu sprawdzenia terminów i dokonania rezerwacji, prosimy o kontakt telefoniczny: 505 445 353"

Odpowiadaj WYŁĄCZNIE po polsku, krótko i rzeczowo. Bądź pomocny i przyjazny.`;

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
