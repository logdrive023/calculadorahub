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
import CalculatorLayout from "@/components/CalculatorLayout"
import FuncoesExplicacao from "@/components/FuncoesExplicacao"

const percentOfValueSchema = z.object({
  percent: z.coerce.number().min(0, "A porcentagem deve ser maior ou igual a zero"),
  value: z.coerce.number(),
})

const percentBetweenValuesSchema = z.object({
  value1: z.coerce.number().refine((val) => val !== 0, "O valor não pode ser zero"),
  value2: z.coerce.number(),
})

const increaseDecreaseSchema = z.object({
  originalValue: z.coerce.number().refine((val) => val !== 0, "O valor não pode ser zero"),
  finalValue: z.coerce.number(),
})

export default function PercentageCalculatorClient() {
  const [percentOfValueResult, setPercentOfValueResult] = useState<number | null>(null)
  const [percentBetweenResult, setPercentBetweenResult] = useState<number | null>(null)
  const [increaseDecreaseResult, setIncreaseDecreaseResult] = useState<{
    percentage: number
    isIncrease: boolean
  } | null>(null)

  const percentOfValueForm = useForm<z.infer<typeof percentOfValueSchema>>({
    resolver: zodResolver(percentOfValueSchema),
    defaultValues: {
      percent: undefined,
      value: undefined,
    },
  })

  const percentBetweenForm = useForm<z.infer<typeof percentBetweenValuesSchema>>({
    resolver: zodResolver(percentBetweenValuesSchema),
    defaultValues: {
      value1: undefined,
      value2: undefined,
    },
  })

  const increaseDecreaseForm = useForm<z.infer<typeof increaseDecreaseSchema>>({
    resolver: zodResolver(increaseDecreaseSchema),
    defaultValues: {
      originalValue: undefined,
      finalValue: undefined,
    },
  })

  function calculatePercentOfValue(values: z.infer<typeof percentOfValueSchema>) {
    const { percent, value } = values
    const result = (percent / 100) * value
    setPercentOfValueResult(result)
  }

  function calculatePercentBetween(values: z.infer<typeof percentBetweenValuesSchema>) {
    const { value1, value2 } = values
    const result = (value2 / value1) * 100
    setPercentBetweenResult(result)
  }

  function calculateIncreaseDecrease(values: z.infer<typeof increaseDecreaseSchema>) {
    const { originalValue, finalValue } = values
    const difference = finalValue - originalValue
    const percentage = Math.abs((difference / originalValue) * 100)
    const isIncrease = finalValue > originalValue

    setIncreaseDecreaseResult({ percentage, isIncrease })
  }

  return (
    <CalculatorLayout
      title="Calculadora de Porcentagem"
      description="Calcule porcentagens facilmente com nossa calculadora online."
    >
      <Tabs defaultValue="percentOfValue" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="percentOfValue">X% de Y</TabsTrigger>
          <TabsTrigger value="percentBetween">% entre valores</TabsTrigger>
          <TabsTrigger value="increaseDecrease">Aumento/Redução</TabsTrigger>
        </TabsList>

        <TabsContent value="percentOfValue">
          <Card>
            <CardContent className="pt-6">
              <Form {...percentOfValueForm}>
                <form onSubmit={percentOfValueForm.handleSubmit(calculatePercentOfValue)} className="space-y-4">
                  <FormField
                    control={percentOfValueForm.control}
                    name="percent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Porcentagem (%)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 15" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={percentOfValueForm.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 200" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Calcular
                  </Button>
                </form>
              </Form>

              {percentOfValueResult !== null && (
                <div className="mt-6 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 shadow-sm">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Resultado</p>
                    <p className="text-3xl font-bold text-primary mb-2">{percentOfValueResult.toFixed(2)}</p>
                    <p className="text-sm">
                      <span className="font-medium">{percentOfValueForm.getValues().percent}%</span> de{" "}
                      <span className="font-medium">{percentOfValueForm.getValues().value}</span>
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="percentBetween">
          <Card>
            <CardContent className="pt-6">
              <Form {...percentBetweenForm}>
                <form onSubmit={percentBetweenForm.handleSubmit(calculatePercentBetween)} className="space-y-4">
                  <FormField
                    control={percentBetweenForm.control}
                    name="value1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor 1 (base)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 200" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={percentBetweenForm.control}
                    name="value2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor 2</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 250" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Calcular
                  </Button>
                </form>
              </Form>

              {percentBetweenResult !== null && (
                <div className="mt-6 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 shadow-sm">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Resultado</p>
                    <p className="text-3xl font-bold text-primary mb-2">{percentBetweenResult.toFixed(2)}%</p>
                    <p className="text-sm">
                      <span className="font-medium">{percentBetweenForm.getValues().value2}</span> é{" "}
                      <span className="font-medium">{percentBetweenResult.toFixed(2)}%</span> de{" "}
                      <span className="font-medium">{percentBetweenForm.getValues().value1}</span>
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="increaseDecrease">
          <Card>
            <CardContent className="pt-6">
              <Form {...increaseDecreaseForm}>
                <form onSubmit={increaseDecreaseForm.handleSubmit(calculateIncreaseDecrease)} className="space-y-4">
                  <FormField
                    control={increaseDecreaseForm.control}
                    name="originalValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Original</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={increaseDecreaseForm.control}
                    name="finalValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Final</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 120" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Calcular
                  </Button>
                </form>
              </Form>

              {increaseDecreaseResult !== null && (
                <div className="mt-6 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 shadow-sm">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Resultado</p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-lg font-medium">
                        {increaseDecreaseResult.isIncrease ? "Aumento de" : "Redução de"}
                      </span>
                      <span className="text-3xl font-bold text-primary">
                        {increaseDecreaseResult.percentage.toFixed(2)}%
                      </span>
                    </div>
                    <p className="text-sm">
                      De <span className="font-medium">{increaseDecreaseForm.getValues().originalValue}</span> para{" "}
                      <span className="font-medium">{increaseDecreaseForm.getValues().finalValue}</span>
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <FuncoesExplicacao tipo="porcentagem" />
    </CalculatorLayout>
  )
}
