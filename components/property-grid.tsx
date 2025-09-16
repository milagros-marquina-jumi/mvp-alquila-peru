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

export default async function PropertyGrid({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  let properties = mockProperties.filter((property) => property.is_visible)

  // Apply filters to mock data
  if (params.search) {
    const searchTerm = params.search.toLowerCase()
    properties = properties.filter(
      (property) =>
        property.title.toLowerCase().includes(searchTerm) ||
        property.address.toLowerCase().includes(searchTerm) ||
        property.district.toLowerCase().includes(searchTerm),
    )
  }

  if (params.type) {
    properties = properties.filter((property) => property.property_type === params.type)
  }

  if (params.district) {
    properties = properties.filter((property) => property.district === params.district)
  }

  if (params.minPrice) {
    properties = properties.filter((property) => property.monthly_rent >= Number.parseFloat(params.minPrice!))
  }

  if (params.maxPrice) {
    properties = properties.filter((property) => property.monthly_rent <= Number.parseFloat(params.maxPrice!))
  }

  if (params.status) {
    properties = properties.filter((property) => property.status === params.status)
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
