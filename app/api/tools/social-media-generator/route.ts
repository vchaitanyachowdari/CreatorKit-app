import { generateObject } from "ai"
import { z } from "zod"

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
  const { topic, platforms, tone } = await req.json()

  const prompt = `Generate ${platforms.length} social media posts for the following:
Topic: ${topic}
Tone: ${tone}
Platforms: ${platforms.join(", ")}

Create posts tailored to each platform with appropriate length, style, and hashtags. Include 3-5 relevant hashtags for each post.`

  const { object } = await generateObject({
    model: "openai/gpt-5-mini",
    schema: postSchema,
    prompt,
  })

  return Response.json(object)
}
