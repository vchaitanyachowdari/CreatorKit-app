import { NextResponse } from "next/server"
import { generateContentWithAI } from "@/lib/ai-provider"
import { z } from "zod"
import { createErrorResponse } from "@/lib/error-handler"
import { logger } from "@/lib/logger"

const pdfSchema = z.object({
  title: z.string().describe("Title or main topic of the PDF"),
  summary: z.string().describe("Comprehensive summary of the PDF content"),
  keyPoints: z.array(z.string()).describe("Important key points and insights"),
  metadata: z.object({
    pageCount: z.number().optional().describe("Estimated page count"),
    estimatedReadTime: z.number().optional().describe("Read time in minutes"),
    topics: z.array(z.string()).optional().describe("Topics covered in the document"),
  }),
})

const dataSchema = z.object({
  summary: z.string().describe("Overall summary of the data analysis"),
  statistics: z
    .array(
      z.object({
        label: z.string().describe("Statistic label"),
        value: z.string().describe("The value or finding"),
        description: z.string().describe("Explanation of this statistic"),
      }),
    )
    .describe("Key statistics from the data"),
  trends: z.array(z.string()).describe("Identified trends in the data"),
  recommendations: z.array(z.string()).describe("Actionable recommendations based on the data"),
  dataQuality: z.string().describe("Assessment of data quality (Good, Fair, Needs Review)"),
})

export async function POST(req: Request) {
  try {
    const { toolType, content } = await req.json()

    if (toolType === "pdf") {
      const prompt = `Analyze and summarize this document content:

${content.substring(0, 5000)}

Provide a comprehensive analysis with summary, key points, and metadata.`

      logger.debug("Analyzing PDF document")

      const object = await generateContentWithAI(
        pdfSchema,
        prompt,
        "You are an expert document analyst. Extract key information, summarize content accurately, and identify important insights.",
      )

      logger.info("PDF analysis completed successfully")
      return NextResponse.json(object)
    } else {
      const prompt = `Analyze this data and provide insights:

${content.substring(0, 3000)}

Provide statistics, trends, recommendations, and assess data quality.`

      logger.debug("Analyzing data")

      const object = await generateContentWithAI(
        dataSchema,
        prompt,
        "You are a data analyst. Extract statistics, identify trends, provide actionable recommendations, and assess data quality.",
      )

      logger.info("Data analysis completed successfully")
      return NextResponse.json(object)
    }
  } catch (error) {
    logger.error("Error in PDF/data analysis", error)
    return createErrorResponse(error, 500)
  }
}
