export type ExecutionLogEntry = {
  timestamp: number
  message: string
  level?: "warn" | "error"
}

export class Log {
  logs: ExecutionLogEntry[] = []

  log(message: string) {
    console.log(message)
    this.logs.push({
      timestamp: Date.now(),
      message,
    })
  }

  logError(message: string) {
    console.log(message)
    this.logs.push({
      timestamp: Date.now(),
      message,
      level: "error",
    })
  }

}
