"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import CalculatorLayout from "@/components/CalculatorLayout"

const formSchema = z.object({
  valorFinanciamento: z.coerce.number().positive("O valor deve ser maior que zero"),
  valorEntrada: z.coerce.number().min(0, "O valor não pode ser negativo").optional().default(0),
  taxaJuros: z.coerce.number().positive("A taxa deve ser maior que zero"),
  prazo: z.coerce.number().int().positive("O prazo deve ser maior que zero"),
  sistema: z.enum(["price", "sac"]),
  taxaAdministrativa: z.coerce.number().min(0, "O valor não pode ser negativo").optional().default(0),
  seguro: z.coerce.number().min(0, "O valor não pode ser negativo").optional().default(0),
  carencia: z.coerce.number().min(0, "O valor não pode ser negativo").optional().default(0),
  periodicidade: z.enum(["mensal", "anual"]).default("mensal"),
  incluirIOF: z.boolean().optional().default(false),
  taxaIOF: z.coerce.number().min(0, "O valor não pode ser negativo").optional().default(0.38),
})

interface Parcela {
  numero: number
  valorParcela: number
  amortizacao: number
  juros: number
  saldoDevedor: number
  taxaAdministrativa?: number
  seguro?: number
  valorTotal?: number
}

export default function FinanciamentoCalculatorClient() {
  const [result, setResult] = useState<{
    valorFinanciamento: number
    valorEntrada: number
    valorFinanciadoTotal: number
    taxaJuros: number
    prazo: number
    sistema: string
    valorPrimeiraParcela: number
    valorUltimaParcela: number
    totalJuros: number
    totalTaxaAdministrativa: number
    totalSeguro: number
    totalIOF: number
    totalPago: number
    cet: number
    parcelas: Parcela[]
  } | null>(null)

  const [activeTab, setActiveTab] = useState("resultado")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      valorFinanciamento: undefined,
      valorEntrada: 0,
      taxaJuros: undefined,
      prazo: undefined,
      sistema: "price",
      taxaAdministrativa: 0,
      seguro: 0,
      carencia: 0,
      periodicidade: "mensal",
      incluirIOF: false,
      taxaIOF: 0.38,
    },
  })

  function calcularPrice(
    valorFinanciamento: number,
    taxaJuros: number,
    prazo: number,
    taxaAdministrativa = 0,
    seguro = 0,
    carencia = 0,
  ): Parcela[] {
    const taxaMensal = taxaJuros / 100
    const parcelas: Parcela[] = []

    // Adicionar período de carência se existir
    for (let i = 1; i <= carencia; i++) {
      const juros = valorFinanciamento * taxaMensal
      parcelas.push({
        numero: i,
        valorParcela: juros,
        amortizacao: 0,
        juros,
        saldoDevedor: valorFinanciamento,
        taxaAdministrativa,
        seguro,
        valorTotal: juros + taxaAdministrativa + seguro,
      })
    }

    // Fórmula Price: PMT = PV * (r * (1 + r)^n) / ((1 + r)^n - 1)
    const valorParcelaBase =
      (valorFinanciamento * (taxaMensal * Math.pow(1 + taxaMensal, prazo))) / (Math.pow(1 + taxaMensal, prazo) - 1)

    let saldoDevedor = valorFinanciamento

    for (let i = 1; i <= prazo; i++) {
      const juros = saldoDevedor * taxaMensal
      const amortizacao = valorParcelaBase - juros
      saldoDevedor -= amortizacao

      // Ajuste para o último mês para evitar saldo negativo devido a arredondamentos
      if (i === prazo) {
        saldoDevedor = 0
      }

      parcelas.push({
        numero: i + carencia,
        valorParcela: valorParcelaBase,
        amortizacao,
        juros,
        saldoDevedor: Math.max(0, saldoDevedor),
        taxaAdministrativa,
        seguro,
        valorTotal: valorParcelaBase + taxaAdministrativa + seguro,
      })
    }

    return parcelas
  }

  function calcularSAC(
    valorFinanciamento: number,
    taxaJuros: number,
    prazo: number,
    taxaAdministrativa = 0,
    seguro = 0,
    carencia = 0,
  ): Parcela[] {
    const taxaMensal = taxaJuros / 100
    const parcelas: Parcela[] = []

    // Adicionar período de carência se existir
    for (let i = 1; i <= carencia; i++) {
      const juros = valorFinanciamento * taxaMensal
      parcelas.push({
        numero: i,
        valorParcela: juros,
        amortizacao: 0,
        juros,
        saldoDevedor: valorFinanciamento,
        taxaAdministrativa,
        seguro,
        valorTotal: juros + taxaAdministrativa + seguro,
      })
    }

    // No SAC, a amortização é constante
    const amortizacaoConstante = valorFinanciamento / prazo
    let saldoDevedor = valorFinanciamento

    for (let i = 1; i <= prazo; i++) {
      const juros = saldoDevedor * taxaMensal
      const valorParcelaBase = amortizacaoConstante + juros

      saldoDevedor -= amortizacaoConstante

      parcelas.push({
        numero: i + carencia,
        valorParcela: valorParcelaBase,
        amortizacao: amortizacaoConstante,
        juros,
        saldoDevedor: Math.max(0, saldoDevedor),
        taxaAdministrativa,
        seguro,
        valorTotal: valorParcelaBase + taxaAdministrativa + seguro,
      })
    }

    return parcelas
  }

  function calcularCET(valorFinanciamento: number, valorEntrada: number, parcelas: Parcela[], iof: number): number {
    // Cálculo simplificado do CET (Custo Efetivo Total)
    // Na prática, o CET é calculado por iteração para encontrar a taxa que iguala o valor presente
    // das parcelas ao valor financiado

    const fluxoCaixa = [-valorFinanciamento + valorEntrada]

    parcelas.forEach((parcela) => {
      fluxoCaixa.push(parcela.valorTotal || parcela.valorParcela)
    })

    // Estimativa inicial baseada na taxa de juros + custos adicionais
    const totalPago = parcelas.reduce((sum, parcela) => sum + (parcela.valorTotal || parcela.valorParcela), 0)
    const custoTotal = totalPago - valorFinanciamento + valorEntrada + iof

    // Estimativa simplificada do CET anual
    const prazoAnos = parcelas.length / 12
    const cetEstimado = (custoTotal / (valorFinanciamento - valorEntrada) / prazoAnos) * 100

    return cetEstimado
  }

  function calcularIOF(valorFinanciamento: number, taxaIOF: number): number {
    // Cálculo simplificado do IOF
    return valorFinanciamento * (taxaIOF / 100)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      valorFinanciamento,
      valorEntrada = 0,
      taxaJuros,
      prazo,
      sistema,
      taxaAdministrativa = 0,
      seguro = 0,
      carencia = 0,
      periodicidade,
      incluirIOF,
      taxaIOF = 0.38,
    } = values

    // Calcular valor do IOF se aplicável
    const valorIOF = incluirIOF ? calcularIOF(valorFinanciamento - valorEntrada, taxaIOF) : 0

    // Valor total a ser financiado (incluindo IOF se aplicável)
    const valorFinanciadoTotal = valorFinanciamento - valorEntrada + valorIOF

    // Ajustar taxa de juros se for anual
    const taxaJurosAjustada = periodicidade === "anual" ? Math.pow(1 + taxaJuros / 100, 1 / 12) * 100 - 100 : taxaJuros

    let parcelas: Parcela[] = []

    if (sistema === "price") {
      parcelas = calcularPrice(valorFinanciadoTotal, taxaJurosAjustada, prazo, taxaAdministrativa, seguro, carencia)
    } else {
      parcelas = calcularSAC(valorFinanciadoTotal, taxaJurosAjustada, prazo, taxaAdministrativa, seguro, carencia)
    }

    const valorPrimeiraParcela = parcelas[carencia].valorTotal || 0
    const valorUltimaParcela = parcelas[parcelas.length - 1].valorTotal || 0

    const totalJuros = parcelas.reduce((sum, parcela) => sum + parcela.juros, 0)
    const totalTaxaAdministrativa = parcelas.reduce((sum, parcela) => sum + (parcela.taxaAdministrativa || 0), 0)
    const totalSeguro = parcelas.reduce((sum, parcela) => sum + (parcela.seguro || 0), 0)
    const totalPago = parcelas.reduce((sum, parcela) => sum + (parcela.valorTotal || parcela.valorParcela), 0)
    const cet = calcularCET(valorFinanciamento, valorEntrada, parcelas, valorIOF)

    setResult({
      valorFinanciamento,
      valorEntrada,
      valorFinanciadoTotal,
      taxaJuros,
      prazo,
      sistema: sistema === "price" ? "Tabela Price" : "Sistema SAC",
      valorPrimeiraParcela,
      valorUltimaParcela,
      totalJuros,
      totalTaxaAdministrativa,
      totalSeguro,
      totalIOF: valorIOF,
      totalPago,
      cet,
      parcelas,
    })

    setActiveTab("resultado")
  }

  return (
    <CalculatorLayout
      title="Calculadora de Financiamento"
      description="Simule financiamentos com sistemas SAC e Price. Calcule parcelas, juros e veja a evolução do saldo devedor."
    >
      <div className="space-y-6">
        <div className="text-sm text-muted-foreground">
          <p>
            Esta calculadora permite simular financiamentos utilizando os sistemas de amortização Price (parcelas fixas)
            ou SAC (amortização constante). Informe os valores para calcular as parcelas e o custo total do
            financiamento.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-3">Sobre os Sistemas de Financiamento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-md">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">
                    P
                  </span>
                  Sistema Price (Parcelas Fixas)
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Parcelas de valor fixo durante todo o financiamento</li>
                  <li>Amortização crescente e juros decrescentes</li>
                  <li>Maior parte dos juros é paga no início do financiamento</li>
                  <li>Ideal para quem precisa de previsibilidade no orçamento</li>
                </ul>
              </div>
              <div className="p-4 bg-muted/30 rounded-md">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">
                    S
                  </span>
                  Sistema SAC (Amortização Constante)
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Amortização de valor fixo durante todo o financiamento</li>
                  <li>Parcelas decrescentes ao longo do tempo</li>
                  <li>Quitação mais rápida do saldo devedor</li>
                  <li>Ideal para quem pode pagar parcelas maiores no início</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-primary/5 rounded-md text-sm">
              <h4 className="font-medium mb-1">Dicas para usar a calculadora:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Compare os dois sistemas para encontrar o mais adequado ao seu perfil</li>
                <li>Considere o valor da entrada para reduzir o montante financiado</li>
                <li>Avalie o impacto dos custos adicionais (IOF, seguros, taxas)</li>
                <li>Observe o CET (Custo Efetivo Total) para comparar diferentes ofertas</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
                data-testid="financiamento-calculator-form"
              >
                <FormField
                  control={form.control}
                  name="valorFinanciamento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor do Financiamento (R$)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ex: 100000"
                          {...field}
                          data-testid="valor-financiamento-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="valorEntrada"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor da Entrada (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 10000" {...field} data-testid="valor-entrada-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="taxaJuros"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taxa de Juros (% ao mês)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Ex: 0.99"
                          {...field}
                          data-testid="taxa-juros-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prazo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prazo (meses)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 36" {...field} data-testid="prazo-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sistema"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sistema de Amortização</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o sistema" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="price">Tabela Price (parcelas fixas)</SelectItem>
                          <SelectItem value="sac">SAC (amortização constante)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="taxaAdministrativa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taxa Administrativa (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 10" {...field} data-testid="taxa-administrativa-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seguro"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seguro (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 25" {...field} data-testid="seguro-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="carencia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carência (meses)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 2" {...field} data-testid="carencia-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="periodicidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Periodicidade da Taxa de Juros</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a periodicidade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mensal">Mensal</SelectItem>
                          <SelectItem value="anual">Anual</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="incluirIOF"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Incluir IOF no Financiamento?</FormLabel>
                        <p className="text-sm text-muted-foreground">Imposto sobre Operações Financeiras</p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="incluir-iof-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" data-testid="calcular-financiamento-button">
                  Calcular Financiamento
                </Button>
              </form>
            </Form>

            {result && (
              <div className="mt-6" data-testid="financiamento-result-area" aria-live="polite">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="resultado">Resumo</TabsTrigger>
                    <TabsTrigger value="parcelas">Parcelas</TabsTrigger>
                  </TabsList>

                  <TabsContent value="resultado">
                    <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 shadow-sm">
                      <div className="text-center mb-6">
                        <p className="text-sm text-muted-foreground mb-1">Valor da Parcela</p>
                        <p className="text-4xl font-bold text-primary">R$ {result.valorPrimeiraParcela.toFixed(2)}</p>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <span className="inline-block px-2 py-1 bg-background rounded-md">{result.sistema}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="bg-background p-3 rounded-md">
                          <p className="text-sm text-muted-foreground">Valor Financiado:</p>
                          <p className="font-semibold">R$ {result.valorFinanciamento.toFixed(2)}</p>
                        </div>
                        <div className="bg-background p-3 rounded-md">
                          <p className="text-sm text-muted-foreground">Valor da Entrada:</p>
                          <p className="font-semibold">R$ {result.valorEntrada.toFixed(2)}</p>
                        </div>
                        <div className="bg-background p-3 rounded-md">
                          <p className="text-sm text-muted-foreground">Valor Financiado Total:</p>
                          <p className="font-semibold">R$ {result.valorFinanciadoTotal.toFixed(2)}</p>
                        </div>
                        <div className="bg-background p-3 rounded-md">
                          <p className="text-sm text-muted-foreground">Taxa de Juros:</p>
                          <p className="font-semibold">{result.taxaJuros.toFixed(2)}% ao mês</p>
                        </div>
                        <div className="bg-background p-3 rounded-md">
                          <p className="text-sm text-muted-foreground">Prazo:</p>
                          <p className="font-semibold">{result.prazo} meses</p>
                        </div>
                        {result.sistema === "Sistema SAC" && (
                          <div className="bg-background p-3 rounded-md">
                            <p className="text-sm text-muted-foreground">Última Parcela:</p>
                            <p className="font-semibold">R$ {result.valorUltimaParcela.toFixed(2)}</p>
                          </div>
                        )}
                        <div className="bg-background p-3 rounded-md">
                          <p className="text-sm text-muted-foreground">Total de Juros:</p>
                          <p className="font-semibold">R$ {result.totalJuros.toFixed(2)}</p>
                        </div>
                        <div className="bg-background p-3 rounded-md">
                          <p className="text-sm text-muted-foreground">CET (Custo Efetivo Total):</p>
                          <p className="font-semibold">{result.cet.toFixed(2)}% ao ano</p>
                        </div>
                        <div className="bg-background p-3 rounded-md col-span-full">
                          <p className="text-sm text-muted-foreground">Total a Pagar:</p>
                          <p className="font-bold text-primary">R$ {result.totalPago.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-muted-foreground">
                      <h3 className="font-semibold mb-2">Sobre os sistemas de amortização</h3>
                      <div className="space-y-2">
                        <p>
                          <strong>Tabela Price:</strong> Sistema de parcelas fixas onde os juros são maiores no início e
                          diminuem ao longo do tempo, enquanto a amortização aumenta progressivamente.
                        </p>
                        <p>
                          <strong>Sistema SAC:</strong> Sistema de amortização constante onde as parcelas são
                          decrescentes, pois os juros diminuem a cada mês conforme o saldo devedor é reduzido.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="parcelas">
                    <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 shadow-sm">
                      <h3 className="font-semibold mb-3">Tabela de Amortização</h3>
                      <div className="overflow-x-auto -mx-4 sm:mx-0">
                        <div className="min-w-full inline-block align-middle">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-background">
                                <th className="border p-2 text-left">Parcela</th>
                                <th className="border p-2 text-left">Valor</th>
                                <th className="border p-2 text-left">Amortização</th>
                                <th className="border p-2 text-left">Juros</th>
                                <th className="border p-2 text-left">Taxa Adm.</th>
                                <th className="border p-2 text-left">Seguro</th>
                                <th className="border p-2 text-left">Saldo Devedor</th>
                              </tr>
                            </thead>
                            <tbody>
                              {result.parcelas.slice(0, 12).map((parcela) => (
                                <tr key={parcela.numero} className={parcela.numero % 2 === 0 ? "bg-background/50" : ""}>
                                  <td className="border p-2">{parcela.numero}</td>
                                  <td className="border p-2">
                                    R$ {parcela.valorTotal?.toFixed(2) || parcela.valorParcela.toFixed(2)}
                                  </td>
                                  <td className="border p-2">R$ {parcela.amortizacao.toFixed(2)}</td>
                                  <td className="border p-2">R$ {parcela.juros.toFixed(2)}</td>
                                  <td className="border p-2">R$ {parcela.taxaAdministrativa?.toFixed(2)}</td>
                                  <td className="border p-2">R$ {parcela.seguro?.toFixed(2)}</td>
                                  <td className="border p-2">R$ {parcela.saldoDevedor.toFixed(2)}</td>
                                </tr>
                              ))}
                              {result.prazo > 12 && (
                                <tr>
                                  <td colSpan={7} className="border p-2 text-center text-muted-foreground">
                                    Exibindo as primeiras 12 parcelas de {result.prazo}
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  )
}
