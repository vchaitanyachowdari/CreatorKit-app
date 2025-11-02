"use client"

import { useState } from "react"
import { Copy, Check, Loader2, FileText, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ContentType = "blog" | "press"

interface GeneratedContent {
  title: string
  content: string
  metadata?: {
    readTime?: number
    seoKeywords?: string[]
    wordCount?: number
  }
}

export default function BlogPressReleaseGenerator() {
  const [contentType, setContentType] = useState<ContentType>("blog")
  const [topic, setTopic] = useState("")
  const [description, setDescription] = useState("")
  const [keywords, setKeywords] = useState("")
  const [tone, setTone] = useState("professional")
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateContent = async () => {
    if (!topic.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/tools/blog-press-release", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType,
          topic,
          description,
          keywords: keywords
            .split(",")
            .map((k) => k.trim())
            .filter((k) => k),
          tone,
        }),
      })

      const data = await response.json()
      setGeneratedContent(data)
    } catch (error) {
      console.error("Error generating content:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const fullContent = generatedContent ? `${generatedContent.title}\n\n${generatedContent.content}` : ""

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Content Generator</h1>
          </div>
          <p className="text-muted-foreground">Create SEO-optimized blog posts or professional press releases</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <div className="space-y-6">
                {/* Content Type Tabs */}
                <Tabs value={contentType} onValueChange={(value) => setContentType(value as ContentType)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="blog" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Blog Post
                    </TabsTrigger>
                    <TabsTrigger value="press" className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Press Release
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Topic Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Topic Title</label>
                  <Input
                    placeholder={
                      contentType === "blog"
                        ? "E.g., How to Optimize React Performance"
                        : "E.g., Company Launches New Product"
                    }
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Description</label>
                  <Textarea
                    placeholder={
                      contentType === "blog"
                        ? "Key points to cover in the post..."
                        : "Press release details and announcement..."
                    }
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-20 resize-none"
                  />
                </div>

                {/* Keywords */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Keywords</label>
                  <Input
                    placeholder="Enter comma-separated keywords..."
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>

                {/* Tone Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="academic">Academic</option>
                    <option value="technical">Technical</option>
                    <option value="storytelling">Storytelling</option>
                  </select>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generateContent}
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
                    `Generate ${contentType === "blog" ? "Blog Post" : "Press Release"}`
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Generated Content Section */}
          <div className="lg:col-span-2">
            {generatedContent ? (
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Badge variant="secondary" className="mb-2 capitalize">
                        {contentType === "blog" ? "Blog Post" : "Press Release"}
                      </Badge>
                      <h2 className="text-2xl md:text-3xl font-bold text-balance">{generatedContent.title}</h2>
                      {generatedContent.metadata && (
                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                          {generatedContent.metadata.readTime && (
                            <span>{generatedContent.metadata.readTime} min read</span>
                          )}
                          {generatedContent.metadata.wordCount && (
                            <span>{generatedContent.metadata.wordCount.toLocaleString()} words</span>
                          )}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => copyToClipboard(fullContent)}
                      className="p-2 hover:bg-background/50 rounded-lg transition-colors flex-shrink-0"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                  </div>

                  <div className="border-t border-border/50 pt-4">
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-wrap break-words text-foreground leading-relaxed">
                        {generatedContent.content}
                      </div>
                    </div>
                  </div>

                  {generatedContent.metadata?.seoKeywords && generatedContent.metadata.seoKeywords.length > 0 && (
                    <div className="border-t border-border/50 pt-4">
                      <h3 className="text-sm font-medium mb-3">SEO Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {generatedContent.metadata.seoKeywords.map((keyword, index) => (
                          <Badge key={index} variant="outline">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {isLoading ? "Generating your content..." : "Enter details and click Generate to create your content"}
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
