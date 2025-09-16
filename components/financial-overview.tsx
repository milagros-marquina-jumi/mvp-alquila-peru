import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react"

interface Payment {
  id: string
  amount: number
  payment_date: string
  status: string
}

interface Expense {
  id: string
  amount: number
  expense_date: string
  category: string
}

interface FinancialOverviewProps {
  payments: Payment[]
  expenses: Expense[]
}

export default function FinancialOverview({ payments, expenses }: FinancialOverviewProps) {
  // Calculate totals
  const totalIncome = payments.filter((p) => p.status === "paid").reduce((sum, payment) => sum + payment.amount, 0)

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  const netProfit = totalIncome - totalExpenses
  const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0

  // Calculate monthly averages
  const monthlyIncome = totalIncome / 12
  const monthlyExpenses = totalExpenses / 12

  // Get current month data
  const currentMonth = new Date().getMonth()
  const currentMonthIncome = payments
    .filter((p) => p.status === "paid" && new Date(p.payment_date).getMonth() === currentMonth)
    .reduce((sum, payment) => sum + payment.amount, 0)

  const currentMonthExpenses = expenses
    .filter((e) => new Date(e.expense_date).getMonth() === currentMonth)
    .reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-600">S/ {totalIncome.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Promedio mensual: S/ {monthlyIncome.toLocaleString()}</p>
          <div className="mt-2">
            <span className="text-sm text-gray-600">Este mes: </span>
            <span className="font-medium">S/ {currentMonthIncome.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gastos Totales</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">S/ {totalExpenses.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Promedio mensual: S/ {monthlyExpenses.toLocaleString()}</p>
          <div className="mt-2">
            <span className="text-sm text-gray-600">Este mes: </span>
            <span className="font-medium">S/ {currentMonthExpenses.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ganancia Neta</CardTitle>
          <DollarSign className={`h-4 w-4 ${netProfit >= 0 ? "text-emerald-600" : "text-red-600"}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${netProfit >= 0 ? "text-emerald-600" : "text-red-600"}`}>
            S/ {netProfit.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Margen: {profitMargin.toFixed(1)}%</p>
          <div className="mt-2">
            <span className="text-sm text-gray-600">Este mes: </span>
            <span className="font-medium">S/ {(currentMonthIncome - currentMonthExpenses).toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rentabilidad Anual</CardTitle>
          <PieChart className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{profitMargin.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            {profitMargin > 15
              ? "Excelente rentabilidad"
              : profitMargin > 8
                ? "Buena rentabilidad"
                : profitMargin > 0
                  ? "Rentabilidad moderada"
                  : "Pérdidas"}
          </p>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${profitMargin > 0 ? "bg-emerald-500" : "bg-red-500"}`}
                style={{ width: `${Math.min(Math.abs(profitMargin), 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
