"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Zap,
  FileText,
  Share2,
  Video,
  BarChart3,
  Code2,
  Brain,
  Globe,
  Grid3X3,
  PenTool,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "system")
    root.classList.add("dark")
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen w-full relative bg-background">
      <header
        className={`sticky top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-background/80 md:flex backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ${isScrolled ? "max-w-3xl px-2" : "max-w-5xl px-4"} py-2`}
      >
        <Link href="/" className="z-50 flex items-center justify-center gap-2 font-bold text-lg">
          <Grid3X3 className="w-6 h-6 text-primary" />
          <span>CreatorKit</span>
        </Link>

        <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-muted-foreground md:flex md:space-x-2">
          <a className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            Tools
          </a>
          <a className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            Features
          </a>
          <a className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="font-medium transition-colors hover:text-foreground text-muted-foreground text-sm"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="rounded-md font-bold relative hover:-translate-y-0.5 transition duration-200 inline-block text-center bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] px-4 py-2 text-sm"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg md:hidden px-4 py-3">
        <Link href="/" className="flex items-center justify-center gap-2 font-bold">
          <Grid3X3 className="w-5 h-5 text-primary" />
          <span className="text-sm">CreatorKit</span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-border/50 transition-colors hover:bg-background/80"
        >
          <div className="flex flex-col items-center justify-center w-5 h-5 space-y-1">
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
          </div>
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-6">
            <nav className="flex flex-col space-y-4">
              <button className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50">
                Tools
              </button>
              <button className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50">
                Features
              </button>
              <button className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50">
                Pricing
              </button>
              <div className="border-t border-border/50 pt-4 mt-4 flex flex-col space-y-3">
                <Link
                  href="/login"
                  className="px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-3 text-lg font-bold text-center bg-gradient-to-b from-primary to-primary/80 text-primary-foreground rounded-lg shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(120, 81, 169, 0.1), transparent 60%)" }}
        />

        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            The Creative Toolkit You've Been Waiting For
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            Create Stunning Content in Minutes
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            All-in-one platform with 11+ tools to generate, analyze, and optimize content across every medium. From
            social media to code debugging.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
              >
                Get Started Free <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>

          <div className="pt-8 md:pt-12 grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 text-center">
            <div className="p-3 rounded-lg bg-card border border-border/50">
              <div className="text-xl md:text-2xl font-bold text-primary">11+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Tools</div>
            </div>
            <div className="p-3 rounded-lg bg-card border border-border/50">
              <div className="text-xl md:text-2xl font-bold text-primary">0$</div>
              <div className="text-xs md:text-sm text-muted-foreground">Free Tier</div>
            </div>
            <div className="p-3 rounded-lg bg-card border border-border/50">
              <div className="text-xl md:text-2xl font-bold text-primary">10k+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Users</div>
            </div>
            <div className="p-3 rounded-lg bg-card border border-border/50 col-span-3 md:col-span-1">
              <div className="text-xl md:text-2xl font-bold text-primary">24/7</div>
              <div className="text-xs md:text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="py-20 px-4 bg-card/30 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A complete suite of tools designed for creators, professionals, and developers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Social Media Post Generator */}
            <div className="p-6 rounded-lg bg-background border border-border/50 hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <Share2 className="w-8 h-8 text-primary" />
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">Social Media Post Generator</h3>
              <p className="text-sm text-muted-foreground">
                Create platform-specific posts with hashtags, emojis, and tone variations
              </p>
            </div>

            {/* Blog Post Writer */}
            <div className="p-6 rounded-lg bg-background border border-border/50 hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <FileText className="w-8 h-8 text-primary" />
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">Blog Post Writer</h3>
              <p className="text-sm text-muted-foreground">SEO-optimized long-form content with readability scores</p>
            </div>

            {/* Press Release Generator */}
            <div className="p-6 rounded-lg bg-background border border-border/50 hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <Zap className="w-8 h-8 text-primary" />
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">Press Release Generator</h3>
              <p className="text-sm text-muted-foreground">Professional PR with AP Style formatting</p>
            </div>

            {/* Script Writer */}
            <div className="p-6 rounded-lg bg-background border border-border/50 hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <Video className="w-8 h-8 text-primary" />
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">Script Writer</h3>
              <p className="text-sm text-muted-foreground">Video and podcast scripts with teleprompter mode</p>
            </div>

            {/* PDF Analyzer */}
            <div className="p-6 rounded-lg bg-background border border-border/50 hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <FileText className="w-8 h-8 text-primary" />
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">PDF Analyzer</h3>
              <p className="text-sm text-muted-foreground">Extract, summarize, and analyze PDF content</p>
            </div>

            {/* Data Insights Engine */}
            <div className="p-6 rounded-lg bg-background border border-border/50 hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <BarChart3 className="w-8 h-8 text-primary" />
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">Data Insights Engine</h3>
              <p className="text-sm text-muted-foreground">Visualize and analyze CSV data with AI insights</p>
            </div>

            {/* Code Debugger */}
            <div className="p-6 rounded-lg bg-background border border-border/50 hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <Code2 className="w-8 h-8 text-primary" />
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">Code Debugger</h3>
              <p className="text-sm text-muted-foreground">Find errors, security issues, and optimization tips</p>
            </div>

            {/* SWOT Analysis */}
            <div className="p-6 rounded-lg bg-background border border-border/50 hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <Brain className="w-8 h-8 text-primary" />
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">SWOT Analysis</h3>
              <p className="text-sm text-muted-foreground">Generate strategic business analysis</p>
            </div>

            {/* Translation Suite */}
            <div className="p-6 rounded-lg bg-background border border-border/50 hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <Globe className="w-8 h-8 text-primary" />
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">Translation Suite</h3>
              <p className="text-sm text-muted-foreground">Multi-language translation with tone preservation</p>
            </div>

            {/* Regex Builder */}
            <div className="p-6 rounded-lg bg-background border border-border/50 hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <Code2 className="w-8 h-8 text-primary" />
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">Regex Builder</h3>
              <p className="text-sm text-muted-foreground">Visual regex patterns with real-time testing</p>
            </div>

            {/* Chart Generator */}
            <div className="p-6 rounded-lg bg-background border border-border/50 hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <BarChart3 className="w-8 h-8 text-primary" />
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">Chart Generator</h3>
              <p className="text-sm text-muted-foreground">Create beautiful charts from data</p>
            </div>

            {/* Pitch Deck Builder */}
            <div className="p-6 rounded-lg bg-background border border-border/50 hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <PenTool className="w-8 h-8 text-primary" />
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">Pitch Deck Builder</h3>
              <p className="text-sm text-muted-foreground">Professional pitch decks in minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Create Better Content?</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of creators and professionals using CreatorKit to save time and create amazing content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 font-bold mb-4">
                <Grid3X3 className="w-5 h-5 text-primary" />
                CreatorKit
              </div>
              <p className="text-sm text-muted-foreground">Your toolkit for creating amazing content.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>&copy; 2025 CreatorKit. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground">
                Twitter
              </a>
              <a href="#" className="hover:text-foreground">
                LinkedIn
              </a>
              <a href="#" className="hover:text-foreground">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
