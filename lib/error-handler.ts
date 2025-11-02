interface ErrorResponse {
  error: string
  code: string
  message: string
  timestamp: string
  requestId?: string
}

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode = 500,
  ) {
    super(message)
    this.name = "AppError"
  }
}

export function handleError(error: unknown): ErrorResponse {
  const timestamp = new Date().toISOString()

  if (error instanceof AppError) {
    return {
      error: error.code,
      code: error.code,
      message: error.message,
      timestamp,
    }
  }

  if (error instanceof Error) {
    const isDev = process.env.NODE_ENV === "development"
    return {
      error: "INTERNAL_ERROR",
      code: "INTERNAL_ERROR",
      message: isDev ? error.message : "An error occurred",
      timestamp,
    }
  }

  return {
    error: "UNKNOWN_ERROR",
    code: "UNKNOWN_ERROR",
    message: "An unexpected error occurred",
    timestamp,
  }
}

export function createErrorResponse(error: unknown, statusCode = 500) {
  const errorData = handleError(error)
  return new Response(JSON.stringify(errorData), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
