"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"

// Defina seu ID de publicante do Google AdSense aqui
// Formato: ca-pub-XXXXXXXXXXXXXXXX
const ADSENSE_PUB_ID = "ca-pub-XXXXXXXXXXXXXXXX" // Substitua pelo seu ID quando tiver

interface AdSenseBlockProps {
  adSlot?: string // ID do slot do anúncio
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical"
  style?: React.CSSProperties
  className?: string
  responsive?: boolean
  onAdLoaded?: () => void
  onAdFailed?: () => void
}

export default function AdSenseBlock({
  adSlot = "", // Deixe vazio para usar o slot automático
  adFormat = "auto",
  style,
  className = "",
  responsive = true,
  onAdLoaded,
  onAdFailed,
}: AdSenseBlockProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [adFailed, setAdFailed] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Determinar o tamanho do anúncio com base no formato
  const getAdSize = () => {
    switch (adFormat) {
      case "rectangle":
        return { width: "300px", height: "250px" }
      case "horizontal":
        return { width: "728px", height: "90px" }
      case "vertical":
        return { width: "160px", height: "600px" }
      case "auto":
      default:
        return { width: "100%", height: "auto", minHeight: "250px" }
    }
  }

  // Verificar se estamos no cliente
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Inicializar o anúncio quando o componente montar
  useEffect(() => {
    if (!isClient || !ADSENSE_PUB_ID || ADSENSE_PUB_ID === "ca-pub-XXXXXXXXXXXXXXXX") {
      setAdFailed(true)
      onAdFailed?.()
      return
    }

    // Função para inicializar o anúncio
    const initAd = () => {
      try {
        if (adRef.current && typeof window !== "undefined" && window.adsbygoogle) {
          // Limpar conteúdo anterior se houver
          while (adRef.current.firstChild) {
            adRef.current.removeChild(adRef.current.firstChild)
          }

          // Criar o elemento ins para o anúncio
          const adElement = document.createElement("ins")
          adElement.className = "adsbygoogle"
          adElement.style.display = "block"
          adElement.style.width = responsive ? "100%" : getAdSize().width
          adElement.style.height = getAdSize().height

          if (adSlot) {
            adElement.setAttribute("data-ad-slot", adSlot)
          }

          adElement.setAttribute("data-ad-client", ADSENSE_PUB_ID)

          if (responsive) {
            adElement.setAttribute("data-ad-format", "auto")
            adElement.setAttribute("data-full-width-responsive", "true")
          }

          // Adicionar o elemento ao DOM
          adRef.current.appendChild(adElement)

          // Inicializar o anúncio
          try {
            ;(window.adsbygoogle = window.adsbygoogle || []).push({})
            onAdLoaded?.()
          } catch (error) {
            console.error("Erro ao inicializar anúncio:", error)
            setAdFailed(true)
            onAdFailed?.()
          }
        }
      } catch (error) {
        console.error("Erro ao configurar anúncio:", error)
        setAdFailed(true)
        onAdFailed?.()
      }
    }

    // Verificar se o AdSense já está carregado
    if (window.adsbygoogle) {
      initAd()
    } else {
      // Se não estiver carregado, aguardar o evento de carregamento
      const handleAdSenseLoad = () => {
        initAd()
      }
      window.addEventListener("adsenseLoaded", handleAdSenseLoad)
      return () => {
        window.removeEventListener("adsenseLoaded", handleAdSenseLoad)
      }
    }
  }, [adSlot, adFormat, responsive, isClient, onAdLoaded, onAdFailed])

  // Estilo padrão para o contêiner do anúncio
  const defaultStyle = {
    width: "100%",
    minHeight: getAdSize().height,
    ...style,
  }

  return (
    <>
      {isClient && ADSENSE_PUB_ID !== "ca-pub-XXXXXXXXXXXXXXXX" && (
        <Script
          id="adsense-init"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
          onLoad={() => {
            window.dispatchEvent(new Event("adsenseLoaded"))
          }}
          onError={() => {
            setAdFailed(true)
            onAdFailed?.()
          }}
        />
      )}
      <div
        ref={adRef}
        style={defaultStyle}
        className={`${className} ${adFailed ? "bg-muted/50 flex items-center justify-center rounded-lg border border-dashed" : ""}`}
      >
        {adFailed && (
          <p className="text-muted-foreground text-sm">
            {ADSENSE_PUB_ID === "ca-pub-XXXXXXXXXXXXXXXX"
              ? "Configure seu ID do AdSense para exibir anúncios"
              : "Espaço para anúncio"}
          </p>
        )}
      </div>
    </>
  )
}

// Declaração de tipos para o window.adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[]
  }
}
