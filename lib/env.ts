const requiredEnvVars = [
  // Add required env vars based on your setup
] as const

const optionalEnvVars = [
  "OPENAI_API_KEY",
  "ANTHROPIC_API_KEY",
  "GROQ_API_KEY",
  "SENTRY_DSN",
  "NEXT_PUBLIC_GA_ID",
] as const

export function validateEnv() {
  const missing: string[] = []

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar)
    }
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`)
  }

  if (process.env.NODE_ENV === "production") {
    console.log("[Production] Environment validation passed")
  }
}

export const env = {
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  appName: process.env.NEXT_PUBLIC_APP_NAME || "CreatorKit",
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION || "0.1.0",
  openaiApiKey: process.env.OPENAI_API_KEY,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  groqApiKey: process.env.GROQ_API_KEY,
  sentryDsn: process.env.SENTRY_DSN,
  gaId: process.env.NEXT_PUBLIC_GA_ID,
}

export type Env = typeof env
