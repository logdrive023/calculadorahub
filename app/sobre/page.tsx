import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: "Sobre - Calculadora Hub",
  description: "Informações sobre o Calculadora Hub, nossa missão e como usar as ferramentas disponíveis.",
  alternates: {
    canonical: "/sobre",
  },
  openGraph: {
    title: "Sobre - Calculadora Hub",
    description: "Conheça mais sobre o Calculadora Hub e nossa missão de fornecer ferramentas de cálculo gratuitas.",
    url: "https://calculadorahub.com/sobre",
  },
}

export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Sobre o Calculadora Hub</h1>
          <p className="text-xl text-muted-foreground">
            Ferramentas gratuitas para todos os seus cálculos do dia a dia
          </p>
        </div>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Nossa Missão</CardTitle>
              <CardDescription>Facilitando cálculos para todos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                O Calculadora Hub foi criado com o objetivo de disponibilizar ferramentas de cálculo gratuitas, precisas
                e fáceis de usar para estudantes, profissionais e qualquer pessoa que precise realizar cálculos no dia a
                dia.
              </p>
              <p>
                Acreditamos que o acesso a ferramentas de qualidade não deve ser limitado por barreiras financeiras ou
                técnicas. Por isso, desenvolvemos calculadoras intuitivas que podem ser acessadas de qualquer
                dispositivo com conexão à internet.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nossas Calculadoras</CardTitle>
              <CardDescription>Ferramentas para diversas necessidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Calculadora de IMC</h3>
                  <p className="text-sm text-muted-foreground">
                    Calcule seu Índice de Massa Corporal e avalie seu peso ideal com base em padrões internacionais.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Calculadora de Porcentagem</h3>
                  <p className="text-sm text-muted-foreground">
                    Realize cálculos percentuais com facilidade: descubra quanto é X% de um valor, a porcentagem entre
                    dois números ou calcule aumentos e reduções percentuais.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Regra de Três</h3>
                  <p className="text-sm text-muted-foreground">
                    Resolva problemas de proporção com a regra de três simples, encontrando o valor desconhecido em
                    segundos.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Calculadora Científica</h3>
                  <p className="text-sm text-muted-foreground">
                    Realize cálculos avançados com funções trigonométricas, logaritmos, potências e muito mais.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Calculadora Financeira</h3>
                  <p className="text-sm text-muted-foreground">
                    Calcule juros simples, compostos, parcelas de empréstimos e planeje seus investimentos com precisão.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Calculadora de Salário Líquido</h3>
                  <p className="text-sm text-muted-foreground">
                    Calcule seu salário líquido com descontos de INSS, IRRF e outros benefícios. Simule diferentes tipos
                    de contrato e adicionais.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Calculadora de Financiamento</h3>
                  <p className="text-sm text-muted-foreground">
                    Simule financiamentos com sistemas SAC e Price. Compare parcelas, juros, taxas administrativas e
                    veja a evolução do saldo devedor.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Calculadora de Horas Trabalhadas</h3>
                  <p className="text-sm text-muted-foreground">
                    Calcule horas trabalhadas, banco de horas, horas extras e jornada de trabalho com precisão e
                    facilidade.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>Dúvidas comuns sobre nossas calculadoras</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>As calculadoras são realmente gratuitas?</AccordionTrigger>
                  <AccordionContent>
                    Sim, todas as calculadoras disponíveis em nosso site são completamente gratuitas e sem limitações de
                    uso. Não há necessidade de criar conta ou fazer login para utilizá-las.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Os cálculos são precisos?</AccordionTrigger>
                  <AccordionContent>
                    Sim, nossas calculadoras utilizam algoritmos matemáticos precisos para garantir resultados
                    confiáveis. No entanto, recomendamos sempre verificar os resultados em casos de cálculos críticos ou
                    de alta precisão.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Posso usar as calculadoras em dispositivos móveis?</AccordionTrigger>
                  <AccordionContent>
                    Sim, todas as nossas calculadoras são responsivas e funcionam perfeitamente em smartphones, tablets
                    e computadores. Basta acessar o site pelo navegador do seu dispositivo.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Por que existem anúncios no site?</AccordionTrigger>
                  <AccordionContent>
                    Os anúncios nos ajudam a manter todas as calculadoras gratuitas e a cobrir os custos de hospedagem e
                    desenvolvimento. Procuramos exibir anúncios de forma não intrusiva para garantir a melhor
                    experiência possível enquanto utilizamos essa fonte de receita para continuar oferecendo e
                    melhorando nossas ferramentas.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Os meus dados são armazenados?</AccordionTrigger>
                  <AccordionContent>
                    Não armazenamos nenhum dado inserido nas calculadoras. Todos os cálculos são processados localmente
                    no seu navegador, garantindo sua privacidade.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="mb-4">Pronto para começar a calcular?</p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
