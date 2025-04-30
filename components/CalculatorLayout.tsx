import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import AdManager from "@/components/AdManager"

interface CalculatorLayoutProps {
  title: string
  description: string
  children: ReactNode
  showAds?: boolean
}

export default function CalculatorLayout({ title, description, children, showAds = true }: CalculatorLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 sm:text-4xl">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        {showAds && (
          <div className="mb-8">
            <AdManager position="top" />
          </div>
        )}

        <Card className="mb-8">
          <CardContent className="pt-6">{children}</CardContent>
        </Card>

        {showAds && (
          <div className="mt-8">
            <AdManager position="bottom" />
          </div>
        )}
      </div>
    </div>
  )
}
