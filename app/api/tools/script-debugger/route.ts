import { generateContentWithAI } from "@/lib/ai-provider"
import { z } from "zod"
import { createErrorResponse } from "@/lib/error-handler"
import { logger } from "@/lib/logger"

const scriptSchema = z.object({
  title: z.string().describe("The script title"),
  script: z.string().describe("The full script content formatted for reading/performance"),
  tips: z.array(z.string()).describe("Delivery and performance tips"),
})

const debugSchema = z.object({
  summary: z.string().describe("A brief summary of the code analysis"),
  issues: z
    .array(
      z.object({
        severity: z.enum(["error", "warning", "info"]).describe("Severity level"),
        title: z.string().describe("Issue title"),
        description: z.string().describe("Detailed description of the issue"),
        suggestion: z.string().describe("How to fix the issue"),
      }),
    )
    .describe("Found issues and bugs"),
  optimizationTips: z.array(z.string()).describe("Code optimization suggestions"),
})

export async function POST(req: Request) {
  try {
    const { toolType, input, scriptType, language } = await req.json()

    if (toolType === "script") {
      const prompt = `Generate a professional ${scriptType} script with the following details:
${input}

Create a well-paced, engaging script that's ready for delivery. Format it clearly for reading/performance.`

      logger.debug("Generating script", { scriptType })

      const object = await generateContentWithAI(
        scriptSchema,
        prompt,
        `You are a professional scriptwriter who creates engaging ${scriptType} scripts for various audiences. Your scripts are clear, paced well, and optimized for delivery.`,
      )

      logger.info("Script generated successfully", { scriptType })
      return Response.json(object)
    } else {
      const prompt = `Analyze and debug this ${language} code:

\`\`\`${language}
${input}
\`\`\`

Identify any errors, security issues, performance problems, and provide optimization suggestions. Include severity levels and actionable fixes.`

      logger.debug("Analyzing code", { language })

      const object = await generateContentWithAI(
        debugSchema,
        prompt,
        `You are an expert code debugger and optimizer. Analyze code carefully for errors, security issues, and performance problems. Provide clear, actionable suggestions for improvement.`,
      )

      logger.info("Code analysis completed successfully", { language })
      return Response.json(object)
    }
  } catch (error) {
    logger.error("Error in script/debugger operation", error)
    return createErrorResponse(error, 500)
  }
}
