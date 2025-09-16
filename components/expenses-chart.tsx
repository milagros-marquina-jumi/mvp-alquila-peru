"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface Expense {
  id: string
  amount: number
  expense_date: string
  category: string
}

interface ExpensesChartProps {
  expenses: Expense[]
  detailed?: boolean
}

export default function ExpensesChart({ expenses, detailed = false }: ExpensesChartProps) {
  // Group expenses by month
  const monthlyData = Array.from({ length: 12 }, (_, index) => {
    const month = index
    const monthName = new Date(2024, month).toLocaleDateString("es-PE", { month: "short" })

    const monthlyExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.expense_date)
      return expenseDate.getMonth() === month
    })

    const total = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0)

    return {
      month: monthName,
      expenses: total,
      count: monthlyExpenses.length,
    }
  })

  // Group expenses by category
  const categoryData = expenses.reduce(
    (acc, expense) => {
      const category = expense.category
      if (!acc[category]) {
        acc[category] = { category, amount: 0, count: 0 }
      }
      acc[category].amount += expense.amount
      acc[category].count += 1
      return acc
    },
    {} as Record<string, { category: string; amount: number; count: number }>,
  )

  const categoryArray = Object.values(categoryData)

  const categoryLabels = {
    maintenance: "Mantenimiento",
    utilities: "Servicios",
    taxes: "Impuestos",
    insurance: "Seguros",
    repairs: "Reparaciones",
    other: "Otros",
  }

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#6b7280"]

  const chartConfig = {
    expenses: {
      label: "Gastos",
      color: "hsl(var(--chart-2))",
    },
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  if (detailed) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Gastos Mensuales Detallados</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value: number) => [`S/ ${value.toLocaleString()}`, "Gastos"]}
                  />
                  <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gastos por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryArray}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, amount }) =>
                        `${categoryLabels[category as keyof typeof categoryLabels] || category}: S/ ${amount.toLocaleString()}`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {categoryArray.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value: number) => [`S/ ${value.toLocaleString()}`, "Gastos"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="space-y-4">
                {categoryArray.map((category, index) => (
                  <div key={category.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <div>
                        <p className="font-medium">
                          {categoryLabels[category.category as keyof typeof categoryLabels] || category.category}
                        </p>
                        <p className="text-sm text-gray-500">{category.count} gastos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">S/ {category.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{((category.amount / totalExpenses) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gastos por Mes</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: number) => [`S/ ${value.toLocaleString()}`, "Gastos"]}
              />
              <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
