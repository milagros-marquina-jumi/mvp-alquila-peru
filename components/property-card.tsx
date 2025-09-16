"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Bed, Bath, Square, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import IdentityValidationModal from "./identity-validation-modal"

interface Property {
  id: string
  title: string
  description: string
  property_type: string
  address: string
  district: string
  monthly_rent: number
  area_sqm: number
  bedrooms: number
  bathrooms: number
  status: string
  property_images: Array<{
    image_url: string
    is_primary: boolean
  }>
  rental_contracts: Array<{
    start_date: string
    end_date: string
    contract_status: string
  }>
  users: {
    full_name: string
    phone: string
    whatsapp_number: string
  }
}

export default function PropertyCard({ property }: { property: Property }) {
  const [showValidationModal, setShowValidationModal] = useState(false)
  const primaryImage = property.property_images?.find((img) => img.is_primary) || property.property_images?.[0]
  const activeContract = property.rental_contracts?.find((contract) => contract.contract_status === "active")

  // Calculate rental progress if property is rented
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
  const isRented = property.status === "rented"

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
    return status === "available" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
  }

  const getStatusLabel = (status: string) => {
    return status === "available" ? "Disponible" : "Alquilado"
  }

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowValidationModal(true)
  }

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <div className="h-48 bg-gray-200 relative overflow-hidden">
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
          </div>

          <div className="absolute top-3 left-3">
            <Badge className={getStatusColor(property.status)}>{getStatusLabel(property.status)}</Badge>
          </div>

          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 text-gray-800">
              {getPropertyTypeLabel(property.property_type)}
            </Badge>
          </div>

          {/* Rental progress bar for rented properties */}
          {isRented && rentalProgress && (
            <div className="absolute bottom-0 left-0 right-0 bg-red-500/80 h-2">
              <div
                className="h-full bg-red-600 transition-all duration-300"
                style={{ width: `${rentalProgress.progress}%` }}
              />
            </div>
          )}
        </div>

        <CardContent className="p-6">
          <div className="mb-3">
            <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">{property.title}</h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="line-clamp-1">
                {property.district}, {property.address}
              </span>
            </div>
          </div>

          {isRented && rentalProgress && (
            <div className="mb-3 p-2 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-800">
                Alquilado hasta: <span className="font-medium">{rentalProgress.endDate}</span>
              </p>
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            {property.bedrooms > 0 && (
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.area_sqm && (
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                <span>{property.area_sqm}m²</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-green-600">S/ {property.monthly_rent.toLocaleString()}</span>
              <span className="text-gray-500 text-sm ml-1">/mes</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
              <Link href={`/property/${property.id}`}>Ver Detalles</Link>
            </Button>

            {property.users?.whatsapp_number && (
              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={handleWhatsAppClick}>
                <MessageCircle className="w-4 h-4 mr-1" />
                WhatsApp
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <IdentityValidationModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        property={property}
      />
    </>
  )
}
