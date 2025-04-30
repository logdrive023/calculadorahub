"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CalculatorLayout from "@/components/CalculatorLayout"
import FuncoesExplicacao from "@/components/FuncoesExplicacao"

const formSchema = z.object({
  weight: z.coerce.number().positive("O peso deve ser maior que zero"),
  height: z.coerce.number().positive("A altura deve ser maior que zero"),
})

export default function IMCCalculatorClient() {
  const [result, setResult] = useState<{
    imc: number
    classification: string
    color: string
  } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: undefined,
      height: undefined,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { weight, height } = values
    const heightInMeters = height / 100
    const imc = weight / (heightInMeters * heightInMeters)

    let classification = ""
    let color = ""

    if (imc < 18.5) {
      classification = "Abaixo do peso"
      color = "bg-blue-100 border-blue-500 text-blue-700"
    } else if (imc < 25) {
      classification = "Peso normal"
      color = "bg-green-100 border-green-500 text-green-700"
    } else if (imc < 30) {
      classification = "Sobrepeso"
      color = "bg-yellow-100 border-yellow-500 text-yellow-700"
    } else if (imc < 35) {
      classification = "Obesidade Grau I"
      color = "bg-orange-100 border-orange-500 text-orange-700"
    } else if (imc < 40) {
      classification = "Obesidade Grau II"
      color = "bg-red-100 border-red-500 text-red-700"
    } else {
      classification = "Obesidade Grau III"
      color = "bg-red-200 border-red-700 text-red-900"
    }

    setResult({ imc, classification, color })
  }

  return (
    <CalculatorLayout
      title="Calculadora de IMC"
      description="Calcule seu Índice de Massa Corporal e descubra se seu peso está adequado para sua altura."
    >
      <div className="space-y-6">
        <div className="text-sm text-muted-foreground">
          <p>
            O Índice de Massa Corporal (IMC) é uma medida internacional usada para calcular se uma pessoa está no peso
            ideal.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="imc-calculator-form">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peso (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 70"
                      {...field}
                      data-testid="imc-weight-input"
                      aria-describedby="weight-description"
                    />
                  </FormControl>
                  <div id="weight-description" className="sr-only">
                    Insira seu peso em quilogramas
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Altura (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 170"
                      {...field}
                      data-testid="imc-height-input"
                      aria-describedby="height-description"
                    />
                  </FormControl>
                  <div id="height-description" className="sr-only">
                    Insira sua altura em centímetros
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" data-testid="imc-calculate-button">
              Calcular IMC
            </Button>
          </form>
        </Form>

        {result && (
          <div className="mt-6 space-y-4" data-testid="imc-result-area" aria-live="polite">
            <div className={`p-6 rounded-lg border shadow-sm ${result.color}`}>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Seu IMC é</p>
                <p className="text-3xl font-bold mb-2">{result.imc.toFixed(1)}</p>
                <p className="text-lg font-medium">{result.classification}</p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Tabela de Classificação do IMC</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-2 text-left">IMC</th>
                      <th className="border p-2 text-left">Classificação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={result.imc < 18.5 ? "bg-blue-50" : ""}>
                      <td className="border p-2">Menor que 18,5</td>
                      <td className="border p-2">Abaixo do peso</td>
                    </tr>
                    <tr className={result.imc >= 18.5 && result.imc < 25 ? "bg-green-50" : ""}>
                      <td className="border p-2">Entre 18,5 e 24,9</td>
                      <td className="border p-2">Peso normal</td>
                    </tr>
                    <tr className={result.imc >= 25 && result.imc < 30 ? "bg-yellow-50" : ""}>
                      <td className="border p-2">Entre 25 e 29,9</td>
                      <td className="border p-2">Sobrepeso</td>
                    </tr>
                    <tr className={result.imc >= 30 && result.imc < 35 ? "bg-orange-50" : ""}>
                      <td className="border p-2">Entre 30 e 34,9</td>
                      <td className="border p-2">Obesidade Grau I</td>
                    </tr>
                    <tr className={result.imc >= 35 && result.imc < 40 ? "bg-red-50" : ""}>
                      <td className="border p-2">Entre 35 e 39,9</td>
                      <td className="border p-2">Obesidade Grau II</td>
                    </tr>
                    <tr className={result.imc >= 40 ? "bg-red-100" : ""}>
                      <td className="border p-2">Maior que 40</td>
                      <td className="border p-2">Obesidade Grau III</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <FuncoesExplicacao tipo="imc" />
      </div>
    </CalculatorLayout>
  )
}
