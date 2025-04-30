import FinancialCalculatorClient from "./FinancialCalculatorClient"

export const metadata = {
  title: "Calculadora Financeira - Juros, Investimentos e Empréstimos | Calculadora Hub",
  description:
    "Calcule juros simples, compostos, parcelas de empréstimos e planeje seus investimentos com nossa calculadora financeira online.",
  alternates: {
    canonical: "/calculadoras/financeira",
  },
  openGraph: {
    title: "Calculadora Financeira - Juros, Investimentos e Empréstimos | Calculadora Hub",
    description: "Planeje seus investimentos e empréstimos com nossa calculadora financeira gratuita.",
    url: "https://calculadorahub.com/calculadoras/financeira",
  },
}

export default function FinancialCalculator() {
  return <FinancialCalculatorClient />
}
