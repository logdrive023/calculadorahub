"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CalculatorLayout from "@/components/CalculatorLayout"
import { Clock, CalendarClock, TimerReset, AlarmClockIcon as Alarm } from "lucide-react"

// Função para converter horas:minutos em minutos
function converterParaMinutos(horas: string): number {
  const [h, m] = horas.split(":").map(Number)
  return h * 60 + m
}

// Função para converter minutos em formato horas:minutos
function converterParaHorasMinutos(minutos: number): string {
  const h = Math.floor(minutos / 60)
  const m = minutos % 60
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
}

// Substituir a função de validação de formato de hora atual por esta versão atualizada
// que aceita horas maiores que 24 para o banco de horas

// Função para validar formato de hora (HH:MM)
const validarFormatoHora = (valor: string) => {
  return /^([0-9]{1,3}):[0-5][0-9]$/.test(valor)
}

// Schema para cálculo de horas diárias
const horasDiariasSchema = z.object({
  horaEntrada: z.string().refine(validarFormatoHora, {
    message: "Formato inválido. Use HH:MM (ex: 08:00)",
  }),
  horaSaida: z.string().refine(validarFormatoHora, {
    message: "Formato inválido. Use HH:MM (ex: 17:00)",
  }),
  intervalo: z.string().refine(validarFormatoHora, {
    message: "Formato inválido. Use HH:MM (ex: 01:00)",
  }),
})

// Schema para cálculo de banco de horas
const bancoHorasSchema = z.object({
  horasTrabalhadas: z.string().refine(validarFormatoHora, {
    message: "Formato inválido. Use HH:MM (ex: 08:00)",
  }),
  horasContrato: z.string().refine(validarFormatoHora, {
    message: "Formato inválido. Use HH:MM (ex: 08:00)",
  }),
  diasTrabalhados: z.coerce.number().int().min(1, "Mínimo de 1 dia").max(31, "Máximo de 31 dias"),
})

// Schema para cálculo de horas semanais
const horasSemanaisSchema = z.object({
  horasDiarias: z.string().refine(validarFormatoHora, {
    message: "Formato inválido. Use HH:MM (ex: 08:00)",
  }),
  diasPorSemana: z.coerce.number().int().min(1, "Mínimo de 1 dia").max(7, "Máximo de 7 dias"),
})

// Schema para conversão de horas
const conversaoHorasSchema = z.object({
  horas: z.string().refine(validarFormatoHora, {
    message: "Formato inválido. Use HH:MM (ex: 08:00)",
  }),
  tipoConversao: z.enum(["decimal", "minutos"]),
})

export default function HorasTrabalhadasCalculatorClient() {
  const [resultadoDiario, setResultadoDiario] = useState<{
    horasTrabalhadas: string
    minutosTrabalhadosTotal: number
  } | null>(null)

  const [resultadoBanco, setResultadoBanco] = useState<{
    saldoHoras: string
    saldoMinutos: number
    status: "positivo" | "negativo" | "neutro"
  } | null>(null)

  const [resultadoSemanal, setResultadoSemanal] = useState<{
    horasSemanais: string
    horasMensais: string
  } | null>(null)

  const [resultadoConversao, setResultadoConversao] = useState<{
    valorDecimal: number
    valorMinutos: number
  } | null>(null)

  const horasDiariasForm = useForm<z.infer<typeof horasDiariasSchema>>({
    resolver: zodResolver(horasDiariasSchema),
    defaultValues: {
      horaEntrada: "08:00",
      horaSaida: "17:00",
      intervalo: "01:00",
    },
  })

  const bancoHorasForm = useForm<z.infer<typeof bancoHorasSchema>>({
    resolver: zodResolver(bancoHorasSchema),
    defaultValues: {
      horasTrabalhadas: "40:00",
      horasContrato: "44:00",
      diasTrabalhados: 20,
    },
  })

  const horasSemanaisForm = useForm<z.infer<typeof horasSemanaisSchema>>({
    resolver: zodResolver(horasSemanaisSchema),
    defaultValues: {
      horasDiarias: "08:00",
      diasPorSemana: 5,
    },
  })

  const conversaoHorasForm = useForm<z.infer<typeof conversaoHorasSchema>>({
    resolver: zodResolver(conversaoHorasSchema),
    defaultValues: {
      horas: "08:00",
      tipoConversao: "decimal",
    },
  })

  function calcularHorasDiarias(values: z.infer<typeof horasDiariasSchema>) {
    const { horaEntrada, horaSaida, intervalo } = values

    // Converter para minutos
    const entradaMinutos = converterParaMinutos(horaEntrada)
    const saidaMinutos = converterParaMinutos(horaSaida)
    const intervaloMinutos = converterParaMinutos(intervalo)

    // Calcular minutos trabalhados
    let minutosTrabalhadosTotal
    if (saidaMinutos > entradaMinutos) {
      minutosTrabalhadosTotal = saidaMinutos - entradaMinutos - intervaloMinutos
    } else {
      // Caso a saída seja no dia seguinte
      minutosTrabalhadosTotal = 24 * 60 - entradaMinutos + saidaMinutos - intervaloMinutos
    }

    // Garantir que não seja negativo
    minutosTrabalhadosTotal = Math.max(0, minutosTrabalhadosTotal)

    // Converter de volta para formato HH:MM
    const horasTrabalhadas = converterParaHorasMinutos(minutosTrabalhadosTotal)

    setResultadoDiario({ horasTrabalhadas, minutosTrabalhadosTotal })
  }

  function calcularBancoHoras(values: z.infer<typeof bancoHorasSchema>) {
    const { horasTrabalhadas, horasContrato, diasTrabalhados } = values

    // Converter para minutos
    const trabalhadosMinutos = converterParaMinutos(horasTrabalhadas)
    const contratoMinutos = converterParaMinutos(horasContrato)

    // Calcular saldo (positivo = horas extras, negativo = horas devidas)
    const saldoMinutos = trabalhadosMinutos - (contratoMinutos / 30) * diasTrabalhados

    // Determinar status
    let status: "positivo" | "negativo" | "neutro" = "neutro"
    if (saldoMinutos > 0) status = "positivo"
    else if (saldoMinutos < 0) status = "negativo"

    // Converter para formato HH:MM (considerando valores negativos)
    const saldoAbsoluto = Math.abs(saldoMinutos)
    const saldoFormatado = converterParaHorasMinutos(saldoAbsoluto)
    const saldoHoras = saldoMinutos < 0 ? `-${saldoFormatado}` : saldoFormatado

    setResultadoBanco({ saldoHoras, saldoMinutos, status })
  }

  function calcularHorasSemanais(values: z.infer<typeof horasSemanaisSchema>) {
    const { horasDiarias, diasPorSemana } = values

    // Converter para minutos
    const minutosdiarios = converterParaMinutos(horasDiarias)

    // Calcular horas semanais e mensais
    const minutosSemanais = minutosdiarios * diasPorSemana
    const minutosMensais = minutosSemanais * 4.345 // Média de semanas por mês

    // Converter para formato HH:MM
    const horasSemanais = converterParaHorasMinutos(minutosSemanais)
    const horasMensais = converterParaHorasMinutos(Math.round(minutosMensais))

    setResultadoSemanal({ horasSemanais, horasMensais })
  }

  function converterHoras(values: z.infer<typeof conversaoHorasSchema>) {
    const { horas } = values

    // Converter para minutos
    const minutos = converterParaMinutos(horas)

    // Calcular valor decimal (horas + fração de hora)
    const valorDecimal = Math.floor(minutos / 60) + (minutos % 60) / 60

    setResultadoConversao({ valorDecimal, valorMinutos: minutos })
  }

  return (
    <CalculatorLayout
      title="Calculadora de Horas Trabalhadas"
      description="Calcule horas trabalhadas, banco de horas e jornada de trabalho."
    >
      <Tabs defaultValue="diario" className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-6">
          <TabsTrigger value="diario">Horas Diárias</TabsTrigger>
          <TabsTrigger value="banco">Banco de Horas</TabsTrigger>
          <TabsTrigger value="semanal">Jornada Semanal</TabsTrigger>
          <TabsTrigger value="conversao">Conversão</TabsTrigger>
        </TabsList>

        <TabsContent value="diario">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Clock className="h-5 w-5" />
                <h3 className="text-lg font-medium">Cálculo de Horas Diárias</h3>
              </div>

              <Form {...horasDiariasForm}>
                <form onSubmit={horasDiariasForm.handleSubmit(calcularHorasDiarias)} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <FormField
                      control={horasDiariasForm.control}
                      name="horaEntrada"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hora de Entrada</FormLabel>
                          <FormControl>
                            <Input placeholder="08:00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={horasDiariasForm.control}
                      name="horaSaida"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hora de Saída</FormLabel>
                          <FormControl>
                            <Input placeholder="17:00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={horasDiariasForm.control}
                      name="intervalo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Intervalo (hh:mm)</FormLabel>
                          <FormControl>
                            <Input placeholder="01:00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Calcular Horas Trabalhadas
                  </Button>
                </form>
              </Form>

              {resultadoDiario && (
                <div className="mt-6 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 shadow-sm">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Total de Horas Trabalhadas</p>
                    <p className="text-3xl font-bold text-primary mb-2">{resultadoDiario.horasTrabalhadas}</p>
                    <p className="text-sm text-muted-foreground">
                      Equivalente a {Math.floor(resultadoDiario.minutosTrabalhadosTotal / 60)} horas e{" "}
                      {resultadoDiario.minutosTrabalhadosTotal % 60} minutos
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banco">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <CalendarClock className="h-5 w-5" />
                <h3 className="text-lg font-medium">Cálculo de Banco de Horas</h3>
              </div>

              <Form {...bancoHorasForm}>
                <form onSubmit={bancoHorasForm.handleSubmit(calcularBancoHoras)} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <FormField
                      control={bancoHorasForm.control}
                      name="horasTrabalhadas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Horas Trabalhadas</FormLabel>
                          <FormControl>
                            <Input placeholder="40:00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={bancoHorasForm.control}
                      name="horasContrato"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Horas Contratadas</FormLabel>
                          <FormControl>
                            <Input placeholder="44:00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={bancoHorasForm.control}
                      name="diasTrabalhados"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dias Trabalhados</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Calcular Banco de Horas
                  </Button>
                </form>
              </Form>

              {resultadoBanco && (
                <div className="mt-6 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 shadow-sm">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Saldo do Banco de Horas</p>
                    <p
                      className={`text-3xl font-bold mb-2 ${
                        resultadoBanco.status === "positivo"
                          ? "text-green-600"
                          : resultadoBanco.status === "negativo"
                            ? "text-red-600"
                            : "text-primary"
                      }`}
                    >
                      {resultadoBanco.status === "positivo" ? "+" : ""}
                      {resultadoBanco.saldoHoras}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {resultadoBanco.status === "positivo"
                        ? "Horas extras acumuladas"
                        : resultadoBanco.status === "negativo"
                          ? "Horas a compensar"
                          : "Sem horas extras ou a compensar"}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="semanal">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <TimerReset className="h-5 w-5" />
                <h3 className="text-lg font-medium">Cálculo de Jornada Semanal</h3>
              </div>

              <Form {...horasSemanaisForm}>
                <form onSubmit={horasSemanaisForm.handleSubmit(calcularHorasSemanais)} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={horasSemanaisForm.control}
                      name="horasDiarias"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Horas Diárias</FormLabel>
                          <FormControl>
                            <Input placeholder="08:00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={horasSemanaisForm.control}
                      name="diasPorSemana"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dias por Semana</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Calcular Jornada
                  </Button>
                </form>
              </Form>

              {resultadoSemanal && (
                <div className="mt-6 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 shadow-sm">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Jornada Semanal</p>
                      <p className="text-3xl font-bold text-primary mb-2">{resultadoSemanal.horasSemanais}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Jornada Mensal</p>
                      <p className="text-3xl font-bold text-primary mb-2">{resultadoSemanal.horasMensais}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversao">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Alarm className="h-5 w-5" />
                <h3 className="text-lg font-medium">Conversão de Horas</h3>
              </div>

              <Form {...conversaoHorasForm}>
                <form onSubmit={conversaoHorasForm.handleSubmit(converterHoras)} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={conversaoHorasForm.control}
                      name="horas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Horas (hh:mm)</FormLabel>
                          <FormControl>
                            <Input placeholder="08:00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={conversaoHorasForm.control}
                      name="tipoConversao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Conversão</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="decimal">Para Decimal</SelectItem>
                              <SelectItem value="minutos">Para Minutos</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Converter
                  </Button>
                </form>
              </Form>

              {resultadoConversao && (
                <div className="mt-6 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 shadow-sm">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Formato Decimal</p>
                      <p className="text-3xl font-bold text-primary mb-2">
                        {resultadoConversao.valorDecimal.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Total em Minutos</p>
                      <p className="text-3xl font-bold text-primary mb-2">{resultadoConversao.valorMinutos}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-sm text-muted-foreground">
        <h3 className="font-semibold mb-2">Como usar a calculadora de horas trabalhadas:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Horas Diárias:</strong> Calcule o total de horas trabalhadas em um dia, considerando o intervalo.
          </li>
          <li>
            <strong>Banco de Horas:</strong> Compare as horas trabalhadas com as horas contratadas para calcular o
            saldo.
          </li>
          <li>
            <strong>Jornada Semanal:</strong> Calcule a carga horária semanal e mensal com base nas horas diárias.
          </li>
          <li>
            <strong>Conversão:</strong> Converta entre diferentes formatos de horas (HH:MM, decimal, minutos).
          </li>
        </ul>
      </div>
    </CalculatorLayout>
  )
}
