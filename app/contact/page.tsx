"use client"

import type React from "react"
import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { AppFooter } from "@/components/app-footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } catch {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <AppHeader showAuth={true} />

      <div className="flex-1 max-w-6xl mx-auto px-4 py-20 w-full">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you. Our team typically responds within 24 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Contact Info Cards */}
          <Card className="p-6 border border-border/50">
            <Mail className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-bold mb-2">Email</h3>
            <p className="text-muted-foreground mb-2">support@creatorkit.com</p>
            <a href="mailto:support@creatorkit.com" className="text-primary hover:underline text-sm">
              Send us an email
            </a>
          </Card>

          <Card className="p-6 border border-border/50">
            <Phone className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-bold mb-2">Phone</h3>
            <p className="text-muted-foreground mb-2">+1 (555) 123-4567</p>
            <a href="tel:+15551234567" className="text-primary hover:underline text-sm">
              Give us a call
            </a>
          </Card>

          <Card className="p-6 border border-border/50">
            <MapPin className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-bold mb-2">Office</h3>
            <p className="text-muted-foreground text-sm">
              123 Creator Street
              <br />
              San Francisco, CA 94103
            </p>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="p-8 border border-border/50 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

          {submitStatus === "success" && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-600 p-4 rounded-lg mb-6">
              Thank you for reaching out! We'll get back to you soon.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-600 p-4 rounded-lg mb-6">
              Something went wrong. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your inquiry..."
                className="min-h-32 resize-none"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              size="lg"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: "What's your response time?",
                a: "We typically respond to all inquiries within 24 hours during business days.",
              },
              {
                q: "Do you offer phone support?",
                a: "Yes, we offer phone support for premium users. Contact us for details.",
              },
              {
                q: "Can I schedule a demo?",
                a: "Email us at support@creatorkit.com to arrange a personalized demo.",
              },
              {
                q: "What if I have technical issues?",
                a: "Our technical support team is available to help. Include details about your issue in your message.",
              },
            ].map((faq, i) => (
              <Card key={i} className="p-6 border border-border/50">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <AppFooter />
    </div>
  )
}
