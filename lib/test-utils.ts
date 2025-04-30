/**
 * Utilitários para testes
 *
 * Este arquivo contém funções auxiliares para testes de QA
 * Apenas para uso em ambiente de desenvolvimento e teste
 */

/**
 * Verifica se estamos em ambiente de desenvolvimento
 */
export const isDevelopment = process.env.NODE_ENV === "development"

/**
 * Registra informações de teste no console apenas em ambiente de desenvolvimento
 * @param message Mensagem a ser registrada
 * @param data Dados adicionais (opcional)
 */
export function logTestInfo(message: string, data?: any) {
  if (isDevelopment) {
    console.log(`[TEST INFO] ${message}`, data || "")
  }
}

/**
 * Gera dados de teste para a calculadora de IMC
 * @returns Objeto com peso e altura aleatórios
 */
export function generateIMCTestData() {
  return {
    weight: Math.floor(Math.random() * 100) + 40, // 40-140kg
    height: Math.floor(Math.random() * 50) + 150, // 150-200cm
  }
}

/**
 * Gera dados de teste para a calculadora de porcentagem
 * @returns Objeto com dados para os três tipos de cálculos percentuais
 */
export function generatePercentageTestData() {
  return {
    percentOfValue: {
      percent: Math.floor(Math.random() * 100),
      value: Math.floor(Math.random() * 1000),
    },
    percentBetween: {
      value1: Math.floor(Math.random() * 100) + 1, // Evita zero
      value2: Math.floor(Math.random() * 200),
    },
    increaseDecrease: {
      originalValue: Math.floor(Math.random() * 100) + 1, // Evita zero
      finalValue: Math.floor(Math.random() * 200),
    },
  }
}

/**
 * Gera dados de teste para a calculadora de regra de três
 * @returns Objeto com valores A, B e C
 */
export function generateRuleOf3TestData() {
  return {
    a: Math.floor(Math.random() * 100) + 1, // Evita zero
    b: Math.floor(Math.random() * 100),
    c: Math.floor(Math.random() * 100) + 1, // Evita zero
  }
}

/**
 * Gera dados de teste para a calculadora financeira
 * @returns Objeto com dados para juros simples, compostos e empréstimos
 */
export function generateFinancialTestData() {
  return {
    simpleInterest: {
      principal: Math.floor(Math.random() * 10000) + 1000,
      rate: Math.random() * 10 + 1,
      time: Math.floor(Math.random() * 10) + 1,
    },
    compoundInterest: {
      principal: Math.floor(Math.random() * 10000) + 1000,
      rate: Math.random() * 10 + 1,
      time: Math.floor(Math.random() * 10) + 1,
    },
    loan: {
      loanAmount: Math.floor(Math.random() * 50000) + 5000,
      interestRate: Math.random() * 15 + 1,
      loanTerm: Math.floor(Math.random() * 60) + 12,
    },
  }
}
