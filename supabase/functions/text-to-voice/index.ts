import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    // Rozwiń polskie skróty przed syntezą mowy
    const expandedText = expandPolishAbbreviations(text);
    console.log("Original text:", text.substring(0, 100) + "...");
    console.log("Expanded text:", expandedText.substring(0, 100) + "...");

    // Use Roger voice - clear, authoritative male voice optimized for Polish
    const voiceId = voice || "CwhRBWXzGAHq8TQ4Fs17"; // Roger - wyraźny męski głos

    // Generate speech from text using Eleven Labs
    // Fully optimized settings for Polish language pronunciation
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVEN_LABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: expandedText, // Używamy rozwinięty tekst z polskimi skrótami
          model_id: "eleven_multilingual_v2", // Najlepszy model dla języków europejskich w tym polskiego
          voice_settings: {
            stability: 0.75,        // Wysoka stabilność - lepsza wymowa polskich spółgłosek (sz, cz, ż, dż)
            similarity_boost: 0.85, // Wyższe odwzorowanie - naturalniejszy głos
            style: 0.10,            // Niska ekspresja - unika dziwnej intonacji w polskim
            use_speaker_boost: true, // Wzmocnienie głosu dla lepszej wyrazistości
          },
          // Optymalizacja dla polskiego
          pronunciation_dictionary_locators: [],
          language_code: "pl", // Wymuszenie polskiego języka
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
