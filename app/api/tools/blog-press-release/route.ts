import { NextResponse } from "next/server"
import { generateContentWithAI } from "@/lib/ai-provider"
import { z } from "zod"
import { createErrorResponse } from "@/lib/error-handler"
import { logger } from "@/lib/logger"

const blogSchema = z.object({
  title: z.string().describe("The blog post title"),
  content: z.string().describe("The full blog post content with sections and paragraphs"),
  metadata: z.object({
    readTime: z.number().describe("Estimated read time in minutes"),
    seoKeywords: z.array(z.string()).describe("SEO-optimized keywords"),
    wordCount: z.number().describe("Total word count"),
  }),
})

const pressSchema = z.object({
  title: z.string().describe("The press release headline"),
  content: z.string().describe("The full press release content in AP style format"),
  metadata: z.object({
    readTime: z.number().describe("Estimated read time in minutes"),
    seoKeywords: z.array(z.string()).describe("Key announcement points"),
    wordCount: z.number().describe("Total word count"),
  }),
})

export async function POST(req: Request) {
  try {
    const { contentType, topic, description, keywords, tone } = await req.json()

    const isPress = contentType === "press"
    const schema = isPress ? pressSchema : blogSchema

    const prompt = isPress
      ? `Generate a professional press release with the following details:
Title: ${topic}
Details: ${description}
Key Keywords: ${keywords.join(", ")}
Tone: ${tone}

Format: Use AP style formatting. Include headline, dateline, and body paragraphs. Include quotes where appropriate.`
      : `Generate a comprehensive, SEO-optimized blog post with the following details:
Title: ${topic}
Description: ${description}
Keywords: ${keywords.join(", ")}
Tone: ${tone}

Create a well-structured blog post with an introduction, multiple sections, practical examples, and a conclusion. Optimize for readability and SEO.`

    logger.debug("Generating content", { contentType, topic })

    const object = await generateContentWithAI(
      schema,
      prompt,
      isPress
        ? "You are a professional PR writer who creates compelling, newsworthy press releases in AP style."
        : "You are an expert content writer who creates engaging, SEO-optimized blog posts with excellent readability and structure.",
    )

    logger.info("Content generated successfully", { contentType })
    return NextResponse.json(object)
  } catch (error) {
    logger.error("Error generating content", error)
    return createErrorResponse(error, 500)
  }
}
