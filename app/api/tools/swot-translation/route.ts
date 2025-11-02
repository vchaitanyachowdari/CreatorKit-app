import { generateObject } from "ai"
import { z } from "zod"

const swotSchema = z.object({
  business: z.string().describe("The business or topic being analyzed"),
  strengths: z.array(z.string()).describe("Internal strengths of the business"),
  weaknesses: z.array(z.string()).describe("Internal weaknesses of the business"),
  opportunities: z.array(z.string()).describe("External opportunities for growth"),
  threats: z.array(z.string()).describe("External threats to the business"),
  strategicRecommendations: z.array(z.string()).describe("Strategic recommendations based on SWOT"),
})

const translationSchema = z.object({
  original: z.string().describe("The original text"),
  translated: z.string().describe("The translated text"),
  targetLanguage: z.string().describe("The target language name"),
  confidence: z.string().describe("Translation confidence level (High, Medium, Low)"),
  notes: z.array(z.string()).describe("Important translation notes and context"),
})

export async function POST(req: Request) {
  const { toolType, input, targetLanguage, tone } = await req.json()

  if (toolType === "swot") {
    const prompt = `Generate a comprehensive SWOT analysis for:
${input}

Create detailed, actionable insights for each quadrant and provide strategic recommendations.`

    const { object } = await generateObject({
      model: "openai/gpt-5-mini",
      schema: swotSchema,
      prompt,
      system:
        "You are a strategic business analyst. Create insightful SWOT analyses that identify key strengths, weaknesses, opportunities, and threats, then provide strategic recommendations.",
    })

    return Response.json(object)
  } else {
    const langMap: Record<string, string> = {
      es: "Spanish",
      fr: "French",
      de: "German",
      it: "Italian",
      pt: "Portuguese",
      ja: "Japanese",
      ko: "Korean",
      zh: "Simplified Chinese",
      "zh-TW": "Traditional Chinese",
      ru: "Russian",
      ar: "Arabic",
      hi: "Hindi",
    }

    const prompt = `Translate the following text to ${langMap[targetLanguage] || "the target language"} with a ${tone} tone:

"${input}"

Preserve the original meaning and tone while adapting to cultural context.`

    const { object } = await generateObject({
      model: "openai/gpt-5-mini",
      schema: translationSchema,
      prompt,
      system: `You are an expert translator. Translate content accurately while preserving meaning, tone, and cultural appropriateness. Include helpful notes about translation choices.`,
    })

    return Response.json({
      ...object,
      targetLanguage: langMap[targetLanguage] || "Unknown",
    })
  }
}
