type LogLevel = "debug" | "info" | "warn" | "error"

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  data?: Record<string, any>
  error?: {
    message: string
    stack?: string
  }
}

class Logger {
  private isDev = process.env.NODE_ENV === "development"

  private formatLog(level: LogLevel, message: string, data?: Record<string, any>): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(data && { data }),
    }
  }

  debug(message: string, data?: Record<string, any>) {
    if (this.isDev) {
      const log = this.formatLog("debug", message, data)
      console.log("[DEBUG]", log.message, log.data || "")
    }
  }

  info(message: string, data?: Record<string, any>) {
    const log = this.formatLog("info", message, data)
    console.log("[INFO]", log.message, log.data || "")
  }

  warn(message: string, data?: Record<string, any>) {
    const log = this.formatLog("warn", message, data)
    console.warn("[WARN]", log.message, log.data || "")
  }

  error(message: string, error?: Error | unknown, data?: Record<string, any>) {
    const log = this.formatLog("error", message, data)
    if (error instanceof Error) {
      log.error = {
        message: error.message,
        stack: this.isDev ? error.stack : undefined,
      }
    }
    console.error("[ERROR]", log.message, log.error, log.data || "")
  }
}

export const logger = new Logger()
