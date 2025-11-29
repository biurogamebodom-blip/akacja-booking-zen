import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    console.log("Generating TTS for text:", text.substring(0, 100) + "...");

    // Use Charlotte voice - warm, friendly female voice optimized for Polish
    const voiceId = voice || "XB0fDUnXU5powFXDhCwa"; // Charlotte - ciepły kobiecy głos

    // Generate speech from text using Eleven Labs
    // Optimized settings for clear Polish pronunciation
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVEN_LABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.65,        // Wyższa stabilność dla wyraźniejszej wymowy
            similarity_boost: 0.80, // Lepsze odwzorowanie głosu
            style: 0.15,            // Lekka ekspresja dla naturalności
            use_speaker_boost: true,
          },
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
