import { NextResponse } from "next/server"
import { generateContentWithAI } from "@/lib/ai-provider"
import { z } from "zod"
import { createErrorResponse } from "@/lib/error-handler"
import { logger } from "@/lib/logger"
import { rateLimit } from "@/lib/rate-limit"

const postSchema = z.object({
  posts: z.array(
    z.object({
      platform: z.enum(["twitter", "linkedin", "instagram", "facebook", "tiktok"]),
      content: z.string().describe("The social media post content"),
      hashtags: z.array(z.string()).describe("Relevant hashtags for the post"),
    }),
  ),
})

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
    const rateLimitResult = rateLimit(`social-media:${ip}`, { maxRequests: 30, windowMs: 60000 })

    if (rateLimitResult.limited) {
      logger.warn("Rate limit exceeded", { ip, endpoint: "/api/tools/social-media-generator" })
      return new Response(
        JSON.stringify({
          error: "RATE_LIMIT_EXCEEDED",
          message: "Too many requests. Please try again later.",
          resetTime: rateLimitResult.resetTime,
        }),
        { status: 429, headers: { "Content-Type": "application/json" } },
      )
    }

    const { topic, platforms, tone } = await req.json()

    if (!topic || !platforms || !tone) {
      logger.warn("Missing required fields", { topic: !!topic, platforms: !!platforms, tone: !!tone })
      return createErrorResponse(new Error("Missing required fields: topic, platforms, tone"), 400)
    }

    if (!Array.isArray(platforms) || platforms.length === 0) {
      return createErrorResponse(new Error("Platforms must be a non-empty array"), 400)
    }

    const prompt = `Generate ${platforms.length} social media posts for the following:
Topic: ${topic}
Tone: ${tone}
Platforms: ${platforms.join(", ")}

Create posts tailored to each platform with appropriate length, style, and hashtags. Include 3-5 relevant hashtags for each post.`

    logger.debug("Generating social media posts", { topic, platforms, tone })

    const object = await generateContentWithAI(
      postSchema,
      prompt,
      "You are a social media expert who creates engaging, platform-optimized posts with appropriate hashtags and tone.",
    )

    logger.info("Social media posts generated successfully", { platforms: platforms.length })

    return NextResponse.json(object, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    })
  } catch (error) {
    logger.error("Error generating social media posts", error)
    return createErrorResponse(error, 500)
  }
}
