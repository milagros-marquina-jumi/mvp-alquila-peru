"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Eye,
  Edit,
  MapPin,
  Plus,
  Settings,
  TrendingUp,
  DollarSign,
  Calendar,
  AlertTriangle,
  User,
  Star,
  Filter,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface Property {
  id: string
  title: string
  property_type: string
  address: string
  district: string
  monthly_rent: number
  status: string
  is_published: boolean
  property_images: Array<{
    image_url: string
    is_primary: boolean
  }>
  rental_contracts: Array<{
    start_date: string
    end_date: string
    contract_status: string
  }>
}

interface PropertiesManagementProps {
  properties: Property[]
}

const getTenantScore = (daysLate: number) => {
  const baseScore = 1000
  const penalty = daysLate * 50
  return Math.max(0, baseScore - penalty)
}

const getScoreColor = (score: number) => {
  if (score >= 800) return "text-green-600 bg-green-100"
  if (score >= 300) return "text-yellow-600 bg-yellow-100"
  return "text-red-600 bg-red-100"
}

export default function PropertiesManagement({ properties }: PropertiesManagementProps) {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
  const [updatingProperty, setUpdatingProperty] = useState<string | null>(null)

  const currentDate = new Date()
  const [selectedMonth, setSelectedMonth] = useState<string>((currentDate.getMonth() + 1).toString().padStart(2, "0"))
  const [selectedYear, setSelectedYear] = useState<string>(currentDate.getFullYear().toString())

  const months = [
    { value: "01", label: "Enero" },
    { value: "02", label: "Febrero" },
    { value: "03", label: "Marzo" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Mayo" },
    { value: "06", label: "Junio" },
    { value: "07", label: "Julio" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ]

  const years = Array.from({ length: 3 }, (_, i) => {
    const year = currentDate.getFullYear() - i
    return { value: year.toString(), label: year.toString() }
  })

  const getFilteredFinancialData = () => {
    // Mock data that would normally come from API based on filters
    const baseIncome = mockTenantData.monthlyRent
    const baseExpenses = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0)

    // Simulate different data for different months/years
    const monthMultiplier = selectedMonth === "01" ? 1.1 : selectedMonth === "12" ? 0.9 : 1.0
    const yearMultiplier = selectedYear === "2024" ? 1.0 : selectedYear === "2023" ? 0.95 : 0.9

    return {
      income: Math.round(baseIncome * monthMultiplier * yearMultiplier),
      expenses: Math.round(baseExpenses * monthMultiplier * yearMultiplier),
      profitability: (
        ((baseIncome * monthMultiplier * yearMultiplier * 12) / (baseIncome * 12)) * 100 -
        100 +
        18.5
      ).toFixed(1),
    }
  }

  const getPropertyTypeLabel = (type: string) => {
    const types = {
      room: "Cuarto",
      apartment: "Departamento",
      house: "Casa",
      office: "Oficina",
      commercial: "Comercial",
    }
    return types[type as keyof typeof types] || type
  }

  const getStatusColor = (status: string) => {
    return status === "available" ? "bg-emerald-100 text-emerald-800" : "bg-orange-100 text-orange-800"
  }

  const getStatusLabel = (status: string) => {
    return status === "available" ? "Disponible" : "Alquilado"
  }

  const mockTenantData = {
    name: "María González",
    score: getTenantScore(2), // 2 días de atraso
    daysLate: 2,
    totalPayments: 12,
    latePayments: 2,
    monthlyRent: 2500,
    lastPayment: "2024-01-15",
    contractEnd: "2024-12-31",
  }

  const mockExpenses = [
    { id: 1, description: "Mantenimiento", amount: 150, date: "2024-01-10", category: "Mantenimiento" },
    { id: 2, description: "Reparación grifo", amount: 80, date: "2024-01-05", category: "Reparación" },
    { id: 3, description: "Limpieza", amount: 100, date: "2024-01-01", category: "Limpieza" },
  ]

  if (properties.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No tienes propiedades registradas</p>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/dashboard/properties/new">
              <Plus className="mr-2 h-4 w-4" />
              Crear Primera Propiedad
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property) => {
          const primaryImage = property.property_images?.find((img) => img.is_primary) || property.property_images?.[0]
          const isSelected = selectedProperty === property.id

          return (
            <Card
              key={property.id}
              className={`overflow-hidden cursor-pointer transition-all ${
                isSelected ? "ring-2 ring-emerald-500 shadow-lg" : "hover:shadow-md"
              }`}
              onClick={() => setSelectedProperty(isSelected ? null : property.id)}
            >
              <div className="relative h-48 bg-gray-200">
                {primaryImage ? (
                  <Image
                    src={primaryImage.image_url || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">Sin imagen</span>
                  </div>
                )}

                <div className="absolute top-3 left-3">
                  <Badge className={getStatusColor(property.status)}>{getStatusLabel(property.status)}</Badge>
                </div>

                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {getPropertyTypeLabel(property.property_type)}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">{property.title}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="line-clamp-1">{property.district}</span>
                </div>
                <div className="text-xl font-bold text-emerald-600 mb-2">
                  S/ {property.monthly_rent.toLocaleString()}/mes
                </div>

                {isSelected && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-emerald-600 font-medium">✓ Seleccionado - Ver detalles abajo</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedProperty && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Gestión Detallada - {properties.find((p) => p.id === selectedProperty)?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="anuncio" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="anuncio">Ver Anuncio</TabsTrigger>
                <TabsTrigger value="gestion">Gestión de Propiedad</TabsTrigger>
              </TabsList>

              <TabsContent value="anuncio" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Control de Publicación</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Mostrar en marketplace</p>
                          <p className="text-sm text-gray-500">Visible para inquilinos</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="space-y-2">
                        <Button asChild className="w-full bg-transparent" variant="outline">
                          <Link href={`/property/${selectedProperty}`} target="_blank">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Anuncio Público
                          </Link>
                        </Button>

                        <Button asChild className="w-full bg-transparent" variant="outline">
                          <Link href={`/dashboard/properties/${selectedProperty}/edit`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar Detalles
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Estadísticas del Anuncio</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">127</div>
                          <div className="text-sm text-gray-600">Visualizaciones</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">8</div>
                          <div className="text-sm text-gray-600">Contactos</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Interés del mercado</span>
                          <span>Alto</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="gestion" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Inquilino Actual
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{mockTenantData.name}</p>
                          <p className="text-sm text-gray-500">Contrato hasta {mockTenantData.contractEnd}</p>
                        </div>
                        <div className="text-right">
                          <div
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(mockTenantData.score)}`}
                          >
                            <Star className="w-4 h-4 mr-1" />
                            {mockTenantData.score}/1000
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Pagos totales:</span>
                          <p className="font-medium">{mockTenantData.totalPayments}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Pagos tardíos:</span>
                          <p className="font-medium text-orange-600">{mockTenantData.latePayments}</p>
                        </div>
                      </div>

                      {mockTenantData.daysLate > 0 && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center gap-2 text-red-700">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              Pago atrasado por {mockTenantData.daysLate} días
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Resumen Financiero
                        <Filter className="h-4 w-4 text-gray-400" />
                      </CardTitle>
                      <div className="flex gap-3 mt-3">
                        <div className="flex-1">
                          <label className="text-xs text-gray-500 mb-1 block">Mes</label>
                          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {months.map((month) => (
                                <SelectItem key={month.value} value={month.value}>
                                  {month.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex-1">
                          <label className="text-xs text-gray-500 mb-1 block">Año</label>
                          <Select value={selectedYear} onValueChange={setSelectedYear}>
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {years.map((year) => (
                                <SelectItem key={year.value} value={year.value}>
                                  {year.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="text-sm text-gray-600">
                            Ingresos {months.find((m) => m.value === selectedMonth)?.label.toLowerCase()} {selectedYear}
                          </span>
                          <span className="font-bold text-green-600">
                            S/ {getFilteredFinancialData().income.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <span className="text-sm text-gray-600">
                            Gastos {months.find((m) => m.value === selectedMonth)?.label.toLowerCase()} {selectedYear}
                          </span>
                          <span className="font-bold text-red-600">
                            S/ {getFilteredFinancialData().expenses.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="text-sm text-gray-600">Rentabilidad anual proyectada</span>
                          <span className="font-bold text-blue-600">{getFilteredFinancialData().profitability}%</span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                          <span className="text-sm text-gray-600">Ganancia neta del período</span>
                          <span className="font-bold text-emerald-600">
                            S/{" "}
                            {(getFilteredFinancialData().income - getFilteredFinancialData().expenses).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <Button className="w-full bg-transparent" variant="outline">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Ver Reporte Completo
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Gastos Recientes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockExpenses.map((expense) => (
                          <div key={expense.id} className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                              <p className="font-medium text-sm">{expense.description}</p>
                              <p className="text-xs text-gray-500">{expense.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-red-600">-S/ {expense.amount}</p>
                              <Badge variant="secondary" className="text-xs">
                                {expense.category}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button className="w-full mt-4 bg-transparent" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Registrar Gasto
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Alertas de Esta Propiedad
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Recordatorio de pago</span>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm">Alerta por retraso</span>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm">Renovación de contrato</span>
                          <Switch />
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Días configurados:</p>
                        <div className="flex flex-wrap gap-1">
                          {[5, 3, 1].map((day) => (
                            <Badge key={day} variant="secondary" className="text-xs">
                              {day} día{day > 1 ? "s" : ""} antes
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-transparent" variant="outline">
                        <Settings className="w-4 h-4 mr-2" />
                        Configurar Alertas
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
