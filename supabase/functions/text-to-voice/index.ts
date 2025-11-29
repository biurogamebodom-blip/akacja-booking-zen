import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Funkcja formatująca numery telefonów dla lepszej wymowy
function formatPhoneNumbers(text: string): string {
  // Zamień cyfry na słowa dla lepszej wymowy
  const digitWords: Record<string, string> = {
    "0": "zero",
    "1": "jeden",
    "2": "dwa",
    "3": "trzy",
    "4": "cztery",
    "5": "pięć",
    "6": "sześć",
    "7": "siedem",
    "8": "osiem",
    "9": "dziewięć",
  };

  // Znajdź numery telefonów (9 cyfr, z opcjonalnymi spacjami/myślnikami)
  return text.replace(
    /(\d{3})[\s-]?(\d{3})[\s-]?(\d{3})/g,
    (match, g1, g2, g3) => {
      // Konwertuj każdą grupę cyfr na słowa
      const group1 = g1.split("").map((d: string) => digitWords[d]).join(" ");
      const group2 = g2.split("").map((d: string) => digitWords[d]).join(" ");
      const group3 = g3.split("").map((d: string) => digitWords[d]).join(" ");
      return `${group1}, ${group2}, ${group3}`;
    }
  );
}

// Funkcja rozwijająca polskie skróty dla lepszej wymowy
function expandPolishAbbreviations(text: string): string {
  const abbreviations: Record<string, string> = {
    // Adresy
    "ul.": "ulica",
    "al.": "aleja",
    "pl.": "plac",
    "os.": "osiedle",
    "m.": "mieszkanie",
    "nr": "numer",
    "nr.": "numer",
    "pok.": "pokój",
    "p.": "piętro",
    "kl.": "klatka",
    
    // Kontakt
    "tel.": "telefon",
    "tel:": "telefon",
    "e-mail:": "email",
    "godz.": "godzina",
    
    // Ogólne
    "np.": "na przykład",
    "itp.": "i tym podobne",
    "itd.": "i tak dalej",
    "tzw.": "tak zwany",
    "wg": "według",
    "ok.": "około",
    "ca": "około",
    "max.": "maksymalnie",
    "min.": "minimalnie",
    "pn.": "poniedziałek",
    "wt.": "wtorek",
    "śr.": "środa",
    "czw.": "czwartek",
    "pt.": "piątek",
    "sob.": "sobota",
    "niedz.": "niedziela",
    "ndz.": "niedziela",
    
    // Jednostki
    "zł": "złotych",
    "gr": "groszy",
    "km": "kilometrów",
    "m2": "metrów kwadratowych",
    "m²": "metrów kwadratowych",
    
    // Tytuły
    "mgr": "magister",
    "dr": "doktor",
    "prof.": "profesor",
    "św.": "świętego",
    "ks.": "księdza",
  };
  
  let result = text;
  
  // Sortuj od najdłuższych do najkrótszych aby uniknąć częściowych zamian
  const sortedAbbreviations = Object.entries(abbreviations)
    .sort((a, b) => b[0].length - a[0].length);
  
  for (const [abbr, full] of sortedAbbreviations) {
    // Case-insensitive replacement z zachowaniem granic słów
    const regex = new RegExp(abbr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    result = result.replace(regex, full);
  }
  
  return result;
}

// Pełne przetwarzanie tekstu dla polskiego TTS
function preprocessPolishText(text: string): string {
  let processed = text;
  processed = expandPolishAbbreviations(processed);
  processed = formatPhoneNumbers(processed);
  return processed;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ELEVEN_LABS_API_KEY = Deno.env.get("ELEVEN_LABS_API_KEY");

    if (!ELEVEN_LABS_API_KEY) {
      throw new Error("ELEVEN_LABS_API_KEY is not configured");
    }

    const { text, voice } = await req.json();

    if (!text) {
      throw new Error("Text is required");
    }

    // Przetwórz tekst dla lepszej wymowy polskiej
    const processedText = preprocessPolishText(text);
    console.log("Original text:", text.substring(0, 100) + "...");
    console.log("Processed text:", processedText.substring(0, 150) + "...");

    // Use Aria voice - natural, warm voice that works well with Polish
    const voiceId = voice || "9BWtsMINqrJLrRacOk9x"; // Aria - naturalny, ciepły głos

    // Generate speech from text using Eleven Labs
    // Optimized settings for natural Polish pronunciation
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVEN_LABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: processedText,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.50,        // Niższa stabilność - bardziej naturalny, konwersacyjny ton
            similarity_boost: 0.75, // Umiarkowane odwzorowanie głosu
            style: 0.20,            // Lekka ekspresja dla naturalności
            use_speaker_boost: true,
          },
          language_code: "pl",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Eleven Labs TTS error:", response.status, errorText);
      throw new Error(`Eleven Labs API error: ${errorText}`);
    }

    // Convert audio buffer to base64
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Convert to base64 in chunks to avoid memory issues
    let binary = "";
    const chunkSize = 0x8000;
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length));
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    const base64Audio = btoa(binary);

    console.log("TTS audio generated, size:", arrayBuffer.byteLength);

    return new Response(
      JSON.stringify({ audioContent: base64Audio }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Text-to-voice error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
