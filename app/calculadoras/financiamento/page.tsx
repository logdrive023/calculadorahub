import FinanciamentoCalculatorClient from "./FinanciamentoCalculatorClient"

export const metadata = {
  title: "Calculadora de Financiamento - Simule Parcelas e Juros | Calculadora Hub",
  description:
    "Simule financiamentos com sistemas SAC e Price. Calcule parcelas, juros e veja a evolução do saldo devedor.",
  alternates: {
    canonical: "/calculadoras/financiamento",
  },
  openGraph: {
    title: "Calculadora de Financiamento - Simule Parcelas e Juros | Calculadora Hub",
    description:
      "Simule financiamentos com sistemas SAC e Price. Ferramenta gratuita para planejar seus financiamentos.",
    url: "https://calculadorahub.com/calculadoras/financiamento",
  },
}

export default function FinanciamentoCalculator() {
  return <FinanciamentoCalculatorClient />
}
