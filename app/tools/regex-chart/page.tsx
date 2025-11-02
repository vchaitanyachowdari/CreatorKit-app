"use client"

import { useState } from "react"
import { Copy, Check, Loader2, Code2, BarChart3, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ToolType = "regex" | "chart"

interface RegexResult {
  pattern: string
  explanation: string
  examples: {
    matches: string[]
    nonMatches: string[]
  }
  flags: string
}

interface ChartData {
  title: string
  description: string
  csvData: string
  chartType: string
  insights: string[]
}

export default function RegexChart() {
  const [toolType, setToolType] = useState<ToolType>("regex")
  const [input, setInput] = useState("")
  const [testString, setTestString] = useState("")
  const [chartType, setChartType] = useState("bar")
  const [result, setResult] = useState<RegexResult | ChartData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [matches, setMatches] = useState<string[]>([])

  const generateContent = async () => {
    if (!input.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/tools/regex-chart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType,
          input,
          chartType: toolType === "chart" ? chartType : undefined,
          testString: toolType === "regex" ? testString : undefined,
        }),
      })

      const data = await response.json()
      setResult(data)

      if (toolType === "regex" && testString) {
        try {
          const regex = new RegExp(data.pattern, data.flags)
          const foundMatches = testString.match(regex) || []
          setMatches(Array.from(foundMatches))
        } catch (e) {
          setMatches([])
        }
      }
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

  const isRegexResult = (obj: any): obj is RegexResult => {
    return obj && "pattern" in obj && "explanation" in obj
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Code2 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Regex Builder & Chart Generator</h1>
          </div>
          <p className="text-muted-foreground">
            Create regex patterns with real-time testing or generate charts from data
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
                    <TabsTrigger value="regex" className="flex items-center gap-2">
                      <Code2 className="w-4 h-4" />
                      Regex
                    </TabsTrigger>
                    <TabsTrigger value="chart" className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Chart
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {toolType === "regex" ? (
                  <>
                    {/* Regex Description */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Pattern Description</label>
                      <Textarea
                        placeholder="Describe what you want to match (e.g., 'email addresses', 'phone numbers', 'URLs')"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="min-h-20 resize-none"
                      />
                    </div>

                    {/* Test String */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Test String</label>
                      <Textarea
                        placeholder="Enter text to test the regex pattern..."
                        value={testString}
                        onChange={(e) => setTestString(e.target.value)}
                        className="min-h-20 resize-none"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Data Description */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Data Description</label>
                      <Textarea
                        placeholder="Describe your data (e.g., 'Q1 sales by region: North 50k, South 40k, East 60k, West 45k')"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="min-h-24 resize-none"
                      />
                    </div>

                    {/* Chart Type */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Chart Type</label>
                      <select
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="bar">Bar Chart</option>
                        <option value="line">Line Chart</option>
                        <option value="pie">Pie Chart</option>
                        <option value="area">Area Chart</option>
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
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      {toolType === "regex" ? "Generate Pattern" : "Generate Chart"}
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Result Section */}
          <div className="lg:col-span-2">
            {result ? (
              isRegexResult(result) ? (
                // Regex Result
                <div className="space-y-4">
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            Regex Pattern
                          </Badge>
                          <h2 className="text-lg font-bold break-all font-mono">{result.pattern}</h2>
                        </div>
                        <button
                          onClick={() => copyToClipboard(result.pattern)}
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
                        <h3 className="font-bold mb-2">Explanation</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
                          {result.explanation}
                        </p>
                      </div>

                      {result.flags && (
                        <div className="border-t border-border/50 pt-4">
                          <h3 className="font-bold mb-2">Flags</h3>
                          <div className="flex gap-2">
                            {result.flags.split("").map((flag, index) => (
                              <Badge key={index} variant="outline">
                                {flag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Examples */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4 border-green-500/50 bg-green-500/5">
                      <h3 className="font-bold text-green-600 dark:text-green-400 mb-3">Matches</h3>
                      <ul className="space-y-1">
                        {result.examples.matches.map((example, index) => (
                          <li key={index} className="text-sm font-mono text-foreground break-all">
                            "{example}"
                          </li>
                        ))}
                      </ul>
                    </Card>

                    <Card className="p-4 border-red-500/50 bg-red-500/5">
                      <h3 className="font-bold text-red-600 dark:text-red-400 mb-3">Non-Matches</h3>
                      <ul className="space-y-1">
                        {result.examples.nonMatches.map((example, index) => (
                          <li key={index} className="text-sm font-mono text-foreground break-all">
                            "{example}"
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>

                  {/* Test Results */}
                  {matches.length > 0 && (
                    <Card className="p-4 border-blue-500/50 bg-blue-500/5">
                      <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Test Results</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Found {matches.length} match{matches.length !== 1 ? "es" : ""}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {matches.map((match, index) => (
                          <Badge key={index} variant="outline" className="font-mono">
                            {match}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
              ) : (
                // Chart Result
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Badge variant="secondary" className="mb-2 capitalize">
                          {result.chartType} Chart
                        </Badge>
                        <h2 className="text-2xl font-bold text-balance">{result.title}</h2>
                      </div>
                      <button
                        onClick={() => copyToClipboard(result.csvData)}
                        className="p-2 hover:bg-background/50 rounded-lg transition-colors flex-shrink-0"
                      >
                        {copied ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                        )}
                      </button>
                    </div>

                    <p className="text-muted-foreground text-sm">{result.description}</p>

                    <div className="border-t border-border/50 pt-4">
                      <h3 className="font-bold mb-2">Data (CSV Format)</h3>
                      <div className="p-3 bg-background/50 rounded-lg border border-border/50 font-mono text-xs whitespace-pre-wrap break-words">
                        {result.csvData}
                      </div>
                    </div>

                    {result.insights.length > 0 && (
                      <div className="border-t border-border/50 pt-4">
                        <h3 className="font-bold mb-3">Insights</h3>
                        <ul className="space-y-2">
                          {result.insights.map((insight, index) => (
                            <li key={index} className="flex gap-2 text-sm">
                              <span className="text-primary font-bold flex-shrink-0">•</span>
                              <span>{insight}</span>
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
                {toolType === "regex" ? (
                  <>
                    <Code2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {isLoading ? "Building regex pattern..." : "Describe the pattern you want to match"}
                    </p>
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {isLoading ? "Generating chart..." : "Describe your data to generate a chart"}
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
