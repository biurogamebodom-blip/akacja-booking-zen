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

// Funkcja konwertująca liczebniki przed rzeczownikami dla lepszej wymowy
function expandNumbersInContext(text: string): string {
  let result = text;
  
  // Liczebniki przed "noce/nocy/noc" 
  result = result.replace(/\b2\s+noc[eiy]?\b/gi, "dwie noce");
  result = result.replace(/\b3\s+noc[eiy]?\b/gi, "trzy noce");
  result = result.replace(/\b4\s+noc[eiy]?\b/gi, "cztery noce");
  result = result.replace(/\b5\s+noc[yei]?\b/gi, "pięć nocy");
  result = result.replace(/\b6\s+noc[yei]?\b/gi, "sześć nocy");
  result = result.replace(/\b7\s+noc[yei]?\b/gi, "siedem nocy");
  
  // Liczebniki przed "osoby/osób"
  result = result.replace(/\b2\s+osob[yę]?\b/gi, "dwie osoby");
  result = result.replace(/\b3\s+osob[yę]?\b/gi, "trzy osoby");
  result = result.replace(/\b4\s+osob[yę]?\b/gi, "cztery osoby");
  result = result.replace(/\b5\s+osób\b/gi, "pięć osób");
  result = result.replace(/\b6\s+osób\b/gi, "sześć osób");
  
  // Liczebniki przed "dorosłych/dzieci"
  result = result.replace(/\b2\s+dorosłych\b/gi, "dwóch dorosłych");
  result = result.replace(/\b3\s+dorosłych\b/gi, "trzech dorosłych");
  result = result.replace(/\b4\s+dorosłych\b/gi, "czterech dorosłych");
  
  return result;
}

// Funkcja rozwijająca polskie skróty dla lepszej wymowy
function expandPolishAbbreviations(text: string): string {
  let result = text;
  
  // KROK 1: Najpierw rozwiń liczebniki w kontekście
  result = expandNumbersInContext(result);
  
  // KROK 2: Wzorce cenowe (od najbardziej specyficznych do ogólnych)
  // "zł/os." lub "zł/os" -> "złotych za osobę"
  result = result.replace(/zł\s*\/\s*os\.?/gi, "złotych za osobę");
  
  // "zł/noc" -> "złotych za noc"
  result = result.replace(/zł\s*\/\s*noc/gi, "złotych za noc");
  
  // "zł/doba" -> "złotych za dobę"
  result = result.replace(/zł\s*\/\s*dob[ęa]/gi, "złotych za dobę");
  
  // "/os." lub "/os" -> "za osobę"
  result = result.replace(/\/\s*os\.?\b/gi, " za osobę");
  
  // "/noc" -> "za noc" 
  result = result.replace(/\/\s*noc\b/gi, " za noc");
  
  // KROK 3: Samodzielne "zł" - tylko jeśli NIE jest częścią "złotych"
  // Używamy negative lookahead żeby nie matchować w "złotych"
  result = result.replace(/\bzł(?!otych)\b/gi, "złotych");
  
  // KROK 4: Skróty z kropką
  const abbreviationsWithDot: Record<string, string> = {
    "ul.": "ulica",
    "al.": "aleja",
    "pl.": "plac",
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
    "min.": "minimum",
    "pn.": "poniedziałek",
    "wt.": "wtorek",
    "śr.": "środa",
    "czw.": "czwartek",
    "pt.": "piątek",
    "sob.": "sobota",
    "niedz.": "niedziela",
    "ndz.": "niedziela",
    "os.": "osobę",
  };
  
  for (const [abbr, full] of Object.entries(abbreviationsWithDot)) {
    const escapedAbbr = abbr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedAbbr, 'gi');
    result = result.replace(regex, full);
  }
  
  // KROK 5: Skróty bez kropki (z word boundaries)
  const abbreviationsNoBoundary: Array<[RegExp, string]> = [
    [/\bnr\b/gi, "numer"],
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

    const body = await req.json();
    const text = body?.text;
    const voice = body?.voice;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Text is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (text.length > 5000) {
      return new Response(JSON.stringify({ error: "Text too long" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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
