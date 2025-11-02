"use client"

import { useState } from "react"
import { Copy, Check, Loader2, Brain, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ToolType = "swot" | "translate"

interface SwotAnalysis {
  business: string
  strengths: string[]
  weaknesses: string[]
  opportunities: string[]
  threats: string[]
  strategicRecommendations: string[]
}

interface Translation {
  original: string
  translated: string
  targetLanguage: string
  confidence: string
  notes: string[]
}

const LANGUAGES = [
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Simplified Chinese" },
  { code: "zh-TW", name: "Traditional Chinese" },
  { code: "ru", name: "Russian" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
]

export default function SwotTranslation() {
  const [toolType, setToolType] = useState<ToolType>("swot")
  const [input, setInput] = useState("")
  const [targetLanguage, setTargetLanguage] = useState("es")
  const [tone, setTone] = useState("formal")
  const [result, setResult] = useState<SwotAnalysis | Translation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateContent = async () => {
    if (!input.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/tools/swot-translation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType,
          input,
          targetLanguage: toolType === "translate" ? targetLanguage : undefined,
          tone: toolType === "translate" ? tone : undefined,
        }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isSwotAnalysis = (obj: any): obj is SwotAnalysis => {
    return obj && "strengths" in obj
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Brain className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Business Analysis & Translation</h1>
          </div>
          <p className="text-muted-foreground">
            Generate strategic SWOT analysis or translate content across languages
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <div className="space-y-6">
                {/* Tool Type Tabs */}
                <Tabs value={toolType} onValueChange={(value) => setToolType(value as ToolType)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="swot" className="flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      SWOT
                    </TabsTrigger>
                    <TabsTrigger value="translate" className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Translate
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {toolType === "swot" ? (
                  <>
                    {/* Business/Topic Input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Business or Topic</label>
                      <Input
                        placeholder="E.g., Tech Startup, Restaurant Business, Product..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      />
                    </div>

                    {/* Context */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Additional Context</label>
                      <Textarea
                        placeholder="Describe the business, market, and any relevant details..."
                        value={input.includes("\n") ? input.split("\n").slice(1).join("\n") : ""}
                        onChange={(e) => setInput(input.split("\n")[0] + "\n" + e.target.value)}
                        className="min-h-24 resize-none"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Text to Translate */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Text to Translate</label>
                      <Textarea
                        placeholder="Enter text you want to translate..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="min-h-32 resize-none"
                      />
                    </div>

                    {/* Target Language */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Target Language</label>
                      <select
                        value={targetLanguage}
                        onChange={(e) => setTargetLanguage(e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {LANGUAGES.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Tone Selection */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Tone</label>
                      <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="formal">Formal</option>
                        <option value="casual">Casual</option>
                        <option value="professional">Professional</option>
                        <option value="friendly">Friendly</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Generate Button */}
                <Button
                  onClick={generateContent}
                  disabled={isLoading || !input.trim()}
                  className="w-full bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Generate ${toolType === "swot" ? "SWOT" : "Translation"}`
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Result Section */}
          <div className="lg:col-span-2">
            {result ? (
              isSwotAnalysis(result) ? (
                // SWOT Analysis Result
                <div className="space-y-4">
                  <Card className="p-6 border-primary/50 bg-primary/5">
                    <h2 className="text-2xl font-bold mb-2">{result.business}</h2>
                    <p className="text-sm text-muted-foreground">SWOT Strategic Analysis</p>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Strengths */}
                    <Card className="p-4 border-green-500/50 bg-green-500/5">
                      <h3 className="font-bold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                        <span className="text-xl">💪</span> Strengths
                      </h3>
                      <ul className="space-y-2">
                        {result.strengths.map((item, index) => (
                          <li key={index} className="text-sm flex gap-2">
                            <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>

                    {/* Weaknesses */}
                    <Card className="p-4 border-red-500/50 bg-red-500/5">
                      <h3 className="font-bold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                        <span className="text-xl">⚠️</span> Weaknesses
                      </h3>
                      <ul className="space-y-2">
                        {result.weaknesses.map((item, index) => (
                          <li key={index} className="text-sm flex gap-2">
                            <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>

                    {/* Opportunities */}
                    <Card className="p-4 border-blue-500/50 bg-blue-500/5">
                      <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                        <span className="text-xl">🚀</span> Opportunities
                      </h3>
                      <ul className="space-y-2">
                        {result.opportunities.map((item, index) => (
                          <li key={index} className="text-sm flex gap-2">
                            <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>

                    {/* Threats */}
                    <Card className="p-4 border-yellow-500/50 bg-yellow-500/5">
                      <h3 className="font-bold text-yellow-600 dark:text-yellow-400 mb-3 flex items-center gap-2">
                        <span className="text-xl">🎯</span> Threats
                      </h3>
                      <ul className="space-y-2">
                        {result.threats.map((item, index) => (
                          <li key={index} className="text-sm flex gap-2">
                            <span className="text-yellow-600 dark:text-yellow-400 font-bold">!</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>

                  {result.strategicRecommendations.length > 0 && (
                    <Card className="p-6 md:col-span-2">
                      <h3 className="font-bold mb-3">Strategic Recommendations</h3>
                      <ul className="space-y-2">
                        {result.strategicRecommendations.map((rec, index) => (
                          <li key={index} className="flex gap-3 text-sm">
                            <span className="text-primary font-bold flex-shrink-0">{index + 1}.</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  )}
                </div>
              ) : (
                // Translation Result
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {result.targetLanguage}
                        </Badge>
                        <h2 className="text-sm font-bold text-muted-foreground">Confidence: {result.confidence}</h2>
                      </div>
                      <button
                        onClick={() => copyToClipboard(result.translated)}
                        className="p-2 hover:bg-background/50 rounded-lg transition-colors flex-shrink-0"
                      >
                        {copied ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                        )}
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-bold text-muted-foreground">Original</h3>
                        <div className="p-4 bg-background/50 rounded-lg border border-border/50 min-h-32">
                          <p className="text-sm whitespace-pre-wrap break-words">{result.original}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-bold text-muted-foreground">Translation</h3>
                        <div className="p-4 bg-background/50 rounded-lg border border-primary/50 min-h-32">
                          <p className="text-sm whitespace-pre-wrap break-words text-primary">{result.translated}</p>
                        </div>
                      </div>
                    </div>

                    {result.notes.length > 0 && (
                      <div className="border-t border-border/50 pt-4">
                        <h3 className="font-bold mb-2">Translation Notes</h3>
                        <ul className="space-y-2">
                          {result.notes.map((note, index) => (
                            <li key={index} className="text-sm flex gap-2">
                              <span className="text-muted-foreground">•</span>
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Card>
              )
            ) : (
              <Card className="p-12 text-center">
                {toolType === "swot" ? (
                  <>
                    <Brain className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {isLoading ? "Generating SWOT analysis..." : "Enter a business topic to generate SWOT analysis"}
                    </p>
                  </>
                ) : (
                  <>
                    <Globe className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">{isLoading ? "Translating..." : "Enter text to translate"}</p>
                  </>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
