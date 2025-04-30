"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import CalculatorLayout from "@/components/CalculatorLayout"
import FuncoesExplicacao from "@/components/FuncoesExplicacao"

export default function ScientificCalculatorClient() {
  const [display, setDisplay] = useState("0")
  const [memory, setMemory] = useState<number | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(true)
  const [pendingOperator, setPendingOperator] = useState<string | null>(null)
  const [lastValue, setLastValue] = useState<number | null>(null)
  const [isRadians, setIsRadians] = useState(true)

  const clearAll = () => {
    setDisplay("0")
    setWaitingForOperand(true)
    setPendingOperator(null)
    setLastValue(null)
  }

  const clearDisplay = () => {
    setDisplay("0")
    setWaitingForOperand(true)
  }

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const inputPercent = () => {
    const value = Number.parseFloat(display)
    setDisplay(String(value / 100))
  }

  const changeSign = () => {
    const value = Number.parseFloat(display)
    setDisplay(String(-value))
  }

  const performOperation = (operator: string) => {
    const operand = Number.parseFloat(display)

    if (lastValue === null) {
      setLastValue(operand)
    } else if (pendingOperator) {
      const result = calculate(lastValue, operand, pendingOperator)
      setLastValue(result)
      setDisplay(String(result))
    }

    setWaitingForOperand(true)
    setPendingOperator(operator)
  }

  const calculate = (leftOperand: number, rightOperand: number, operator: string): number => {
    switch (operator) {
      case "+":
        return leftOperand + rightOperand
      case "-":
        return leftOperand - rightOperand
      case "×":
        return leftOperand * rightOperand
      case "÷":
        return leftOperand / rightOperand
      case "^":
        return Math.pow(leftOperand, rightOperand)
      default:
        return rightOperand
    }
  }

  const performEquals = () => {
    const operand = Number.parseFloat(display)

    if (lastValue !== null && pendingOperator) {
      const result = calculate(lastValue, operand, pendingOperator)
      setDisplay(String(result))
      setLastValue(null)
      setPendingOperator(null)
    }

    setWaitingForOperand(true)
  }

  const performSqrt = () => {
    const operand = Number.parseFloat(display)
    const result = Math.sqrt(operand)
    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const performSquare = () => {
    const operand = Number.parseFloat(display)
    const result = operand * operand
    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const performInverse = () => {
    const operand = Number.parseFloat(display)
    const result = 1 / operand
    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const performSin = () => {
    const operand = Number.parseFloat(display)
    const radians = isRadians ? operand : (operand * Math.PI) / 180
    const result = Math.sin(radians)
    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const performCos = () => {
    const operand = Number.parseFloat(display)
    const radians = isRadians ? operand : (operand * Math.PI) / 180
    const result = Math.cos(radians)
    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const performTan = () => {
    const operand = Number.parseFloat(display)
    const radians = isRadians ? operand : (operand * Math.PI) / 180
    const result = Math.tan(radians)
    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const performLog = () => {
    const operand = Number.parseFloat(display)
    const result = Math.log10(operand)
    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const performLn = () => {
    const operand = Number.parseFloat(display)
    const result = Math.log(operand)
    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const performPi = () => {
    setDisplay(String(Math.PI))
    setWaitingForOperand(true)
  }

  const performE = () => {
    setDisplay(String(Math.E))
    setWaitingForOperand(true)
  }

  const memoryStore = () => {
    setMemory(Number.parseFloat(display))
    setWaitingForOperand(true)
  }

  const memoryRecall = () => {
    if (memory !== null) {
      setDisplay(String(memory))
      setWaitingForOperand(false)
    }
  }

  const memoryClear = () => {
    setMemory(null)
    setWaitingForOperand(true)
  }

  const memoryAdd = () => {
    if (memory !== null) {
      setMemory(memory + Number.parseFloat(display))
    } else {
      setMemory(Number.parseFloat(display))
    }
    setWaitingForOperand(true)
  }

  const memorySubtract = () => {
    if (memory !== null) {
      setMemory(memory - Number.parseFloat(display))
    } else {
      setMemory(-Number.parseFloat(display))
    }
    setWaitingForOperand(true)
  }

  const toggleAngleMode = () => {
    setIsRadians(!isRadians)
  }

  const buttonClass =
    "h-12 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  const digitButtonClass = `${buttonClass} bg-background hover:bg-accent`
  const operatorButtonClass = `${buttonClass} bg-muted hover:bg-muted/80`
  const functionButtonClass = `${buttonClass} bg-primary/10 hover:bg-primary/20 text-primary`
  const equalsButtonClass = `${buttonClass} bg-primary text-primary-foreground hover:bg-primary/90`

  return (
    <CalculatorLayout
      title="Calculadora Científica"
      description="Calculadora científica online com funções trigonométricas, logaritmos, potências e mais."
    >
      <div className="max-w-md mx-auto">
        <div className="mb-4 p-4 bg-muted/30 border rounded-md text-right" aria-live="polite" aria-atomic="true">
          <div className="text-xs text-muted-foreground mb-1">
            {memory !== null ? `M: ${memory}` : ""}
            {pendingOperator ? ` ${lastValue} ${pendingOperator}` : ""}
            {isRadians ? " RAD" : " DEG"}
          </div>
          <div className="text-3xl font-mono truncate" aria-label={`Valor atual: ${display}`}>
            {display}
          </div>
        </div>

        <div
          className="grid grid-cols-4 sm:grid-cols-5 gap-1"
          role="group"
          aria-label="Teclado da calculadora científica"
        >
          {/* Row 1 */}
          <Button
            variant="outline"
            className={functionButtonClass}
            onClick={toggleAngleMode}
            aria-label={`Alternar para ${isRadians ? "graus" : "radianos"}`}
          >
            {isRadians ? "RAD" : "DEG"}
          </Button>
          <Button
            variant="outline"
            className={functionButtonClass}
            onClick={memoryStore}
            aria-label="Armazenar na memória"
          >
            MS
          </Button>
          <Button
            variant="outline"
            className={functionButtonClass}
            onClick={memoryRecall}
            aria-label="Recuperar da memória"
          >
            MR
          </Button>
          <Button variant="outline" className={functionButtonClass} onClick={memoryClear} aria-label="Limpar memória">
            MC
          </Button>
          <Button variant="outline" className={operatorButtonClass} onClick={clearAll} aria-label="Limpar tudo">
            AC
          </Button>

          {/* Row 2 */}
          <Button variant="outline" className={functionButtonClass} onClick={performSin} aria-label="Seno">
            sin
          </Button>
          <Button variant="outline" className={functionButtonClass} onClick={performCos} aria-label="Cosseno">
            cos
          </Button>
          <Button variant="outline" className={functionButtonClass} onClick={performTan} aria-label="Tangente">
            tan
          </Button>
          <Button variant="outline" className={functionButtonClass} onClick={performPi} aria-label="Pi">
            π
          </Button>
          <Button variant="outline" className={operatorButtonClass} onClick={clearDisplay} aria-label="Limpar">
            C
          </Button>

          {/* Row 3 */}
          <Button variant="outline" className={functionButtonClass} onClick={performLog} aria-label="Logaritmo">
            log
          </Button>
          <Button variant="outline" className={functionButtonClass} onClick={performLn} aria-label="Logaritmo Natural">
            ln
          </Button>
          <Button variant="outline" className={functionButtonClass} onClick={performE} aria-label="Número de Euler">
            e
          </Button>
          <Button
            variant="outline"
            className={functionButtonClass}
            onClick={() => performOperation("^")}
            aria-label="Potência"
          >
            x^y
          </Button>
          <Button variant="outline" className={operatorButtonClass} onClick={changeSign} aria-label="Inverter sinal">
            ±
          </Button>

          {/* Row 4 */}
          <Button variant="outline" className={functionButtonClass} onClick={performSquare} aria-label="Quadrado">
            x²
          </Button>
          <Button variant="outline" className={functionButtonClass} onClick={performSqrt} aria-label="Raiz quadrada">
            √
          </Button>
          <Button variant="outline" className={functionButtonClass} onClick={performInverse} aria-label="Inverso">
            1/x
          </Button>
          <Button variant="outline" className={functionButtonClass} onClick={inputPercent} aria-label="Porcentagem">
            %
          </Button>
          <Button
            variant="outline"
            className={operatorButtonClass}
            onClick={() => performOperation("÷")}
            aria-label="Dividir"
          >
            ÷
          </Button>

          {/* Row 5 */}
          <Button variant="outline" className={digitButtonClass} onClick={() => inputDigit("7")} aria-label="Sete">
            7
          </Button>
          <Button variant="outline" className={digitButtonClass} onClick={() => inputDigit("8")} aria-label="Oito">
            8
          </Button>
          <Button variant="outline" className={digitButtonClass} onClick={() => inputDigit("9")} aria-label="Nove">
            9
          </Button>
          <Button
            variant="outline"
            className={functionButtonClass}
            onClick={memoryAdd}
            aria-label="Adicionar à memória"
          >
            M+
          </Button>
          <Button
            variant="outline"
            className={operatorButtonClass}
            onClick={() => performOperation("×")}
            aria-label="Multiplicar"
          >
            ×
          </Button>

          {/* Row 6 */}
          <Button variant="outline" className={digitButtonClass} onClick={() => inputDigit("4")} aria-label="Quatro">
            4
          </Button>
          <Button variant="outline" className={digitButtonClass} onClick={() => inputDigit("5")} aria-label="Cinco">
            5
          </Button>
          <Button variant="outline" className={digitButtonClass} onClick={() => inputDigit("6")} aria-label="Seis">
            6
          </Button>
          <Button
            variant="outline"
            className={functionButtonClass}
            onClick={memorySubtract}
            aria-label="Subtrair da memória"
          >
            M-
          </Button>
          <Button
            variant="outline"
            className={operatorButtonClass}
            onClick={() => performOperation("-")}
            aria-label="Subtrair"
          >
            -
          </Button>

          {/* Row 7 */}
          <Button variant="outline" className={digitButtonClass} onClick={() => inputDigit("1")} aria-label="Um">
            1
          </Button>
          <Button variant="outline" className={digitButtonClass} onClick={() => inputDigit("2")} aria-label="Dois">
            2
          </Button>
          <Button variant="outline" className={digitButtonClass} onClick={() => inputDigit("3")} aria-label="Três">
            3
          </Button>
          <Button variant="outline" className={digitButtonClass} onClick={() => inputDigit("0")} aria-label="Zero">
            0
          </Button>
          <Button
            variant="outline"
            className={operatorButtonClass}
            onClick={() => performOperation("+")}
            aria-label="Adicionar"
          >
            +
          </Button>

          {/* Row 8 */}
          <Button
            variant="outline"
            className={digitButtonClass}
            onClick={() => inputDigit("0")}
            className="sm:col-span-2"
            aria-label="Zero"
          >
            0
          </Button>
          <Button variant="outline" className={digitButtonClass} onClick={inputDecimal} aria-label="Decimal">
            .
          </Button>
          <Button
            variant="outline"
            className={equalsButtonClass}
            onClick={performEquals}
            className="sm:col-span-2"
            aria-label="Igual"
          >
            =
          </Button>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <h3 className="font-semibold mb-2">Como usar a calculadora científica:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Use RAD/DEG para alternar entre radianos e graus para funções trigonométricas</li>
            <li>MS, MR, MC, M+ e M- são funções de memória para armazenar e recuperar valores</li>
            <li>As funções trigonométricas (sin, cos, tan) usam radianos ou graus conforme selecionado</li>
            <li>log é logaritmo de base 10, ln é logaritmo natural (base e)</li>
            <li>
              x^y eleva o número atual à potência y (digite o número base, pressione x^y, digite o expoente, pressione
              =)
            </li>
          </ul>
        </div>

        <FuncoesExplicacao tipo="cientifica" />
      </div>
    </CalculatorLayout>
  )
}
