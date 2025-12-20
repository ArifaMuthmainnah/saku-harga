// src/lib/logger.ts

type LogLevel = "info" | "warn" | "error";

export function log(
  level: LogLevel,
  message: string,
  meta?: Record<string, any>
) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(meta ?? {}),
  };

  // Structured logging (aman di Vercel)
  if (level === "error") {
    console.error(JSON.stringify(entry));
  } else if (level === "warn") {
    console.warn(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }
}
