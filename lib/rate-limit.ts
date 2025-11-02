interface RateLimitStore {
  [key: string]: { count: number; resetTime: number }
}

const store: RateLimitStore = {}

export interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 100,
  windowMs: 60 * 1000, // 1 minute
}

export function rateLimit(
  identifier: string,
  config: Partial<RateLimitConfig> = {},
): { limited: boolean; remaining: number; resetTime: number } {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  const now = Date.now()
  const key = identifier

  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 1,
      resetTime: now + finalConfig.windowMs,
    }
    return {
      limited: false,
      remaining: finalConfig.maxRequests - 1,
      resetTime: store[key].resetTime,
    }
  }

  store[key].count++

  const limited = store[key].count > finalConfig.maxRequests
  return {
    limited,
    remaining: Math.max(0, finalConfig.maxRequests - store[key].count),
    resetTime: store[key].resetTime,
  }
}
