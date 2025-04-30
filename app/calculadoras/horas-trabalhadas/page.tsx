import HorasTrabalhadasCalculatorClient from "./HorasTrabalhadasCalculatorClient"

export const metadata = {
  title: "Calculadora de Horas Trabalhadas - Calcule Jornadas e Banco de Horas | Calculadora Hub",
  description:
    "Calcule horas trabalhadas, banco de horas, horas extras e jornada de trabalho com nossa calculadora online gratuita.",
  alternates: {
    canonical: "/calculadoras/horas-trabalhadas",
  },
  openGraph: {
    title: "Calculadora de Horas Trabalhadas - Calcule Jornadas e Banco de Horas | Calculadora Hub",
    description:
      "Calcule horas trabalhadas, banco de horas e jornada de trabalho com nossa calculadora online gratuita.",
    url: "https://calculadorahub.com/calculadoras/horas-trabalhadas",
  },
}

export default function HorasTrabalhadasCalculator() {
  return <HorasTrabalhadasCalculatorClient />
}
