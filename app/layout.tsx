import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/ScrollToTop"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Calculadora Hub - Ferramentas de Cálculo Gratuitas",
  description:
    "Calculadora Hub: IMC, porcentagem, regra de três, científica e financeira. Ferramentas práticas e gratuitas para cálculos do dia a dia.",
  keywords:
    "calculadora online, calculadora imc, calculadora porcentagem, regra de três, calculadora científica, calculadora financeira, juros compostos, calculadora hub",
  metadataBase: new URL("https://calculadorahub.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://calculadorahub.com",
    title: "Calculadora Hub - Ferramentas de Cálculo Gratuitas",
    description: "Ferramentas de cálculo gratuitas para estudantes, profissionais e uso diário.",
    siteName: "Calculadora Hub",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* 
          Quando estiver pronto para usar o AdSense em produção, 
          descomente a linha abaixo e substitua o ID de exemplo pelo seu ID real
        */}
        <meta name="google-adsense-account" content="ca-pub-4488733165053759" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <ScrollToTop />
          <main className="min-h-screen bg-background">{children}</main>
          <footer className="py-6 border-t">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6">
                <p>© {new Date().getFullYear()} Calculadora Hub. Todos os direitos reservados.</p>
                <a href="/sobre" className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">
                  Sobre
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
