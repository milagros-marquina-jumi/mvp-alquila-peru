"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts"

interface Payment {
  id: string
  amount: number
  payment_date: string
  status: string
}

interface RevenueChartProps {
  payments: Payment[]
  detailed?: boolean
}

export default function RevenueChart({ payments, detailed = false }: RevenueChartProps) {
  // Group payments by month
  const monthlyData = Array.from({ length: 12 }, (_, index) => {
    const month = index
    const monthName = new Date(2024, month).toLocaleDateString("es-PE", { month: "short" })

    const monthlyPayments = payments.filter((payment) => {
      const paymentDate = new Date(payment.payment_date)
      return paymentDate.getMonth() === month && payment.status === "paid"
    })

    const total = monthlyPayments.reduce((sum, payment) => sum + payment.amount, 0)

    return {
      month: monthName,
      income: total,
      count: monthlyPayments.length,
    }
  })

  const totalIncome = payments.filter((p) => p.status === "paid").reduce((sum, payment) => sum + payment.amount, 0)

  const chartConfig = {
    income: {
      label: "Ingresos",
      color: "hsl(var(--chart-1))",
    },
  }

  if (detailed) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ingresos Mensuales Detallados</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value: number) => [`S/ ${value.toLocaleString()}`, "Ingresos"]}
                  />
                  <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Ingresos</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value: number) => [`S/ ${value.toLocaleString()}`, "Ingresos"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="var(--color-income)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-income)", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-emerald-600">S/ {(totalIncome / 12).toLocaleString()}</div>
              <p className="text-sm text-gray-600">Promedio mensual</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">
                {Math.max(...monthlyData.map((d) => d.income)).toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">Mejor mes (S/)</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-600">
                {payments.filter((p) => p.status === "paid").length}
              </div>
              <p className="text-sm text-gray-600">Total de pagos</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingresos por Mes</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: number) => [`S/ ${value.toLocaleString()}`, "Ingresos"]}
              />
              <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
