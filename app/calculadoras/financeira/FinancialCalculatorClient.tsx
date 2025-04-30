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
import FuncoesExplicacao from "@/components/FuncoesExplicacao"

const simpleInterestSchema = z.object({
  principal: z.coerce.number().positive("O valor deve ser positivo"),
  rate: z.coerce.number().positive("A taxa deve ser positiva"),
  time: z.coerce.number().positive("O tempo deve ser positivo"),
  timeUnit: z.enum(["months", "years"]),
})

const compoundInterestSchema = z.object({
  principal: z.coerce.number().positive("O valor deve ser positivo"),
  rate: z.coerce.number().positive("A taxa deve ser positiva"),
  time: z.coerce.number().positive("O tempo deve ser positivo"),
  timeUnit: z.enum(["months", "years"]),
  compoundFrequency: z.enum(["monthly", "quarterly", "semiannually", "annually"]),
})

const loanSchema = z.object({
  loanAmount: z.coerce.number().positive("O valor deve ser positivo"),
  interestRate: z.coerce.number().positive("A taxa deve ser positiva"),
  loanTerm: z.coerce.number().positive("O prazo deve ser positivo"),
  termUnit: z.enum(["months", "years"]),
})

export default function FinancialCalculatorClient() {
  const [simpleInterestResult, setSimpleInterestResult] = useState<{
    interest: number
    total: number
  } | null>(null)

  const [compoundInterestResult, setCompoundInterestResult] = useState<{
    interest: number
    total: number
    yearlyBreakdown: Array<{
      year: number
      interest: number
      balance: number
    }>
  } | null>(null)

  const [loanResult, setLoanResult] = useState<{
    monthlyPayment: number
    totalPayment: number
    totalInterest: number
    amortizationSchedule: Array<{
      payment: number
      principal: number
      interest: number
      balance: number
    }>
  } | null>(null)

  const simpleInterestForm = useForm<z.infer<typeof simpleInterestSchema>>({
    resolver: zodResolver(simpleInterestSchema),
    defaultValues: {
      principal: undefined,
      rate: undefined,
      time: undefined,
      timeUnit: "years",
    },
  })

  const compoundInterestForm = useForm<z.infer<typeof compoundInterestSchema>>({
    resolver: zodResolver(compoundInterestSchema),
    defaultValues: {
      principal: undefined,
      rate: undefined,
      time: undefined,
      timeUnit: "years",
      compoundFrequency: "monthly",
    },
  })

  const loanForm = useForm<z.infer<typeof loanSchema>>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      loanAmount: undefined,
      interestRate: undefined,
      loanTerm: undefined,
      termUnit: "months",
    },
  })

  function calculateSimpleInterest(values: z.infer<typeof simpleInterestSchema>) {
    const { principal, rate, time, timeUnit } = values

    // Convert time to years if needed
    const timeInYears = timeUnit === "months" ? time / 12 : time

    // Calculate simple interest (P * r * t)
    const interest = principal * (rate / 100) * timeInYears
    const total = principal + interest

    setSimpleInterestResult({ interest, total })
  }

  function calculateCompoundInterest(values: z.infer<typeof compoundInterestSchema>) {
    const { principal, rate, time, timeUnit, compoundFrequency } = values

    // Convert time to years if needed
    const timeInYears = timeUnit === "months" ? time / 12 : time

    // Determine number of compounds per year
    let compoundsPerYear = 1
    switch (compoundFrequency) {
      case "monthly":
        compoundsPerYear = 12
        break
      case "quarterly":
        compoundsPerYear = 4
        break
      case "semiannually":
        compoundsPerYear = 2
        break
      case "annually":
        compoundsPerYear = 1
        break
    }

    // Calculate compound interest: A = P(1 + r/n)^(nt)
    const total = principal * Math.pow(1 + rate / 100 / compoundsPerYear, compoundsPerYear * timeInYears)
    const interest = total - principal

    // Generate yearly breakdown
    const yearlyBreakdown = []
    for (let year = 1; year <= Math.ceil(timeInYears); year++) {
      if (year > timeInYears) break

      const yearBalance = principal * Math.pow(1 + rate / 100 / compoundsPerYear, compoundsPerYear * year)
      const yearInterest = yearBalance - principal

      yearlyBreakdown.push({
        year,
        interest: yearInterest,
        balance: yearBalance,
      })
    }

    setCompoundInterestResult({ interest, total, yearlyBreakdown })
  }

  function calculateLoan(values: z.infer<typeof loanSchema>) {
    const { loanAmount, interestRate, loanTerm, termUnit } = values

    // Convert term to months if needed
    const termInMonths = termUnit === "years" ? loanTerm * 12 : loanTerm

    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12

    // Calculate monthly payment: P = L[r(1+r)^n]/[(1+r)^n-1]
    const monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termInMonths))) /
      (Math.pow(1 + monthlyRate, termInMonths) - 1)

    const totalPayment = monthlyPayment * termInMonths
    const totalInterest = totalPayment - loanAmount

    // Generate amortization schedule
    const amortizationSchedule = []
    let remainingBalance = loanAmount

    for (let payment = 1; payment <= Math.min(termInMonths, 12); payment++) {
      const interestPayment = remainingBalance * monthlyRate
      const principalPayment = monthlyPayment - interestPayment
      remainingBalance -= principalPayment

      amortizationSchedule.push({
        payment,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance,
      })
    }

    setLoanResult({ monthlyPayment, totalPayment, totalInterest, amortizationSchedule })
  }

  return (
    <CalculatorLayout
      title="Calculadora Financeira"
      description="Calcule juros simples, compostos, parcelas de empréstimos e planeje seus investimentos."
    >
      <Tabs defaultValue="simpleInterest" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="simpleInterest">Juros Simples</TabsTrigger>
          <TabsTrigger value="compoundInterest">Juros Compostos</TabsTrigger>
          <TabsTrigger value="loan">Empréstimos</TabsTrigger>
        </TabsList>

        <TabsContent value="simpleInterest">
          <Card>
            <CardContent className="pt-6">
              <Form {...simpleInterestForm}>
                <form onSubmit={simpleInterestForm.handleSubmit(calculateSimpleInterest)} className="space-y-4">
                  <FormField
                    control={simpleInterestForm.control}
                    name="principal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capital Inicial (R$)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 1000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={simpleInterestForm.control}
                    name="rate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taxa de Juros (% ao ano)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={simpleInterestForm.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tempo</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Ex: 2" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={simpleInterestForm.control}
                      name="timeUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unidade</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="years">Anos</SelectItem>
                              <SelectItem value="months">Meses</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Calcular
                  </Button>
                </form>
              </Form>

              {simpleInterestResult && (
                <div className="mt-6 p-4 bg-muted rounded-md">
                  <h3 className="font-semibold mb-2">Resultado:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Juros:</p>
                      <p className="font-semibold">R$ {simpleInterestResult.interest.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Montante Total:</p>
                      <p className="font-semibold">R$ {simpleInterestResult.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compoundInterest">
          <Card>
            <CardContent className="pt-6">
              <Form {...compoundInterestForm}>
                <form onSubmit={compoundInterestForm.handleSubmit(calculateCompoundInterest)} className="space-y-4">
                  <FormField
                    control={compoundInterestForm.control}
                    name="principal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capital Inicial (R$)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 1000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={compoundInterestForm.control}
                    name="rate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taxa de Juros (% ao ano)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={compoundInterestForm.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tempo</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Ex: 2" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={compoundInterestForm.control}
                      name="timeUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unidade</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="years">Anos</SelectItem>
                              <SelectItem value="months">Meses</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={compoundInterestForm.control}
                    name="compoundFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frequência de Capitalização</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="monthly">Mensal</SelectItem>
                            <SelectItem value="quarterly">Trimestral</SelectItem>
                            <SelectItem value="semiannually">Semestral</SelectItem>
                            <SelectItem value="annually">Anual</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Calcular
                  </Button>
                </form>
              </Form>

              {compoundInterestResult && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-muted rounded-md">
                    <h3 className="font-semibold mb-2">Resultado:</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Juros:</p>
                        <p className="font-semibold">R$ {compoundInterestResult.interest.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Montante Total:</p>
                        <p className="font-semibold">R$ {compoundInterestResult.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {compoundInterestResult.yearlyBreakdown.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Evolução Anual:</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-muted">
                              <th className="border p-2 text-left">Ano</th>
                              <th className="border p-2 text-left">Juros Acumulados</th>
                              <th className="border p-2 text-left">Saldo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {compoundInterestResult.yearlyBreakdown.map((year) => (
                              <tr key={year.year}>
                                <td className="border p-2">{year.year}</td>
                                <td className="border p-2">R$ {year.interest.toFixed(2)}</td>
                                <td className="border p-2">R$ {year.balance.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loan">
          <Card>
            <CardContent className="pt-6">
              <Form {...loanForm}>
                <form onSubmit={loanForm.handleSubmit(calculateLoan)} className="space-y-4">
                  <FormField
                    control={loanForm.control}
                    name="loanAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor do Empréstimo (R$)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 10000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loanForm.control}
                    name="interestRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taxa de Juros (% ao ano)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={loanForm.control}
                      name="loanTerm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prazo</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Ex: 36" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loanForm.control}
                      name="termUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unidade</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="months">Meses</SelectItem>
                              <SelectItem value="years">Anos</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Calcular
                  </Button>
                </form>
              </Form>

              {loanResult && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-muted rounded-md">
                    <h3 className="font-semibold mb-2">Resultado:</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Parcela Mensal:</p>
                        <p className="font-semibold">R$ {loanResult.monthlyPayment.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total de Juros:</p>
                        <p className="font-semibold">R$ {loanResult.totalInterest.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total a Pagar:</p>
                        <p className="font-semibold">R$ {loanResult.totalPayment.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {loanResult.amortizationSchedule.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Primeiras Parcelas:</h3>
                      <div className="overflow-x-auto -mx-4 sm:mx-0">
                        <div className="min-w-full inline-block align-middle">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-muted">
                                <th className="border p-2 text-left">Parcela</th>
                                <th className="border p-2 text-left">Principal</th>
                                <th className="border p-2 text-left">Juros</th>
                                <th className="border p-2 text-left">Saldo Devedor</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loanResult.amortizationSchedule.map((payment) => (
                                <tr key={payment.payment}>
                                  <td className="border p-2">{payment.payment}</td>
                                  <td className="border p-2">R$ {payment.principal.toFixed(2)}</td>
                                  <td className="border p-2">R$ {payment.interest.toFixed(2)}</td>
                                  <td className="border p-2">R$ {payment.balance.toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <FuncoesExplicacao tipo="financeira" />
    </CalculatorLayout>
  )
}
