"use client"

import { AppHeader } from "@/components/app-header"
import { AppFooter } from "@/components/app-footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <AppHeader showAuth={true} />

      <div className="flex-1 max-w-4xl mx-auto px-4 py-20 w-full">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">1. Agreement to Terms</h2>
            <p className="leading-relaxed">
              By accessing and using CreatorKit, you accept and agree to be bound by the terms and provision of this
              agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">2. Use License</h2>
            <p className="leading-relaxed mb-3">
              Permission is granted to temporarily download one copy of the materials (information or software) on
              CreatorKit for personal, non-commercial transitory viewing only. This is the grant of a license, not a
              transfer of title, and under this license you may not:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on CreatorKit</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">3. Disclaimer</h2>
            <p className="leading-relaxed">
              The materials on CreatorKit are provided on an 'as is' basis. CreatorKit makes no warranties, expressed or
              implied, and hereby disclaims and negates all other warranties including, without limitation, implied
              warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">4. Limitations</h2>
            <p className="leading-relaxed">
              In no event shall CreatorKit or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use the materials on CreatorKit, even if CreatorKit or an authorized representative has been notified
              orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Accuracy of Materials</h2>
            <p className="leading-relaxed">
              The materials appearing on CreatorKit could include technical, typographical, or photographic errors.
              CreatorKit does not warrant that any of the materials on the site are accurate, complete, or current.
              CreatorKit may make changes to the materials contained on the site at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">6. Links</h2>
            <p className="leading-relaxed">
              CreatorKit has not reviewed all of the sites linked to its website and is not responsible for the contents
              of any such linked site. The inclusion of any link does not imply endorsement by CreatorKit of the site.
              Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">7. Modifications</h2>
            <p className="leading-relaxed">
              CreatorKit may revise these terms of service for the site at any time without notice. By using this site,
              you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">8. Governing Law</h2>
            <p className="leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of California, United
              States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">9. User Responsibilities</h2>
            <p className="leading-relaxed mb-3">Users are responsible for:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Maintaining the confidentiality of their account credentials</li>
              <li>All activities that occur under their account</li>
              <li>Complying with all applicable laws and regulations</li>
              <li>Not engaging in any harmful or illegal activities</li>
              <li>Respecting intellectual property rights of others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">10. Contact Information</h2>
            <p className="leading-relaxed">
              For questions about these Terms, please contact us at:
              <br />
              Email: legal@creatorkit.com
              <br />
              Address: 123 Creator Street, San Francisco, CA 94103
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <AppFooter />
    </div>
  )
}
