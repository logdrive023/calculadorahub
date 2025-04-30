"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import CalculatorLayout from "@/components/CalculatorLayout"
import FuncoesExplicacao from "@/components/FuncoesExplicacao"

export default function SalarioLiquidoCalculatorClient() {
  // Definir o schema dentro do componente
  const formSchema = z.object({
    salarioBruto: z.coerce.number().positive("O salário deve ser maior que zero"),
    numeroDependentes: z.coerce.number().min(0, "O número de dependentes não pode ser negativo").default(0),
    outrosDescontos: z.coerce.number().min(0, "O valor não pode ser negativo").optional().default(0),
    tipoContrato: z.enum(["clt", "pj", "servidor", "mei", "me"]),
    aliquotaMEI: z.coerce.number().min(0, "O valor não pode ser negativo").optional().default(66),
    aliquotaME: z.coerce.number().min(0, "O valor não pode ser negativo").optional().default(6),
    pensaoAlimenticia: z.coerce.number().min(0, "O valor não pode ser negativo").optional().default(0),
    planoSaude: z.coerce.number().min(0, "O valor não pode ser negativo").optional().default(0),
    valeTransporte: z.boolean().default(false),
    valorValeTransporte: z.coerce.number().min(0, "O valor não pode ser negativo").optional().default(0),
    valeRefeicao: z.coerce.number().min(0, "O valor não pode ser negativo").optional().default(0),
    horasExtras: z.coerce.number().min(0, "O valor não pode ser negativo").optional().default(0),
    adicionalNoturno: z.coerce.number().min(0, "O valor não pode ser negativo").optional().default(0),
    incluirDecimoTerceiro: z.boolean().default(false),
    incluirFerias: z.boolean().default(false),
  })

  // Inicializar o useForm dentro do componente
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salarioBruto: 0,
      numeroDependentes: 0,
      outrosDescontos: 0,
      tipoContrato: "clt",
      aliquotaMEI: 66,
      aliquotaME: 6,
      pensaoAlimenticia: 0,
      planoSaude: 0,
      valeTransporte: false,
      valorValeTransporte: 0,
      valeRefeicao: 0,
      horasExtras: 0,
      adicionalNoturno: 0,
      incluirDecimoTerceiro: false,
      incluirFerias: false,
    },
  })

  const [result, setResult] = useState<{
    salarioBruto: number
    descontoINSS: number
    descontoIRRF: number
    outrosDescontos: number
    salarioLiquido: number
    aliquotaEfetivaINSS: number
    aliquotaEfetivaIRRF: number
    percentualTotal: number
    decimoTerceiro?: number
    ferias?: number
    totalAdicionais?: number
    tipoContrato?: string
  } | null>(null)

  const [activeTab, setActiveTab] = useState("mensal")

  const tipoContrato = form.watch("tipoContrato")
  const valeTransporte = form.watch("valeTransporte")

  const incluirFerias = form.watch("incluirFerias")

  useEffect(() => {
    form.trigger("salarioBruto")
  }, [tipoContrato, form])

  function calcularINSS(salarioBruto: number): {
    valor: number
    aliquotaEfetiva: number
    faixas: Array<{ faixa: string; valor: number; aliquota: number }>
  } {
    let inss = 0
    const faixas = []

    if (salarioBruto <= 1320) {
      inss = salarioBruto * 0.075
      faixas.push({ faixa: "Até R$ 1.320,00", valor: inss, aliquota: 7.5 })
    } else if (salarioBruto <= 2571.29) {
      const faixa1 = 1320 * 0.075
      const faixa2 = (salarioBruto - 1320) * 0.09
      faixas.push({ faixa: "Até R$ 1.320,00", valor: faixa1, aliquota: 7.5 })
      faixas.push({ faixa: "De R$ 1.320,01 até R$ 2.571,29", valor: faixa2, aliquota: 9 })
      inss = faixa1 + faixa2
    } else if (salarioBruto <= 3856.94) {
      const faixa1 = 1320 * 0.075
      const faixa2 = (2571.29 - 1320) * 0.09
      const faixa3 = (salarioBruto - 2571.29) * 0.12
      faixas.push({ faixa: "Até R$ 1.320,00", valor: faixa1, aliquota: 7.5 })
      faixas.push({ faixa: "De R$ 1.320,01 até R$ 2.571,29", valor: faixa2, aliquota: 9 })
      faixas.push({ faixa: "De R$ 2.571,30 até R$ 3.856,94", valor: faixa3, aliquota: 12 })
      inss = faixa1 + faixa2 + faixa3
    } else if (salarioBruto <= 7507.49) {
      const faixa1 = 1320 * 0.075
      const faixa2 = (2571.29 - 1320) * 0.09
      const faixa3 = (3856.94 - 2571.29) * 0.12
      const faixa4 = (salarioBruto - 3856.94) * 0.14
      faixas.push({ faixa: "Até R$ 1.320,00", valor: faixa1, aliquota: 7.5 })
      faixas.push({ faixa: "De R$ 1.320,01 até R$ 2.571,29", valor: faixa2, aliquota: 9 })
      faixas.push({ faixa: "De R$ 2.571,30 até R$ 3.856,94", valor: faixa3, aliquota: 12 })
      faixas.push({ faixa: "De R$ 3.856,95 até R$ 7.507,49", valor: faixa4, aliquota: 14 })
      inss = faixa1 + faixa2 + faixa3 + faixa4
    } else {
      const faixa1 = 1320 * 0.075
      const faixa2 = (2571.29 - 1320) * 0.09
      const faixa3 = (3856.94 - 2571.29) * 0.12
      const faixa4 = (7507.49 - 3856.94) * 0.14
      faixas.push({ faixa: "Até R$ 1.320,00", valor: faixa1, aliquota: 7.5 })
      faixas.push({ faixa: "De R$ 1.320,01 até R$ 2.571,29", valor: faixa2, aliquota: 9 })
      faixas.push({ faixa: "De R$ 2.571,30 até R$ 3.856.94", valor: faixa3, aliquota: 12 })
      faixas.push({ faixa: "De R$ 3.856,95 até R$ 7.507,49", valor: faixa4, aliquota: 14 })
      inss = faixa1 + faixa2 + faixa3 + faixa4
    }

    const aliquotaEfetiva = (inss / salarioBruto) * 100

    return { valor: inss, aliquotaEfetiva, faixas }
  }

  function calcularIRRF(
    salarioBruto: number,
    descontoINSS: number,
    numeroDependentes: number,
    pensaoAlimenticia: number,
  ): { valor: number; aliquotaEfetiva: number } {
    const deducaoPorDependente = 189.59
    const baseCalculo = salarioBruto - descontoINSS - numeroDependentes * deducaoPorDependente - pensaoAlimenticia

    let irrf = 0
    let aliquota = 0
    let deducao = 0

    if (baseCalculo <= 2112.0) {
      irrf = 0
      aliquota = 0
      deducao = 0
    } else if (baseCalculo <= 2826.65) {
      aliquota = 7.5
      deducao = 158.4
    } else if (baseCalculo <= 3751.05) {
      aliquota = 15
      deducao = 370.4
    } else if (baseCalculo <= 4664.68) {
      aliquota = 22.5
      deducao = 651.73
    } else {
      aliquota = 27.5
      deducao = 884.96
    }

    irrf = baseCalculo * (aliquota / 100) - deducao
    irrf = Math.max(0, irrf)

    const aliquotaEfetiva = baseCalculo > 0 ? (irrf / baseCalculo) * 100 : 0

    return { valor: irrf, aliquotaEfetiva }
  }

  function calcularSalarioLiquido(values: z.infer<typeof formSchema>) {
    const {
      salarioBruto,
      numeroDependentes,
      outrosDescontos,
      tipoContrato,
      pensaoAlimenticia,
      planoSaude,
      valeTransporte,
      valorValeTransporte,
      valeRefeicao,
      horasExtras,
      adicionalNoturno,
      incluirDecimoTerceiro,
      incluirFerias,
    } = values

    const totalAdicionais = (horasExtras || 0) + (adicionalNoturno || 0)
    const salarioBrutoComAdicionais = salarioBruto + totalAdicionais

    let descontoINSS = 0
    let descontoIRRF = 0
    let aliquotaEfetivaINSS = 0
    let aliquotaEfetivaIRRF = 0
    let totalOutrosDescontos = 0
    let descontoValeTransporte = 0
    let descontoSimplesMEI = 0
    let descontoSimplesME = 0

    if (tipoContrato === "clt") {
      const resultadoINSS = calcularINSS(salarioBrutoComAdicionais)
      descontoINSS = resultadoINSS.valor
      aliquotaEfetivaINSS = resultadoINSS.aliquotaEfetiva

      const resultadoIRRF = calcularIRRF(salarioBrutoComAdicionais, descontoINSS, numeroDependentes, pensaoAlimenticia)
      descontoIRRF = resultadoIRRF.valor
      aliquotaEfetivaIRRF = resultadoIRRF.aliquotaEfetiva

      descontoValeTransporte = valeTransporte ? Math.min(salarioBruto * 0.06, valorValeTransporte) : 0

      totalOutrosDescontos = (outrosDescontos || 0) + (planoSaude || 0) + descontoValeTransporte - (valeRefeicao || 0)
    } else if (tipoContrato === "pj") {
      descontoINSS = 0
      descontoIRRF = 0
      aliquotaEfetivaINSS = 0
      aliquotaEfetivaIRRF = 0

      const impostoRendaPJ = salarioBrutoComAdicionais * 0.15

      totalOutrosDescontos = (outrosDescontos || 0) + (planoSaude || 0) + impostoRendaPJ - (valeRefeicao || 0)
    } else if (tipoContrato === "mei") {
      descontoINSS = 0
      descontoIRRF = 0
      aliquotaEfetivaINSS = 0
      aliquotaEfetivaIRRF = 0

      descontoSimplesMEI = values.aliquotaMEI || 66.0

      totalOutrosDescontos = (outrosDescontos || 0) + (planoSaude || 0) + descontoSimplesMEI - (valeRefeicao || 0)
    } else if (tipoContrato === "me") {
      descontoINSS = 0
      descontoIRRF = 0
      aliquotaEfetivaINSS = 0
      aliquotaEfetivaIRRF = 0

      const aliquotaSimples = values.aliquotaME || 6
      descontoSimplesME = salarioBrutoComAdicionais * (aliquotaSimples / 100)

      totalOutrosDescontos = (outrosDescontos || 0) + (planoSaude || 0) + descontoSimplesME - (valeRefeicao || 0)
    } else if (tipoContrato === "servidor") {
      descontoINSS = salarioBrutoComAdicionais * 0.11
      aliquotaEfetivaINSS = 11

      const resultadoIRRF = calcularIRRF(salarioBrutoComAdicionais, descontoINSS, numeroDependentes, pensaoAlimenticia)
      descontoIRRF = resultadoIRRF.valor
      aliquotaEfetivaIRRF = resultadoIRRF.aliquotaEfetiva

      totalOutrosDescontos = (outrosDescontos || 0) + (planoSaude || 0) - (valeRefeicao || 0)
    }

    const salarioLiquido = salarioBrutoComAdicionais - descontoINSS - descontoIRRF - totalOutrosDescontos

    const totalDescontos = descontoINSS + descontoIRRF + totalOutrosDescontos
    const percentualTotal = (totalDescontos / salarioBrutoComAdicionais) * 100

    const decimoTerceiro = incluirDecimoTerceiro ? salarioBruto / 12 : undefined

    setResult({
      salarioBruto: salarioBrutoComAdicionais,
      descontoINSS,
      descontoIRRF,
      outrosDescontos: totalOutrosDescontos,
      salarioLiquido,
      aliquotaEfetivaINSS,
      aliquotaEfetivaIRRF,
      percentualTotal,
      decimoTerceiro,
      ferias:
        incluirFerias && (tipoContrato === "clt" || tipoContrato === "servidor")
          ? (salarioBruto + salarioBruto / 3) / 12
          : undefined,
      totalAdicionais,
      tipoContrato,
    })

    setActiveTab("mensal")
  }

  return (
    <CalculatorLayout
      title="Calculadora de Salário Líquido"
      description="Calcule seu salário líquido com descontos de INSS e IRRF. Saiba exatamente quanto vai receber."
    >
      <div className="space-y-6">
        <div className="text-sm text-muted-foreground">
          <p>
            Esta calculadora permite simular seu salário líquido considerando os descontos obrigatórios como INSS e
            IRRF, além de outros descontos e benefícios. Selecione o tipo de contrato e informe os valores para obter o
            resultado.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calcularSalarioLiquido)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="tipoContrato"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Contrato</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de contrato" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="clt">CLT</SelectItem>
                          {/*<SelectItem value="pj">PJ (Pessoa Jurídica)</SelectItem>*/}
                          <SelectItem value="mei">MEI (Microempreendedor Individual)</SelectItem>
                          <SelectItem value="me">ME (Microempresa)</SelectItem>
                          <SelectItem value="servidor">Servidor Público</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {tipoContrato === "mei" && (
                  <FormField
                    control={form.control}
                    name="aliquotaMEI"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor do DAS-MEI (R$)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 66" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {tipoContrato === "me" && (
                  <FormField
                    control={form.control}
                    name="aliquotaME"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alíquota do Simples Nacional (%)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 6" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="salarioBruto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salário Bruto (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 3000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {(tipoContrato === "clt" || tipoContrato === "servidor") && (
                  <FormField
                    control={form.control}
                    name="numeroDependentes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Dependentes</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Adicionais</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="horasExtras"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Horas Extras (R$)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Ex: 200" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="adicionalNoturno"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adicional Noturno (R$)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Ex: 150" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Descontos e Benefícios</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {(tipoContrato === "clt" || tipoContrato === "servidor") && (
                      <FormField
                        control={form.control}
                        name="pensaoAlimenticia"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pensão Alimentícia (R$)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Ex: 0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={form.control}
                      name="planoSaude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plano de Saúde (R$)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Ex: 0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="outrosDescontos"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Outros Descontos (R$)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Ex: 0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="valeRefeicao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vale Refeição (R$)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Ex: 0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {tipoContrato === "clt" && (
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="valeTransporte"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Vale Transporte</FormLabel>
                              <p className="text-sm text-muted-foreground">Desconto de até 6% do salário bruto</p>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {valeTransporte && (
                        <FormField
                          control={form.control}
                          name="valorValeTransporte"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Valor do Vale Transporte (R$)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Ex: 220" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Opções Adicionais</h3>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="incluirDecimoTerceiro"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Incluir 13º salário proporcional</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    {(tipoContrato === "clt" || tipoContrato === "servidor") && (
                      <FormField
                        control={form.control}
                        name="incluirFerias"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Incluir férias proporcionais (com 1/3)</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Calcular Salário Líquido
                </Button>
              </form>
            </Form>

            {result && (
              <div className="mt-6" data-testid="salario-result-area">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="mensal">Resumo Mensal</TabsTrigger>
                    <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
                  </TabsList>

                  <TabsContent value="mensal">
                    <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 shadow-sm">
                      <div className="text-center mb-6">
                        <p className="text-sm text-muted-foreground mb-1">Salário Líquido</p>
                        <p className="text-4xl font-bold text-primary">R$ {result.salarioLiquido.toFixed(2)}</p>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <span className="inline-block px-2 py-1 bg-background rounded-md mr-2">
                            Descontos: {result.percentualTotal.toFixed(2)}%
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="bg-background p-3 rounded-md">
                          <p className="text-sm text-muted-foreground">Salário Bruto:</p>
                          <p className="font-semibold">R$ {result.salarioBruto.toFixed(2)}</p>
                        </div>
                        {result.totalAdicionais && result.totalAdicionais > 0 && (
                          <div className="bg-background p-3 rounded-md">
                            <p className="text-sm text-muted-foreground">Adicionais:</p>
                            <p className="font-semibold">R$ {result.totalAdicionais.toFixed(2)}</p>
                          </div>
                        )}
                        <div className="bg-background p-3 rounded-md">
                          <p className="text-sm text-muted-foreground">Desconto INSS:</p>
                          <p className="font-semibold">
                            R$ {result.descontoINSS.toFixed(2)}{" "}
                            <span className="text-xs text-muted-foreground">
                              ({result.aliquotaEfetivaINSS.toFixed(2)}%)
                            </span>
                          </p>
                        </div>
                        {result.descontoIRRF > 0 && (
                          <div className="bg-background p-3 rounded-md">
                            <p className="text-sm text-muted-foreground">Desconto IRRF:</p>
                            <p className="font-semibold">
                              R$ {result.descontoIRRF.toFixed(2)}{" "}
                              <span className="text-xs text-muted-foreground">
                                ({result.aliquotaEfetivaIRRF.toFixed(2)}%)
                              </span>
                            </p>
                          </div>
                        )}
                        {result.outrosDescontos > 0 && (
                          <div className="bg-background p-3 rounded-md">
                            <p className="text-sm text-muted-foreground">Outros Descontos:</p>
                            <p className="font-semibold">R$ {result.outrosDescontos.toFixed(2)}</p>
                          </div>
                        )}
                        {result.tipoContrato === "mei" && (
                          <div className="bg-background p-3 rounded-md">
                            <p className="text-sm text-muted-foreground">DAS-MEI:</p>
                            <p className="font-semibold">R$ 66,00</p>
                          </div>
                        )}
                        {result.tipoContrato === "me" && (
                          <div className="bg-background p-3 rounded-md">
                            <p className="text-sm text-muted-foreground">Simples Nacional:</p>
                            <p className="font-semibold">R$ {(result.salarioBruto * 0.06).toFixed(2)}</p>
                          </div>
                        )}
                        {result.decimoTerceiro && (
                          <div className="bg-background p-3 rounded-md">
                            <p className="text-sm text-muted-foreground">13º Proporcional (mensal):</p>
                            <p className="font-semibold">R$ {result.decimoTerceiro.toFixed(2)}</p>
                          </div>
                        )}
                        {result.ferias && (
                          <div className="bg-background p-3 rounded-md">
                            <p className="text-sm text-muted-foreground">Férias Proporcionais (mensal):</p>
                            <p className="font-semibold">R$ {result.ferias.toFixed(2)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="detalhes">
                    <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 shadow-sm">
                      <h3 className="font-semibold mb-3">Detalhamento dos Cálculos</h3>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Composição do Salário Bruto</h4>
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-background">
                                <th className="border p-2 text-left">Item</th>
                                <th className="border p-2 text-left">Valor</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border p-2">Salário Base</td>
                                <td className="border p-2">
                                  R$ {(result.salarioBruto - (result.totalAdicionais || 0)).toFixed(2)}
                                </td>
                              </tr>
                              {result.totalAdicionais > 0 && (
                                <tr>
                                  <td className="border p-2">Adicionais (Horas Extras + Noturno)</td>
                                  <td className="border p-2">R$ {result.totalAdicionais.toFixed(2)}</td>
                                </tr>
                              )}
                              <tr className="font-semibold bg-background/50">
                                <td className="border p-2">Total Bruto</td>
                                <td className="border p-2">R$ {result.salarioBruto.toFixed(2)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Descontos</h4>
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-background">
                                <th className="border p-2 text-left">Item</th>
                                <th className="border p-2 text-left">Valor</th>
                                <th className="border p-2 text-left">Percentual</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border p-2">INSS</td>
                                <td className="border p-2">R$ {result.descontoINSS.toFixed(2)}</td>
                                <td className="border p-2">{result.aliquotaEfetivaINSS.toFixed(2)}%</td>
                              </tr>
                              {result.descontoIRRF > 0 && (
                                <tr>
                                  <td className="border p-2">IRRF</td>
                                  <td className="border p-2">R$ {result.descontoIRRF.toFixed(2)}</td>
                                  <td className="border p-2">{result.aliquotaEfetivaIRRF.toFixed(2)}%</td>
                                </tr>
                              )}
                              {result.outrosDescontos > 0 && (
                                <tr>
                                  <td className="border p-2">Outros Descontos</td>
                                  <td className="border p-2">R$ {result.outrosDescontos.toFixed(2)}</td>
                                  <td className="border p-2">
                                    {((result.outrosDescontos / result.salarioBruto) * 100).toFixed(2)}%
                                  </td>
                                </tr>
                              )}
                              <tr className="font-semibold bg-background/50">
                                <td className="border p-2">Total Descontos</td>
                                <td className="border p-2">
                                  R$ {(result.descontoINSS + result.descontoIRRF + result.outrosDescontos).toFixed(2)}
                                </td>
                                <td className="border p-2">{result.percentualTotal.toFixed(2)}%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Resultado Final</h4>
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-background">
                                <th className="border p-2 text-left">Item</th>
                                <th className="border p-2 text-left">Valor</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border p-2">Salário Bruto</td>
                                <td className="border p-2">R$ {result.salarioBruto.toFixed(2)}</td>
                              </tr>
                              <tr>
                                <td className="border p-2">Total Descontos</td>
                                <td className="border p-2">
                                  R$ {(result.descontoINSS + result.descontoIRRF + result.outrosDescontos).toFixed(2)}
                                </td>
                              </tr>
                              <tr className="font-semibold text-primary bg-background/50">
                                <td className="border p-2">Salário Líquido</td>
                                <td className="border p-2">R$ {result.salarioLiquido.toFixed(2)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {(result.decimoTerceiro || result.ferias) && (
                          <div>
                            <h4 className="font-medium mb-2">Valores Proporcionais</h4>
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-background">
                                  <th className="border p-2 text-left">Item</th>
                                  <th className="border p-2 text-left">Valor Mensal</th>
                                  <th className="border p-2 text-left">Valor Anual</th>
                                </tr>
                              </thead>
                              <tbody>
                                {result.decimoTerceiro && (
                                  <tr>
                                    <td className="border p-2">13º Salário</td>
                                    <td className="border p-2">R$ {result.decimoTerceiro.toFixed(2)}</td>
                                    <td className="border p-2">R$ {(result.decimoTerceiro * 12).toFixed(2)}</td>
                                  </tr>
                                )}
                                {result.ferias && (
                                  <tr>
                                    <td className="border p-2">Férias (com 1/3)</td>
                                    <td className="border p-2">R$ {result.ferias.toFixed(2)}</td>
                                    <td className="border p-2">R$ {(result.ferias * 12).toFixed(2)}</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </CardContent>
        </Card>

        <FuncoesExplicacao tipo="salario" />
      </div>
    </CalculatorLayout>
  )
}
