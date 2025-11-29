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
// UWAGA: Używamy tylko skrótów z kropką lub bardzo specyficznych wzorców
function expandPolishAbbreviations(text: string): string {
  // Skróty z kropką - bezpieczne do zamiany (kropka działa jako delimiter)
  const abbreviationsWithDot: Record<string, string> = {
    "ul.": "ulica",
    "al.": "aleja",
    "pl.": "plac",
    "os.": "osiedle",
    "nr.": "numer",
    "pok.": "pokój",
    "kl.": "klatka",
    "tel.": "telefon",
    "godz.": "godzina",
    "np.": "na przykład",
    "itp.": "i tym podobne",
    "itd.": "i tak dalej",
    "tzw.": "tak zwany",
    "ok.": "około",
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
    "prof.": "profesor",
    "św.": "świętego",
    "ks.": "księdza",
    "m.": "mieszkanie",
    "p.": "piętro",
  };
  
  let result = text;
  
  // Najpierw zamień skróty z kropką (bezpieczne)
  for (const [abbr, full] of Object.entries(abbreviationsWithDot)) {
    // Escape special regex characters and match case-insensitively
    const escapedAbbr = abbr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedAbbr, 'gi');
    result = result.replace(regex, full);
  }
  
  // Skróty bez kropki - wymagają granic słów (\b)
  const abbreviationsNoBoundary: Array<[RegExp, string]> = [
    [/\bnr\b/gi, "numer"],
    [/\bzł\b/gi, "złotych"],
    [/\bm2\b/gi, "metrów kwadratowych"],
    [/\bm²\b/gi, "metrów kwadratowych"],
    [/\bkm\b/gi, "kilometrów"],
  ];
  
  for (const [regex, full] of abbreviationsNoBoundary) {
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

    // Use Sarah voice - warm, natural female voice, excellent for Polish
    const voiceId = voice || "EXAVITQu4vr4xnSDxMaL"; // Sarah - ciepły, naturalny głos

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
            stability: 0.65,        // Wyższa stabilność dla wyraźniejszej wymowy
            similarity_boost: 0.80, // Dobre odwzorowanie głosu
            style: 0.0,             // Brak stylizacji - najbardziej naturalny ton
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
