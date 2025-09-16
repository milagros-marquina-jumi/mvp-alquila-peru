import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Home } from "lucide-react"

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
  property_id: string
}

interface Property {
  id: string
  title: string
  monthly_rent: number
  rental_contracts: Array<{
    monthly_rent: number
    contract_status: string
  }>
}

interface ProfitabilityAnalysisProps {
  payments: Payment[]
  expenses: Expense[]
  properties: Property[]
}

export default function ProfitabilityAnalysis({ payments, expenses, properties }: ProfitabilityAnalysisProps) {
  // Calculate property-specific profitability
  const propertyAnalysis = properties.map((property) => {
    const propertyExpenses = expenses
      .filter((expense) => expense.property_id === property.id)
      .reduce((sum, expense) => sum + expense.amount, 0)

    const activeContract = property.rental_contracts?.find((contract) => contract.contract_status === "active")

    const annualIncome = activeContract ? activeContract.monthly_rent * 12 : 0
    const netProfit = annualIncome - propertyExpenses
    const profitability = annualIncome > 0 ? (netProfit / annualIncome) * 100 : 0

    return {
      id: property.id,
      title: property.title,
      annualIncome,
      expenses: propertyExpenses,
      netProfit,
      profitability,
      monthlyRent: activeContract?.monthly_rent || 0,
    }
  })

  // Overall calculations
  const totalIncome = payments.filter((p) => p.status === "paid").reduce((sum, payment) => sum + payment.amount, 0)

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const overallProfitability = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0

  // Sort properties by profitability
  const sortedProperties = propertyAnalysis.sort((a, b) => b.profitability - a.profitability)

  const getProfitabilityColor = (profitability: number) => {
    if (profitability > 15) return "bg-emerald-100 text-emerald-800"
    if (profitability > 8) return "bg-blue-100 text-blue-800"
    if (profitability > 0) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getProfitabilityLabel = (profitability: number) => {
    if (profitability > 15) return "Excelente"
    if (profitability > 8) return "Buena"
    if (profitability > 0) return "Moderada"
    return "Pérdidas"
  }

  return (
    <div className="space-y-6">
      {/* Overall Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-emerald-600" />
            Análisis General de Rentabilidad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">S/ {totalIncome.toLocaleString()}</div>
              <p className="text-sm text-gray-600">Ingresos Totales</p>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">S/ {totalExpenses.toLocaleString()}</div>
              <p className="text-sm text-gray-600">Gastos Totales</p>
            </div>

            <div className="text-center">
              <div
                className={`text-2xl font-bold ${(totalIncome - totalExpenses) >= 0 ? "text-emerald-600" : "text-red-600"}`}
              >
                S/ {(totalIncome - totalExpenses).toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">Ganancia Neta</p>
            </div>

            <div className="text-center">
              <div className={`text-2xl font-bold ${overallProfitability >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                {overallProfitability.toFixed(1)}%
              </div>
              <p className="text-sm text-gray-600">Rentabilidad</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Home className="mr-2 h-5 w-5 text-blue-600" />
            Rentabilidad por Propiedad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedProperties.map((property) => (
              <div key={property.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{property.title}</h3>
                    <p className="text-sm text-gray-600">
                      Alquiler mensual: S/ {property.monthlyRent.toLocaleString()}
                    </p>
                  </div>
                  <Badge className={getProfitabilityColor(property.profitability)}>
                    {getProfitabilityLabel(property.profitability)} ({property.profitability.toFixed(1)}%)
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-800">Ingresos</span>
                    </div>
                    <div className="text-xl font-bold text-emerald-600 mt-2">
                      S/ {property.annualIncome.toLocaleString()}
                    </div>
                    <p className="text-xs text-emerald-700">Anuales proyectados</p>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <TrendingDown className="h-5 w-5 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Gastos</span>
                    </div>
                    <div className="text-xl font-bold text-red-600 mt-2">S/ {property.expenses.toLocaleString()}</div>
                    <p className="text-xs text-red-700">Anuales</p>
                  </div>

                  <div className={`p-4 rounded-lg ${property.netProfit >= 0 ? "bg-blue-50" : "bg-gray-50"}`}>
                    <div className="flex items-center justify-between">
                      <DollarSign
                        className={`h-5 w-5 ${property.netProfit >= 0 ? "text-blue-600" : "text-gray-600"}`}
                      />
                      <span
                        className={`text-sm font-medium ${property.netProfit >= 0 ? "text-blue-800" : "text-gray-800"}`}
                      >
                        Ganancia
                      </span>
                    </div>
                    <div
                      className={`text-xl font-bold mt-2 ${property.netProfit >= 0 ? "text-blue-600" : "text-gray-600"}`}
                    >
                      S/ {property.netProfit.toLocaleString()}
                    </div>
                    <p className={`text-xs ${property.netProfit >= 0 ? "text-blue-700" : "text-gray-700"}`}>
                      Neta anual
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">%</span>
                      </div>
                      <span className="text-sm font-medium text-purple-800">ROI</span>
                    </div>
                    <div className="text-xl font-bold text-purple-600 mt-2">{property.profitability.toFixed(1)}%</div>
                    <p className="text-xs text-purple-700">Rentabilidad</p>
                  </div>
                </div>

                {/* Progress bar for profitability */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Rentabilidad</span>
                    <span>{property.profitability.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        property.profitability > 15
                          ? "bg-emerald-500"
                          : property.profitability > 8
                            ? "bg-blue-500"
                            : property.profitability > 0
                              ? "bg-yellow-500"
                              : "bg-red-500"
                      }`}
                      style={{ width: `${Math.min(Math.max(property.profitability, 0), 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {overallProfitability < 8 && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Mejorar Rentabilidad</h4>
                <p className="text-sm text-yellow-700">
                  Tu rentabilidad general está por debajo del 8%. Considera revisar los gastos operativos y evaluar un
                  ajuste en los precios de alquiler.
                </p>
              </div>
            )}

            {sortedProperties.some((p) => p.profitability < 0) && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">Propiedades con Pérdidas</h4>
                <p className="text-sm text-red-700">
                  Algunas propiedades están generando pérdidas. Revisa los gastos de mantenimiento y considera
                  renegociar contratos o mejorar la eficiencia operativa.
                </p>
              </div>
            )}

            {overallProfitability > 15 && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <h4 className="font-medium text-emerald-800 mb-2">Excelente Desempeño</h4>
                <p className="text-sm text-emerald-700">
                  ¡Felicitaciones! Tu portafolio tiene una rentabilidad excelente. Considera expandir tu inversión en
                  propiedades similares.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
