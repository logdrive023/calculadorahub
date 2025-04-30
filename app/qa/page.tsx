import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "Documentação para QA - Calculadora Hub",
  description: "Documentação para testes de QA do Calculadora Hub",
}

export default function QAPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Documentação para QA</h1>
          <p className="text-lg text-muted-foreground">
            Esta página contém informações para auxiliar nos testes de qualidade do Calculadora Hub.
          </p>
        </div>

        <Tabs defaultValue="estrutura" className="w-full mb-12">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="estrutura">Estrutura do Site</TabsTrigger>
            <TabsTrigger value="testids">Test IDs</TabsTrigger>
            <TabsTrigger value="fluxos">Fluxos de Teste</TabsTrigger>
            <TabsTrigger value="formularios">Validação de Formulários</TabsTrigger>
          </TabsList>

          <TabsContent value="estrutura">
            <Card>
              <CardHeader>
                <CardTitle>Estrutura do Site</CardTitle>
                <CardDescription>Organização das páginas e componentes principais</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-4">Páginas Principais</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Página</TableHead>
                      <TableHead>Rota</TableHead>
                      <TableHead>Descrição</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Página Inicial</TableCell>
                      <TableCell>
                        <code>/</code>
                      </TableCell>
                      <TableCell>Lista todas as calculadoras disponíveis</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Calculadora de IMC</TableCell>
                      <TableCell>
                        <code>/calculadoras/imc</code>
                      </TableCell>
                      <TableCell>Calcula o Índice de Massa Corporal</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Calculadora de Porcentagem</TableCell>
                      <TableCell>
                        <code>/calculadoras/porcentagem</code>
                      </TableCell>
                      <TableCell>Realiza cálculos percentuais</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Regra de Três</TableCell>
                      <TableCell>
                        <code>/calculadoras/regra-de-tres</code>
                      </TableCell>
                      <TableCell>Resolve problemas de proporção</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Calculadora Científica</TableCell>
                      <TableCell>
                        <code>/calculadoras/cientifica</code>
                      </TableCell>
                      <TableCell>Realiza cálculos científicos avançados</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Calculadora Financeira</TableCell>
                      <TableCell>
                        <code>/calculadoras/financeira</code>
                      </TableCell>
                      <TableCell>Calcula juros e empréstimos</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Sobre</TableCell>
                      <TableCell>
                        <code>/sobre</code>
                      </TableCell>
                      <TableCell>Informações sobre o site</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <h3 className="text-lg font-semibold mt-8 mb-4">Componentes Principais</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Componente</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Descrição</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Header</TableCell>
                      <TableCell>
                        <code>components/Header.tsx</code>
                      </TableCell>
                      <TableCell>Cabeçalho com navegação</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CalculatorLayout</TableCell>
                      <TableCell>
                        <code>components/CalculatorLayout.tsx</code>
                      </TableCell>
                      <TableCell>Layout padrão para todas as calculadoras</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>AdSenseBlock</TableCell>
                      <TableCell>
                        <code>components/AdSenseBlock.tsx</code>
                      </TableCell>
                      <TableCell>Bloco para anúncios</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ScrollToTop</TableCell>
                      <TableCell>
                        <code>components/ScrollToTop.tsx</code>
                      </TableCell>
                      <TableCell>Rola para o topo ao navegar entre páginas</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testids">
            <Card>
              <CardHeader>
                <CardTitle>Test IDs</CardTitle>
                <CardDescription>Identificadores para automação de testes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Os elementos principais do site possuem atributos <code>data-testid</code> para facilitar a seleção em
                  testes automatizados.
                </p>

                <h3 className="text-lg font-semibold mb-4">Navegação</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Elemento</TableHead>
                      <TableHead>Test ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Logo/Link para Home</TableCell>
                      <TableCell>
                        <code>header-logo</code>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Menu de navegação</TableCell>
                      <TableCell>
                        <code>main-nav</code>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Botão do menu mobile</TableCell>
                      <TableCell>
                        <code>mobile-menu-button</code>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Links de navegação</TableCell>
                      <TableCell>
                        <code>nav-link-{"{nome}"}</code> (ex: nav-link-imc)
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <h3 className="text-lg font-semibold mt-8 mb-4">Calculadoras</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Elemento</TableHead>
                      <TableHead>Test ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Formulário de calculadora</TableCell>
                      <TableCell>
                        <code>{"{tipo}"}-calculator-form</code> (ex: imc-calculator-form)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Campos de entrada</TableCell>
                      <TableCell>
                        <code>
                          {"{tipo}"}-{"{campo}"}-input
                        </code>{" "}
                        (ex: imc-weight-input)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Botão de calcular</TableCell>
                      <TableCell>
                        <code>{"{tipo}"}-calculate-button</code>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Área de resultado</TableCell>
                      <TableCell>
                        <code>{"{tipo}"}-result-area</code>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tabs (quando aplicável)</TableCell>
                      <TableCell>
                        <code>
                          {"{tipo}"}-tab-{"{nome}"}
                        </code>{" "}
                        (ex: percentage-tab-percentOfValue)
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <h3 className="text-lg font-semibold mt-8 mb-4">Página Inicial</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Elemento</TableHead>
                      <TableHead>Test ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Cards de calculadoras</TableCell>
                      <TableCell>
                        <code>calculator-card-{"{tipo}"}</code> (ex: calculator-card-imc)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Botões de acesso</TableCell>
                      <TableCell>
                        <code>access-button-{"{tipo}"}</code> (ex: access-button-imc)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Blocos de anúncios</TableCell>
                      <TableCell>
                        <code>ad-block-{"{posição}"}</code> (ex: ad-block-top)
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fluxos">
            <Card>
              <CardHeader>
                <CardTitle>Fluxos de Teste</CardTitle>
                <CardDescription>Principais fluxos para testar em cada calculadora</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-4">Calculadora de IMC</h3>
                <ol className="list-decimal list-inside space-y-2 mb-6">
                  <li>Inserir peso e altura válidos e verificar o cálculo correto do IMC</li>
                  <li>Verificar a classificação correta do IMC (abaixo do peso, normal, sobrepeso, etc.)</li>
                  <li>Testar com valores extremos (muito baixos ou muito altos)</li>
                  <li>Verificar validação de campos vazios ou valores negativos</li>
                </ol>

                <h3 className="text-lg font-semibold mb-4">Calculadora de Porcentagem</h3>
                <ol className="list-decimal list-inside space-y-2 mb-6">
                  <li>Testar cada uma das três abas (X% de Y, % entre valores, Aumento/Redução)</li>
                  <li>Verificar cálculos com números decimais</li>
                  <li>Testar com valores zero onde permitido</li>
                  <li>Verificar validação de campos obrigatórios</li>
                </ol>

                <h3 className="text-lg font-semibold mb-4">Regra de Três</h3>
                <ol className="list-decimal list-inside space-y-2 mb-6">
                  <li>Testar com valores conhecidos e verificar o resultado</li>
                  <li>Verificar validação para valores zero nos campos A e C</li>
                  <li>Testar com números negativos</li>
                  <li>Verificar formatação do resultado com decimais</li>
                </ol>

                <h3 className="text-lg font-semibold mb-4">Calculadora Científica</h3>
                <ol className="list-decimal list-inside space-y-2 mb-6">
                  <li>Testar operações básicas (adição, subtração, multiplicação, divisão)</li>
                  <li>Verificar funções trigonométricas em radianos e graus</li>
                  <li>Testar funções logarítmicas e exponenciais</li>
                  <li>Verificar operações com memória (MS, MR, MC, M+, M-)</li>
                  <li>Testar sequências complexas de operações</li>
                </ol>

                <h3 className="text-lg font-semibold mb-4">Calculadora Financeira</h3>
                <ol className="list-decimal list-inside space-y-2 mb-6">
                  <li>Testar cálculo de juros simples com diferentes períodos (meses/anos)</li>
                  <li>Verificar juros compostos com diferentes frequências de capitalização</li>
                  <li>Testar cálculo de empréstimos e verificar valor das parcelas</li>
                  <li>Verificar tabela de amortização</li>
                  <li>Testar com valores extremos (muito grandes ou pequenos)</li>
                </ol>

                <h3 className="text-lg font-semibold mb-4">Navegação e Responsividade</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Verificar navegação entre todas as páginas</li>
                  <li>Testar menu mobile em diferentes tamanhos de tela</li>
                  <li>Verificar comportamento responsivo de todas as calculadoras</li>
                  <li>Testar scroll automático ao topo ao navegar entre páginas</li>
                  <li>Verificar exibição correta dos blocos de anúncios em diferentes dispositivos</li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="formularios">
            <Card>
              <CardHeader>
                <CardTitle>Validação de Formulários</CardTitle>
                <CardDescription>Regras de validação para cada calculadora</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-4">Calculadora de IMC</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campo</TableHead>
                      <TableHead>Regras de Validação</TableHead>
                      <TableHead>Mensagem de Erro</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Peso</TableCell>
                      <TableCell>Número positivo obrigatório</TableCell>
                      <TableCell>"O peso deve ser maior que zero"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Altura</TableCell>
                      <TableCell>Número positivo obrigatório</TableCell>
                      <TableCell>"A altura deve ser maior que zero"</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <h3 className="text-lg font-semibold mt-8 mb-4">Calculadora de Porcentagem</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aba</TableHead>
                      <TableHead>Campo</TableHead>
                      <TableHead>Regras de Validação</TableHead>
                      <TableHead>Mensagem de Erro</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell rowSpan={2}>X% de Y</TableCell>
                      <TableCell>Porcentagem</TableCell>
                      <TableCell>Número maior ou igual a zero</TableCell>
                      <TableCell>"A porcentagem deve ser maior ou igual a zero"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Valor</TableCell>
                      <TableCell>Número obrigatório</TableCell>
                      <TableCell>Mensagem padrão</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={2}>% entre valores</TableCell>
                      <TableCell>Valor 1</TableCell>
                      <TableCell>Número diferente de zero</TableCell>
                      <TableCell>"O valor não pode ser zero"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Valor 2</TableCell>
                      <TableCell>Número obrigatório</TableCell>
                      <TableCell>Mensagem padrão</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={2}>Aumento/Redução</TableCell>
                      <TableCell>Valor Original</TableCell>
                      <TableCell>Número diferente de zero</TableCell>
                      <TableCell>"O valor não pode ser zero"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Valor Final</TableCell>
                      <TableCell>Número obrigatório</TableCell>
                      <TableCell>Mensagem padrão</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <h3 className="text-lg font-semibold mt-8 mb-4">Regra de Três</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campo</TableHead>
                      <TableHead>Regras de Validação</TableHead>
                      <TableHead>Mensagem de Erro</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Valor A</TableCell>
                      <TableCell>Número diferente de zero</TableCell>
                      <TableCell>"O valor não pode ser zero"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Valor B</TableCell>
                      <TableCell>Número obrigatório</TableCell>
                      <TableCell>Mensagem padrão</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Valor C</TableCell>
                      <TableCell>Número diferente de zero</TableCell>
                      <TableCell>"O valor não pode ser zero"</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <h3 className="text-lg font-semibold mt-8 mb-4">Calculadora Financeira</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aba</TableHead>
                      <TableHead>Campo</TableHead>
                      <TableHead>Regras de Validação</TableHead>
                      <TableHead>Mensagem de Erro</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell rowSpan={3}>Juros Simples</TableCell>
                      <TableCell>Capital Inicial</TableCell>
                      <TableCell>Número positivo</TableCell>
                      <TableCell>"O valor deve ser positivo"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Taxa de Juros</TableCell>
                      <TableCell>Número positivo</TableCell>
                      <TableCell>"A taxa deve ser positiva"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tempo</TableCell>
                      <TableCell>Número positivo</TableCell>
                      <TableCell>"O tempo deve ser positivo"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={3}>Empréstimos</TableCell>
                      <TableCell>Valor do Empréstimo</TableCell>
                      <TableCell>Número positivo</TableCell>
                      <TableCell>"O valor deve ser positivo"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Taxa de Juros</TableCell>
                      <TableCell>Número positivo</TableCell>
                      <TableCell>"A taxa deve ser positiva"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Prazo</TableCell>
                      <TableCell>Número positivo</TableCell>
                      <TableCell>"O prazo deve ser positivo"</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
