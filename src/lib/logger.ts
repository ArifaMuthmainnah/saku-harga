import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "logs");
const logFile = path.join(logDir, "app.log");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

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
    ...meta,
  };

  const line = JSON.stringify(entry);

  // console (masih kelihatan di terminal)
  console.log(line);

  // file (dibaca promtail)
  fs.appendFileSync(logFile, line + "\n");
}
