import AguaCalculatorClient from "./AguaCalculatorClient"

export const metadata = {
  title: "Calculadora de Água - Calculadora Hub",
  description: "Calcule a quantidade ideal de água que você deve beber diariamente com base no seu peso e altura.",
  alternates: {
    canonical: "/calculadoras/agua",
  },
  openGraph: {
    title: "Calculadora de Água - Calculadora Hub",
    description: "Descubra quanto de água você deve beber por dia para manter-se hidratado.",
    url: "https://calculadorahub.com/calculadoras/agua",
  },
}

export default function AguaPage() {
  return <AguaCalculatorClient />
}
