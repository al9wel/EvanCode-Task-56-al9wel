import type { ReactNode } from "react"

import { ThemeProvider } from "@/app/providers/ThemeProvider"
import { DirectionProvider } from "@/components/ui/direction"
import { TooltipProvider } from "@/components/ui/tooltip"

interface AppProvidersProps {
  children: ReactNode
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <DirectionProvider dir="rtl">
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </DirectionProvider>
  )
}

export default AppProviders
