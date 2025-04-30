"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import CalculatorLayout from "@/components/CalculatorLayout"
import FuncoesExplicacao from "@/components/FuncoesExplicacao"

const formSchema = z.object({
  a: z.coerce.number().refine((val) => val !== 0, "O valor não pode ser zero"),
  b: z.coerce.number(),
  c: z.coerce.number().refine((val) => val !== 0, "O valor não pode ser zero"),
  d: z.string().optional(),
})

export default function Ruleof3CalculatorClient() {
  const [result, setResult] = useState<number | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      a: undefined,
      b: undefined,
      c: undefined,
      d: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { a, b, c } = values
    // Regra de três: a está para b assim como c está para x
    // a : b = c : x
    // x = (b * c) / a
    const x = (b * c) / a
    setResult(x)
  }

  return (
    <CalculatorLayout
      title="Calculadora de Regra de Três"
      description="Resolva problemas de proporção com nossa calculadora de regra de três simples."
    >
      <div className="space-y-6">
        <div className="text-sm text-muted-foreground">
          <p>
            A regra de três é um método simples para encontrar um valor desconhecido em uma proporção. Se A está para B
            assim como C está para D, então D = (B × C) ÷ A.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="a"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor A</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="b"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor B</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="c"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor C</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ex: 15" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="d"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor X (resultado)</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            disabled
                            className="bg-muted"
                            value={result !== null ? result.toFixed(2) : ""}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Calcular X
                </Button>
              </form>
            </Form>

            {result !== null && (
              <div className="mt-6 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 shadow-sm">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Resultado</p>
                  <p className="text-3xl font-bold text-primary mb-2">{result.toFixed(2)}</p>
                  <p className="text-sm">
                    Se <span className="font-medium">{form.getValues().a}</span> está para{" "}
                    <span className="font-medium">{form.getValues().b}</span>, então{" "}
                    <span className="font-medium">{form.getValues().c}</span> está para{" "}
                    <span className="font-medium">{result.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Como usar a regra de três?</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Identifique os valores conhecidos (A, B e C)</li>
            <li>Coloque-os na calculadora</li>
            <li>Clique em "Calcular X" para encontrar o valor desconhecido</li>
          </ol>
        </div>

        <FuncoesExplicacao tipo="regra-de-tres" />
      </div>
    </CalculatorLayout>
  )
}
