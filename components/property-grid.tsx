import PropertyCard from "@/components/property-card"
import { mockProperties } from "@/lib/mock-data"

interface SearchParams {
  search?: string
  type?: string
  district?: string
  minPrice?: string
  maxPrice?: string
  status?: string
}

export default async function PropertyGrid({ searchParams }: { searchParams: SearchParams }) {
  let properties = mockProperties.filter((property) => property.is_visible)

  // Apply filters to mock data
  if (searchParams.search) {
    const searchTerm = searchParams.search.toLowerCase()
    properties = properties.filter(
      (property) =>
        property.title.toLowerCase().includes(searchTerm) ||
        property.address.toLowerCase().includes(searchTerm) ||
        property.district.toLowerCase().includes(searchTerm),
    )
  }

  if (searchParams.type) {
    properties = properties.filter((property) => property.property_type === searchParams.type)
  }

  if (searchParams.district) {
    properties = properties.filter((property) => property.district === searchParams.district)
  }

  if (searchParams.minPrice) {
    properties = properties.filter((property) => property.monthly_rent >= Number.parseFloat(searchParams.minPrice))
  }

  if (searchParams.maxPrice) {
    properties = properties.filter((property) => property.monthly_rent <= Number.parseFloat(searchParams.maxPrice))
  }

  if (searchParams.status) {
    properties = properties.filter((property) => property.status === searchParams.status)
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No se encontraron propiedades</p>
        <p className="text-gray-400">Intenta ajustar los filtros de búsqueda</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8" id="propiedades">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}
