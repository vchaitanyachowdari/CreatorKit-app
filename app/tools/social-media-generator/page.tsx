"use client"

import { useState } from "react"
import { Copy, Check, Loader2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Platform = "twitter" | "linkedin" | "instagram" | "facebook" | "tiktok"
type Tone = "professional" | "casual" | "funny" | "inspirational" | "urgent"

interface GeneratedPost {
  platform: Platform
  content: string
  hashtags: string[]
}

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: "twitter", label: "Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
]

const TONES: { value: Tone; label: string }[] = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "funny", label: "Funny" },
  { value: "inspirational", label: "Inspirational" },
  { value: "urgent", label: "Urgent" },
]

export default function SocialMediaGenerator() {
  const [topic, setTopic] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(["twitter", "linkedin"])
  const [tone, setTone] = useState<Tone>("professional")
  const [posts, setPosts] = useState<GeneratedPost[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((prev) => (prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]))
  }

  const generatePosts = async () => {
    if (!topic.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/tools/social-media-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          platforms: selectedPlatforms,
          tone,
        }),
      })

      const data = await response.json()
      setPosts(data.posts)
    } catch (error) {
      console.error("Error generating posts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Share2 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Social Media Post Generator</h1>
          </div>
          <p className="text-muted-foreground">
            Create platform-specific posts with the perfect tone for your audience
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <div className="space-y-6">
                {/* Topic Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Topic or Content</label>
                  <Textarea
                    placeholder="Enter your topic, product, or content idea..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="min-h-24 resize-none"
                  />
                </div>

                {/* Platform Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium">Platforms</label>
                  <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map((platform) => (
                      <button
                        key={platform.value}
                        onClick={() => togglePlatform(platform.value)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                          selectedPlatforms.includes(platform.value)
                            ? "bg-primary text-primary-foreground"
                            : "bg-card border border-border/50 text-muted-foreground hover:border-border"
                        }`}
                      >
                        {platform.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tone Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium">Tone</label>
                  <div className="flex flex-wrap gap-2">
                    {TONES.map((t) => (
                      <button
                        key={t.value}
                        onClick={() => setTone(t.value)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                          tone === t.value
                            ? "bg-primary text-primary-foreground"
                            : "bg-card border border-border/50 text-muted-foreground hover:border-border"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generatePosts}
                  disabled={isLoading || !topic.trim()}
                  className="w-full bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Posts"
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Generated Posts Section */}
          <div className="lg:col-span-2">
            {posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post, index) => (
                  <Card key={`${post.platform}-${index}`} className="p-6 hover:border-primary/50 transition-colors">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="capitalize">
                          {post.platform}
                        </Badge>
                        <button
                          onClick={() => copyToClipboard(post.content, `${post.platform}-${index}`)}
                          className="p-2 hover:bg-background/50 rounded-lg transition-colors"
                        >
                          {copiedId === `${post.platform}-${index}` ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          )}
                        </button>
                      </div>

                      <p className="text-foreground whitespace-pre-wrap break-words">{post.content}</p>

                      {post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {post.hashtags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Share2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {isLoading ? "Generating your posts..." : "Enter a topic and click Generate Posts to get started"}
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
