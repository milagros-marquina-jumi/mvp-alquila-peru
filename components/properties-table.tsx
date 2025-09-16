"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Eye, Edit, Trash2, MapPin, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

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

interface PropertiesTableProps {
  properties: Property[]
}

export default function PropertiesTable({ properties }: PropertiesTableProps) {
  const router = useRouter()
  const [updatingProperty, setUpdatingProperty] = useState<string | null>(null)

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

  const togglePublished = async (propertyId: string, currentStatus: boolean) => {
    setUpdatingProperty(propertyId)

    const { error } = await supabase.from("properties").update({ is_published: !currentStatus }).eq("id", propertyId)

    if (error) {
      console.error("Error updating property:", error)
    } else {
      router.refresh()
    }

    setUpdatingProperty(null)
  }

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => {
        const primaryImage = property.property_images?.find((img) => img.is_primary) || property.property_images?.[0]
        const activeContract = property.rental_contracts?.find((contract) => contract.contract_status === "active")

        return (
          <Card key={property.id} className="overflow-hidden">
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

            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">{property.title}</h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="line-clamp-1">
                    {property.district}, {property.address}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-2xl font-bold text-emerald-600">S/ {property.monthly_rent.toLocaleString()}</span>
                <span className="text-gray-500 text-sm ml-1">/mes</span>
              </div>

              <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Mostrar en marketplace</p>
                  <p className="text-xs text-gray-500">
                    {property.is_published ? "Visible para inquilinos" : "Oculto del público"}
                  </p>
                </div>
                <Switch
                  checked={property.is_published}
                  onCheckedChange={() => togglePublished(property.id, property.is_published)}
                  disabled={updatingProperty === property.id}
                />
              </div>

              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Link href={`/property/${property.id}`} target="_blank">
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Link>
                </Button>

                <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Link href={`/dashboard/properties/${property.id}/edit`}>
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
