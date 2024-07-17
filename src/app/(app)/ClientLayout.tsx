"use client"

import { ThemeProvider } from "@mui/system"
import { theme } from "../../theme"
import { WandelAppLoader } from "./WandelAppLoader"
import { env as runtimeEnv } from "../../runtimeEnv"

export function ClientLayout({
  env,
  children,
}: Readonly<{
  env: Record<string, string | undefined>
  children: React.ReactNode
}>) {
  console.log("Runtime ENV from server:\n  ", env)
  Object.assign(runtimeEnv, env)

  return (
    <ThemeProvider theme={theme}>
      <WandelAppLoader>{children}</WandelAppLoader>
    </ThemeProvider>
  )
}
