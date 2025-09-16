import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Home, DollarSign, AlertCircle } from "lucide-react"
import Link from "next/link"

interface DashboardStatsProps {
  stats: {
    totalProperties: number
    availableProperties: number
    rentedProperties: number
    activeContracts: number
    monthlyIncome: number
    pendingPayments: number
  }
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Link href="/dashboard/properties" className="block hover:scale-105 transition-transform duration-200">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 hover:border-teal-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Propiedades</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              {stats.availableProperties} disponibles, {stats.rentedProperties} alquiladas
            </p>
          </CardContent>
        </Card>
      </Link>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contratos Activos</CardTitle>
          <Home className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeContracts}</div>
          <p className="text-xs text-muted-foreground">Contratos en vigencia</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">S/ {stats.monthlyIncome.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Ingresos proyectados</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pagos Pendientes</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingPayments}</div>
          <p className="text-xs text-muted-foreground">Próximos 30 días</p>
        </CardContent>
      </Card>
    </div>
  )
}
