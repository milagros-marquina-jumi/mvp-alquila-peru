import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Bed, Bath, Square, Car, MessageCircle, Phone, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface PropertyDetailsProps {
  property: {
    id: string
    title: string
    description: string
    property_type: string
    address: string
    district: string
    city: string
    monthly_rent: number
    deposit: number
    area_sqm: number
    bedrooms: number
    bathrooms: number
    furnished: boolean
    pets_allowed: boolean
    parking: boolean
    utilities_included: boolean
    status: string
    property_images: Array<{
      image_url: string
      is_primary: boolean
    }>
    rental_contracts: Array<{
      start_date: string
      end_date: string
      contract_status: string
      monthly_rent: number
    }>
    users: {
      full_name: string
      phone: string
      whatsapp_number: string
    }
  }
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const activeContract = property.rental_contracts?.find((contract) => contract.contract_status === "active")
  const isRented = property.status === "rented"

  const getRentalProgress = () => {
    if (!activeContract) return null

    const startDate = new Date(activeContract.start_date)
    const endDate = new Date(activeContract.end_date)
    const currentDate = new Date()

    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    const elapsedDays = (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)

    const progress = Math.min(Math.max((elapsedDays / totalDays) * 100, 0), 100)

    return {
      progress,
      endDate: endDate.toLocaleDateString("es-PE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }
  }

  const rentalProgress = getRentalProgress()

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al marketplace
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative h-96 bg-gray-200 rounded-t-lg overflow-hidden">
                  {property.property_images?.[0] ? (
                    <Image
                      src={property.property_images[0].image_url || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-lg">Sin imagen</span>
                    </div>
                  )}

                  <div className="absolute top-4 left-4">
                    <Badge className={getStatusColor(property.status)}>{getStatusLabel(property.status)}</Badge>
                  </div>

                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {getPropertyTypeLabel(property.property_type)}
                    </Badge>
                  </div>

                  {/* Rental progress bar */}
                  {isRented && rentalProgress && (
                    <div className="absolute bottom-0 left-0 right-0 bg-red-500/80 h-3">
                      <div
                        className="h-full bg-red-600 transition-all duration-300"
                        style={{ width: `${rentalProgress.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Property Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{property.title}</CardTitle>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>
                    {property.address}, {property.district}, {property.city}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {isRented && rentalProgress && (
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-medium text-orange-800 mb-2">Estado de Alquiler</h4>
                    <p className="text-sm text-orange-700">
                      Esta propiedad está alquilada hasta el{" "}
                      <span className="font-medium">{rentalProgress.endDate}</span>
                    </p>
                    <p className="text-xs text-orange-600 mt-1">
                      Puedes contactar al propietario para negociar disponibilidad futura
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Descripción</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {property.description || "Sin descripción disponible"}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Bed className="w-5 h-5 text-gray-600 mr-2" />
                      <div>
                        <div className="font-medium">{property.bedrooms}</div>
                        <div className="text-sm text-gray-500">Dormitorios</div>
                      </div>
                    </div>
                  )}

                  {property.bathrooms > 0 && (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Bath className="w-5 h-5 text-gray-600 mr-2" />
                      <div>
                        <div className="font-medium">{property.bathrooms}</div>
                        <div className="text-sm text-gray-500">Baños</div>
                      </div>
                    </div>
                  )}

                  {property.area_sqm && (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Square className="w-5 h-5 text-gray-600 mr-2" />
                      <div>
                        <div className="font-medium">{property.area_sqm}m²</div>
                        <div className="text-sm text-gray-500">Área</div>
                      </div>
                    </div>
                  )}

                  {property.parking && (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Car className="w-5 h-5 text-gray-600 mr-2" />
                      <div>
                        <div className="font-medium">Sí</div>
                        <div className="text-sm text-gray-500">Estacionamiento</div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Características</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {property.furnished && (
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                        Amoblado
                      </div>
                    )}
                    {property.pets_allowed && (
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                        Mascotas permitidas
                      </div>
                    )}
                    {property.utilities_included && (
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                        Servicios incluidos
                      </div>
                    )}
                    {property.parking && (
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                        Estacionamiento
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  <span className="text-3xl font-bold text-emerald-600">
                    S/ {property.monthly_rent.toLocaleString()}
                  </span>
                  <span className="text-gray-500 text-lg ml-2">/mes</span>
                </CardTitle>
                {property.deposit && (
                  <p className="text-center text-gray-600">Depósito: S/ {property.deposit.toLocaleString()}</p>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {property.users?.whatsapp_number && (
                  <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <a
                      href={`https://wa.me/51${property.users.whatsapp_number}?text=Hola, estoy interesado en la propiedad: ${property.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contactar por WhatsApp
                    </a>
                  </Button>
                )}

                {property.users?.phone && (
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <a href={`tel:+51${property.users.phone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      Llamar
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Owner Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Propietario</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-emerald-600 font-semibold text-lg">
                      {property.users?.full_name?.charAt(0) || "P"}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900">{property.users?.full_name || "Propietario"}</h4>
                  <p className="text-sm text-gray-500 mt-1">Propietario verificado</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
