"use client"

import { useState } from "react"
import { Copy, Check, Loader2, Video, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ToolType = "script" | "debug"

interface ScriptResult {
  title: string
  script: string
  tips?: string[]
}

interface DebugResult {
  issues: Array<{
    severity: "error" | "warning" | "info"
    title: string
    description: string
    suggestion: string
  }>
  summary: string
  optimizationTips: string[]
}

export default function ScriptDebugger() {
  const [toolType, setToolType] = useState<ToolType>("script")
  const [input, setInput] = useState("")
  const [scriptType, setScriptType] = useState("video")
  const [language, setLanguage] = useState("javascript")
  const [result, setResult] = useState<ScriptResult | DebugResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateContent = async () => {
    if (!input.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/tools/script-debugger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType,
          input,
          scriptType: toolType === "script" ? scriptType : undefined,
          language: toolType === "debug" ? language : undefined,
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

  const isScriptResult = (obj: any): obj is ScriptResult => {
    return obj && "script" in obj
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Video className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Script Writer & Code Debugger</h1>
          </div>
          <p className="text-muted-foreground">
            Write scripts for videos and podcasts, or debug your code for errors and optimization
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
                    <TabsTrigger value="script" className="flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      Script Writer
                    </TabsTrigger>
                    <TabsTrigger value="debug" className="flex items-center gap-2">
                      <Code2 className="w-4 h-4" />
                      Code Debugger
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {toolType === "script" ? (
                  <>
                    {/* Script Type Selection */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Script Type</label>
                      <select
                        value={scriptType}
                        onChange={(e) => setScriptType(e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="video">Video</option>
                        <option value="podcast">Podcast</option>
                        <option value="presentation">Presentation</option>
                        <option value="commercial">Commercial</option>
                        <option value="tutorial">Tutorial</option>
                      </select>
                    </div>

                    {/* Topic Input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Topic & Details</label>
                      <Textarea
                        placeholder="Describe your video/podcast topic, target audience, length, key points..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="min-h-32 resize-none"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Language Selection */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Language</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="typescript">TypeScript</option>
                        <option value="cpp">C++</option>
                        <option value="csharp">C#</option>
                        <option value="go">Go</option>
                        <option value="rust">Rust</option>
                      </select>
                    </div>

                    {/* Code Input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Code to Debug</label>
                      <Textarea
                        placeholder="Paste your code here for debugging and optimization suggestions..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="min-h-32 resize-none font-mono text-xs"
                      />
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
                    `${toolType === "script" ? "Generate" : "Debug"} Code`
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Result Section */}
          <div className="lg:col-span-2">
            {result ? (
              isScriptResult(result) ? (
                // Script Result
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {scriptType.charAt(0).toUpperCase() + scriptType.slice(1)} Script
                        </Badge>
                        <h2 className="text-2xl font-bold text-balance">{result.title}</h2>
                      </div>
                      <button
                        onClick={() => copyToClipboard(result.script)}
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
                      <div className="whitespace-pre-wrap break-words text-foreground leading-relaxed bg-background/50 p-4 rounded-lg border border-border/50 font-mono text-sm">
                        {result.script}
                      </div>
                    </div>

                    {result.tips && result.tips.length > 0 && (
                      <div className="border-t border-border/50 pt-4">
                        <h3 className="text-sm font-medium mb-3">Tips for Delivery</h3>
                        <ul className="space-y-2">
                          {result.tips.map((tip, index) => (
                            <li key={index} className="flex gap-3 text-sm">
                              <span className="text-primary font-bold flex-shrink-0">{index + 1}.</span>
                              <span className="text-muted-foreground">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Card>
              ) : (
                // Debug Result
                <div className="space-y-4">
                  <Card className="p-6 border-primary/50 bg-background/50">
                    <h3 className="text-lg font-bold mb-2">Debug Summary</h3>
                    <p className="text-muted-foreground">{result.summary}</p>
                  </Card>

                  {result.issues.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-bold">Issues Found</h3>
                      {result.issues.map((issue, index) => (
                        <Card
                          key={index}
                          className={`p-4 border-l-4 ${
                            issue.severity === "error"
                              ? "border-l-red-500 bg-red-500/5"
                              : issue.severity === "warning"
                                ? "border-l-yellow-500 bg-yellow-500/5"
                                : "border-l-blue-500 bg-blue-500/5"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Badge
                              variant={issue.severity === "error" ? "destructive" : "secondary"}
                              className="capitalize"
                            >
                              {issue.severity}
                            </Badge>
                            <div className="flex-1">
                              <h4 className="font-bold text-sm">{issue.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
                              <p className="text-sm text-foreground mt-2">
                                <span className="font-medium">Suggestion:</span> {issue.suggestion}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {result.optimizationTips.length > 0 && (
                    <Card className="p-6 border-green-500/50 bg-green-500/5">
                      <h3 className="font-bold mb-3">Optimization Tips</h3>
                      <ul className="space-y-2">
                        {result.optimizationTips.map((tip, index) => (
                          <li key={index} className="flex gap-2 text-sm">
                            <span className="text-green-500 font-bold">✓</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  )}
                </div>
              )
            ) : (
              <Card className="p-12 text-center">
                {toolType === "script" ? (
                  <>
                    <Video className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {isLoading ? "Writing your script..." : "Enter your topic to generate a script"}
                    </p>
                  </>
                ) : (
                  <>
                    <Code2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {isLoading ? "Debugging your code..." : "Paste code to debug and optimize"}
                    </p>
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
