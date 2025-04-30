import IMCCalculatorClient from "./IMCCalculatorClient"

export const metadata = {
  title: "Calculadora de IMC - Índice de Massa Corporal | Calculadora Hub",
  description: "Calcule seu Índice de Massa Corporal (IMC) e descubra se seu peso está adequado para sua altura.",
  alternates: {
    canonical: "/calculadoras/imc",
  },
  openGraph: {
    title: "Calculadora de IMC - Índice de Massa Corporal | Calculadora Hub",
    description: "Calcule seu IMC e descubra se seu peso está adequado para sua altura com nossa calculadora gratuita.",
    url: "https://calculadorahub.com/calculadoras/imc",
  },
}

export default function IMCCalculator() {
  return <IMCCalculatorClient />
}
