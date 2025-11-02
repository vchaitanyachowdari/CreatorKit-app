"use client"

import Link from "next/link"

export default function CookiesPage() {
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
        <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">1. What Are Cookies?</h2>
            <p className="leading-relaxed">
              Cookies are small pieces of data stored on your browser or device. They allow websites to remember
              information about your visit, such as your language preferences or login status. We use cookies to enhance
              your experience on CreatorKit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">2. Types of Cookies We Use</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-foreground mb-2">Session Cookies</h3>
                <p className="leading-relaxed">
                  These cookies are temporary and are deleted when you close your browser. They help us maintain your
                  session and keep you logged in while you use our platform.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">Persistent Cookies</h3>
                <p className="leading-relaxed">
                  These cookies remain on your device for a set period. We use them to remember your preferences and
                  settings across multiple visits.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">Third-Party Cookies</h3>
                <p className="leading-relaxed">
                  We use third-party services like Google Analytics to understand how users interact with our platform.
                  These services may place their own cookies on your device.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">Functional Cookies</h3>
                <p className="leading-relaxed">
                  These cookies remember your choices to provide personalized features and functionality, such as your
                  preferred theme or language.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">3. How We Use Cookies</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>To authenticate your identity and maintain your session</li>
              <li>To store your preferences and settings</li>
              <li>To analyze website traffic and usage patterns</li>
              <li>To improve our services and user experience</li>
              <li>To prevent fraud and ensure security</li>
              <li>To deliver personalized content and advertisements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">4. Managing Your Cookies</h2>
            <p className="leading-relaxed mb-3">You have the option to control cookies through:</p>
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-foreground mb-1">Browser Settings</h3>
                <p className="leading-relaxed">
                  Most browsers allow you to refuse cookies or alert you when cookies are being sent. Consult your
                  browser's help section for instructions.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-1">Cookie Consent Tools</h3>
                <p className="leading-relaxed">
                  We provide cookie preference controls where you can opt-in or opt-out of different types of cookies
                  (except essential cookies).
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-1">Opt-Out Links</h3>
                <p className="leading-relaxed">
                  Third-party analytics providers offer opt-out mechanisms. Visit their websites to learn more about
                  opting out of their tracking.
                </p>
              </div>
            </div>

            <p className="leading-relaxed mt-4">
              Please note: Disabling cookies may affect your ability to use certain features of our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Essential Cookies</h2>
            <p className="leading-relaxed">
              Some cookies are essential for our platform to function properly. These cookies cannot be disabled as they
              are necessary for security, authentication, and providing core functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">6. Third-Party Cookie Policies</h2>
            <p className="leading-relaxed">
              We use third-party services that may place cookies on your device. We're not responsible for their cookie
              policies. We encourage you to review their privacy policies:
            </p>
            <ul className="space-y-2 list-disc list-inside mt-3">
              <li>
                <a href="https://policies.google.com/privacy" className="text-primary hover:underline">
                  Google Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/policies/" className="text-primary hover:underline">
                  Facebook Privacy Policy
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">7. Updates to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Cookie Policy periodically. We will notify you of significant changes by updating the
              "Last updated" date on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">8. Contact Us</h2>
            <p className="leading-relaxed">
              If you have questions about our Cookie Policy, please contact us at:
              <br />
              Email: privacy@creatorkit.com
              <br />
              Address: 123 Creator Street, San Francisco, CA 94103
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
