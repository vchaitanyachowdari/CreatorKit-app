"use client"

import { useState } from "react"
import Link from "next/link"
import { Grid3X3, Menu, X } from "lucide-react"

export function AppHeader({ showAuth = true }: { showAuth?: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between rounded-full bg-background/80 md:flex backdrop-blur-sm border border-border/50 shadow-lg max-w-5xl px-4 py-2">
        <Link href="/" className="z-50 flex items-center justify-center gap-2 font-bold text-lg">
          <Grid3X3 className="w-6 h-6 text-primary" />
          <span>CreatorKit</span>
        </Link>

        <div className="flex-1 flex flex-row items-center justify-center space-x-2 text-sm font-medium text-muted-foreground">
          <a
            href="/#tools"
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Tools
          </a>
          <a
            href="/#features"
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Features
          </a>
          <Link
            href="/about"
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
        </div>

        {showAuth && (
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
        )}
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
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-6">
            <nav className="flex flex-col space-y-4">
              <a
                href="/#tools"
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Tools
              </a>
              <a
                href="/#features"
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Features
              </a>
              <Link
                href="/about"
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                About
              </Link>
              {showAuth && (
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
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
