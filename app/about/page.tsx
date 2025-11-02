"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Users, Award, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-background/80 md:flex backdrop-blur-sm border border-border/50 shadow-lg max-w-5xl px-4 py-2">
        <Link href="/" className="z-50 flex items-center justify-center gap-2 font-bold text-lg">
          CreatorKit
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="font-medium transition-colors hover:text-foreground text-muted-foreground text-sm">
            Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">About CreatorKit</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering creators and professionals with AI-powered tools to produce amazing content faster than ever
            before.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="p-8 mb-12 bg-card/50 border border-primary/20">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            To democratize content creation by providing accessible, powerful AI tools that help creators,
            entrepreneurs, and professionals produce high-quality content without requiring specialized skills or
            expensive tools.
          </p>
        </Card>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border border-border/50 hover:border-primary/50 transition-colors">
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold mb-2 text-lg">User-Centric</h3>
              <p className="text-muted-foreground">
                We design every feature with our users in mind, constantly gathering feedback to improve the platform.
              </p>
            </Card>

            <Card className="p-6 border border-border/50 hover:border-primary/50 transition-colors">
              <Award className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold mb-2 text-lg">Quality First</h3>
              <p className="text-muted-foreground">
                We maintain the highest standards in content generation and user experience across all our tools.
              </p>
            </Card>

            <Card className="p-6 border border-border/50 hover:border-primary/50 transition-colors">
              <Zap className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold mb-2 text-lg">Innovation</h3>
              <p className="text-muted-foreground">
                We're committed to staying at the cutting edge of AI technology and creative tools development.
              </p>
            </Card>

            <Card className="p-6 border border-border/50 hover:border-primary/50 transition-colors">
              <CheckCircle className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold mb-2 text-lg">Reliability</h3>
              <p className="text-muted-foreground">
                Our tools are built to be dependable, fast, and always available when you need them.
              </p>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="text-center p-6 bg-card/50 border border-border/50 rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">11+</div>
            <p className="text-muted-foreground">AI-Powered Tools</p>
          </div>
          <div className="text-center p-6 bg-card/50 border border-border/50 rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">10K+</div>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          <div className="text-center p-6 bg-card/50 border border-border/50 rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">1M+</div>
            <p className="text-muted-foreground">Content Generated</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Our Team</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Built by a passionate team of AI engineers, designers, and content creators dedicated to making content
            creation effortless.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Sarah Chen", role: "Founder & CEO", description: "Former AI researcher at tech companies" },
              {
                name: "Michael Rodriguez",
                role: "CTO",
                description: "10+ years in full-stack development and AI/ML",
              },
              {
                name: "Emma Thompson",
                role: "Head of Product",
                description: "Experienced product leader focused on creator tools",
              },
            ].map((member) => (
              <Card key={member.name} className="p-6 border border-border/50">
                <div className="w-12 h-12 bg-primary/20 rounded-full mb-4" />
                <h3 className="font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 bg-primary/5 border border-primary/20 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">Join thousands of creators using CreatorKit today</p>
          <Link href="/signup">
            <Button size="lg" className="bg-gradient-to-b from-primary to-primary/80">
              Start Free Trial
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
