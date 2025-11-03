"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AppFooter } from "@/components/app-footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Share2, FileText, Video, BarChart3, Code2, Brain, Globe, LogOut, Settings } from "lucide-react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with user info */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold">{session?.user?.name?.[0]?.toUpperCase()}</span>
            </div>
            <div>
              <p className="font-medium">{session?.user?.name}</p>
              <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {session?.user?.name?.split(" ")[0]}!</h1>
          <p className="text-muted-foreground">Access all your content creation tools in one place</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6 border border-border/50">
            <div className="text-3xl font-bold text-primary mb-2">12</div>
            <p className="text-sm text-muted-foreground">Content Created</p>
          </Card>
          <Card className="p-6 border border-border/50">
            <div className="text-3xl font-bold text-primary mb-2">8</div>
            <p className="text-sm text-muted-foreground">Saved Templates</p>
          </Card>
          <Card className="p-6 border border-border/50">
            <div className="text-3xl font-bold text-primary mb-2">156</div>
            <p className="text-sm text-muted-foreground">Words Generated</p>
          </Card>
          <Card className="p-6 border border-border/50">
            <div className="text-3xl font-bold text-primary mb-2">3h 24m</div>
            <p className="text-sm text-muted-foreground">Time Saved</p>
          </Card>
        </div>

        {/* Tools Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Your Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Social Media Generator", icon: Share2, href: "/tools/social-media-generator" },
              { name: "Blog Writer", icon: FileText, href: "/tools/blog-press-release" },
              { name: "Script Writer", icon: Video, href: "/tools/script-debugger" },
              { name: "Data Analyzer", icon: BarChart3, href: "/tools/pdf-data-analyzer" },
              { name: "Code Debugger", icon: Code2, href: "/tools/script-debugger" },
              { name: "SWOT Analysis", icon: Brain, href: "/tools/swot-translation" },
              { name: "Translation", icon: Globe, href: "/tools/swot-translation" },
              { name: "Regex Builder", icon: Code2, href: "/tools/regex-chart" },
              { name: "Chart Generator", icon: BarChart3, href: "/tools/regex-chart" },
            ].map((tool) => (
              <a key={tool.name} href={tool.href} className="group">
                <Card className="p-6 border border-border/50 hover:border-primary/50 transition-colors h-full">
                  <div className="flex items-start justify-between mb-4">
                    <tool.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">Access this tool</p>
                </Card>
              </a>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <Card className="p-6 border border-border/50">
            <div className="space-y-4">
              {[
                { action: "Created social media post", time: "2 hours ago" },
                { action: "Generated blog outline", time: "Yesterday" },
                { action: "Analyzed CSV data", time: "2 days ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b border-border/30 last:border-0">
                  <p className="text-muted-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <AppFooter />
    </div>
  )
}
