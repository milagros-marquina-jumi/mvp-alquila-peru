import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

const mockTenants = [
  {
    id: 1,
    name: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+51 987 654 321",
    property: "Departamento Moderno en San Isidro",
    rentAmount: 2500,
    contractStart: "2024-01-15",
    contractEnd: "2025-01-15",
    status: "active",
    paymentStatus: "paid",
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    email: "carlos.ruiz@email.com",
    phone: "+51 987 654 322",
    property: "Casa Familiar en La Molina",
    rentAmount: 3200,
    contractStart: "2023-11-01",
    contractEnd: "2024-11-01",
    status: "active",
    paymentStatus: "pending",
  },
  {
    id: 3,
    name: "Ana Pérez",
    email: "ana.perez@email.com",
    phone: "+51 987 654 323",
    property: "Cuarto en Miraflores",
    rentAmount: 800,
    contractStart: "2024-02-01",
    contractEnd: "2025-02-01",
    status: "active",
    paymentStatus: "paid",
  },
]

export default function TenantsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inquilinos</h1>
          <p className="text-gray-600 mt-1">Gestiona la información de tus inquilinos</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/tenants/new">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Inquilino
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Inquilinos</CardTitle>
              <CardDescription>Información de contacto y estado de contratos</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Buscar inquilino..." className="pl-10 w-64" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTenants.map((tenant) => (
              <div key={tenant.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{tenant.name}</h3>
                      <Badge variant={tenant.status === "active" ? "default" : "secondary"}>
                        {tenant.status === "active" ? "Activo" : "Inactivo"}
                      </Badge>
                      <Badge variant={tenant.paymentStatus === "paid" ? "default" : "destructive"}>
                        {tenant.paymentStatus === "paid" ? "Al día" : "Pendiente"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {tenant.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {tenant.phone}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {tenant.property}
                        </div>
                        <div className="font-medium text-emerald-600">
                          S/ {tenant.rentAmount.toLocaleString()} / mes
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-500">
                      Contrato: {new Date(tenant.contractStart).toLocaleDateString()} -{" "}
                      {new Date(tenant.contractEnd).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                    <Button variant="outline" size="sm">
                      Contactar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
