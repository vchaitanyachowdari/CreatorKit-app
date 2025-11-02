import { generateContentWithAI } from "@/lib/ai-provider"
import { z } from "zod"
import { createErrorResponse } from "@/lib/error-handler"
import { logger } from "@/lib/logger"

const regexSchema = z.object({
  pattern: z.string().describe("The regex pattern"),
  explanation: z.string().describe("Clear explanation of what the pattern matches"),
  examples: z.object({
    matches: z.array(z.string()).describe("Examples that match the pattern"),
    nonMatches: z.array(z.string()).describe("Examples that do not match the pattern"),
  }),
  flags: z.string().describe("Recommended regex flags (g, i, m, etc.)"),
})

const chartSchema = z.object({
  title: z.string().describe("Chart title"),
  description: z.string().describe("Description of the data"),
  csvData: z.string().describe("Data formatted as CSV for easy use"),
  chartType: z.string().describe("The type of chart"),
  insights: z.array(z.string()).describe("Key insights from the data"),
})

export async function POST(req: Request) {
  try {
    const { toolType, input, chartType, testString } = await req.json()

    if (toolType === "regex") {
      const prompt = `Create a regex pattern for: ${input}

Provide the exact regex pattern that matches this requirement. Include test examples.`

      logger.debug("Generating regex pattern")

      const object = await generateContentWithAI(
        regexSchema,
        prompt,
        "You are a regex expert. Create precise, well-explained regex patterns with clear examples of matches and non-matches.",
      )

      logger.info("Regex pattern generated successfully")
      return Response.json(object)
    } else {
      const prompt = `Create chart data from this description: ${input}

Generate realistic, well-structured data formatted as CSV that can be used to create a ${chartType} chart. Include meaningful labels and values.`

      logger.debug("Generating chart data", { chartType })

      const object = await generateContentWithAI(
        chartSchema,
        prompt,
        "You are a data visualization expert. Generate realistic, well-formatted data that clearly illustrates the described scenario.",
      )

      logger.info("Chart data generated successfully", { chartType })
      return Response.json({
        ...object,
        chartType,
      })
    }
  } catch (error) {
    logger.error("Error in regex/chart operation", error)
    return createErrorResponse(error, 500)
  }
}
