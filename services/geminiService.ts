import { GoogleGenAI, Type, SchemaType } from "@google/genai";
import { ViralCritique } from "../types";

// In a real app, these would be server-side or proxied.
// For this demo, we use client-side calls.

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Feature D: The Viral Score (AI Critic)
 */
export const getViralScore = async (postContent: string, platform: string): Promise<ViralCritique> => {
  const ai = getAiClient();
  
  const prompt = `
    Analyze this social media post for ${platform}.
    Post Content: "${postContent}"
    
    Rate this post 0-100 based on the hook quality, call to action (CTA), and overall engagement potential.
    Provide a short critique and a specifically improved version of the first sentence (the hook).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "A score from 0 to 100" },
            critique: { type: Type.STRING, description: "A brief critique of the post" },
            better_hook: { type: Type.STRING, description: "An improved version of the first sentence" }
          },
          required: ["score", "critique", "better_hook"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as ViralCritique;

  } catch (error) {
    console.error("Error getting viral score:", error);
    // Fallback for demo if API fails or key is missing
    return {
      score: 0,
      critique: "Could not analyze. Please check API Key.",
      better_hook: "N/A"
    };
  }
};

/**
 * Feature E: Content Repurposing (Simulated)
 * Takes a transcript or text and formats it for LinkedIn.
 */
export const repurposeContent = async (sourceText: string): Promise<string> => {
  const ai = getAiClient();
  
  const prompt = `
    Repurpose the following text into a high-engagement LinkedIn post.
    Use short paragraphs, a strong hook, and 3-5 hashtags at the end.
    
    Source Text:
    "${sourceText}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text || "";
  } catch (error) {
    console.error("Error repurposing content:", error);
    return "Error generating content.";
  }
};
