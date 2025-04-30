"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Droplet, Info } from "lucide-react"
import CalculatorLayout from "@/components/CalculatorLayout"

const formSchema = z.object({
  peso: z.coerce.number().positive("O peso deve ser maior que zero"),
  altura: z.coerce.number().positive("A altura deve ser maior que zero"),
})

export default function AguaCalculatorClient() {
  const [result, setResult] = useState<{
    quantidadeAgua: number
    coposAgua: number
    nivelAtividade: string
    recomendacaoExtra: string
  } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      peso: undefined,
      altura: undefined,
    },
  })

  function calcularQuantidadeAgua(peso: number, altura: number) {
    // Cálculo baseado no peso (30ml por kg)
    const aguaPorPeso = peso * 30

    // Fator de ajuste baseado na altura (pessoas mais altas geralmente precisam de mais água)
    // Altura em cm, considerando altura média de 170cm
    const fatorAltura = altura / 170

    // Quantidade final ajustada
    const quantidadeAgua = Math.round(aguaPorPeso * fatorAltura)

    // Quantidade em copos (considerando copos de 250ml)
    const coposAgua = Math.round(quantidadeAgua / 250)

    // Determinar nível de atividade recomendado
    let nivelAtividade = ""
    let recomendacaoExtra = ""

    if (quantidadeAgua < 2000) {
      nivelAtividade = "leve"
      recomendacaoExtra = "Considere aumentar a ingestão em dias quentes ou durante atividades físicas."
    } else if (quantidadeAgua < 3000) {
      nivelAtividade = "moderado"
      recomendacaoExtra = "Esta quantidade é ideal para a maioria das pessoas com atividade física regular."
    } else {
      nivelAtividade = "intenso"
      recomendacaoExtra = "Ideal para pessoas com atividade física intensa ou que vivem em climas quentes."
    }

    return {
      quantidadeAgua,
      coposAgua,
      nivelAtividade,
      recomendacaoExtra,
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { peso, altura } = values
    const resultado = calcularQuantidadeAgua(peso, altura)
    setResult(resultado)
  }

  return (
    <CalculatorLayout
      title="Calculadora de Água"
      description="Calcule a quantidade ideal de água que você deve beber diariamente com base no seu peso e altura."
    >
      <div className="space-y-6">
        <div className="text-sm text-muted-foreground">
          <p>
            Manter-se hidratado é essencial para a saúde. Esta calculadora estima a quantidade de água que você deve
            consumir diariamente com base no seu peso e altura.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-3">Benefícios da Hidratação Adequada</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-md">
                <h4 className="font-medium mb-2">Saúde Física</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Regula a temperatura corporal</li>
                  <li>Mantém as articulações lubrificadas</li>
                  <li>Previne infecções</li>
                  <li>Melhora a qualidade do sono</li>
                  <li>Auxilia na digestão</li>
                </ul>
              </div>
              <div className="p-4 bg-muted/30 rounded-md">
                <h4 className="font-medium mb-2">Saúde Mental</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Melhora o humor</li>
                  <li>Aumenta a concentração</li>
                  <li>Reduz a fadiga</li>
                  <li>Diminui dores de cabeça</li>
                  <li>Aumenta a disposição</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-primary/5 rounded-md text-sm">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p>
                  A quantidade ideal de água varia de pessoa para pessoa. Fatores como clima, nível de atividade física
                  e condições de saúde podem influenciar suas necessidades diárias. Consulte um profissional de saúde
                  para recomendações personalizadas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="agua-calculator-form">
                <FormField
                  control={form.control}
                  name="peso"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 70" {...field} data-testid="peso-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="altura"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Altura (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 170" {...field} data-testid="altura-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" data-testid="calcular-agua-button">
                  Calcular Ingestão de Água
                </Button>
              </form>
            </Form>

            {result && (
              <div
                className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 shadow-sm"
                data-testid="agua-result-area"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                    <Droplet className="h-8 w-8" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Quantidade diária recomendada</p>
                  <p className="text-4xl font-bold text-blue-600">{result.quantidadeAgua} ml</p>
                  <p className="text-lg mt-1">≈ {result.coposAgua} copos de água</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-3 rounded-md">
                    <p className="text-sm text-muted-foreground">Nível de atividade considerado:</p>
                    <p className="font-semibold capitalize">{result.nivelAtividade}</p>
                  </div>

                  <div className="bg-white p-3 rounded-md">
                    <p className="text-sm text-muted-foreground">Recomendação:</p>
                    <p>{result.recomendacaoExtra}</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-md text-sm">
                    <h4 className="font-medium mb-2">Dicas para manter-se hidratado:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Tenha sempre uma garrafa de água com você</li>
                      <li>Beba um copo de água ao acordar</li>
                      <li>Configure lembretes no celular</li>
                      <li>Adicione frutas à água para dar sabor</li>
                      <li>Consuma alimentos ricos em água (melancia, pepino, etc.)</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  )
}
