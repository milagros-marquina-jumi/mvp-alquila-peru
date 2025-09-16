import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

export default function NewPropertyPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard/properties">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Propiedades
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nueva Propiedad</h1>
          <p className="text-gray-600 mt-1">Agrega una nueva propiedad a tu portafolio</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
              <CardDescription>Detalles principales de la propiedad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título de la propiedad</Label>
                  <Input id="title" placeholder="Ej: Departamento moderno en San Isidro" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de propiedad</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Departamento</SelectItem>
                      <SelectItem value="house">Casa</SelectItem>
                      <SelectItem value="room">Cuarto</SelectItem>
                      <SelectItem value="office">Oficina</SelectItem>
                      <SelectItem value="commercial">Local Comercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describe las características principales de la propiedad..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Dormitorios</Label>
                  <Input id="bedrooms" type="number" min="0" placeholder="2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Baños</Label>
                  <Input id="bathrooms" type="number" min="0" step="0.5" placeholder="1.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Área (m²)</Label>
                  <Input id="area" type="number" min="0" placeholder="85" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección completa</Label>
                <Input id="address" placeholder="Av. Javier Prado Este 1234, San Isidro, Lima" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="district">Distrito</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar distrito" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="san-isidro">San Isidro</SelectItem>
                      <SelectItem value="miraflores">Miraflores</SelectItem>
                      <SelectItem value="surco">Surco</SelectItem>
                      <SelectItem value="la-molina">La Molina</SelectItem>
                      <SelectItem value="san-borja">San Borja</SelectItem>
                      <SelectItem value="barranco">Barranco</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input id="city" value="Lima" readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Características</CardTitle>
              <CardDescription>Servicios y comodidades incluidas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="furnished" />
                  <Label htmlFor="furnished">Amoblado</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="parking" />
                  <Label htmlFor="parking">Estacionamiento</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="pets" />
                  <Label htmlFor="pets">Mascotas permitidas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="utilities" />
                  <Label htmlFor="utilities">Servicios incluidos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="internet" />
                  <Label htmlFor="internet">Internet</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="security" />
                  <Label htmlFor="security">Seguridad 24h</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Precio y Disponibilidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Precio mensual (S/)</Label>
                <Input id="price" type="number" min="0" placeholder="2500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deposit">Depósito (S/)</Label>
                <Input id="deposit" type="number" min="0" placeholder="2500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select defaultValue="available">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Disponible</SelectItem>
                    <SelectItem value="rented">Alquilado</SelectItem>
                    <SelectItem value="maintenance">En mantenimiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="visible" defaultChecked />
                <Label htmlFor="visible">Mostrar en marketplace</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Imágenes</CardTitle>
              <CardDescription>Sube fotos de la propiedad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">Arrastra imágenes aquí o</p>
                <Button variant="outline" size="sm">
                  Seleccionar archivos
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button className="flex-1">Guardar Propiedad</Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/properties">Cancelar</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
