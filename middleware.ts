import { type NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { logger } from "@/lib/logger"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "SAMEORIGIN")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()")

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/tools")

  if (isProtectedRoute && !token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  const isAuthPage = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup"
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (process.env.NODE_ENV === "production") {
    const requestMetadata = {
      method: request.method,
      pathname: request.nextUrl.pathname,
      userAgent: request.headers.get("user-agent"),
      timestamp: new Date().toISOString(),
      authenticated: !!token,
    }
    logger.debug("Incoming request", requestMetadata)
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
