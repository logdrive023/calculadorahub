import SalarioLiquidoCalculatorClient from "./SalarioLiquidoCalculatorClient"

export const metadata = {
  title: "Calculadora de Salário Líquido - Descubra seu Salário Real | Calculadora Hub",
  description:
    "Calcule seu salário líquido com descontos de INSS e IRRF. Saiba exatamente quanto vai receber após todos os descontos.",
  alternates: {
    canonical: "/calculadoras/salario-liquido",
  },
  openGraph: {
    title: "Calculadora de Salário Líquido - Descubra seu Salário Real | Calculadora Hub",
    description: "Calcule seu salário líquido com descontos de INSS e IRRF. Ferramenta gratuita e precisa.",
    url: "https://calculadorahub.com/calculadoras/salario-liquido",
  },
}

export default function SalarioLiquidoCalculator() {
  return <SalarioLiquidoCalculatorClient />
}
