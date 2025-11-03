import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { validateEnv } from "@/lib/env"
import "./globals.css"
import { Providers } from "@/app/providers"

validateEnv()

export const metadata: Metadata = {
  title: "CreatorKit - AI-Powered Content Creation Platform",
  description:
    "Create stunning content in minutes with 11+ AI-powered tools for social media, blogs, scripts, and more.",
  generator: "CreatorKit v0.1.0",
  authors: [{ name: "CreatorKit Team" }],
  keywords: ["content creation", "AI", "social media", "blog writer", "script generator"],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "CreatorKit - AI-Powered Content Creation Platform",
    description: "Create stunning content in minutes with 11+ AI-powered tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CreatorKit",
    description: "AI-Powered Content Creation Platform",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="dark">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
