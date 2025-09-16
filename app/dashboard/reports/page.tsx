import FinancialOverview from "@/components/financial-overview"
import RevenueChart from "@/components/revenue-chart"
import ExpensesChart from "@/components/expenses-chart"
import ProfitabilityAnalysis from "@/components/profitability-analysis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockPayments, mockExpenses, mockProperties } from "@/lib/mock-data"

export default async function ReportsPage() {
  const currentYear = new Date().getFullYear()
  const startOfYear = `${currentYear}-01-01`
  const endOfYear = `${currentYear}-12-31`

  const payments = mockPayments
  const expenses = mockExpenses
  const properties = mockProperties

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reportes Financieros</h1>
        <p className="text-gray-600 mt-2">Análisis completo de ingresos, gastos y rentabilidad</p>
      </div>

      <FinancialOverview payments={payments} expenses={expenses} />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="revenue">Ingresos</TabsTrigger>
          <TabsTrigger value="expenses">Gastos</TabsTrigger>
          <TabsTrigger value="profitability">Rentabilidad</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart payments={payments} />
            <ExpensesChart expenses={expenses} />
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <RevenueChart payments={payments} detailed />
        </TabsContent>

        <TabsContent value="expenses">
          <ExpensesChart expenses={expenses} detailed />
        </TabsContent>

        <TabsContent value="profitability">
          <ProfitabilityAnalysis payments={payments} expenses={expenses} properties={properties} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
