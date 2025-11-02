import { generateObject, generateText } from "ai"
import type { z } from "zod"

type LanguageModel = ReturnType<typeof getAIModel>

function getAIModel() {
  if (process.env.OPENROUTER_API_KEY) {
    console.log("[v0] Using OpenRouter AI provider")
    return "openrouter/openai/gpt-oss-20b:free"
  }

  if (process.env.OPENAI_API_KEY) {
    console.log("[v0] Falling back to OpenAI provider")
    return "openai/gpt-4o-mini"
  }

  if (process.env.ANTHROPIC_API_KEY) {
    console.log("[v0] Falling back to Anthropic provider")
    return "anthropic/claude-3-5-sonnet-20241022"
  }

  if (process.env.GROQ_API_KEY) {
    console.log("[v0] Falling back to Groq provider")
    return "groq/mixtral-8x7b-32768"
  }

  throw new Error(
    "No AI provider configured. Please set one of: OPENROUTER_API_KEY, OPENAI_API_KEY, ANTHROPIC_API_KEY, or GROQ_API_KEY",
  )
}

export async function generateContentWithAI<T>(schema: z.ZodSchema<T>, prompt: string, system?: string): Promise<T> {
  const model = getAIModel()

  try {
    const { object } = await generateObject({
      model,
      schema,
      prompt,
      system,
    })
    return object as T
  } catch (error) {
    console.error("[v0] AI generation error:", error)
    throw error
  }
}

export async function generateTextWithAI(prompt: string, system?: string): Promise<string> {
  const model = getAIModel()

  try {
    const { text } = await generateText({
      model,
      prompt,
      system,
    })
    return text
  } catch (error) {
    console.error("[v0] AI text generation error:", error)
    throw error
  }
}

export function getConfiguredAIModel(): string {
  return getAIModel()
}
