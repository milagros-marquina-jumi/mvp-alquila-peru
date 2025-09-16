import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

export default function NewTenantPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard/tenants">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Inquilinos
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nuevo Inquilino</h1>
          <p className="text-gray-600 mt-1">Registra un nuevo inquilino en tu propiedad</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Datos básicos del inquilino</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombres</Label>
                  <Input id="firstName" placeholder="María" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellidos</Label>
                  <Input id="lastName" placeholder="González Pérez" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dni">DNI</Label>
                  <Input id="dni" placeholder="12345678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Fecha de nacimiento</Label>
                  <Input id="birthDate" type="date" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="maria.gonzalez@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" placeholder="+51 987 654 321" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentAddress">Dirección actual</Label>
                <Input id="currentAddress" placeholder="Av. Principal 123, Distrito, Lima" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workplace">Lugar de trabajo</Label>
                  <Input id="workplace" placeholder="Empresa ABC S.A.C." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Ingreso mensual (S/)</Label>
                  <Input id="monthlyIncome" type="number" placeholder="5000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Contacto de emergencia</Label>
                <Input id="emergencyContact" placeholder="Nombre y teléfono" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="references">Referencias</Label>
                <Textarea
                  id="references"
                  placeholder="Incluye nombres, teléfonos y relación con el inquilino..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Información del Contrato</CardTitle>
              <CardDescription>Detalles del alquiler y contrato</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="property">Propiedad</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar propiedad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prop1">Departamento Moderno en San Isidro</SelectItem>
                    <SelectItem value="prop2">Casa Familiar en La Molina</SelectItem>
                    <SelectItem value="prop3">Cuarto en Miraflores</SelectItem>
                    <SelectItem value="prop4">Departamento Ejecutivo en Surco</SelectItem>
                    <SelectItem value="prop5">Oficina en San Borja</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rentAmount">Monto de alquiler (S/)</Label>
                  <Input id="rentAmount" type="number" placeholder="2500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deposit">Depósito (S/)</Label>
                  <Input id="deposit" type="number" placeholder="2500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contractStart">Inicio del contrato</Label>
                  <Input id="contractStart" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractEnd">Fin del contrato</Label>
                  <Input id="contractEnd" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentDay">Día de pago mensual</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar día" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        Día {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialConditions">Condiciones especiales</Label>
                <Textarea id="specialConditions" placeholder="Cualquier condición especial del contrato..." rows={3} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documentos</CardTitle>
              <CardDescription>Sube los documentos del inquilino</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">DNI (ambas caras)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 mb-2">Arrastra archivos aquí</p>
                  <Button variant="outline" size="sm">
                    Seleccionar
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Recibo de servicios</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 mb-2">Arrastra archivos aquí</p>
                  <Button variant="outline" size="sm">
                    Seleccionar
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Constancia de trabajo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 mb-2">Arrastra archivos aquí</p>
                  <Button variant="outline" size="sm">
                    Seleccionar
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Reporte Infocorp</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 mb-2">Arrastra archivos aquí</p>
                  <Button variant="outline" size="sm">
                    Seleccionar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button className="flex-1">Registrar Inquilino</Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/tenants">Cancelar</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
