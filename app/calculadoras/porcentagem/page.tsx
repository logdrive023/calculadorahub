import PercentageCalculatorClient from "./PercentageCalculatorClient"

export const metadata = {
  title: "Calculadora de Porcentagem - Cálculos Percentuais Simples | Calculadora Hub",
  description:
    "Calcule porcentagens facilmente: descubra quanto é X% de um valor, qual a porcentagem entre dois números e mais.",
  alternates: {
    canonical: "/calculadoras/porcentagem",
  },
  openGraph: {
    title: "Calculadora de Porcentagem - Cálculos Percentuais Simples | Calculadora Hub",
    description: "Calcule porcentagens facilmente com nossa calculadora online gratuita.",
    url: "https://calculadorahub.com/calculadoras/porcentagem",
  },
}

export default function PercentageCalculator() {
  return <PercentageCalculatorClient />
}
