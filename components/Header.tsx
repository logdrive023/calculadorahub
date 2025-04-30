"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Menu,
  Calculator,
  Percent,
  GitCompare,
  FlaskConical,
  PiggyBank,
  Info,
  DollarSign,
  Building,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { name: "IMC", href: "/calculadoras/imc", icon: <Calculator className="h-5 w-5 mr-2" aria-hidden="true" /> },
    {
      name: "Porcentagem",
      href: "/calculadoras/porcentagem",
      icon: <Percent className="h-5 w-5 mr-2" aria-hidden="true" />,
    },
    {
      name: "Regra de Três",
      href: "/calculadoras/regra-de-tres",
      icon: <GitCompare className="h-5 w-5 mr-2" aria-hidden="true" />,
    },
    {
      name: "Científica",
      href: "/calculadoras/cientifica",
      icon: <FlaskConical className="h-5 w-5 mr-2" aria-hidden="true" />,
    },
    {
      name: "Financeira",
      href: "/calculadoras/financeira",
      icon: <PiggyBank className="h-5 w-5 mr-2" aria-hidden="true" />,
    },
    {
      name: "Salário Líquido",
      href: "/calculadoras/salario-liquido",
      icon: <DollarSign className="h-5 w-5 mr-2" aria-hidden="true" />,
    },
    {
      name: "Financiamento",
      href: "/calculadoras/financiamento",
      icon: <Building className="h-5 w-5 mr-2" aria-hidden="true" />,
    },
    {
      name: "Horas Trabalhadas",
      href: "/calculadoras/horas-trabalhadas",
      icon: <Clock className="h-5 w-5 mr-2" aria-hidden="true" />,
    },
    { name: "Sobre", href: "/sobre", icon: <Info className="h-5 w-5 mr-2" aria-hidden="true" /> },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl"
          aria-label="Calculadora Hub - Página Inicial"
          data-testid="header-logo"
        >
          <Calculator className="h-6 w-6" aria-hidden="true" />
          <span>Calculadora Hub</span>
        </Link>

        <nav className="hidden md:flex gap-6" aria-label="Navegação principal" data-testid="main-nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
              data-testid={`nav-link-${link.href.split("/").pop()}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Abrir menu de navegação" data-testid="mobile-menu-button">
                <Menu className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav aria-label="Menu de navegação móvel">
                <div className="flex flex-col gap-4 mt-8">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1 flex items-center"
                      onClick={() => setIsOpen(false)}
                      data-testid={`mobile-nav-link-${link.href.split("/").pop()}`}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
