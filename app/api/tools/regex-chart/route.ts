import { generateObject } from "ai"
import { z } from "zod"

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
  const { toolType, input, chartType, testString } = await req.json()

  if (toolType === "regex") {
    const prompt = `Create a regex pattern for: ${input}

Provide the exact regex pattern that matches this requirement. Include test examples.`

    const { object } = await generateObject({
      model: "openai/gpt-5-mini",
      schema: regexSchema,
      prompt,
      system:
        "You are a regex expert. Create precise, well-explained regex patterns with clear examples of matches and non-matches.",
    })

    return Response.json(object)
  } else {
    const prompt = `Create chart data from this description: ${input}

Generate realistic, well-structured data formatted as CSV that can be used to create a ${chartType} chart. Include meaningful labels and values.`

    const { object } = await generateObject({
      model: "openai/gpt-5-mini",
      schema: chartSchema,
      prompt,
      system:
        "You are a data visualization expert. Generate realistic, well-formatted data that clearly illustrates the described scenario.",
    })

    return Response.json({
      ...object,
      chartType,
    })
  }
}
