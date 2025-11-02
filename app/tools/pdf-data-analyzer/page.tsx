"use client"

import type React from "react"

import { useState } from "react"
import { Copy, Check, Loader2, FileText, BarChart3, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ToolType = "pdf" | "data"

interface PdfAnalysis {
  title: string
  summary: string
  keyPoints: string[]
  metadata: {
    pageCount?: number
    estimatedReadTime?: number
    topics?: string[]
  }
}

interface DataInsight {
  summary: string
  statistics: {
    label: string
    value: string
    description: string
  }[]
  trends: string[]
  recommendations: string[]
  dataQuality: string
}

export default function PdfDataAnalyzer() {
  const [toolType, setToolType] = useState<ToolType>("pdf")
  const [input, setInput] = useState("")
  const [fileContent, setFileContent] = useState("")
  const [fileName, setFileName] = useState("")
  const [result, setResult] = useState<PdfAnalysis | DataInsight | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        setFileContent(content)
      }
      reader.readAsText(file)
    }
  }

  const analyzeContent = async () => {
    const contentToAnalyze = toolType === "pdf" ? fileContent : input

    if (!contentToAnalyze.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/tools/pdf-data-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType,
          content: contentToAnalyze,
        }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error analyzing:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isPdfAnalysis = (obj: any): obj is PdfAnalysis => {
    return obj && "keyPoints" in obj
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">PDF & Data Analyzer</h1>
          </div>
          <p className="text-muted-foreground">Analyze PDFs and extract insights from data with AI-powered analysis</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <div className="space-y-6">
                {/* Tool Type Tabs */}
                <Tabs value={toolType} onValueChange={(value) => setToolType(value as ToolType)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="pdf" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      PDF Analyzer
                    </TabsTrigger>
                    <TabsTrigger value="data" className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Data Insights
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {toolType === "pdf" ? (
                  <>
                    {/* PDF Upload */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium">Upload PDF or Paste Text</label>
                      <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-border/50 rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="w-5 h-5 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {fileName ? fileName : "Click to upload"}
                          </span>
                        </div>
                        <input type="file" accept=".txt,.pdf" onChange={handleFileUpload} className="hidden" />
                      </label>
                    </div>

                    {/* Text Alternative */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-xs text-muted-foreground">
                        or paste content below
                      </label>
                      <Textarea
                        placeholder="Paste PDF text or document content..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="min-h-24 resize-none text-xs"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* CSV/Data Input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Paste CSV or Data</label>
                      <Textarea
                        placeholder="Paste CSV data, JSON, or tabular data for analysis..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="min-h-32 resize-none font-mono text-xs"
                      />
                    </div>

                    {/* Data Description */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Context (optional)</label>
                      <Input placeholder="Describe what this data represents..." className="text-sm" />
                    </div>
                  </>
                )}

                {/* Analyze Button */}
                <Button
                  onClick={analyzeContent}
                  disabled={isLoading || (!fileContent && !input.trim())}
                  className="w-full bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    `Analyze ${toolType === "pdf" ? "PDF" : "Data"}`
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Result Section */}
          <div className="lg:col-span-2">
            {result ? (
              isPdfAnalysis(result) ? (
                // PDF Analysis Result
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          PDF Analysis
                        </Badge>
                        <h2 className="text-2xl font-bold text-balance">{result.title}</h2>
                      </div>
                      <button
                        onClick={() => copyToClipboard(result.summary)}
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
                      <h3 className="font-bold mb-2">Summary</h3>
                      <p className="text-muted-foreground whitespace-pre-wrap break-words">{result.summary}</p>
                    </div>

                    {result.keyPoints.length > 0 && (
                      <div className="border-t border-border/50 pt-4">
                        <h3 className="font-bold mb-3">Key Points</h3>
                        <ul className="space-y-2">
                          {result.keyPoints.map((point, index) => (
                            <li key={index} className="flex gap-3 text-sm">
                              <span className="text-primary font-bold flex-shrink-0">{index + 1}.</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.metadata.topics && result.metadata.topics.length > 0 && (
                      <div className="border-t border-border/50 pt-4">
                        <h3 className="font-bold mb-2">Topics Covered</h3>
                        <div className="flex flex-wrap gap-2">
                          {result.metadata.topics.map((topic, index) => (
                            <Badge key={index} variant="outline">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ) : (
                // Data Insights Result
                <div className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-2">Analysis Summary</h3>
                    <p className="text-muted-foreground">{result.summary}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Data Quality: {result.dataQuality}
                      </Badge>
                    </div>
                  </Card>

                  {result.statistics.length > 0 && (
                    <Card className="p-6">
                      <h3 className="font-bold mb-4">Key Statistics</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {result.statistics.map((stat, index) => (
                          <div key={index} className="p-4 bg-background/50 rounded-lg border border-border/50">
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                            <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
                            <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {result.trends.length > 0 && (
                    <Card className="p-6">
                      <h3 className="font-bold mb-3">Trends</h3>
                      <ul className="space-y-2">
                        {result.trends.map((trend, index) => (
                          <li key={index} className="flex gap-2 text-sm">
                            <span className="text-primary">→</span>
                            <span>{trend}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  )}

                  {result.recommendations.length > 0 && (
                    <Card className="p-6 border-primary/50 bg-primary/5">
                      <h3 className="font-bold mb-3">Recommendations</h3>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex gap-2 text-sm">
                            <span className="text-primary font-bold">✓</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  )}
                </div>
              )
            ) : (
              <Card className="p-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {isLoading
                    ? "Analyzing your content..."
                    : `Upload or paste ${toolType === "pdf" ? "a PDF" : "data"} to get started`}
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
