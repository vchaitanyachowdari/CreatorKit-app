import { type NextRequest, NextResponse } from "next/server"
import { logger } from "@/lib/logger"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "SAMEORIGIN")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()")

  if (process.env.NODE_ENV === "production") {
    const requestMetadata = {
      method: request.method,
      pathname: request.nextUrl.pathname,
      userAgent: request.headers.get("user-agent"),
      timestamp: new Date().toISOString(),
    }
    logger.debug("Incoming request", requestMetadata)
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
