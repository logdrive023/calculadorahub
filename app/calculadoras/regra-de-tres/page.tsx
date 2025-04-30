import Ruleof3CalculatorClient from "./Ruleof3CalculatorClient"

export const metadata = {
  title: "Calculadora de Regra de Três - Resolva Proporções Facilmente | Calculadora Hub",
  description:
    "Resolva problemas de proporção com nossa calculadora de regra de três simples. Encontre o valor desconhecido em segundos.",
  alternates: {
    canonical: "/calculadoras/regra-de-tres",
  },
  openGraph: {
    title: "Calculadora de Regra de Três - Resolva Proporções Facilmente | Calculadora Hub",
    description: "Resolva problemas de proporção com nossa calculadora de regra de três simples.",
    url: "https://calculadorahub.com/calculadoras/regra-de-tres",
  },
}

export default function Ruleof3Calculator() {
  return <Ruleof3CalculatorClient />
}
