import ScientificCalculatorClient from "./ScientificCalculatorClient"

export const metadata = {
  title: "Calculadora Científica Online - Funções Avançadas e Gratuita | Calculadora Hub",
  description:
    "Calculadora científica online com funções trigonométricas, logaritmos, potências e mais. Ideal para estudantes e profissionais.",
  alternates: {
    canonical: "/calculadoras/cientifica",
  },
  openGraph: {
    title: "Calculadora Científica Online - Funções Avançadas e Gratuita | Calculadora Hub",
    description: "Use nossa calculadora científica online com funções avançadas para seus cálculos complexos.",
    url: "https://calculadorahub.com/calculadoras/cientifica",
  },
}

export default function ScientificCalculator() {
  return <ScientificCalculatorClient />
}
