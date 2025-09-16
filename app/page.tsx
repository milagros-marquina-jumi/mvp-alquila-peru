import { Suspense } from "react"
import PropertyGrid from "@/components/property-grid"
import SearchFilters from "@/components/search-filters"
import HeroSection from "@/components/hero-section"
import AlquilaPreview from "@/components/alquila-preview"

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      
      <AlquilaPreview />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="propiedades">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Propiedades Disponibles</h2>
          <p className="text-lg text-gray-600">Encuentra tu próximo hogar o inversión</p>
        </div>

        <SearchFilters />

        <Suspense fallback={<PropertyGridSkeleton />}>
          <PropertyGrid searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}

function PropertyGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="h-48 bg-gray-200 animate-pulse"></div>
          <div className="p-6 space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
