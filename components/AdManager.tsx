// Criar um novo componente para gerenciar anúncios em toda a aplicação

"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import AdSenseBlock from "./AdSenseBlock"

// Configurações de anúncios para diferentes páginas
const adConfig = {
  // Configurações para a página inicial
  home: {
    top: { adSlot: "1234567890", adFormat: "auto" as const },
    middle: { adSlot: "0987654321", adFormat: "rectangle" as const },
    bottom: { adSlot: "1122334455", adFormat: "auto" as const },
  },
  // Configurações para páginas de calculadoras
  calculadoras: {
    top: { adSlot: "5566778899", adFormat: "auto" as const },
    bottom: { adSlot: "9988776655", adFormat: "auto" as const },
  },
  // Configurações padrão para outras páginas
  default: {
    top: { adSlot: "", adFormat: "auto" as const },
    bottom: { adSlot: "", adFormat: "auto" as const },
  },
}

interface AdManagerProps {
  position: "top" | "middle" | "bottom" | "sidebar"
  className?: string
}

export default function AdManager({ position, className = "" }: AdManagerProps) {
  const pathname = usePathname()
  const [config, setConfig] = useState<{ adSlot: string; adFormat: "auto" | "rectangle" | "horizontal" | "vertical" }>()
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    // Determinar qual configuração usar com base no pathname
    if (pathname === "/") {
      setConfig(adConfig.home[position as keyof typeof adConfig.home])
      setShouldRender(!!adConfig.home[position as keyof typeof adConfig.home])
    } else if (pathname.includes("/calculadoras/")) {
      setConfig(adConfig.calculadoras[position as keyof typeof adConfig.calculadoras])
      setShouldRender(!!adConfig.calculadoras[position as keyof typeof adConfig.calculadoras])
    } else {
      setConfig(adConfig.default[position as keyof typeof adConfig.default])
      setShouldRender(!!adConfig.default[position as keyof typeof adConfig.default])
    }
  }, [pathname, position])

  if (!shouldRender || !config) {
    return null
  }

  return (
    <div className={`ad-container ${position} ${className}`}>
      <AdSenseBlock adSlot={config.adSlot} adFormat={config.adFormat} responsive={true} className="w-full mx-auto" />
    </div>
  )
}
