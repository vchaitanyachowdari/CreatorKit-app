"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              CreatorKit ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you visit our website and use
              our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <Card className="p-6 bg-card/50 border border-border/50">
              <h3 className="font-bold mb-3">We collect information in several ways:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <strong>Account Information:</strong> Name, email address, password, and profile details when you
                  create an account
                </li>
                <li>
                  <strong>Content:</strong> Content you create, input, or upload to our platform for processing
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you interact with our services, including IP
                  address, browser type, and pages visited
                </li>
                <li>
                  <strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our
                  platform
                </li>
              </ul>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <Card className="p-6 bg-card/50 border border-border/50">
              <p className="text-muted-foreground mb-3">We use the collected information for:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Providing and maintaining our services</li>
                <li>Processing your requests and transactions</li>
                <li>Sending periodic emails regarding your account or service</li>
                <li>Improving our services and personalizing your experience</li>
                <li>Detecting and preventing fraud and abuse</li>
                <li>Complying with legal obligations</li>
              </ul>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction. However, no method of
              transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information for as long as your account is active or as needed to provide
              services. You can request deletion of your account and associated data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may share limited information with third-party service providers who assist us in operating our
              website, conducting our business, or providing services to you. These third parties are contractually
              obligated to use your information only as necessary to provide services to us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
            <Card className="p-6 bg-card/50 border border-border/50">
              <p className="text-muted-foreground mb-3">You have the right to:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Access your personal information</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
              </ul>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              <br />
              Email: privacy@creatorkit.com
              <br />
              Address: 123 Creator Street, San Francisco, CA 94103
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
