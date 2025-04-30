import Link from "next/link"
import { Calculator, Percent, GitCompare, FlaskConical, PiggyBank, DollarSign, Building, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AdManager from "@/components/AdManager"

export default function Home() {
  const calculators = [
    {
      title: "Calculadora de IMC",
      description: "Calcule seu Índice de Massa Corporal e avalie seu peso ideal.",
      icon: <Calculator className="h-8 w-8 text-primary" aria-hidden="true" />,
      href: "/calculadoras/imc",
      testId: "imc",
    },
    {
      title: "Calculadora de Porcentagem",
      description: "Calcule porcentagens de forma rápida e simples.",
      icon: <Percent className="h-8 w-8 text-primary" aria-hidden="true" />,
      href: "/calculadoras/porcentagem",
      testId: "porcentagem",
    },
    {
      title: "Regra de Três",
      description: "Resolva problemas de proporção com a regra de três simples.",
      icon: <GitCompare className="h-8 w-8 text-primary" aria-hidden="true" />,
      href: "/calculadoras/regra-de-tres",
      testId: "regra-de-tres",
    },
    {
      title: "Calculadora Científica",
      description: "Realize cálculos avançados com funções trigonométricas, logaritmos e mais.",
      icon: <FlaskConical className="h-8 w-8 text-primary" aria-hidden="true" />,
      href: "/calculadoras/cientifica",
      testId: "cientifica",
    },
    {
      title: "Calculadora Financeira",
      description: "Calcule juros simples, compostos e simule parcelas de empréstimos.",
      icon: <PiggyBank className="h-8 w-8 text-primary" aria-hidden="true" />,
      href: "/calculadoras/financeira",
      testId: "financeira",
    },
    {
      title: "Calculadora de Salário Líquido",
      description: "Calcule seu salário líquido com descontos de INSS e IRRF.",
      icon: <DollarSign className="h-8 w-8 text-primary" aria-hidden="true" />,
      href: "/calculadoras/salario-liquido",
      testId: "salario-liquido",
    },
    {
      title: "Calculadora de Financiamento",
      description: "Simule financiamentos com sistemas SAC e Price.",
      icon: <Building className="h-8 w-8 text-primary" aria-hidden="true" />,
      href: "/calculadoras/financiamento",
      testId: "financiamento",
    },
    {
      title: "Calculadora de Horas Trabalhadas",
      description: "Calcule horas trabalhadas, banco de horas e jornada de trabalho.",
      icon: <Clock className="h-8 w-8 text-primary" aria-hidden="true" />,
      href: "/calculadoras/horas-trabalhadas",
      testId: "horas-trabalhadas",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4 sm:text-5xl">Calculadora Hub</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Ferramentas gratuitas para todos os seus cálculos do dia a dia. Simples, rápidas e precisas.
        </p>
      </section>

      <div className="mb-12 max-w-5xl mx-auto" data-testid="ad-block-top">
        <AdManager position="top" />
      </div>

      <section className="mb-16" aria-labelledby="calculadoras-disponiveis">
        <h2 id="calculadoras-disponiveis" className="sr-only">
          Calculadoras disponíveis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc, index) => (
            <Card
              key={index}
              className="flex flex-col h-full hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] border border-border/40 hover:border-primary/30 group"
              data-testid={`calculator-card-${calc.testId}`}
            >
              <CardHeader>
                <div className="mb-4 text-primary/80 group-hover:text-primary transition-colors duration-300 transform group-hover:scale-110">
                  {calc.icon}
                </div>
                <CardTitle>{calc.title}</CardTitle>
                <CardDescription>{calc.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-0"
                  data-testid={`access-button-${calc.testId}`}
                >
                  <Link href={calc.href} className="flex items-center justify-center gap-2">
                    Acessar Calculadora
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted rounded-lg p-6 sm:p-8 mb-16" aria-labelledby="beneficios">
        <div className="max-w-3xl mx-auto text-center">
          <h2 id="beneficios" className="text-3xl font-bold mb-6">
            ✨ Por que usar nossas calculadoras? ✨
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-background p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-xl font-semibold mb-3">Fácil de Usar</h3>
              <p>Interface intuitiva para cálculos rápidos sem complicações. Resultados em segundos!</p>
            </div>
            <div className="bg-background p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-3xl mb-3">💯</div>
              <h3 className="text-xl font-semibold mb-3">100% Gratuito</h3>
              <p>Todas as calculadoras são completamente gratuitas e sem limitações de uso. Sempre!</p>
            </div>
            <div className="bg-background p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Resultados Precisos</h3>
              <p>Algoritmos confiáveis para resultados exatos em todos os seus cálculos. Garantido!</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-12 max-w-5xl mx-auto" data-testid="ad-block-middle">
        <AdManager position="middle" />
      </div>

      <section className="text-center mb-16" aria-labelledby="calculadoras-destaque">
        <h2 id="calculadoras-destaque" className="text-3xl font-bold mb-4">
          Calculadoras em Destaque
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 mt-8">
          <Card
            className="text-left hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] border border-border/40 hover:border-primary/30 group"
            data-testid="featured-card-salario-liquido"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign
                  className="h-6 w-6 text-primary/80 group-hover:text-primary transition-colors duration-300 transform group-hover:scale-110"
                  aria-hidden="true"
                />
                Calculadora de Salário Líquido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Calcule seu salário líquido com descontos de INSS e IRRF. Saiba exatamente quanto vai receber após todos
                os descontos obrigatórios e planeje melhor suas finanças pessoais.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                variant="outline"
                className="w-full border-primary/20 hover:border-primary/40 hover:bg-primary/5 text-foreground font-medium py-2.5 rounded-lg transition-all duration-200"
                data-testid="featured-button-salario-liquido"
              >
                <Link href="/calculadoras/salario-liquido" className="flex items-center justify-center gap-2 group">
                  Usar Calculadora de Salário Líquido
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card
            className="text-left hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] border border-border/40 hover:border-primary/30 group"
            data-testid="featured-card-financiamento"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building
                  className="h-6 w-6 text-primary/80 group-hover:text-primary transition-colors duration-300 transform group-hover:scale-110"
                  aria-hidden="true"
                />
                Calculadora de Financiamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Simule financiamentos com sistemas SAC e Price. Compare as parcelas, juros e o custo total para tomar a
                melhor decisão ao financiar um imóvel, veículo ou qualquer outro bem.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                variant="outline"
                className="w-full border-primary/20 hover:border-primary/40 hover:bg-primary/5 text-foreground font-medium py-2.5 rounded-lg transition-all duration-200"
                data-testid="featured-button-financiamento"
              >
                <Link href="/calculadoras/financiamento" className="flex items-center justify-center gap-2 group">
                  Usar Calculadora de Financiamento
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <div className="mb-12 max-w-5xl mx-auto" data-testid="ad-block-bottom">
        <AdManager position="bottom" />
      </div>
    </div>
  )
}
