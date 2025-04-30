import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { InfoIcon, HelpCircleIcon } from "lucide-react"

interface FuncaoItem {
  nome: string
  sintaxe: string
  descricao: string
  exemplo?: string
}

interface CategoriaFuncoes {
  titulo: string
  funcoes: FuncaoItem[]
}

interface FuncoesExplicacaoProps {
  tipo: "cientifica" | "financeira" | "porcentagem" | "regra-de-tres" | "imc" | "salario" | "financiamento"
}

export default function FuncoesExplicacao({ tipo }: FuncoesExplicacaoProps) {
  // Funções da calculadora científica
  const funcoesCientificas: CategoriaFuncoes[] = [
    {
      titulo: "Funções básicas",
      funcoes: [
        { nome: "Adição", sintaxe: "x + y", descricao: "Soma dois valores", exemplo: "5 + 3 = 8" },
        { nome: "Subtração", sintaxe: "x - y", descricao: "Subtrai o segundo valor do primeiro", exemplo: "5 - 3 = 2" },
        { nome: "Multiplicação", sintaxe: "x × y", descricao: "Multiplica dois valores", exemplo: "5 × 3 = 15" },
        { nome: "Divisão", sintaxe: "x ÷ y", descricao: "Divide o primeiro valor pelo segundo", exemplo: "15 ÷ 3 = 5" },
      ],
    },
    {
      titulo: "Funções exponenciais",
      funcoes: [
        { nome: "Quadrado", sintaxe: "x²", descricao: "Eleva o valor ao quadrado", exemplo: "5² = 25" },
        { nome: "Cubo", sintaxe: "x³", descricao: "Eleva o valor ao cubo", exemplo: "5³ = 125" },
        { nome: "Potência", sintaxe: "x^y", descricao: "Eleva x à potência y", exemplo: "2^3 = 8" },
        { nome: "Raiz quadrada", sintaxe: "√x", descricao: "Calcula a raiz quadrada de x", exemplo: "√25 = 5" },
      ],
    },
    {
      titulo: "Funções trigonométricas",
      funcoes: [
        { nome: "Seno", sintaxe: "sin(x)", descricao: "Calcula o seno do ângulo x", exemplo: "sin(30°) = 0.5" },
        { nome: "Cosseno", sintaxe: "cos(x)", descricao: "Calcula o cosseno do ângulo x", exemplo: "cos(60°) = 0.5" },
        { nome: "Tangente", sintaxe: "tan(x)", descricao: "Calcula a tangente do ângulo x", exemplo: "tan(45°) = 1" },
      ],
    },
    {
      titulo: "Funções logarítmicas",
      funcoes: [
        {
          nome: "Logaritmo",
          sintaxe: "log(x)",
          descricao: "Calcula o logaritmo de base 10 de x",
          exemplo: "log(100) = 2",
        },
        {
          nome: "Logaritmo natural",
          sintaxe: "ln(x)",
          descricao: "Calcula o logaritmo natural (base e) de x",
          exemplo: "ln(e) = 1",
        },
      ],
    },
    {
      titulo: "Funções de memória",
      funcoes: [
        { nome: "Armazenar", sintaxe: "MS", descricao: "Armazena o valor atual na memória" },
        { nome: "Recuperar", sintaxe: "MR", descricao: "Recupera o valor armazenado na memória" },
        { nome: "Limpar memória", sintaxe: "MC", descricao: "Limpa o valor armazenado na memória" },
        { nome: "Adicionar à memória", sintaxe: "M+", descricao: "Adiciona o valor atual ao valor na memória" },
        { nome: "Subtrair da memória", sintaxe: "M-", descricao: "Subtrai o valor atual do valor na memória" },
      ],
    },
  ]

  // Funções da calculadora financeira
  const funcoesFinanceiras: CategoriaFuncoes[] = [
    {
      titulo: "Juros simples",
      funcoes: [
        {
          nome: "Juros simples",
          sintaxe: "J = P × i × t",
          descricao: "Calcula juros simples onde P é o principal, i é a taxa e t é o tempo",
        },
        { nome: "Montante", sintaxe: "M = P + J", descricao: "Calcula o montante total (principal + juros)" },
      ],
    },
    {
      titulo: "Juros compostos",
      funcoes: [
        { nome: "Juros compostos", sintaxe: "M = P(1 + i)^t", descricao: "Calcula o montante com juros compostos" },
        { nome: "Juros", sintaxe: "J = M - P", descricao: "Calcula o valor dos juros (montante - principal)" },
      ],
    },
    {
      titulo: "Empréstimos",
      funcoes: [
        {
          nome: "Parcela mensal",
          sintaxe: "PMT = P × [i(1+i)^n]/[(1+i)^n-1]",
          descricao: "Calcula o valor da parcela mensal de um empréstimo",
        },
        { nome: "Total pago", sintaxe: "Total = PMT × n", descricao: "Calcula o total pago ao final do empréstimo" },
        { nome: "Total de juros", sintaxe: "Juros = Total - P", descricao: "Calcula o total de juros pagos" },
      ],
    },
  ]

  // Funções da calculadora de porcentagem
  const funcoesPorcentagem: CategoriaFuncoes[] = [
    {
      titulo: "Cálculos percentuais",
      funcoes: [
        {
          nome: "X% de Y",
          sintaxe: "(X/100) × Y",
          descricao: "Calcula quanto é X% de um valor Y",
          exemplo: "15% de 200 = 30",
        },
        {
          nome: "Porcentagem entre valores",
          sintaxe: "(Y/X) × 100",
          descricao: "Calcula qual porcentagem Y representa de X",
          exemplo: "50 é 25% de 200",
        },
        {
          nome: "Aumento percentual",
          sintaxe: "[(Y-X)/X] × 100",
          descricao: "Calcula o aumento percentual de X para Y",
          exemplo: "De 100 para 120 = aumento de 20%",
        },
        {
          nome: "Redução percentual",
          sintaxe: "[(X-Y)/X] × 100",
          descricao: "Calcula a redução percentual de X para Y",
          exemplo: "De 100 para 80 = redução de 20%",
        },
      ],
    },
  ]

  // Funções da calculadora de regra de três
  const funcoesRegraDeTres: CategoriaFuncoes[] = [
    {
      titulo: "Regra de três simples",
      funcoes: [
        {
          nome: "Diretamente proporcional",
          sintaxe: "X = (B × C) ÷ A",
          descricao: "Se A está para B, então C está para X (valores diretamente proporcionais)",
          exemplo: "Se 2 está para 10, então 5 está para X = (10 × 5) ÷ 2 = 25",
        },
        {
          nome: "Inversamente proporcional",
          sintaxe: "X = (B × A) ÷ C",
          descricao: "Se A está para B, então C está para X (valores inversamente proporcionais)",
          exemplo: "Se 4 operários levam 10 dias, então 8 operários levam X = (10 × 4) ÷ 8 = 5 dias",
        },
      ],
    },
  ]

  // Funções da calculadora de IMC
  const funcoesIMC: CategoriaFuncoes[] = [
    {
      titulo: "Cálculo do IMC",
      funcoes: [
        {
          nome: "Índice de Massa Corporal",
          sintaxe: "IMC = peso ÷ altura²",
          descricao: "Calcula o IMC dividindo o peso (kg) pelo quadrado da altura (m)",
          exemplo: "Peso: 70kg, Altura: 1,70m → IMC = 70 ÷ (1,7)² = 24,22",
        },
      ],
    },
    {
      titulo: "Classificação do IMC",
      funcoes: [
        {
          nome: "Abaixo do peso",
          sintaxe: "IMC < 18,5",
          descricao: "IMC menor que 18,5 indica que a pessoa está abaixo do peso ideal",
        },
        { nome: "Peso normal", sintaxe: "18,5 ≤ IMC < 25", descricao: "IMC entre 18,5 e 24,9 indica peso normal" },
        { nome: "Sobrepeso", sintaxe: "25 ≤ IMC < 30", descricao: "IMC entre 25 e 29,9 indica sobrepeso" },
        {
          nome: "Obesidade Grau I",
          sintaxe: "30 ≤ IMC < 35",
          descricao: "IMC entre 30 e 34,9 indica obesidade grau I",
        },
        {
          nome: "Obesidade Grau II",
          sintaxe: "35 ≤ IMC < 40",
          descricao: "IMC entre 35 e 39,9 indica obesidade grau II",
        },
        {
          nome: "Obesidade Grau III",
          sintaxe: "IMC ≥ 40",
          descricao: "IMC maior ou igual a 40 indica obesidade grau III",
        },
      ],
    },
  ]

  // Funções da calculadora de salário líquido
  const funcoesSalario: CategoriaFuncoes[] = [
    {
      titulo: "Descontos obrigatórios",
      funcoes: [
        {
          nome: "INSS",
          sintaxe: "Tabela progressiva",
          descricao: "Desconto previdenciário com alíquotas de 7,5% a 14%, dependendo da faixa salarial",
        },
        {
          nome: "IRRF",
          sintaxe: "Tabela progressiva",
          descricao: "Imposto de Renda Retido na Fonte, com alíquotas de 0% a 27,5%, dependendo da faixa salarial",
        },
      ],
    },
    {
      titulo: "Outros descontos e adicionais",
      funcoes: [
        {
          nome: "Vale-transporte",
          sintaxe: "Até 6% do salário bruto",
          descricao: "Desconto opcional limitado a 6% do salário bruto",
        },
        {
          nome: "Horas extras",
          sintaxe: "Valor hora × 1,5 ou 2",
          descricao: "Adicional de 50% (dias normais) ou 100% (domingos/feriados) sobre o valor da hora normal",
        },
        {
          nome: "Adicional noturno",
          sintaxe: "Valor hora × 0,2",
          descricao: "Adicional de 20% sobre o valor da hora normal para trabalho entre 22h e 5h",
        },
      ],
    },
    {
      titulo: "Cálculo final",
      funcoes: [
        {
          nome: "Salário líquido",
          sintaxe: "Bruto - Descontos",
          descricao: "Salário bruto menos todos os descontos aplicáveis",
        },
        {
          nome: "13º salário",
          sintaxe: "Salário bruto ÷ 12 × meses trabalhados",
          descricao: "Valor proporcional ao tempo trabalhado no ano",
        },
        {
          nome: "Férias",
          sintaxe: "Salário bruto + 1/3",
          descricao: "Salário bruto acrescido de 1/3 (terço constitucional)",
        },
      ],
    },
  ]

  // Funções da calculadora de financiamento
  const funcoesFinanciamento: CategoriaFuncoes[] = [
    {
      titulo: "Sistemas de amortização",
      funcoes: [
        {
          nome: "Tabela Price",
          sintaxe: "PMT = PV × [i(1+i)^n]/[(1+i)^n-1]",
          descricao:
            "Sistema de parcelas fixas, onde PMT é a parcela, PV é o valor financiado, i é a taxa e n é o prazo",
        },
        {
          nome: "Sistema SAC",
          sintaxe: "A = PV ÷ n, PMT = A + (SD × i)",
          descricao: "Sistema de amortização constante, onde A é a amortização, SD é o saldo devedor, PMT é a parcela",
        },
      ],
    },
    {
      titulo: "Componentes do financiamento",
      funcoes: [
        {
          nome: "Valor de entrada",
          sintaxe: "% do valor total",
          descricao: "Valor pago inicialmente, reduzindo o montante financiado",
        },
        {
          nome: "Carência",
          sintaxe: "Período sem amortização",
          descricao: "Período inicial onde se paga apenas juros, sem amortização do principal",
        },
        { nome: "Taxa de juros", sintaxe: "% ao mês/ano", descricao: "Percentual cobrado sobre o saldo devedor" },
        {
          nome: "CET",
          sintaxe: "Custo Efetivo Total",
          descricao: "Taxa que considera todos os custos do financiamento (juros, seguros, taxas)",
        },
      ],
    },
    {
      titulo: "Custos adicionais",
      funcoes: [
        {
          nome: "IOF",
          sintaxe: "% sobre o valor financiado",
          descricao: "Imposto sobre Operações Financeiras, aplicado em alguns tipos de financiamento",
        },
        {
          nome: "Taxa administrativa",
          sintaxe: "Valor fixo ou %",
          descricao: "Taxa cobrada pela instituição financeira para administração do contrato",
        },
        {
          nome: "Seguro",
          sintaxe: "Valor mensal",
          descricao: "Seguro para proteção do bem financiado ou para quitação em caso de imprevistos",
        },
      ],
    },
  ]

  // Seleciona as categorias de funções com base no tipo de calculadora
  let categorias: CategoriaFuncoes[] = []
  let titulo = ""

  switch (tipo) {
    case "cientifica":
      categorias = funcoesCientificas
      titulo = "Funções da Calculadora Científica"
      break
    case "financeira":
      categorias = funcoesFinanceiras
      titulo = "Funções da Calculadora Financeira"
      break
    case "porcentagem":
      categorias = funcoesPorcentagem
      titulo = "Funções da Calculadora de Porcentagem"
      break
    case "regra-de-tres":
      categorias = funcoesRegraDeTres
      titulo = "Funções da Calculadora de Regra de Três"
      break
    case "imc":
      categorias = funcoesIMC
      titulo = "Funções da Calculadora de IMC"
      break
    case "salario":
      categorias = funcoesSalario
      titulo = "Funções da Calculadora de Salário Líquido"
      break
    case "financiamento":
      categorias = funcoesFinanciamento
      titulo = "Funções da Calculadora de Financiamento"
      break
  }

  return (
    <div className="mt-10 border-t pt-8">
      <div className="flex items-center gap-2 mb-6">
        <InfoIcon className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">{titulo}</h2>
      </div>

      <Tabs defaultValue={categorias[0]?.titulo} className="w-full">
        <TabsList className="mb-4 flex flex-wrap h-auto">
          {categorias.map((categoria) => (
            <TabsTrigger key={categoria.titulo} value={categoria.titulo} className="data-[state=active]:bg-primary/10">
              {categoria.titulo}
            </TabsTrigger>
          ))}
        </TabsList>

        {categorias.map((categoria) => (
          <TabsContent key={categoria.titulo} value={categoria.titulo}>
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Função</th>
                        <th className="border p-2 text-left">Sintaxe</th>
                        <th className="border p-2 text-left">Descrição</th>
                        {categoria.funcoes.some((f) => f.exemplo) && <th className="border p-2 text-left">Exemplo</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {categoria.funcoes.map((funcao, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                          <td className="border p-2 font-medium">{funcao.nome}</td>
                          <td className="border p-2 font-mono text-sm">{funcao.sintaxe}</td>
                          <td className="border p-2">{funcao.descricao}</td>
                          {categoria.funcoes.some((f) => f.exemplo) && (
                            <td className="border p-2 text-sm">{funcao.exemplo || "-"}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex items-center gap-2 mt-4 p-3 bg-primary/5 rounded-md text-sm">
        <HelpCircleIcon className="h-4 w-4 text-primary flex-shrink-0" />
        <p>
          Esta seção explica as principais funções e conceitos utilizados nesta calculadora. Use as abas acima para
          navegar entre as diferentes categorias de funções.
        </p>
      </div>
    </div>
  )
}
